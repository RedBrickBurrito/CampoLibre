// [...nextauth].ts - Default Next Auth route api
// This component allows authentication using credential or providers.

import NextAuth from "next-auth/next"
import { NextAuthOptions } from "next-auth"
import prisma from "../../../libs/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"

// Dependencies:
// - next-auth/next: Responsible for initializing the authentication system.
// - next-auth: Provides access to the type definitions for the options object used to configure NextAuth.js.
// - ../../../libs/prisma: Contains the Prisma client configuration and connection details.
// - @next-auth/prisma-adapter: Enables the use of Prisma as the data storage adapter for NextAuth.js.
// - next-auth/providers/credentials: Provides a built-in authentication provider for username/password credentials.
// - next-auth/providers/google:  Allows authentication with Google OAuth.
// - bcrypt: A library used for hashing and comparing passwords securely.

interface User {
  id: string
  email: string
  name: string
}

// Configure NextAuth.js options
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // Use Prisma adapter for data storage
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<User> {
        // Validate and authenticate user credentials
        if (!credentials?.email || !credentials.password) {
          throw new Error("Introduzca una dirección de correo electrónico y una contraseña")
        }

        // Retrieve user from the database based on email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        // check that user doesn't have a hashedPassword
        if (!user || !user.hashedPassword) {
          throw new Error("No se ha encontrado ningún usuario")
        }

        // Compare hashed password with provided password
        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

        // Throw error if password doesn't match
        if (!passwordMatch) {
          throw new Error("Correo electrónico o contraseña incorrectos")
        }

        return user
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
}

export default NextAuth(authOptions)
