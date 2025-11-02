import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { StudentCard } from "@/components/student-card"
import { SearchBar } from "@/components/search-bar"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const supabase = await createClient()

  let students = []
  if (q) {
    const { data } = await supabase.from("students").select("*").or(`full_name.ilike.%${q}%,class_name.ilike.%${q}%`)
    students = data || []
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            ← Back to Directory
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Search Results</h1>
          {q && (
            <p className="mt-2 text-muted-foreground">
              Results for "{q}" ({students.length} found)
            </p>
          )}
        </div>
      </header>

      <div className="border-b border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <SearchBar />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {students.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card/50 px-6 py-12 text-center">
            <p className="text-muted-foreground">
              {q ? "No students found matching your search." : "Enter a search term to find students."}
            </p>
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
