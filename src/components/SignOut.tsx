import { signOut } from "@/auth"

export function SignOut({ buttonStyles }: { buttonStyles?: string }) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button className={`${buttonStyles}`} type="submit">
        Sign Out
      </button>
    </form>
  )
}
