import { randomUUID } from 'node:crypto'
import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { photoSessions, orders, orderItems } from '../db/schema.js'
import { stripe } from '../stripe.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const checkoutRouter = Router()

// POST /api/checkout - body { sessionId }. Returns { url } of Stripe's hosted payment page.
checkoutRouter.post('/', requireAuth, async (req, res) => {
  const { sessionId } = req.body ?? {}
  if (!sessionId) return res.status(400).json({ error: 'sessionId is required' })

  // the price always comes from our database, never from the browser
  const [photoSession] = await db
    .select()
    .from(photoSessions)
    .where(eq(photoSessions.id, sessionId))
    .limit(1)

  if (!photoSession) return res.status(404).json({ error: 'No such session' })
  if (photoSession.priceCents <= 0) {
    return res.status(400).json({ error: 'This session is not available to book online' })
  }

  // save the order as "pending" first - only the Stripe webhook may mark it "paid".
  // The transaction saves the order and its item together, or neither.
  const orderId = randomUUID()
  await db.transaction(async (tx) => {
    await tx.insert(orders).values({
      id: orderId,
      userId: req.user.id,
      totalCents: photoSession.priceCents,
      currency: 'usd',
    })
    await tx.insert(orderItems).values({
      id: randomUUID(),
      orderId,
      sessionId: photoSession.id,
      title: photoSession.title,
      priceCents: photoSession.priceCents,
      quantity: 1,
    })
  })

  const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:5173'

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: photoSession.priceCents,
          product_data: { name: photoSession.title, description: photoSession.description },
        },
      },
    ],
    customer_email: req.user.email,
    // Stripe sends this back in the webhook, so we know which order was paid
    metadata: { orderId },
    success_url: `${clientUrl}/checkout/success?order=${orderId}`,
    // the session page reads ?canceled=true and shows a "you weren't charged" note
    cancel_url: `${clientUrl}/sessions/${photoSession.slug}?canceled=true`,
  })

  await db.update(orders).set({ stripeSessionId: checkoutSession.id }).where(eq(orders.id, orderId))

  res.json({ url: checkoutSession.url })
})
