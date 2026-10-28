import express, { Router } from 'express'
import { and, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { orders } from '../db/schema.js'
import { stripe } from '../stripe.js'

export const webhooksRouter = Router()

// POST /api/webhooks/stripe - Stripe calls this, not the browser. No requireAuth:
// the signature check below proves the request really came from Stripe.
// express.raw keeps the body as the exact bytes Stripe signed (express.json would change them).
webhooksRouter.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET,
    )
  } catch (err) {
    console.error('Stripe webhook rejected:', err.message)
    return res.status(400).json({ error: 'Invalid signature' })
  }

  if (event.type === 'checkout.session.completed') {
    const checkoutSession = event.data.object
    const orderId = checkoutSession.metadata?.orderId

    // the only place an order becomes "paid".
    // Only pending orders match, so if Stripe sends the same event twice nothing changes.
    if (orderId && checkoutSession.payment_status === 'paid') {
      const updated = await db
        .update(orders)
        .set({ status: 'paid', paidAt: new Date() })
        .where(
          and(
            eq(orders.id, orderId),
            eq(orders.stripeSessionId, checkoutSession.id),
            eq(orders.status, 'pending'),
          ),
        )
        .returning({ id: orders.id })

      if (updated.length > 0) console.log(`Order ${orderId} marked as paid`)
    }
  }

  // tell Stripe we got it; otherwise it keeps retrying
  res.json({ received: true })
})
