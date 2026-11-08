// One-off script that fills the `photos` table with the data that used to be
// hardcoded in the React app. Run it with:  npm run seed
// It is safe to run more than once: it clears the table first, then inserts.
import { db } from './db/index.js'
import { sql } from 'drizzle-orm'
import { photos, packages } from './db/schema.js'

const seedData = [
  {
    id: 1,
    title: 'Soft light, portrait study',
    category: 'Portraits',
    alt: 'Woman with long black hair resting her chin on her hand, looking into the camera',
    imageUrl: '/images/photo-1.jpeg',
    objectPosition: '50% 40%',
  },
  {
    id: 2,
    title: 'Golden hour',
    category: 'Natural hair',
    alt: 'Smiling woman with a full afro in warm sunlight, wearing a white ribbed top',
    imageUrl: '/images/photo-2.jpeg',
    objectPosition: '50% 25%',
  },
  {
    id: 3,
    title: 'City in motion',
    category: 'Editorial',
    alt: 'Woman with a large afro and gold choker in a houndstooth coat on a city street',
    imageUrl: '/images/photo-3.jpeg',
    objectPosition: '50% 15%',
  },
  {
    id: 4,
    title: 'First light',
    category: 'Editorial',
    alt: 'Close-up beauty portrait of a woman in a white hooded wrap with blue eyeshadow, against a peach background',
    imageUrl: '/images/photo-4.jpeg',
    objectPosition: '50% 50%',
  },
  {
    id: 5,
    title: 'Small things',
    category: 'Natural hair',
    alt: 'Woman with voluminous curly natural hair in front of a brick wall',
    imageUrl: '/images/photo-5.jpeg',
    objectPosition: '50% 45%',
  },
  {
    id: 6,
    title: 'At ease',
    category: 'Natural hair',
    alt: 'Woman with an afro and a yellow flower in her hair, wearing a brown and cream striped sweater',
    imageUrl: '/images/photo-6.jpeg',
    objectPosition: '50% 25%',
  },
  {
    id: 7,
    title: 'Crown',
    category: 'Portraits',
    alt: 'Profile portrait of a woman with locs piled in a high bun against a soft beige background',
    imageUrl: '/images/photo-7.jpeg',
    objectPosition: '50% 65%',
  },
]

// The shoot packages people can buy. Prices are in cents: 12000 = 120.00.
const packageData = [
  {
    id: 1,
    name: 'Portrait session',
    description: 'A one-hour portrait shoot with 15 edited photos delivered online.',
    priceCents: 12000,
  },
  {
    id: 2,
    name: 'Brand shoot',
    description: 'A half-day shoot for small brands and creatives, with 30 edited photos.',
    priceCents: 30000,
  },
  {
    id: 3,
    name: 'Event coverage',
    description: 'Up to four hours of event photography with a full online gallery.',
    priceCents: 50000,
  },
]

// Photos: clear and re-insert (nothing else refers to them).
await db.delete(photos)
await db.insert(photos).values(seedData)

// Packages: UPDATE-or-insert instead of deleting, because orders point at packages
// and Postgres won't let you delete a package that an order uses.
await db
  .insert(packages)
  .values(packageData)
  .onConflictDoUpdate({
    target: packages.id,
    set: {
      name: sql`excluded.name`,
      description: sql`excluded.description`,
      priceCents: sql`excluded.price_cents`,
    },
  })

console.log(`Seeded ${seedData.length} photos and ${packageData.length} packages`)
console.log(`Seeded ${seedData.length} photos`)