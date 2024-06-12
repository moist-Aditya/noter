import SignInForm from "@/components/SignInForm"
import Link from "next/link"
import React from "react"

const SignIn = () => {
  return (
    <>
      <div className="flex min-h-screen justify-center items-center max-md:px-2">
        <div className="flex w-full max-w-lg flex-col py-7 pb-14 relative px-2 md:px-4 gap-2 shadow-md shadow-slate-800 border border-slate-700 rounded-xl">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold ">Login</h1>
            <h3>Welcome back! Login now to view your notes.</h3>
          </div>

          {/* Form */}
          <div>
            <SignInForm />
            <p className="text-right font-light text-sm">
              Don't have an account?{" "}
              <Link
                className="text-accent-light font-semibold"
                href={"/sign-up"}
              >
                Register
              </Link>{" "}
              now
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
