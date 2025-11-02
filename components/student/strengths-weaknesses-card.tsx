"use client"

import { Card } from "@/components/ui/card"

interface StudentStrengthsWeaknessesCardProps {
  strengths?: string
  weaknesses?: string
}

export function StudentStrengthsWeaknessesCard({ strengths, weaknesses }: StudentStrengthsWeaknessesCardProps) {
  if (!strengths && !weaknesses) return null

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Strengths */}
      {strengths && (
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-50 dark:from-green-950/20 dark:to-green-950/20 border-green-200 dark:border-green-800">
          <h2 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="text-2xl">✨</span> 強み
          </h2>
          <div className="space-y-2">
            {strengths.split(",").map((strength, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <p className="text-foreground">{strength.trim()}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Weaknesses */}
      {weaknesses && (
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-50 dark:from-orange-950/20 dark:to-orange-950/20 border-orange-200 dark:border-orange-800">
          <h2 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="text-2xl">🎯</span> 改善すべき点
          </h2>
          <div className="space-y-2">
            {weaknesses.split(",").map((weakness, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-orange-600 dark:text-orange-400 mt-1">•</span>
                <p className="text-foreground">{weakness.trim()}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
