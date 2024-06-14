"use client"

import { deleteUser } from "@/app/actions"
import { auth } from "@/auth"
import { toast } from "sonner"

const ProfileDeleteUserForm = async () => {
  //   const session = await auth()
  //   const username = session?.user.username
  //   const email = session?.user.email

  return (
    <>
      <form
        action={async (formData: FormData) => {
          const result = await deleteUser(formData)

          if (result?.error) {
            toast.error(result.error)
          } else {
            toast.success("Account deleted")
          }
        }}
        className="grid grid-cols-3 gap-4 items-center mt-7"
      >
        <div className="col-span-full mx-auto mt-14">
          <button
            type="submit"
            className="btn-custom bg-red-600 hover:bg-red-800 text-white text-lg"
          >
            Delete Account
          </button>
        </div>
      </form>
    </>
  )
}

export default ProfileDeleteUserForm
