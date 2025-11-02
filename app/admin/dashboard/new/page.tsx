"use client"

import { useRouter } from "next/navigation"
import { StudentForm } from "@/components/admin/student-form"

export default function NewStudentPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground mb-4">
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-foreground">Add New Student</h1>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <StudentForm onSuccess={() => router.push("/admin/dashboard")} />
      </div>
    </main>
  )
}
