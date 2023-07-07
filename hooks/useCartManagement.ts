import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCartItems } from "../libs/Store/store"

interface RootState {
  cart: Product[]
}

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

export const useCartManagement = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    const loadCartItemsFromLocalStorage = () => {
      const cartItemsFromStorage = localStorage.getItem("cart")
      if (cartItemsFromStorage !== null && cartItems.length === 0) {
        try {
          const parsedCartItems = JSON.parse(cartItemsFromStorage) as Product[]
          dispatch(setCartItems(parsedCartItems))
          setCartItems(parsedCartItems)
        } catch (error) {
          console.error("Error parsing cart items:", error)
        }
      }
    }

    loadCartItemsFromLocalStorage()
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  return { cartItems }
}
