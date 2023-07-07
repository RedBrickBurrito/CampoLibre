import { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon, MinusSmallIcon, PlusSmallIcon} from "@heroicons/react/24/outline"
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity, setCartItems} from '../../../libs/Store/store';
import Image from "next/image"


type OnCloseFunction = () => void

interface ShoppingCartProps {
  onClose: OnCloseFunction;
}

interface Product {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  categoryId: string;
  price: number;
  description?: string;
  expirationDate?: Date;
  quantity?: number;
}

interface RootState {
  cart: Product[]
}

export default function ShoppingCart({ onClose}: ShoppingCartProps) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);
  const isButtonDisabled = cartItems.length === 0;

  useEffect(() => {
    const cartItemsFromStorage = localStorage.getItem("cart");
    console.log("Cart items from storage:", cartItemsFromStorage);
    if (cartItemsFromStorage !== undefined) {
      try {
        const parsedCartItems = JSON.parse(cartItemsFromStorage || '[]');
        console.log("Parsed cart items:", parsedCartItems);
        if (Array.isArray(parsedCartItems)) {
          dispatch(setCartItems(parsedCartItems as Product[]));
        }
      } catch (error) {
        console.error("Error parsing cart items:", error);
      }
    }
  }, [dispatch]);

  const handleDecrementQuantity = (productId: string) => {
    dispatch(decrementQuantity(productId));
  };

  const handleIncrementQuantity = (productId: string) => {
    dispatch(incrementQuantity(productId));
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };


  const calculateCost = (product: Product) => {
    const cost = (product.price || 0) * (product.quantity || 0);
    return cost.toFixed(2);
  };

  const calculateSubtotal = (): number => {
    let subtotal = 0;
    for (const product of cartItems) {
      const cost = parseFloat(calculateCost(product));
      subtotal += cost;
    }
    return parseFloat(subtotal.toFixed(2));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);


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
                      {cartItems.length > 0 ? (
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{product.name}</a>
                                      </h3>
                                      <p className="ml-4">${calculateCost(product)}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-around text-sm">
                                  <button onClick={() => handleDecrementQuantity(product.id)} type="button" className="text-primary-500 hover:text-primary-50 bg-primary-50 hover:bg-primary-500 font-medium border border-primary-500 hover:border-transparent focus:ring focus:ring-primary-100  rounded-full text-sm p-2.5 text-center inline-flex items-center ">
                                    <MinusSmallIcon className="w-3 h-3" />
                                    <span className="sr-only">Decrement</span>
                                  </button>
                                  <p className="text-gray-500 font-small">Cant. {product.quantity}</p>
                                  <button onClick={() => handleIncrementQuantity(product.id)} type="button" className="text-primary-500 hover:text-primary-50 bg-primary-50 hover:bg-primary-500 font-medium border border-primary-500 hover:border-transparent focus:ring focus:ring-primary-100 rounded-full text-sm p-2.5 text-center inline-flex items-center">
                                    <PlusSmallIcon className="w-3 h-3" />
                                    <span className="sr-only">Increment</span>
                                  </button>
                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-red-600 hover:text-red-400"
                                        onClick={() => handleRemoveItem(product.id)}
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
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${calculateSubtotal()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Gastos de envío e impuestos calculados en el momento de la compra.
                      </p>
                      {cartItems.length > 0 ? (
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-6 py-3 text-base font-medium text-primary-50 shadow-sm hover:bg-primary-800"
                        >
                          Pagar
                        </a>
                      </div>
                      ) : (
                        <div className="mt-6">
                          <button
                            className={`flex items-center w-full justify-center rounded-md border border-transparent bg-primary-500 px-6 py-3 text-base font-medium text-primary-50 shadow-sm hover:bg-primary-800 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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
