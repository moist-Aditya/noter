"use server"

import { auth, signIn, signOut } from "@/auth"
import { getErrorMessage } from "@/lib/utils/utils"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import db from "../../prisma/db"
import { ApiResponse } from "@/types/ApiResponse"
import bcrypt from "bcryptjs"

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
        error: error.cause?.err?.message || "Incorrect username or password",
      }
    }
    return {
      error: getErrorMessage(error),
    }
  }
  redirect("/")
}

export async function SignUpSubmit(data: FormData) {
  const formData = {
    username: data.get("username") as string,
    password: data.get("password") as string,
    email: data.get("email") as string,
  }

  // TODO: add server side zod verification

  try {
    const existingUserByUsername = await db.user.findUnique({
      where: {
        username: formData.username,
      },
    })

    if (existingUserByUsername && existingUserByUsername.isVerified) {
      return {
        error: "Username already exists",
      }
    }

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: formData.email,
      },
    })

    // Create new OTP
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

    // Hash Password
    const hashedPassword = await bcrypt.hash(formData.password, 10)

    // OTP Expiry (1 Hour)
    const expiryDate = new Date()
    expiryDate.setHours(expiryDate.getHours() + 1)

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        // return error
        return {
          error: "Email already exists",
        }
      } else {
        // update details
        await db.user.update({
          where: {
            email: formData.email,
          },
          data: {
            username: formData.username,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            password: hashedPassword,
          },
        })
      }
    } else {
      // create new user
      const newUser = await db.user.create({
        data: {
          username: formData.username,
          password: hashedPassword,
          email: formData.email,
          verifyCode,
          verifyCodeExpiry: expiryDate,
        },
      })
    }

    // TODO: Send verification email to user and redirect to verification page ---------------------
  } catch (error) {
    // return error message
    return {
      error: getErrorMessage(error),
    }
  }

  redirect(`/verify-user/${formData.username}`)
}

export async function verifyUser(data: FormData) {
  const formData = {
    username: data.get("username") as string,
    verifyCode: data.get("verifyCode") as string,
  }

  console.log(formData)

  try {
    const user = await db.user.findUnique({
      where: {
        username: formData.username,
      },
    })

    if (!user) {
      return {
        error: "User not found, please register again.",
      }
    }

    if (user.isVerified) {
      return {
        error: "User is already verified.",
      }
    }

    // TODO: check verify expiry date
    const isVerifyCodeExpired = new Date() > user.verifyCodeExpiry

    if (isVerifyCodeExpired) {
      return {
        error: "Verify code expired. Please register again.",
      }
    }

    const isVerifyCodeCorrect = user.verifyCode === formData.verifyCode

    if (!isVerifyCodeCorrect) {
      return {
        error: "Verification code invalid",
      }
    }

    await db.user.update({
      where: {
        username: formData.username,
      },
      data: {
        isVerified: true,
      },
    })
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }

  redirect("/sign-in")
}

export async function deleteUser(data: FormData) {
  const session = await auth()

  if (!session || !session.user) {
    return {
      error: "User not authenticated",
    }
  }

  const username = session.user.username

  try {
    const result = await db.user.delete({
      where: {
        username,
      },
    })

    if (!result) {
      return {
        error: "Could not delete account",
      }
    }
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
  await signOut()
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
