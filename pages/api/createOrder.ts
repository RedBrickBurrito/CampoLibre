import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      try {
        const { customerId, customerName, internalCustomerId, customerEmail, orderTotal,shippingAddress, order_details } = req.body as Order;

        const order = await prisma.order.create({
          data: {
            customerId,
            customerName,
            internalCustomerId,
            customerEmail,
            orderTotal,
            shippingAddress,
            order_details,
          },
        });

        res.status(201).json({ message: "Order created successfully", order });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
      }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  }
  