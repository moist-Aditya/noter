import { auth } from "@/auth"
import { ApiResponse } from "@/types/ApiResponse"
import db from "../../../../prisma/db"

export async function POST(request: Request) {
  const data = await request.json()
  const { title, content, isHidden } = data

  const session = await auth()
  console.log(session)

  if (!session || !session.user.id) {
    const response: ApiResponse = {
      success: false,
      message: "User not authenticated",
    }
    return Response.json(response, { status: 400 })
  }
  const userId = session.user.id

  try {
    const newNote = await db.note.create({
      data: {
        title,
        content,
        isHidden,
        author: {
          connect: { id: userId },
        },
      },
    })

    const response: ApiResponse = {
      success: true,
      message: "Note created successfully",
      notes: [newNote],
    }
    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Error creating note:", error)
    const response: ApiResponse = {
      success: false,
      message: "Error creating note",
    }
    return Response.json(response, { status: 500 })
  }
}
