// Login.tsx - Component for user login
// This component allows users to log in to the system using their email and password or a provider.

"use client"

import Image from "next/image"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"
import { ChangeEvent, useState } from "react"
import { toast } from "react-hot-toast"
import FormInput from "@ui/Input/InputForm"

// Dependencies:
// - react: Used for building the user interface.
// - react-hot-toast: Used for displaying toast notifications.
// - next/router: Used for programmatic navigation between pages.
// - next-auth/react: This function is used for initiating the sign-in process and is provided by the NextAuth.js library.
// - @ui/Input/InputForm: A custom UI component for rendering form input fields.

interface SignInUserData {
  email: string
  password: string
}

/**
 * Login Component
 * Renders a login form and handles user authentication.
 */
export default function Login() {
  const [data, setData] = useState<SignInUserData>({
    email: "",
    password: "",
  })
  const router = useRouter()

  /**
   * loginUser
   * Handles form submission and authenticates the user.
   */
  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault()

    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error)
      }

      if (callback?.ok && !callback.error) {
        toast.success("Inicio de sesión exitoso")
        router.push("/")
      }
    })
  }

  /**
   * handleChange
   * Handles input change and updates the form data.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center bg-primary-50 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image className="mx-auto" src="/Campo_Libre_Logo_Short.png" alt="Campo Libre" height={50} width={80} />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Ingresa a tu cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={loginUser}>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => signIn("google")}
                className="borinder-slate-200 flex items-center gap-5 rounded-lg border px-4 py-2 text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow"
              >
                <Image
                  className="h-8 w-8"
                  width={8}
                  height={8}
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                Iniciar sesión con Google
              </button>
              <div className="relative flex items-center py-5">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-4 flex-shrink text-gray-400">o</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
            </div>
            <FormInput
              label="Correo electrónico"
              id="email"
              type="email"
              required
              value={data.email}
              onChange={handleChange}
            />
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
                <div className="text-sm">
                  <a href="/" className="font-semibold text-primary-600 hover:text-primary-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Iniciar Sesión
              </button>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              ¿Aún no estás registrado?{" "}
              <a
                href="http://localhost:3000/register"
                className="font-semibold leading-6 text-primary-600 hover:text-primary-500"
              >
                Regístrate
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
