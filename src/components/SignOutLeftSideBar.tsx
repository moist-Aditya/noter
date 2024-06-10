"use server"

import { signOut } from "@/auth"
import { LogOut } from "lucide-react"
import React from "react"

const SignOutLeftSideBar = () => {
  return (
    <form
      action={async (formData) => {
        await signOut()
      }}
    >
      <button
        type="submit"
        className="flex gap-4 p-4 rounded-lg hover:bg-secondary-light w-full"
      >
        <LogOut />
        <span className="max-md:hidden">Sign out</span>
      </button>
    </form>
  )
}

export default SignOutLeftSideBar
