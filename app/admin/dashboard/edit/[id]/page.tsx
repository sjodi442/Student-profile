"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { StudentForm } from "@/components/admin/student-form"
import { Spinner } from "@/components/ui/spinner"

export default function EditStudentPage() {
  const [student, setStudent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/admin/students/${id}`)
        if (response.ok) {
          const data = await response.json()
          setStudent(data)
        }
      } catch (error) {
        console.error("Failed to fetch student:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudent()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground mb-4">
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-foreground">Edit Student</h1>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {student && <StudentForm initialData={student} onSuccess={() => router.push("/admin/dashboard")} />}
      </div>
    </main>
  )
}
