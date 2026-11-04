// The Express server. Start it with:  npm run dev
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { db } from './db/index.js'
import { photos } from './db/schema.js'
import { toNodeHandler, fromNodeHeaders } from 'better-auth/node'
import { auth } from './auth.js'

const app = express()
const PORT = process.env.PORT || 3000
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

// CORS lets the React app (a different address) call this API from the browser.
// For now only the local Vite dev server is allowed.
app.use(cors({ origin: clientUrl, credentials: true }))
app.all('/api/auth/*splat', toNodeHandler(auth))
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})