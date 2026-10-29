import { Router } from 'express'
import { and, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { orders, orderItems } from '../db/schema.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const ordersRouter = Router()

// GET /api/orders/:id - one of the signed-in user's orders, with what was bought.
// The success page uses this to show the real status saved by the webhook.
ordersRouter.get('/:id', requireAuth, async (req, res) => {
  // matching on userId too means you can only see your own orders
  const [order] = await db
    .select()
    .from(orders)
    .where(and(eq(orders.id, req.params.id), eq(orders.userId, req.user.id)))
    .limit(1)

  if (!order) return res.status(404).json({ error: 'No such order' })

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id))

  res.json({
    id: order.id,
    status: order.status,
    totalCents: order.totalCents,
    currency: order.currency,
    createdAt: order.createdAt,
    paidAt: order.paidAt,
    items: items.map((item) => ({
      title: item.title,
      priceCents: item.priceCents,
      quantity: item.quantity,
    })),
  })
})
