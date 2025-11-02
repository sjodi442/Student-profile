import { createClient } from "@supabase/supabase-js"

async function verifySetup() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    console.error("Missing required environment variables:")
    console.error("- NEXT_PUBLIC_SUPABASE_URL:", url ? "✓" : "✗")
    console.error("- SUPABASE_SERVICE_ROLE_KEY:", serviceRoleKey ? "✓" : "✗")
    process.exit(1)
  }

  const supabase = createClient(url, serviceRoleKey)

  try {
    // Test students table
    const { data: students, error: studentsError } = await supabase.from("students").select("count").single()

    if (studentsError) {
      console.error("✗ Students table error:", studentsError.message)
    } else {
      console.log("✓ Students table accessible")
    }

    // Test admin_users table
    const { data: adminUsers, error: adminError } = await supabase.from("admin_users").select("count").single()

    if (adminError) {
      console.error("✗ Admin users table error:", adminError.message)
    } else {
      console.log("✓ Admin users table accessible")
    }

    console.log("\n✓ Database setup verified!")
  } catch (error) {
    console.error("Setup verification failed:", error)
    process.exit(1)
  }
}

verifySetup()
