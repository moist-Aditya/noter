import SignUpFrom from "@/components/SignUpFrom"
import Link from "next/link"

const signUp = () => {
  return (
    <>
      <div className="flex min-h-screen justify-center items-center max-md:px-2">
        <div className="flex w-full max-w-lg flex-col py-7 px-2 md:px-4 gap-2 shadow-sm shadow-accent border border-slate-800 rounded-xl">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold ">Register</h1>
            <h3>Fill in your details to start noting!</h3>
          </div>

          <div>
            <SignUpFrom />
            <p className="text-right font-light text-sm">
              Already have an account?{" "}
              <Link
                className="text-accent-light font-semibold"
                href={"/sign-in"}
              >
                Login
              </Link>{" "}
              now
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default signUp
