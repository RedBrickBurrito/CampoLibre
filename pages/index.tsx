import axios from "axios"
import Image from "next/image"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import Navbar from "@ui/Navbar/Navbar"
import { useCartManagement } from "hooks/useCartManagement"
import { GetResourceFunction, useDataSource } from "hooks/useDataSource"
import { addToCart, incrementQuantity } from "../libs/Store/store"

interface Product {
  id: string
  name: string
  imageSrc: string
  imageAlt: string
  categoryId: string
  price: number
  description?: string
  expirationDate?: Date
  quantity?: number
}

type ProductResource = Product[]

export default function Home() {
  const dispatch = useDispatch()
  const { cartItems } = useCartManagement()

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
    const existingProduct = cartItems.find((item) => item.id === product.id)
    if (existingProduct) {
      dispatch(incrementQuantity(product.id))
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }))
    }

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
            <Image src={product.imageSrc} alt={product.imageAlt} height={200} width={200} />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  )
}
