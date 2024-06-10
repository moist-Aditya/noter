import { auth } from "@/auth"
import { EllipsisVertical, User } from "lucide-react"
import { SignOut } from "./SignOut"

const UserInfoLeftSideBar = async () => {
  const session = await auth()

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="md:flex gap-2 justify-center items-center border-t border-slate-800 hover:bg-primary-light rounded-xl">
        <div className="p-2">
          <User size={32} />
        </div>
        <div className="flex flex-col justify-center max-md:hidden">
          <h2 className="text-xs">Welcome,</h2>
          <p className="text-lg text-accent-light font-semibold">
            {session?.user.username}
          </p>
        </div>
        <div className="ml-7 max-md:hidden">
          <EllipsisVertical size={18} />
        </div>
      </div>

      <div className="border border-slate-800 hover:bg-primary-dark p-2 flex justify-center m-2 mt-0 rounded-lg max-md:hidden">
        <SignOut />
      </div>
    </div>
  )
}

export default UserInfoLeftSideBar
