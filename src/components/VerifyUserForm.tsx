"use client"

import { verifyUser } from "@/app/actions"
import { verifyUserSchema } from "@/schemas/verifyUserSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const VerifyUserButton = ({ isValid }: { isValid: boolean }) => {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending || !isValid}
      className="p-2 w-full border border-slate-800 font-semibold text-base rounded-xl bg-primary shadow-sm shadow-accent-light  disabled:shadow-slate-400 disabled:bg-transparent text-white disabled:text-slate-400"
    >
      Submit
    </button>
  )
}

const VerifyUserForm = ({ username }: { username: string }) => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(verifyUserSchema),
    defaultValues: {
      username: "",
      verifyCode: "",
    },
  })

  return (
    <form
      action={async (formData: FormData) => {
        console.log(formData.get("username"))
        const result = await verifyUser(formData)

        if (result?.error) {
          toast.error(result.error)
        } else {
          toast.success("User verification successfull")
        }
      }}
      className="flex flex-col gap-2 mt-7 pb-2"
    >
      <input type="hidden" {...register("username")} value={username} />
      <input
        type="number"
        placeholder="123456"
        {...register("verifyCode")}
        className="rounded-xl bg-transparent border border-slate-900 shadow-sm shadow-slate-800 p-2"
      />

      <div className="flex justify-center mt-7">
        <VerifyUserButton isValid={isValid} />
      </div>
    </form>
  )
}

export default VerifyUserForm
