// One shared Stripe client, plus the currency we charge in.
// STRIPE_SECRET_KEY comes from Server/.env and must NEVER go in the React app or GitHub.
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Change this in ONE place if you ever charge in another currency.
export const CURRENCY = 'usd'