"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StudentTable } from "@/components/admin/student-table"
import { Spinner } from "@/components/ui/spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminDashboard() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"name" | "class">("name")
  const router = useRouter()

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/admin/students")
      if (!response.ok) {
        router.push("/admin/login")
        return
      }
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      console.error("Failed to fetch students:", error)
    } finally {
      setLoading(false)
    }
  }

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "name") {
      return a.full_name.localeCompare(b.full_name, "ja")
    } else {
      return a.class_name.localeCompare(b.class_name, "ja")
    }
  })

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="mt-1 text-muted-foreground">Manage student profiles</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => router.push("/")} variant="outline">
                View Directory
              </Button>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Students</h2>
          <Button onClick={() => router.push("/admin/dashboard/new")}>Add New Student</Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as "name" | "class")}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (氏名)</SelectItem>
                  <SelectItem value="class">Class (クラス)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Card className="overflow-hidden">
              <StudentTable students={sortedStudents} onRefresh={fetchStudents} />
            </Card>
          </>
        )}
      </div>
    </main>
  )
}
