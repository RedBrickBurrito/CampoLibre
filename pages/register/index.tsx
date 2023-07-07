// Register.tsx - Component for user registration
// This component allows users to create an account by providing their personal information and registering with the system.

"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import FormInput from "@ui/Input/InputForm"
import Image from "next/image"
import * as Yup from "yup"

// Dependencies:
// - react: Used for building the user interface.
// - axios: Used for making HTTP requests to the server.
// - react-hot-toast: Used for displaying toast notifications.
// - formik: Used for managing form state and validation.
// - next/router: Used for programmatic navigation between pages.
// - @ui/Input/InputForm: A custom UI component for rendering form input fields.
// - Yup: A validation library for defining and validating form schemas.

interface RegisterFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  password: string
  confirmPassword: string
}

const validationSchema = Yup.object({
  firstName: Yup.string().max(20, "Debe tener 20 caracteres o menos").required("Requerido"),
  lastName: Yup.string().max(25, "Debe tener 25 caracteres o menos").required("Requerido"),
  email: Yup.string().email("Correo electrónico no válido").required("Requerido"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Deben ser sólo dígitos")
    .min(5, "Debe tener al menos 5 dígitos")
    .max(12, "Debe tener máximo 12 dígitos"),
  company: Yup.string().max(35, "Debe tener 35 caracteres o menos").required("Requerido"),
  password: Yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Mínimo ocho caracteres, al menos una letra y un número")
    .max(45, "Debe tener máximo 45 dígitos")
    .required("Requerido"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Las contraseñas deben coincidir")
    .required("Requerido"),
})

/**
 * Register Component
 * Renders a user registration form and handles form submission.
 */
export default function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // formik.handleSubmit
  // Handles the form submission by sending a registration request to the server.
  // If the submission is successful, a success toast is displayed, and the user is redirected to the login page.
  // If an error occurs, an error toast is displayed.
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      try {
        setLoading(true)
        await axios.post("/api/register", data)
        toast.success("El usuario ha sido registrado")
        router.push("/login")
      } catch (error) {
        toast.error("¡Algo salió mal!")
      } finally {
        setLoading(false)
      }
    },
  })

  // renderErrorMessage
  // Renders an error message for the specified form field if it has been touched and has an error.
  const renderErrorMessage = (field: keyof RegisterFormValues) => {
    if (formik.touched[field] && formik.errors[field]) {
      return <div className="text-sm text-red-600">{formik.errors[field]}</div>
    }

    return null
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-primary-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto"
            src="/Campo_Libre_Logo_Short.png"
            alt="Campo Libre"
            height={50}
            width={80}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crea una cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <FormInput
              label="Nombre"
              id="firstName"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderErrorMessage("firstName")}
            <FormInput
              label="Apellido"
              id="lastName"
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderErrorMessage("lastName")}
            <FormInput
              label="Correo electrónico"
              id="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderErrorMessage("email")}
            <FormInput
              label="Número de teléfono"
              id="phone"
              type="text"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderErrorMessage("phone")}
            <FormInput
              label="Nombre de la empresa"
              id="company"
              type="text"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderErrorMessage("company")}
            <FormInput
              label="Contraseña"
              id="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderErrorMessage("password")}
            <FormInput
              label="Confirmar contraseña"
              id="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {renderErrorMessage("confirmPassword")}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
