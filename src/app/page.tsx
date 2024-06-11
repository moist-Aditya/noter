import { auth } from "@/auth"
import { SignOut } from "@/components/SignOut"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const session = await auth()

  return (
    <main className="flex flex-col gap-2 min-h-screen justify-center items-center">
      <h1 className="text-3xl font-bold">Welcome to Noter!</h1>

      <h3 className="mt-7 font-semibold text-xl">Server session:</h3>
      <p className="text-center">{JSON.stringify(session)}</p>

      <div className="flex justify-center gap-14 items-center mt-7">
        <Link
          href={"/sign-in"}
          className="bg-slate-200 text-black p-4 rounded-xl"
        >
          Login
        </Link>

        <SignOut />
      </div>
    </main>
  )
}
