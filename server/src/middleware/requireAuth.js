import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../auth.js'

// Put this before any route that needs a signed-in user, e.g. router.post('/', requireAuth, handler).
// Better Auth checks the session cookie; if it's valid the user is available as req.user.
export async function requireAuth(req, res, next) {
  const result = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })

  if (!result) {
    return res.status(401).json({ error: 'Please sign in first.' })
  }

  req.user = result.user
  next()
}
