"use client"

import { Card } from "@/components/ui/card"

interface EducationEntry {
  school: string
  years: string
  description: string
}

interface StudentEducationHistoryCardProps {
  educationHistory?: EducationEntry[]
}

export function StudentEducationHistoryCard({ educationHistory }: StudentEducationHistoryCardProps) {
  if (!educationHistory || educationHistory.length === 0) return null

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold text-foreground">学歴</h2>
      <div className="space-y-6">
        {educationHistory.map((edu, idx) => (
          <div key={idx} className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-2 h-full w-1 bg-gradient-to-b from-primary to-primary/30" />

            {/* Timeline dot */}
            <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-primary border-4 border-background" />

            {/* Content */}
            <div className="pl-6">
              <h3 className="font-semibold text-lg text-foreground">{edu.school}</h3>
              <p className="text-sm text-muted-foreground mt-1">{edu.years}</p>
              {edu.description && <p className="text-muted-foreground mt-2">{edu.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
