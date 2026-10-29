// The database schema: one table, `photos`.
// Each row is one photo in the gallery. The columns match the fields
// that used to live in the hardcoded array in the React app.
import { pgTable, integer, text } from 'drizzle-orm/pg-core'

export const photos = pgTable('photos', {
  id: integer('id').primaryKey(),                       // unique number for each photo
  title: text('title').notNull(),                       // caption, e.g. "Golden hour"
  category: text('category').notNull(),                 // used by the gallery filter
  alt: text('alt').notNull(),                           // alt text for accessibility
  imageUrl: text('image_url').notNull(),                // where the image file is served from
  objectPosition: text('object_position').notNull().default('50% 50%'), // crop focus for object-cover
})