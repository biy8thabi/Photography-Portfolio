import { createAuthClient } from 'better-auth/react'
import { API_URL } from './api'

export const authClient = createAuthClient({
  // undefined makes Better Auth use the current website address.
  baseURL: API_URL || undefined,
  // Send the login cookie along with every request to the server.
  fetchOptions: { credentials: 'include' },
})