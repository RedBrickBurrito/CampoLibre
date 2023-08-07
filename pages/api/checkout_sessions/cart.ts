import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import { validateCartItems } from "use-shopping-cart/utilities"
import { fetchProductsData } from "utils/fetch-products-data"
import axios from "axios"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const inventory = await fetchProductsData()
      // Validate the cart details that were sent from the client.
      const line_items = validateCartItems(inventory, req.body)
      console.log("Valid items")
      const hasSubscription = line_items.find((item: any) => {
        return !!item.price_data.recurring
      })

      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        payment_method_types: ["card"],
        customer_creation: "always",
        billing_address_collection: "auto",
        locale: "es-419",
        shipping_address_collection: {
          allowed_countries: ["MX"],
        },
        line_items,
        success_url: `${req.headers.origin}/api/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
        mode: hasSubscription ? "subscription" : "payment",
      }

      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession)
    } catch (err) {
      console.log(err)
      const errorMessage =
        err instanceof Error ? err.message : "While communicating with Stripe, we encountered an error."
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
