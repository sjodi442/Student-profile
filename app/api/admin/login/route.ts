import { setAdminSession } from "@/lib/auth-session"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 })
    }

    const ADMIN_USERNAME = "admin"
    const ADMIN_PASSWORD = "admin"

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create session
    await setAdminSession({
      id: "1",
      username: ADMIN_USERNAME,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json(
      { error: "An error occurred: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 },
    )
  }
}
