import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { calculateAge } from "@/lib/utils"
import { notFound } from "next/navigation"
import { StudentBasicInfoCard } from "@/components/student/basic-info-card"
import { StudentVideoCard } from "@/components/student/video-card"
import { StudentEducationHistoryCard } from "@/components/student/education-history-card"
import { StudentWorkHistoryCard } from "@/components/student/work-history-card"
import { StudentStrengthsWeaknessesCard } from "@/components/student/strengths-weaknesses-card"

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: student, error } = await supabase.from("students").select("*").eq("id", id).single()

  if (error || !student) {
    notFound()
  }

  const age = student.date_of_birth ? calculateAge(new Date(student.date_of_birth)) : null

  return (
    <main className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            ← 一覧に戻る
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <StudentBasicInfoCard
                fullName={student.full_name}
                dateOfBirth={student.date_of_birth}
                address={student.address}
                height={student.height}
                weight={student.weight}
                age={age}
                bloodType={student.blood_type}
                sex={student.sex}
                photoUrl={student.photo_url}
                jftScore={student.jft_score}
                sswScore={student.ssw_score}
                sswJobCategory={student.ssw_job_category}
              />
            </div>

            <div className="md:col-span-2">
              <StudentVideoCard videoUrl={student.video_url} />

              <div className="mt-8">
                <StudentStrengthsWeaknessesCard strengths={student.strengths} weaknesses={student.weaknesses} />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <StudentEducationHistoryCard educationHistory={student.education_history} />
            <StudentWorkHistoryCard workHistory={student.work_history} />
          </div>

          {student.future_goals && (
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-50 dark:from-blue-950/20 dark:to-blue-950/20 border-blue-200 dark:border-blue-800">
              <h2 className="mb-4 text-xl font-semibold text-foreground flex items-center gap-2">
                <span className="text-2xl">🚀</span> 将来の目標・夢
              </h2>
              <p className="text-foreground whitespace-pre-wrap">{student.future_goals}</p>
            </Card>
          )}

          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">クラス:</span> {student.class_name}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
