import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL, // e.g. http://localhost:3000
  // Send the login cookie along with every request to the server.
  fetchOptions: { credentials: 'include' },
})