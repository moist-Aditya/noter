"use client"

import { signUpSchema } from "@/schemas/signupSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const signUp = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
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
        <div className="flex w-full max-w-lg flex-col py-7 px-2 md:px-4 gap-2 shadow-sm shadow-accent border border-slate-800 rounded-xl">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold ">Register</h1>
            <h3>Fill in your details to start noting!</h3>
          </div>

          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2 mt-7 pb-2"
            >
              <div className="flex flex-col gap-1 pb-7 relative">
                <label htmlFor="username" className="text-base font-light">
                  Username
                </label>
                <input
                  className="rounded-xl bg-transparent border border-slate-900 shadow-sm shadow-slate-800 p-2"
                  type="text"
                  placeholder="Putin001"
                  {...register("username")}
                />
                <span className="absolute bottom-0 text-sm text-red-600">
                  {errors.username?.message}
                </span>
              </div>
              <div className="flex flex-col gap-1 pb-7 relative">
                <label htmlFor="password" className="text-base font-light">
                  Password
                </label>
                <input
                  className="rounded-xl bg-transparent border border-slate-900 shadow-sm shadow-slate-800 p-2"
                  type="password"
                  placeholder="••••••••••"
                  {...register("password")}
                />
                <span className="absolute bottom-0 text-sm text-red-600">
                  {errors.password?.message}
                </span>
              </div>
              <div className="flex justify-center mt-7">
                <button
                  disabled={!isValid}
                  type="submit"
                  className="p-2 w-full border border-slate-800 font-semibold text-base rounded-xl bg-primary shadow-sm shadow-accent-light  disabled:shadow-slate-400 disabled:bg-transparent text-white disabled:text-slate-400"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="text-right font-light text-sm">
              Already have an account?{" "}
              <Link
                className="text-accent-light font-semibold"
                href={"/sign-in"}
              >
                Login
              </Link>{" "}
              now
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default signUp
