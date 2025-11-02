import { createAdminClient } from "@/lib/supabase/admin-client"
import { getAdminSession } from "@/lib/auth-session"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase.from("students").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("students").insert(body).select().single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error("Create error:", error)
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 })
  }
}
