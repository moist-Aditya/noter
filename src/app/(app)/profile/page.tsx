import React, { Suspense } from "react"
import ProfileDeleteUserForm from "@/components/ProfileDeleteUserForm"
import { auth } from "@/auth"
import { CircleUserRound, Mail } from "lucide-react"

const ProfilePage = async () => {
  const session = await auth()

  const username = session?.user.username
  const email = session?.user.email

  return (
    <div>
      <div className="head-text">
        <h1>Your Profile</h1>
      </div>

      <div className="mt-14">
        <div className="flex gap-8 p-7 rounded-lg border border-slate-800 shadow-sm shadow-accent-light max-w-fit mx-auto items-baseline">
          <div className="text-base flex flex-col gap-7 font-semibold">
            <h3 className="flex gap-2 items-center justify-between">
              Username <CircleUserRound />
            </h3>
            <h3 className="flex gap-2 items-center justify-between">
              Email <Mail />
            </h3>
          </div>
          <div className="text-lg text-accent-light flex flex-col gap-6 font-normal">
            <p>{username}</p>
            <p>{email}</p>
          </div>
        </div>

        <Suspense fallback={<span>Loading..</span>}>
          <ProfileDeleteUserForm />
        </Suspense>
      </div>
    </div>
  )
}

export default ProfilePage
