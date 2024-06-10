import { ApiResponse } from "@/types/ApiResponse"
import db from "../../../../../prisma/db"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const existingUserByUsername = await db.user.findUnique({
      where: {
        username,
      },
    })

    if (existingUserByUsername) {
      const response: ApiResponse = {
        success: false,
        message: "Username already exists",
      }

      return Response.json(response, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })

    if (!newUser) {
      const response: ApiResponse = {
        success: false,
        message: "Error saving user to database",
      }
      return Response.json(response, { status: 400 })
    }

    const response: ApiResponse = {
      success: true,
      message: "User registered successfully",
    }

    console.log(newUser)

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Error registering user:", error)

    const response: ApiResponse = {
      success: false,
      message: "Error registering user",
    }

    return Response.json(response, { status: 500 })
  }
}
