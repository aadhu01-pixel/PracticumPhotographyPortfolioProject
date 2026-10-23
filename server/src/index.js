import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth.js'
import { sessionsRouter } from './routes/sessions.js'
import { photosRouter } from './routes/photos.js'

const app = express()
const PORT = Number(process.env.PORT ?? 3000)

// Allow the React app to call this API and send cookies
app.use(
  cors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
    credentials: true,
  }),
)

// better-auth needs the raw request body, so it's mounted before express.json()
app.all('/api/auth/*splat', toNodeHandler(auth))

app.use(express.json())

app.use('/api/sessions', sessionsRouter)
app.use('/api/photos', photosRouter)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})

// Any other /api URL
app.use('/api/*splat', (_req, res) => {
  res.status(404).json({ error: 'No such endpoint' })
})

// Errors thrown in routes end up here (4 arguments = error handler)
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Something broke on our side.' })
})

app.listen(PORT, () => {
  console.log(`Luma API listening on http://localhost:${PORT}`)
})
