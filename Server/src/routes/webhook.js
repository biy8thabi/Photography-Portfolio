// POST /api/stripe/webhook
// Stripe calls this itself after a payment. It is the ONLY place that marks an order
// 'paid'. The success page in the browser can be faked by anyone; a request signed
// with our webhook secret cannot.
import express, { Router } from 'express'
import { and, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { orders } from '../db/schema.js'
import { stripe } from '../stripe.js'

const router = Router()

// express.raw keeps the body as untouched bytes. The signature is calculated over
// those exact bytes, so if express.json() parsed it first, verification would fail.
router.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  let event
  try {
    // Throws if the signature is missing or wrong, i.e. the request did not come from Stripe.
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET,
    )
  } catch (error) {
    console.error('Webhook signature check failed:', error.message)
    return res.status(400).send('Invalid signature')
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const orderId = Number(session.metadata?.orderId)

    // Only treat it as money received when Stripe says it is actually paid.
    if (Number.isInteger(orderId) && session.payment_status === 'paid') {
      const [order] = await db.select().from(orders).where(eq(orders.id, orderId))

      // Safety check: what Stripe charged must match what OUR database says it costs.
      if (order && order.totalCents === session.amount_total) {
        // "and status = pending" makes this safe if Stripe sends the same event twice.
        await db
          .update(orders)
          .set({ status: 'paid', stripeSessionId: session.id })
          .where(and(eq(orders.id, orderId), eq(orders.status, 'pending')))
        console.log(`Order ${orderId} marked paid`)
      } else {
        console.error(`Order ${orderId}: amount mismatch or order missing, NOT marked paid`)
      }
    }
  }

  // 200 tells Stripe "received", so it stops retrying.
  res.json({ received: true })
})

export default router