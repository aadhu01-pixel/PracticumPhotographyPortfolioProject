import { pgTable, text, integer, boolean, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

// --- Auth tables (managed by better-auth) ---

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// A logged-in browser. Not to be confused with photo_sessions below.
export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
})

// How a user logs in. For email/password, providerId is "credential" and password holds the hash.
export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// --- Luma tables ---

// The photography sessions clients can book (Portrait, Wedding, Event)
export const photoSessions = pgTable(
  'photo_sessions',
  {
    id: text('id').primaryKey(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    category: text('category').notNull(),
    description: text('description').notNull(),
    duration: text('duration').notNull(),
    deliverables: text('deliverables').notNull(),
    // whole cents (25000 = $250.00) so there are no decimal rounding errors; Stripe also uses cents
    priceCents: integer('price_cents').notNull().default(0),
    imageUrl: text('image_url').notNull(),
    imageAlt: text('image_alt').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => [uniqueIndex('photo_sessions_slug_idx').on(table.slug)],
)

// Every photo shown on the site. The homepage gallery shows all of them;
// a session's page shows only the ones linked to it (sessionId is null for photos like landscapes).
export const photos = pgTable('photos', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').references(() => photoSessions.id, { onDelete: 'set null' }),
  url: text('url').notNull().unique(),
  alt: text('alt').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
})

// One row per purchase. Starts as "pending"; only the Stripe webhook changes it to "paid".
export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id),
  status: text('status').notNull().default('pending'),
  totalCents: integer('total_cents').notNull(),
  currency: text('currency').notNull().default('usd'),
  // filled in right after the Stripe Checkout Session is created
  stripeSessionId: text('stripe_session_id').unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  paidAt: timestamp('paid_at'),
})

// What was bought in an order. Title and price are copied at purchase time,
// so changing a session's price later doesn't rewrite old orders.
export const orderItems = pgTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  sessionId: text('session_id').references(() => photoSessions.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  priceCents: integer('price_cents').notNull(),
  quantity: integer('quantity').notNull().default(1),
})
