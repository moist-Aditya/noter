import { auth } from "@/auth"

const ServerSessionBlock = async () => {
    const session = await auth()

    return (
        <>
            <h2>Server session using auth</h2>
            <p>{session}</p>
        </>
    )
}

export default ServerSessionBlock