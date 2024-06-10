import { auth } from "@/auth"
import { ApiResponse } from "@/types/ApiResponse"
import db from "../../../../../prisma/db"

export async function DELETE(
  request: Request,
  { params }: { params: { noteId: string } }
) {
  const session = await auth()

  if (!session || !session.user.id) {
    const response: ApiResponse = {
      success: false,
      message: "User not authenticated",
    }
    return Response.json(response, { status: 400 })
  }

  const noteId = params.noteId

  try {
    const deletedNote = await db.note.delete({
      where: {
        id: noteId,
      },
    })

    if (!deletedNote) {
      const response: ApiResponse = {
        success: false,
        message: "Could not delete note",
      }
      return Response.json(response, { status: 404 })
    }

    const response: ApiResponse = {
      success: true,
      message: "Note deleted successfully",
      notes: [deletedNote],
    }
    return Response.json(response, { status: 200 })
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Error deleting note",
    }
    return Response.json(response, { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: { params: { noteId: string } }
) {
  const session = await auth()

  if (!session || !session.user.id) {
    const response: ApiResponse = {
      success: false,
      message: "User not authenticated",
    }
    return Response.json(response, { status: 400 })
  }

  const noteId = params.noteId

  try {
    const fetchedNote = await db.note.findUnique({
      where: {
        id: noteId,
      },
    })

    if (!fetchedNote) {
      const response: ApiResponse = {
        success: false,
        message: "Could not fetch note",
      }
      return Response.json(response, { status: 404 })
    }

    const response: ApiResponse = {
      success: true,
      message: "Note fetched successfully",
      notes: [fetchedNote],
    }
    return Response.json(response, { status: 200 })
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: "Error fetching note",
    }
    return Response.json(response, { status: 500 })
  }
}
