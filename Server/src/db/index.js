// Creates the database connection once, so every other file can import `db`.
// 'dotenv/config' reads Server/.env, which is where DATABASE_URL comes from.
import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing. Check Server/.env')
}

const sql = neon(process.env.DATABASE_URL)
export const db = drizzle({ client: sql })