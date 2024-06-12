"use server"

import { auth, signIn } from "@/auth"
import { getErrorMessage } from "@/lib/utils/utils"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import db from "../../prisma/db"
import { ApiResponse } from "@/types/ApiResponse"

export async function SignInSubmit(data: FormData) {
  const form = {
    username: data.get("username"),
    password: data.get("password"),
  }

  try {
    await signIn("credentials", {
      redirect: false,
      ...form,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Incorrect username or password",
      }
    }
    return {
      error: getErrorMessage(error),
    }
  }
  redirect("/")
}

export async function getNote(noteId: string) {
  const session = await auth()

  if (!session || !session.user) {
    const response: ApiResponse = {
      success: false,
      message: "User not authenticated",
    }
    return response
  }

  try {
    const note = await db.note.findUnique({
      where: {
        id: noteId,
      },
    })

    if (note) {
      const response: ApiResponse = {
        success: true,
        message: "Note fetched successfully",
        notes: [note],
      }
      return response
    } else {
      throw new Error("Note not found")
    }
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      message: getErrorMessage(error),
    }
    return response
  }
}

export async function editNoteSubmit(data: FormData, noteId: string) {
  const session = await auth()

  if (!session || !session.user) {
    return {
      error: "User not authenticated",
    }
  }

  const updatedValues = {
    title: data.get("title") as string,
    content: data.get("content") as string,
    isHidden: data.get("isHidden") === "on",
  }

  try {
    const note = await db.note.update({
      where: {
        id: noteId,
      },
      data: updatedValues,
    })

    if (!note) {
      return {
        error: "Could not update Note",
      }
    }
  } catch (error) {
    console.error(error)

    return {
      error: getErrorMessage(error),
    }
  }

  redirect("/notes")
}
