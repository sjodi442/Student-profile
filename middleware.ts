import { type NextRequest, NextResponse } from "next/server"
import { getAdminSession } from "@/lib/auth-session"

export async function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login and sign up pages
    if (request.nextUrl.pathname === "/admin/login" || request.nextUrl.pathname === "/admin/sign-up") {
      return NextResponse.next()
    }

    // Check for admin session
    const session = await getAdminSession()
    if (!session) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
