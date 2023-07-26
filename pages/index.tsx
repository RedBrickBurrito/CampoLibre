import axios from "axios"
import Image from "next/image"
import { toast } from "react-hot-toast"
import Navbar from "@ui/Navbar/Navbar"
import { GetResourceFunction, useDataSource } from "hooks/useDataSource"
import { formatCurrencyString } from 'use-shopping-cart'
import { useShoppingCart } from 'use-shopping-cart'

interface Product {
  id: string;
  name: string;
  price: number;      
  image: string;
  imageAlt: string;
  currency: string;
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

export default function Home() {

  const { addItem } = useShoppingCart()

  const fetchProductsData: GetResourceFunction<ProductResource> = async () => {
    try {
      const response = await axios.get("/api/products")
      return response.data as ProductResource
    } catch (error) {
      console.error("Error fetching products:", error)
      return []
    }
  }

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast.success(`Haz añadido ${product.name} al carrito!!`)
  }

  const products = useDataSource(fetchProductsData)

  return (
    <>
      <Navbar />
      <div className="bg-primary-50">
        <h1>Home</h1>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.imageAlt} height={200} width={200} />
            <h2>{product.name}</h2>
            <p>{formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  )
}
