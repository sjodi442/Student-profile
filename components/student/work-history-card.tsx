"use client"

import { Card } from "@/components/ui/card"

interface WorkEntry {
  company: string
  position: string
  years: string
}

interface StudentWorkHistoryCardProps {
  workHistory?: WorkEntry[]
}

export function StudentWorkHistoryCard({ workHistory }: StudentWorkHistoryCardProps) {
  if (!workHistory || workHistory.length === 0) return null

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold text-foreground">職歴</h2>
      <div className="space-y-6">
        {workHistory.map((work, idx) => (
          <div key={idx} className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-2 h-full w-1 bg-gradient-to-b from-primary to-primary/30" />

            {/* Timeline dot */}
            <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-primary border-4 border-background" />

            {/* Content */}
            <div className="pl-6">
              <h3 className="font-semibold text-lg text-foreground">{work.company}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {work.position} • {work.years}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
