import 'dotenv/config'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db/index.js'

import * as schema from './db/auth-schema.js'
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: 'pg', schema}),
    emailAndPassword: {enabled: true },
    trustedOrigins: [clientUrl],
})
