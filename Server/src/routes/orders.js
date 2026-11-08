// GET /api/orders/:id  ->  one order and its items, for the success page.
// Only the person who owns the order can see it.
import { Router } from 'express'
import { and, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { orders, orderItems } from '../db/schema.js'
import { requireAuth } from '../middleware/requireAuth.js'

const router = Router()

router.get('/api/orders/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid order id' })
  }

  // "and userId = me": someone else's order looks exactly like a missing one.
  const [order] = await db
    .select()
    .from(orders)
    .where(and(eq(orders.id, id), eq(orders.userId, req.user.id)))
  if (!order) {
    return res.status(404).json({ error: 'Order not found' })
  }

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id))
  res.json({ ...order, items })
})

export default router