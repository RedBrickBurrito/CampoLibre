import axios from "axios"
import { toast } from "react-hot-toast"
import { GetResourceFunction, useDataSource } from "hooks/useDataSource"
import { formatCurrencyString } from "use-shopping-cart"
import { useShoppingCart } from "use-shopping-cart"

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

export default function ProductList() {
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
<div className="bg-primary-50">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Todos</h2>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:gap-x-4 gap-y-6 gap-x-8">
          {products.map((product) => (
            <div>
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-15">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">
                  {formatCurrencyString({
                    value: product.price,
                    currency: product.currency,
                  })}
                </p>
                <h3 className="text-sm text-gray-700 mt-1">
                  <a href="">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
              </div>
            </div>
            <div className="mt-2">
                <button
                  className={
                    "flex w-full items-center justify-center rounded-md border border-transparent bg-primary-500 px-3 py-2 text-base font-medium text-primary-50 shadow-sm hover:bg-primary-600"
                  }
                  onClick={() => handleAddToCart(product)}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
