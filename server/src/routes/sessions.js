import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { photoSessions } from '../db/schema.js'

export const sessionsRouter = Router()

// GET /api/sessions - all photo sessions
sessionsRouter.get('/', async (_req, res) => {
  const rows = await db.select().from(photoSessions)
  res.json(rows)
})

// GET /api/sessions/:slug - one photo session, e.g. /api/sessions/portrait-session
sessionsRouter.get('/:slug', async (req, res) => {
  const [row] = await db
    .select()
    .from(photoSessions)
    .where(eq(photoSessions.slug, req.params.slug))
    .limit(1)

  if (!row) return res.status(404).json({ error: 'No such session' })
  res.json(row)
})
