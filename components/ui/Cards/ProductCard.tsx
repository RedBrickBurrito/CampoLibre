// ProductCard.tsx
import React from "react"
import { formatCurrencyString } from "use-shopping-cart"
import Link from "next/link"

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

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div>
      <div key={product.id} className="group relative">
        <div className="lg:h-15 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
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
            &nbsp;x kg
          </p>
          <h3 className="mt-1 text-sm text-gray-700">
            <Link href="">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
        </div>
      </div>
      <button
        className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-accent-500 px-3 py-2 text-base font-medium text-primary-50 shadow-sm hover:bg-accent-600"
        onClick={() => onAddToCart(product)}
      >
        Añadir al carrito
      </button>
    </div>
  )
}

export default ProductCard
