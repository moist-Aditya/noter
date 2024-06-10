import { auth } from "@/auth"
import { ApiResponse } from "@/types/ApiResponse"
import db from "../../../../prisma/db"

export async function GET(request: Request) {
  const session = await auth()

  if (!session || !session.user.id) {
    const response: ApiResponse = {
      success: false,
      message: "User not authenticated",
    }
    return Response.json(response, { status: 400 })
  }

  const userId = session.user.id

  try {
    const notes = await db.note.findMany({
      where: {
        authorId: userId,
      },
    })

    const response: ApiResponse = {
      success: true,
      message: "Fetched notes successfully",
      notes,
    }
    return Response.json(response, { status: 200 })
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Error getting notes",
    }
    return Response.json(response, { status: 500 })
  }
}
