import { auth } from "@/auth"

export default auth((req) => {
  if (
    !req.auth &&
    req.nextUrl.pathname !== "/sign-in" &&
    req.nextUrl.pathname !== "/sign-up" &&
    req.nextUrl.pathname !== "/"
  ) {
    const newUrl = new URL("/", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if (
    (req.auth && req.nextUrl.pathname === "/sign-in") ||
    req.nextUrl.pathname === "/sign-up" ||
    req.nextUrl.pathname === "/"
  ) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
