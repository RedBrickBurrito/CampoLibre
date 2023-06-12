import NextAuth from "next-auth/next"
import { NextAuthOptions } from "next-auth"
import prisma from "../../../libs/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const authOptions: NextAuthOptions  = {
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
        email: {label: "Email", type: "text"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<User | null> {
        if(!credentials) {
          return null;
        }

        const user: User = {
          id: "1",
          email: "eddy@gmail.com",
          firstName: "Eduardo",
          lastName: "Almanza",
        };

        return user;
      },
    }),
  ],
  callbacks: {
    session({ session, token, user}) {
      return session
    }
  },
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
}

export default NextAuth(authOptions);