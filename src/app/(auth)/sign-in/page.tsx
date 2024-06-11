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

          {/* <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-base font-light">
                  Username
                </label>
                <input
                  className="rounded-xl bg-transparent border border-slate-900 shadow-sm shadow-inherit p-2"
                  type="text"
                  placeholder="Putin001"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500 font-semibold">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-base font-light">
                  Password
                </label>
                <input
                  className="rounded-xl bg-transparent border border-slate-900 shadow-sm shadow-inherit p-2"
                  type="password"
                  placeholder="••••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 font-semibold">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center mt-7">
                <button
                  type="submit"
                  className="p-4 px-6 font-semibold text-base rounded-xl bg-white text-black"
                >
                  Register
                </button>
              </div>
            </form> */}
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
