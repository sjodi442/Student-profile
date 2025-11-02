import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { StudentCard } from "@/components/student-card"
import { SearchBar } from "@/components/search-bar"

export default async function HomePage() {
  const supabase = await createClient()

  const { data: students, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false })

  // Check if error is due to missing table
  const isMissingTable = error?.message?.includes("Could not find the table") || error?.code === "PGRST205"

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Student Directory</h1>
              <p className="mt-2 text-muted-foreground">Browse student profiles and learn more about our community</p>
            </div>
            <Link
              href="/admin/login"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="border-b border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <SearchBar />
        </div>
      </div>

      {/* Students Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {isMissingTable ? (
          <div className="rounded-lg border border-dashed border-border bg-card/50 px-6 py-12 text-center">
            <p className="font-semibold text-foreground">Database setup required</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Please run the SQL migration script to initialize the database tables.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Execute the SQL from <code className="rounded bg-muted px-2 py-1">scripts/001_init_schema.sql</code> in
              your Supabase SQL editor.
            </p>
          </div>
        ) : !students || students.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card/50 px-6 py-12 text-center">
            <p className="text-muted-foreground">No student profiles available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <Link key={student.id} href={`/student/${student.id}`} className="transition-transform hover:scale-105">
                <StudentCard student={student} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
