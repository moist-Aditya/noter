"use client"

import {
  FilePlus,
  LayoutDashboard,
  LogOut,
  NotebookText,
  Star,
  Tag,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import SignOutLeftSideBar from "./SignOutLeftSideBar"
import { signOut } from "next-auth/react"
import TransitionLink from "./utils/TransitionLink"

const leftSideBarLinks = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
  { label: "All Notes", href: "/notes", icon: <NotebookText /> },
  { label: "Create Note", href: "/notes/create", icon: <FilePlus /> },
  { label: "Profile", href: "/profile", icon: <User /> },
  // Group notes maybe?
]

const LeftSideBar = () => {
  const pathname = usePathname()

  return (
    <aside className="sticky custom-scrollbar left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto  border-r border-r-slate-800 bg-secondary-dark pb-5 pt-28 max-sm:hidden">
      <div className="flex flex-col justify-between gap-4 h-full p-4">
        <div className="flex flex-col gap-4">
          {leftSideBarLinks.map((sideBarLink, index) => {
            const isActive = pathname === sideBarLink.href
            return (
              <TransitionLink
                href={sideBarLink.href}
                key={index}
                className={`${
                  isActive
                    ? "bg-accent-dark"
                    : "bg-transparent hover:bg-secondary-light"
                } relative p-4 flex gap-4 rounded-lg`}
              >
                <div className="">{sideBarLink.icon}</div>
                <div className="max-md:hidden">{sideBarLink.label}</div>
              </TransitionLink>
            )
          })}
        </div>

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
      </div>
    </aside>
  )
}

export default LeftSideBar
