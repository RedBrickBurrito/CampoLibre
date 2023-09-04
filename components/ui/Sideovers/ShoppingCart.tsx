import { Dialog, Transition } from "@headlessui/react"
import { MinusSmallIcon, PlusSmallIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Fragment, MouseEventHandler, useState } from "react"
import { fetchPostJSON } from "utils/api-helpers"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

type OnCloseFunction = () => void

interface ShoppingCartProps {
  onClose: OnCloseFunction
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
 * A shopping cart component that displays items in the cart and provides actions for managing them.
 */
export default function ShoppingCart({ onClose }: ShoppingCartProps) {
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const {
    formattedTotalPrice,
    cartCount = 0,
    clearCart,
    cartDetails = {},
    redirectToCheckout,
    decrementItem,
    incrementItem,
    removeItem,
    totalPrice,
  } = useShoppingCart()

  const isButtonDisabled = cartCount === 0

  // Handles decrementing the quantity of a product in the cart
  const handleDecrementQuantity = (productId: string) => {
    decrementItem(productId)
  }

  // Handles incrementing the quantity of a product in the cart
  const handleIncrementQuantity = (productId: string) => {
    incrementItem(productId)
  }

  // Handles removing a product from the cart
  const handleRemoveItem = (productId: string) => {
    removeItem(productId)
  }

  // Calculates the cost of a product based on its price and quantity
  const calculateCost = (product: Product) => {
    const cost = (product.price || 0) * (product.quantity || 0)
    return cost.toFixed(2)
  }

  const handleCheckout: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage("")

    const response: any = await fetchPostJSON("/api/checkout_sessions/cart", cartDetails)

    if (response.statusCode > 399) {
      console.error(response.message)
      setErrorMessage(response.message)
      setLoading(false)
      return
    }

    redirectToCheckout(response.id)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setOpen(false)
          onClose()
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-primary-50 shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-primary-900">Carrito de compras</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-primary-600 hover:text-primary-500"
                            onClick={() => {
                              setOpen(false)
                              onClose()
                            }}
                          >
                            <span className="sr-only">Cerrar Panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {cartCount > 0 ? (
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              {Object.values(cartDetails ?? {}).map((entry) => (
                                <li key={entry.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={entry.image || "/fallback-image.jpg"}
                                      alt={entry.name}
                                      className="h-full w-full object-cover object-center"
                                      width={1000}
                                      height={1000}
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href="product-info">{entry.name}</a>
                                        </h3>
                                        <p className="ml-4">
                                          {formatCurrencyString({ value: entry.price, currency: "MXN" })}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-around text-sm">
                                      <button
                                        onClick={() => handleDecrementQuantity(entry.id)}
                                        type="button"
                                        className="inline-flex items-center rounded-full border border-primary-500 bg-primary-50 p-2.5 text-center text-sm font-medium  text-primary-500 hover:border-transparent hover:bg-primary-500 hover:text-primary-50 focus:ring focus:ring-primary-100 "
                                      >
                                        <MinusSmallIcon className="h-3 w-3" />
                                        <span className="sr-only">Decrement</span>
                                      </button>
                                      <p className="font-small text-gray-500">Cant. {entry.quantity}</p>
                                      <button
                                        onClick={() => handleIncrementQuantity(entry.id)}
                                        type="button"
                                        className="inline-flex items-center rounded-full border border-primary-500 bg-primary-50 p-2.5 text-center text-sm font-medium text-primary-500 hover:border-transparent hover:bg-primary-500 hover:text-primary-50 focus:ring focus:ring-primary-100"
                                      >
                                        <PlusSmallIcon className="h-3 w-3" />
                                        <span className="sr-only">Increment</span>
                                      </button>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-accent-500 hover:text-accent-400"
                                          onClick={() => handleRemoveItem(entry.id)}
                                        >
                                          Remover
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-gray-500">El carrito esta vacio</p>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-primary-900">
                        <p>Subtotal</p>
                        <p>{formatCurrencyString({ value: totalPrice || 0, currency: "MXN" })}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Gastos de envío e impuestos calculados en el momento de la compra.
                      </p>
                      {cartCount > 0 ? (
                        <div className="mt-6">
                          <button
                            className={`flex w-full items-center justify-center rounded-md border border-transparent bg-primary-500 px-6 py-3 text-base font-medium text-primary-50 shadow-sm hover:bg-primary-600 ${
                              loading ? "cursor-not-allowed opacity-50" : "" // Disable button when loading is true
                            }`}
                            onClick={handleCheckout}
                            disabled={loading}
                          >
                            {loading ? "Procesando..." : "Pagar"} {/* Show 'Loading...' when loading is true */}
                          </button>
                        </div>
                      ) : (
                        <div className="mt-6">
                          <button
                            className={`flex w-full items-center justify-center rounded-md border border-transparent bg-primary-500 px-6 py-3 text-base font-medium text-primary-50 shadow-sm hover:bg-primary-600 ${
                              isButtonDisabled ? "cursor-not-allowed opacity-50" : ""
                            }`}
                            disabled={isButtonDisabled}
                          >
                            Pagar
                          </button>
                        </div>
                      )}
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          o&nbsp;
                          <button
                            type="button"
                            className="font-medium text-primary-600 hover:text-primary-500"
                            onClick={() => {
                              setOpen(false)
                              onClose()
                            }}
                          >
                            Continuar Comprando
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
