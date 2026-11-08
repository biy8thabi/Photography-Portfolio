// The Express server. Start it with:  npm run dev
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { db } from './db/index.js'
import { photos, packages } from './db/schema.js'
import checkoutRoutes from './routes/checkout.js'
import webhookRoutes from './routes/webhook.js'
import orderRoutes from './routes/orders.js'
import { toNodeHandler, fromNodeHeaders } from 'better-auth/node'
import { auth } from './auth.js'

const app = express()
const PORT = process.env.PORT || 3000
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

// CORS lets the React app (a different address) call this API from the browser.
// For now only the local Vite dev server is allowed.
app.use(cors({ origin: clientUrl, credentials: true }))
app.all('/api/auth/*splat', toNodeHandler(auth))
// The Stripe webhook needs the RAW request body to verify Stripe's signature, so it must
// also come BEFORE express.json().
app.use(webhookRoutes)
app.use(express.json())

// Simple check that the server is alive.
app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})
app.get('/api/me', async (req, res) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })
  res.json(session)
  })

// GET /api/photos  ->  every row of the photos table, as JSON.
// This is the data the gallery will fetch instead of using a hardcoded array.
app.get('/api/photos', async (req, res) => {
  try {
    const rows = await db.select().from(photos)
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not load photos' })
  }
})

// GET /api/packages  ->  the shoot packages that can be bought (name, description, price).
app.get('/api/packages', async (req, res) => {
  try {
    const rows = await db.select().from(packages).orderBy(packages.id)
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not load packages' })
  }
})

   app.use(checkoutRoutes)
   app.use(orderRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})