import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import db from "../prisma/db"
import { signInSchema } from "./schemas/signinSchema"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Putin001" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error("No credentials provided")
        }

        const { username, password } = await signInSchema.parseAsync(
          credentials
        )

        try {
          const user = await db.user.findUnique({
            where: {
              username,
            },
          })

          console.log("Found user from DB:", user)

          if (!user) {
            throw new Error("No user found with username")
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          )

          if (isPasswordCorrect) {
            return user
          } else {
            throw new Error("Incorrect password")
          }
        } catch (error: any) {
          throw new Error(error)
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id
        session.user.username = token.username
      }
      return session
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.username = user.username
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
})
