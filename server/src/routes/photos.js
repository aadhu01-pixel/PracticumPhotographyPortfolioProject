import { Router } from 'express'
import { db } from '../db/index.js'
import { photos } from '../db/schema.js'

export const photosRouter = Router()

// GET /api/photos - every photo, in gallery order
photosRouter.get('/', async (_req, res) => {
  const rows = await db.select().from(photos).orderBy(photos.sortOrder)
  res.json(rows)
})
