// The address of the API server.
// Locally this is http://localhost:3000 (from Client/.env.local).
// In production it is left empty, so requests go to the same website address
// and Vercel forwards anything starting with /api to the backend.
export const API_URL = import.meta.env.VITE_API_URL || ''