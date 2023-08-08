import axios from "axios"
import { toast } from "react-hot-toast"
import { GetResourceFunction, useDataSource } from "hooks/useDataSource"
import { formatCurrencyString } from "use-shopping-cart"
import { useShoppingCart } from "use-shopping-cart"
import { useState } from "react"
import ProductCard from "../Cards/ProductCard"

interface Product {
  id: string
  name: string
  price: number
  image: string
  imageAlt: string
  currency: string
  product_type: string
  is_favorite: boolean
}

type ProductResource = Product[]

export default function ProductList() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
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

  const handleTypeFilter = (type: string) => {
    setSelectedType(type)
  }

  // Filter products based on selectedType
  const filteredProducts = selectedType ? products.filter((product) => product.product_type === selectedType) : products

  const productTypeLabel = selectedType === "fruit" ? "Frutas" : selectedType === "vegetable" ? "Vegetales" : "Todos"

  return (
    <div className="bg-primary-50">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-4">
        <h2 className="text-2xl font-bold tracking-tight text-primary-950">{productTypeLabel}</h2>
        <div className="mt-4">
          <button
            className={`mr-2 ${
              selectedType === "" ? "bg-secondary" : "bg-gray-100"
            } rounded-md px-2 py-1 text-primary-950`}
            onClick={() => handleTypeFilter("")}
          >
            Todos
          </button>
          <button
            className={`mr-2 ${
              selectedType === "fruit" ? "bg-secondary" : "bg-gray-100"
            } rounded-md px-2 py-1 text-primary-950`}
            onClick={() => handleTypeFilter("fruit")}
          >
            Frutas
          </button>
          <button
            className={`mr-2 ${
              selectedType === "vegetable" ? "bg-secondary" : "bg-gray-100"
            } rounded-md px-2 py-1 text-primary-950`}
            onClick={() => handleTypeFilter("vegetable")}
          >
            Verduras
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 xl:gap-x-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  )
}
