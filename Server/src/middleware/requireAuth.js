// A login check ("middleware"). Put it in front of any route that needs a signed-in user.
// Express runs it first: if nobody is signed in it answers 401 and the route never runs;
// if someone is, it attaches them to req.user and calls next() to carry on.
import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../auth.js'

export async function requireAuth(req, res, next) {
  // Better Auth reads the login cookie from the request headers and finds the session.
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })

  if (!session) {
    return res.status(401).json({ error: 'You must be signed in' })
  }

  req.user = session.user // the route can now use req.user.id
  next()
}