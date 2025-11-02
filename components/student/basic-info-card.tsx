"use client"

import { Card } from "@/components/ui/card"

interface StudentBasicInfoProps {
  fullName: string
  dateOfBirth: string
  address: string
  height: number
  weight: number
  age: number
  bloodType?: string
  photoUrl?: string
}

export function StudentBasicInfoCard({
  fullName,
  dateOfBirth,
  address,
  height,
  weight,
  age,
  bloodType,
  photoUrl,
}: StudentBasicInfoProps) {
  return (
    <Card className="overflow-hidden">
      {/* Profile Photo */}
      <div className="aspect-square overflow-hidden bg-muted">
        {photoUrl ? (
          <img src={photoUrl || "/placeholder.svg"} alt={fullName} className="h-full w-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-6xl text-muted-foreground">👤</span>
          </div>
        )}
      </div>

      {/* Basic Information */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-foreground">{fullName}</h1>

        <div className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">氏名</p>
            <p className="text-foreground">{fullName}</p>
          </div>

          {/* Date of Birth */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">生年月日</p>
            <p className="text-foreground">{new Date(dateOfBirth).toLocaleDateString("ja-JP")}</p>
          </div>

          {/* Age */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">年齢</p>
            <p className="text-foreground">{age}歳</p>
          </div>

          {/* Height */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">身長</p>
            <p className="text-foreground">{height} cm</p>
          </div>

          {/* Weight */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">体重</p>
            <p className="text-foreground">{weight} kg</p>
          </div>

          {/* Blood Type */}
          {bloodType && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">血液型</p>
              <p className="text-foreground font-semibold">{bloodType}</p>
            </div>
          )}

          {/* Address */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground">住所</p>
            <p className="text-foreground mt-1">{address}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
