"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/router"
import FormInput from "@ui/Input/InputForm"

interface RegisterUserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  password: string
}

export default function Register() {
  const [data, setData] = useState<RegisterUserData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    password: "",
  })

  const [errors, setErrors] = useState<Partial<RegisterUserData>>({});
  const router = useRouter();

  const validateForm = (): boolean => {
    const errors: Partial<RegisterUserData> = {};

    if (!data.firstName.trim()) {
      errors.firstName = "El nombre es requerido";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "El apellido es requerido";
    }

    if (!data.email.trim()) {
      errors.email = "El correo electrónico es requerido";
    }

    if (!data.phone.trim()) {
      errors.phone = "El número de teléfono es requerido";
    }

    if (!data.company.trim()) {
      errors.company = "El nombre de la empresa es requerido";
    }

    if (!data.password.trim()) {
      errors.password = "La contraseña es requerida";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        await axios.post("/api/register", data);
        toast.success("El usuario ha sido registrado");
        router.push("/login");
      } catch (error) {
        toast.error("¡Algo salió mal!");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Campo Libre"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crea una cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={registerUser}>
            <FormInput
              label="Nombre"
              id="firstName"
              type="text"
              value={data.firstName}
              error={errors.firstName}
              onChange={handleChange}
            />
            <FormInput
              label="Apellido"
              id="lastName"
              type="text"
              required
              value={data.lastName}
              error={errors.lastName}
              onChange={handleChange}
            />
            <FormInput
              label="Correo electrónico"
              id="email"
              type="email"
              required
              value={data.email}
              error={errors.email}
              onChange={handleChange}
            />
            <FormInput
              label="Número de teléfono"
              id="phone"
              type="text"
              required
              value={data.phone}
              error={errors.phone}
              onChange={handleChange}
            />
            <FormInput
              label="Nombre de la empresa"
              id="company"
              type="text"
              required
              value={data.company}
              error={errors.company}
              onChange={handleChange}
            />
            <FormInput
              label="Contraseña"
              id="password"
              type="password"
              required
              value={data.password}
              error={errors.password}
              onChange={handleChange}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
