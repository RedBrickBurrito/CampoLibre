import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-11-15',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.query.session_id as string);
      const customer = await stripe.customers.retrieve(session.customer as string)

      res.send(`<html><body><h1>Gracias por tu orden, ${customer.name}!</h1></body></html>`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
