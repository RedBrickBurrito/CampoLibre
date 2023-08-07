// utils/fetchProductsData.ts
import axios from "axios"

interface Product {
  id: string
  name: string
  price: number
  image: string
  imageAlt: string
  currency: string
  product_data: ProductData[]
  price_data: PriceData[]
}

interface ProductData {
  metadata: JSON
}

interface PriceData {
  recurring: JSON
}

type ProductResource = Product[]

export const fetchProductsData = async (): Promise<ProductResource> => {
  try {
    const response = await axios.get("http://localhost:3000/api/products")
    return response.data as ProductResource
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}
