import { auth } from "@/auth"
import db from "../../../../prisma/db"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

async function CountNotes({ userId }: { userId: string }) {
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  const notes = await db.note.findMany({
    where: {
      authorId: userId,
    },
  })

  const num_notes = notes.length
  const num_hidden = notes.filter((note) => note.isHidden).length

  return (
    <div>
      <p className="text-center text-xs mb-7 text-slate-200">Your Data</p>

      <div className="flex flex-col gap-7 px-[25%]">
        <h2 className="border border-slate-800 rounded-lg p-6 flex items-center justify-between text-lg font-semibold">
          Notes{" "}
          <span className="text-accent-light font-black text-5xl">
            {num_notes}
          </span>
        </h2>
        <h2 className="border border-slate-800 rounded-lg p-6 flex items-center justify-between text-lg font-semibold">
          Hidden Notes{" "}
          <span className="text-accent-light font-black text-5xl">
            {num_hidden}
          </span>
        </h2>
      </div>
    </div>
  )
}

const Dashboard = async () => {
  const session = await auth()
  const username = session?.user.username

  // const notes = await getNotes(session?.user.id)

  return (
    <section>
      <div className="head-text">
        <h1>Dashboard</h1>
        <p>
          Welcome,{" "}
          <span className="text-accent-light font-bold animate-pulse text-2xl">
            {username}
          </span>
          .
        </p>
      </div>

      <div className="mt-14">
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          }
        >
          <CountNotes userId={session?.user.id} />
        </Suspense>
      </div>
    </section>
  )
}

export default Dashboard
