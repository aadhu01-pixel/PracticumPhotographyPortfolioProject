import 'dotenv/config'
import Stripe from 'stripe'

const secretKey = process.env.STRIPE_SECRET_KEY

if (!secretKey) {
  throw new Error(
    'STRIPE_SECRET_KEY is missing. Copy your test secret key (sk_test_...) from the Stripe dashboard into .env.',
  )
}

// One Stripe client for the whole server. The secret key stays on the server - never send it to the browser.
export const stripe = new Stripe(secretKey)
