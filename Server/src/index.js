// The Express server. Start it with:  npm run dev
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { db } from './db/index.js'
import { photos } from './db/schema.js'

const app = express()
const PORT = process.env.PORT || 3000

// CORS lets the React app (a different address) call this API from the browser.
// For now only the local Vite dev server is allowed.
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

// Simple check that the server is alive.
app.get('/', (req, res) => {
  res.json({ status: 'ok' })
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