"use client"

import { SignInSubmit } from "@/app/actions"
import { signInSchema } from "@/schemas/signinSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormState, useFormStatus } from "react-dom"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const SignInButton = ({ isValid }: { isValid: boolean }) => {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={!isValid || pending}
      type="submit"
      className="p-2 w-full border border-slate-800 font-semibold text-base rounded-xl bg-primary shadow-sm shadow-accent-light disabled:shadow-slate-400 disabled:bg-transparent text-white disabled:text-slate-400"
    >
      Login
    </button>
  )
}

const SignInForm = () => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
  })

  // const initialState = {
  //   message: "",
  // }

  // const [state, formAction] = useFormState(SignInSubmit, initialState)

  return (
    <form
      action={async (formData: FormData) => {
        const result = await SignInSubmit(formData)

        if (result?.error) {
          toast.error(result.error)
        } else {
          toast.success("Login successfull")
        }
      }}
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
        <SignInButton isValid={isValid} />
      </div>

      {/* {state?.message && (
        <span className="absolute w-full text-center bottom-0 text-sm text-red-600">
          {state.message}
        </span>
      )} */}
    </form>
  )
}

export default SignInForm
