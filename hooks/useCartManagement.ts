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

/**
 * Custom hook for managing the shopping cart state and persistence.
 * It retrieves the cart items from the Redux store and synchronizes them with the browser's local storage.
 * @returns {Object} An object containing the cart items.
 */
export const useCartManagement = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    /**
     * Loads the cart items from local storage and sets them in the Redux store.
     * It runs only once during the component's initial mount.
     */
    const loadCartItemsFromLocalStorage = () => {
      const cartItemsFromStorage = localStorage.getItem("cart")
      if (cartItemsFromStorage !== null && cartItems.length === 0) {
        try {
          const parsedCartItems = JSON.parse(cartItemsFromStorage) as Product[]
          dispatch(setCartItems(parsedCartItems))
        } catch (error) {
          console.error("Error parsing cart items:", error)
        }
      }
    }

    loadCartItemsFromLocalStorage()
  }, [dispatch])

  useEffect(() => {
    // Updates the local storage with the current cart items whenever they change.
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  return { cartItems }
}
