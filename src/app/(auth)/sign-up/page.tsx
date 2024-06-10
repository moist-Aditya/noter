"use client"

import { signUpSchema } from "@/schemas/signupSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const signUp = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const result = await axios.post<ApiResponse>("/api/auth/sign-up", data)
      if (!result.data.success) {
        toast.message("Error registering user", {
          description: result.data.message,
        })
      } else {
        toast.success("User registered successfully")
        router.replace("/api/auth/signin")
      }
    } catch (error: any) {
      const axiosError = error as AxiosError<ApiResponse>
      console.error("Error registering user", error)
      toast.message("Error registering user", {
        description: axiosError.response?.data.message || error.message,
      })
    }
  }

  return (
    <>
      <div className="flex min-h-screen justify-center items-center max-md:px-2">
        <div className="flex w-full max-w-lg flex-col py-7 px-2 md:px-4 gap-2 shadow-md shadow-slate-800 border border-slate-700 rounded-xl">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold ">Register</h1>
            <h3>Fill in your details to start noting!</h3>
          </div>

          <div className="flex flex-col gap-4 mt-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-base font-light">
                  Username
                </label>
                <input
                  className="rounded-xl bg-transparent border border-slate-900 shadow-sm shadow-inherit p-2"
                  type="text"
                  placeholder="Putin001"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500 font-semibold">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-base font-light">
                  Password
                </label>
                <input
                  className="rounded-xl bg-transparent border border-slate-900 shadow-sm shadow-inherit p-2"
                  type="password"
                  placeholder="••••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 font-semibold">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center mt-7">
                <button
                  type="submit"
                  className="p-4 px-6 font-semibold text-base rounded-xl bg-white text-black"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default signUp
