import { randomUUID } from 'node:crypto'
import { db } from './index.js'
import { photoSessions, photos } from './schema.js'
import { sessionsData, photosData } from './sessions.data.js'

// Safe to run again: existing rows (matched by slug / url) are updated instead of duplicated
async function seed() {
  console.log('Seeding photo sessions...')

  // remember each session's id so photos can point to it
  const sessionIds = {}

  for (const s of sessionsData) {
    const { slug, ...fields } = s
    const [row] = await db
      .insert(photoSessions)
      .values({ id: randomUUID(), slug, ...fields })
      .onConflictDoUpdate({ target: photoSessions.slug, set: fields })
      .returning()
    sessionIds[slug] = row.id
  }

  console.log('Seeding photos...')

  for (const [index, p] of photosData.entries()) {
    const fields = {
      sessionId: p.sessionSlug ? sessionIds[p.sessionSlug] : null,
      alt: p.alt,
      sortOrder: index,
    }
    await db
      .insert(photos)
      .values({ id: randomUUID(), url: p.url, ...fields })
      .onConflictDoUpdate({ target: photos.url, set: fields })
  }

  console.log(`Done - ${sessionsData.length} sessions and ${photosData.length} photos in the database.`)
  process.exit(0)
}

seed()
