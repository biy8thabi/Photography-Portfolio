// The database schema. Tables for the gallery, and the shop (packages and orders).
// Tables for users and sessions live in auth-schema.js (made by Better Auth).
import { pgTable, integer, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './auth-schema.js'

// ---- Gallery ----
export const photos = pgTable('photos', {
  id: integer('id').primaryKey(),                       // unique number for each photo
  title: text('title').notNull(),                       // caption, e.g. "Golden hour"
  category: text('category').notNull(),                 // used by the gallery filter
  alt: text('alt').notNull(),                           // alt text for accessibility
  imageUrl: text('image_url').notNull(),                // where the image file is served from
  objectPosition: text('object_position').notNull().default('50% 50%'), // crop focus for object-cover
})

// ---- Shop ----

// What can be bought: the shoot packages. The price lives HERE, in cents
// (e.g. 12000 = 120.00), so the server never has to trust a price from the browser.
export const packages = pgTable('packages', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),                         // e.g. "Portrait session"
  description: text('description').notNull(),
  priceCents: integer('price_cents').notNull(),
})

// One row per purchase. status starts as 'pending' and ONLY the Stripe webhook
// is allowed to change it to 'paid'.
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),                         // every order belongs to a real user
  status: text('status').notNull().default('pending'),  // 'pending' or 'paid'
  totalCents: integer('total_cents').notNull(),
  stripeSessionId: text('stripe_session_id'),           // links the order to Stripe's checkout session
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// What was bought in each order. name and unitPriceCents are COPIES taken at purchase
// time, so the order history stays correct even if a package's price changes later.
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  packageId: integer('package_id')
    .notNull()
    .references(() => packages.id),
  name: text('name').notNull(),
  unitPriceCents: integer('unit_price_cents').notNull(),
  quantity: integer('quantity').notNull().default(1),
})