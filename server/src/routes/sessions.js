import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { photoSessions, photos } from '../db/schema.js'

export const sessionsRouter = Router()

// GET /api/sessions - all photo sessions
sessionsRouter.get('/', async (_req, res) => {
  const rows = await db.select().from(photoSessions)
  res.json(rows)
})

// GET /api/sessions/:slug - one photo session with its photos, e.g. /api/sessions/portrait-session
sessionsRouter.get('/:slug', async (req, res) => {
  const [row] = await db
    .select()
    .from(photoSessions)
    .where(eq(photoSessions.slug, req.params.slug))
    .limit(1)

  if (!row) return res.status(404).json({ error: 'No such session' })

  const sessionPhotos = await db
    .select()
    .from(photos)
    .where(eq(photos.sessionId, row.id))
    .orderBy(photos.sortOrder)

  res.json({ ...row, photos: sessionPhotos })
})
