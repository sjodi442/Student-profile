// Simple session management for admin authentication
import { cookies } from "next/headers"

const ADMIN_SESSION_KEY = "admin_session"

export interface AdminSession {
  id: string
  username: string
  expiresAt: number
}

export async function setAdminSession(session: AdminSession) {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_SESSION_KEY, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 24 hours
  })
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_KEY)?.value

  if (!session) return null

  try {
    const parsed = JSON.parse(session) as AdminSession
    if (parsed.expiresAt < Date.now()) {
      await clearAdminSession()
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_KEY)
}
