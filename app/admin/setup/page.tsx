import { createAdminClient } from "@/lib/supabase/admin-client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default async function SetupPage() {
  const supabase = createAdminClient()
  let hasStudentsTable = false
  let hasAdminUsersTable = false
  let adminCount = 0
  let studentCount = 0

  // Check if tables exist and have data
  try {
    const { data: students, error: studentsError } = await supabase.from("students").select("*").limit(1)

    if (!studentsError) {
      hasStudentsTable = true
      const { count: totalStudents } = await supabase.from("students").select("*", { count: "exact", head: true })
      studentCount = totalStudents || 0
    }
  } catch (err) {
    console.log("Students table check error:", err)
  }

  try {
    const { data: admins } = await supabase.from("admin_users").select("*").limit(1)

    if (admins) {
      hasAdminUsersTable = true
      const { count: totalAdmins } = await supabase.from("admin_users").select("*", { count: "exact", head: true })
      adminCount = totalAdmins || 0
    }
  } catch (err) {
    console.log("Admin users table check error:", err)
  }

  const allReady = hasStudentsTable && hasAdminUsersTable && adminCount > 0

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md p-8">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Setup Status</h1>
        <p className="mb-6 text-muted-foreground">Check your database initialization</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-md border border-border p-3">
            <span className="font-medium text-foreground">Students Table</span>
            <span className={`text-sm font-semibold ${hasStudentsTable ? "text-green-600" : "text-red-600"}`}>
              {hasStudentsTable ? `✓ (${studentCount})` : "✗"}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-md border border-border p-3">
            <span className="font-medium text-foreground">Admin Users Table</span>
            <span className={`text-sm font-semibold ${hasAdminUsersTable ? "text-green-600" : "text-red-600"}`}>
              {hasAdminUsersTable ? `✓ (${adminCount})` : "✗"}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-md border border-border p-3">
            <span className="font-medium text-foreground">Sample Data</span>
            <span className={`text-sm font-semibold ${studentCount > 0 ? "text-green-600" : "text-red-600"}`}>
              {studentCount > 0 ? "✓" : "✗"}
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {allReady ? (
            <>
              <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
                Database is ready! You can now create an admin account.
              </p>
              <Link href="/admin/sign-up">
                <Button className="w-full">Create Admin Account</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  View Student Directory
                </Button>
              </Link>
            </>
          ) : (
            <>
              <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700">
                Database tables are not yet initialized. Please:
              </p>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Go to your Supabase dashboard</li>
                <li>2. Open the SQL Editor</li>
                <li>
                  3. Copy the contents of <code className="rounded bg-muted px-1">scripts/001_init_schema.sql</code>
                </li>
                <li>4. Paste and execute the SQL</li>
                <li>5. Refresh this page</li>
              </ol>
              <Link href="/admin/setup">
                <Button className="w-full">Refresh Status</Button>
              </Link>
            </>
          )}
        </div>
      </Card>
    </main>
  )
}
