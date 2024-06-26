import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import db from "../prisma/db"
import { signInSchema } from "./schemas/signinSchema"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
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

        const user = await db.user.findUnique({
          where: {
            username,
          },
        })

        if (!user) {
          throw new Error("No user found with username")
        }

        if (!user.isVerified) {
          throw new Error(
            "User not verified. Please complete registration first."
          )
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (isPasswordCorrect) {
          return user
        } else {
          throw new Error("Incorrect password")
        }

        // try {
        //   const user = await db.user.findUnique({
        //     where: {
        //       username,
        //     },
        //   })

        //   if (!user) {
        //     throw new Error("No user found with username")
        //   }

        //   if (!user.isVerified) {
        //     throw new Error(
        //       "User not verified. Please complete registration first."
        //     )
        //   }

        //   const isPasswordCorrect = await bcrypt.compare(
        //     password,
        //     user.password
        //   )

        //   if (isPasswordCorrect) {
        //     return user
        //   } else {
        //     throw new Error("Incorrect password")
        //   }
        // } catch (error: any) {
        //   throw new Error(error)
        // }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id
        session.user.username = token.username
        session.user.email = token.email
      }
      return session
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.email = user.email
      }
      return token
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
})
