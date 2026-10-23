import { randomUUID } from 'node:crypto'
import { db } from './index.js'
import { photoSessions } from './schema.js'
import { sessionsData } from './sessions.data.js'

async function seed() {
  console.log('Seeding photo sessions...')

  for (const s of sessionsData) {
    // Skip rows whose slug already exists, so the script is safe to run again
    await db
      .insert(photoSessions)
      .values({ id: randomUUID(), ...s })
      .onConflictDoNothing({ target: photoSessions.slug })
  }

  console.log(`Done - seeded ${sessionsData.length} photo sessions.`)
  process.exit(0)
}

seed()
