import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../libs/prisma"
import { update } from "lodash"

interface Product {
  id: string
  name: string
  price: number
  image: string
  imageAlt: string
  currency: string
  product_type: string
  isFavorite: boolean
}
export default async function productHandler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "GET") {
    return getAllProducts(response)
  }

  if (request.method === "POST") {
    return createProduct(request, response)
  }

  if (request.method === "PUT") {
    return updateProduct(request, response)
  }

  return response.status(405).json({ error: "Method not allowed" })
}

async function getAllProducts(response: NextApiResponse) {
  try {
    const products = await prisma.product.findMany()
    return response.status(200).json(products)
  } catch (error) {
    console.error("Error retrieving products:", error)
    return response.status(500).json({ error: "Internal server error" })
  }
}

async function createProduct(request: NextApiRequest, response: NextApiResponse) {
  try {
    const productData = request.body as Product
    const newProduct = await prisma.product.create({
      data: productData,
    })
    return response.status(201).json(newProduct)
  } catch (error) {
    console.error("Error creating product:", error)
    return response.status(500).json({ error: "Internal server error" })
  }
}

async function updateProduct(request: NextApiRequest, response: NextApiResponse) {
  try {
    const productId = request.query.id as string
    const updatedProductData = request.body as Partial<Product>

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: updatedProductData,
    })

    return response.status(200).json(updatedProduct)
  } catch (error) {
    console.error("Error updating product:", error)
    return response.status(500).json({ error: "Internal server error" })
  }
}
