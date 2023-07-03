import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prisma";

interface Product {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  categoryId: string;
  price: number;
  quantity: number;
  description?: string;
  expirationDate?: Date;
}

export default async function productHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    return getAllProducts(response);
  }

  if (request.method === "POST") {
    return createProduct(request, response);
  }

  return response.status(405).json({ error: "Method not allowed" });
}

async function getAllProducts(response: NextApiResponse) {
  try {
    const products = await prisma.product.findMany();
    return response.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}

async function createProduct(request: NextApiRequest, response: NextApiResponse) {
  try {
    const productData = request.body as Product;
    const newProduct = await prisma.product.create({
      data: productData,
    });
    return response.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}
