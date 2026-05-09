// drizzle/schema.ts
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const instagramPosts = pgTable('instagram_posts', {
  id: varchar('id', { length: 255 }).primaryKey(),
  mediaUrl: text('media_url').notNull(),        // Vercel Blob permanent URL
  caption: text('caption'),
  permalink: text('permalink'),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});