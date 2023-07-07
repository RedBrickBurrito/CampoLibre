import bcrypt from "bcrypt" // Import bcrypt for password hashing
import { NextApiRequest, NextApiResponse } from "next" // Import Next.js types for API handling
import prisma from "libs/prisma" // Import Prisma for data storage

interface RegisterRequestBody {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  password: string
}

/**
 * Handles the registration process for a new user.
 */
export default async function POST(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    const body = (await request.body) as RegisterRequestBody
    const requiredFields = ["firstName", "lastName", "email", "phone", "company", "password"]

    const missingFields = requiredFields.filter((field) => !(field in body))

    if (missingFields.length > 0) {
      return response.status(400).json({ error: `Missing fields: ${missingFields.join(", ")}` })
    }

    const { firstName, lastName, email, phone, company, password } = body

    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (existingUser) {
        throw response.status(400).json({ error: "Email already exists" })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await prisma.user.create({
        data: {
          email,
          hashedPassword,
          name: firstName + " " + lastName,
          phone,
          company,
        },
      })

      return response.status(201).json(newUser)
    } catch (error) {
      console.error("Error registering user:", error)
      return response.status(500).json({ error: "Internal server error" })
    }
  }

  return response.status(405).json({ error: "Method not allowed" })
}
