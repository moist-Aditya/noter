import VerifyUserForm from "@/components/VerifyUserForm"

const VerifyUser = ({ params }: { params: { username: string } }) => {
  return (
    <>
      <div className="flex min-h-screen justify-center items-center max-md:px-2">
        <div className="flex w-full max-w-lg flex-col py-7 px-2 md:px-4 gap-2 shadow-sm shadow-accent border border-slate-800 rounded-xl">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold ">Email Verification</h1>
            <h3>
              Enter the Verification Code sent to your email to verify your
              account.
            </h3>
          </div>

          <VerifyUserForm username={params.username} />
        </div>
      </div>
    </>
  )
}

export default VerifyUser
