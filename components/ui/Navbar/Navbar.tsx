import { Dialog, Popover, Tab, Transition } from "@headlessui/react"
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { Fragment, useState } from "react"
import ShoppingCart from "@ui/Sideovers/ShoppingCart"
import { useShoppingCart } from "use-shopping-cart"
import Link from "next/link"

interface Page {
  name: string
  href: string
}

interface Navigation {
  pages: Page[]
}

const navigation: Navigation = {
  pages: [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/products" },
    { name: "Mis Pedidos", href: "#" },
  ],
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const [cartOpen, setCartOpen] = useState(false)

  const { cartCount } = useShoppingCart()

  const handleCartClose = () => {
    setCartOpen(false)
  }

  return (
    <div className="bg-primary-50">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-primary-50 pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Cerrar menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {session ? (
                    <div className="flow-root">
                      <button onClick={() => signOut()} className="-m-2 block p-2 font-medium text-gray-900">
                        Cerrar Sesión
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flow-root">
                        <a href="/login" className="-m-2 block p-2 font-medium text-gray-900">
                          Ingresar a tu cuenta
                        </a>
                      </div>
                      <div className="flow-root">
                        <a href="/register" className="-m-2 block p-2 font-medium text-gray-900">
                          Crea tu usuario
                        </a>
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="/change-currency" className="-m-2 flex items-center p-2">
                    <Image
                      src="./mexico_flag.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                      width={5}
                      height={3}
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">MXN</span>
                    <span className="sr-only">, cambiar moneda</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-primary-50">
        <p className="flex h-10 items-center justify-center bg-primary-600 px-4 text-sm font-medium text-primary-50 sm:px-6 lg:px-8">
          Tus primeros pedidos son gratis hasta $300
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-primary-50 p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <span className="sr-only">Campo Libre</span>
                  <Image className="h-8 w-auto" src="/campo-libre-logo-short.svg" alt="" height={8} width={8} />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {session ? (
                    <button onClick={() => signOut()} className="-m-2 block p-2 text-sm font-medium text-gray-900">
                      Cerrar Sesión
                    </button>
                  ) : (
                    <>
                      <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Ingresa a tu cuenta
                      </Link>
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                      <Link href="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Crea tu usuario
                      </Link>
                    </>
                  )}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="/" className="flex items-center text-gray-700 hover:text-gray-800">
                    <Image
                      src="./mexico_flag.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                      width={5}
                      height={3}
                    />
                    <span className="ml-3 block text-sm font-medium">MXN</span>
                    <span className="sr-only">, cambiar moneda</span>
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="/search" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Buscar</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button className="group -m-2 flex items-center p-2" onClick={() => setCartOpen(true)}>
                    <ShoppingCartIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartCount}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {cartOpen && <ShoppingCart onClose={handleCartClose} />}
    </div>
  )
}
