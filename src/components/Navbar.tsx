import Link from "next/link"
import { SignOut } from "./SignOut"

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-secondary-dark border-b border-b-slate-800 px-6 py-3">
      <div className="flex gap-2 items-center">
        {/* TODO: Add Logo here */}
        <h1 className="font-bold text-2xl">
          <span className="text-accent">Note</span>r
        </h1>
      </div>

      <div className="text-base">
        <ul className="flex gap-4 items-center">
          <Link href={"/"}>
            <li>Home</li>
          </Link>
          <Link href={"/about"}>
            <li>About</li>
          </Link>
          <Link href={"/contact-us"}>
            <li>Contact</li>
          </Link>

          {/* Only visible on small devices */}
          <li className="sm:hidden">
            <SignOut buttonStyles="p-2 bg-primary-light rounded-xl hover:bg-slate-200 hover:text-black transition-all" />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
