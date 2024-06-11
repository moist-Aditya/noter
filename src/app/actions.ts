"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

// export async function SignInSubmit(data: FormData) {
//   const form = {
//     username: data.get("username"),
//     password: data.get("passoword"),
//   }

//   try {
//     const result = await signIn("credentials", {
//       redirect: false,
//       username: form.username,
//       password: form.password,
//     })
//     if (result?.error) {
//       const response: ApiResponse = {
//         success: false,
//         message: result.error,
//       }
//       console.log(response)

//       return response
//     }
//     if (result?.url) {
//       const response: ApiResponse = {
//         success: true,
//         message: "Login successfull",
//       }
//       console.log(response)
//       return response
//     }
//   } catch (error) {
//     const response: ApiResponse = {
//       success: false,
//       message: "An unknown error occured",
//     }
//     console.log(response)
//     return response
//   }
// }

export async function SignInSubmit(
  currentState: { message: string },
  data: FormData
) {
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
    //   console.error("Error in server action: ", error)
    return {
      message: "Invalid Username or Password",
    }
  }
  redirect("/")
}
