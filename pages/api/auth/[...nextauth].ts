import NextAuth from "next-auth/next"
import { NextAuthOptions } from "next-auth"
import prisma from "../../../libs/prisma"
import { toast } from "react-hot-toast"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import bcrypt from "bcrypt"

interface User {
  id: string
  email: string
  name: string
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID ?? "",
      clientSecret: process.env.APPLE_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<User> {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Introduzca una dirección de correo electrónico y una contraseña")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        // check that user doesn't have a hashedPassword
        if (!user || !user.hashedPassword) {
          throw new Error("No se ha encontrado ningún usuario")
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

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
