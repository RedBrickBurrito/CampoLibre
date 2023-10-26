import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import axios from "axios";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.query.session_id as string);
      const customer = await stripe.customers.retrieve(session.customer as string);
      const items = await stripe.checkout.sessions.listLineItems(session.id, {limit: 100});
      const user_session = await getServerSession(req, res, authOptions)

      if (customer.deleted === true) {
        res.send(`<html><body><h1>Gracias por tu orden!</h1></body></html>`);
      } else {

        // Ensure customer.name is defined before using it
        if (typeof customer.name === "string" && user_session) {

          const orderData = {
            customerId: customer.id,
            customerName: customer.name,
            internalCustomerId: user_session.user?.id || undefined,
            customerEmail: customer.email,
            shippingAddress: JSON.stringify(session.shipping_details),
            orderTotal: session.amount_total,
            order_details: [
              JSON.stringify(items)
            ],
          };

          const orderResponse = await axios.post("http://localhost:3000/api/createOrder", orderData);

          console.log(orderResponse)

          if (orderResponse.data.order.id) {
            // Redirect to the order page
            res.writeHead(302, { Location: `/orders/${orderResponse.data.order.id}` });
            res.end();
          } else {
            // Handle the case where the order creation did not return an ID
            res.status(500).json({ error: "Order creation failed" });
          }
        } else { 
          // Handle the case where customer.name is not a string (null or undefined)
          res.status(500).json({ error: "Invalid customer name" });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}