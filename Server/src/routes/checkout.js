// POST /api/checkout  { packageId: 1 }
// Creates an order in OUR database, then asks Stripe for a Checkout Session and
// returns its URL. The browser only says WHICH package. The price is read from the
// database here, so nobody can pay a different price by editing the request.
import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { packages, orders, orderItems } from '../db/schema.js'
import { requireAuth } from '../middleware/requireAuth.js'
import { stripe, CURRENCY } from '../stripe.js'

const router = Router()
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

router.post('/api/checkout', requireAuth, async (req, res) => {
  try {
    // 1. Which package? Only a whole number id is accepted.
    const packageId = Number(req.body?.packageId)
    if (!Number.isInteger(packageId)) {
      return res.status(400).json({ error: 'packageId is required' })
    }

    // 2. Look it up. The price comes from the database, never from the browser.
    const [pkg] = await db.select().from(packages).where(eq(packages.id, packageId))
    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' })
    }

    // 3. Create the order as 'pending' (the default) plus its one item.
    const [order] = await db
      .insert(orders)
      .values({ userId: req.user.id, totalCents: pkg.priceCents })
      .returning()

    await db.insert(orderItems).values({
      orderId: order.id,
      packageId: pkg.id,
      name: pkg.name,
      unitPriceCents: pkg.priceCents,
      quantity: 1,
    })

    // 4. Ask Stripe for a Checkout Session. metadata.orderId is how the webhook
    //    will know WHICH order a payment belongs to.
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: req.user.email,
      client_reference_id: String(order.id),
      metadata: { orderId: String(order.id) },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: pkg.priceCents,
            product_data: { name: pkg.name, description: pkg.description },
          },
        },
      ],
      success_url: `${clientUrl}/shop?order=${order.id}`,
      cancel_url: `${clientUrl}/shop`,
    })

    // 5. Remember Stripe's session id on the order, then send the URL back.
    await db.update(orders).set({ stripeSessionId: session.id }).where(eq(orders.id, order.id))

    res.json({ url: session.url })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not start checkout' })
  }
})

export default router