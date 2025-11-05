"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"

interface StudentBasicInfoProps {
  fullName: string
  dateOfBirth: string
  address: string
  height: number
  weight: number
  age: number
  bloodType?: string
  sex?: string
  photoUrl?: string
  jftScore?: number
  sswScore?: number
}

export function StudentBasicInfoCard({
  fullName,
  dateOfBirth,
  address,
  height,
  weight,
  age,
  bloodType,
  sex,
  photoUrl,
  jftScore,
  sswScore,
}: StudentBasicInfoProps) {
  return (
    <Card className="overflow-hidden">
      {/* Profile Photo */}
      <div className="relative w-64 h-64 mx-auto overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg">
        {photoUrl ? (
          <Image
            src={photoUrl || "/placeholder.svg"}
            alt={fullName}
            width={256}
            height={256}
            className="object-cover w-full h-full"
            quality={95}
            priority={true}
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <span className="text-8xl">👤</span>
          </div>
        )}
      </div>

      {/* Basic Information */}
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">{fullName}</h1>
          <p className="text-sm text-muted-foreground">学生プロフィール</p>
        </div>

        {(jftScore !== undefined || sswScore !== undefined) && (
          <div className="grid grid-cols-2 gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-100 dark:border-blue-900">
            {jftScore !== undefined && jftScore !== 0 && (
              <div className="text-center">
                <p className="text-xs font-medium text-muted-foreground mb-1">JFT スコア</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{jftScore}</p>
              </div>
            )}
            {sswScore !== undefined && sswScore !== 0 && (
              <div className="text-center">
                <p className="text-xs font-medium text-muted-foreground mb-1">SSW スコア</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{sswScore}</p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          {/* Name */}
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-muted-foreground w-20">氏名</p>
            <p className="text-foreground text-right flex-1">{fullName}</p>
          </div>

          {/* Date of Birth */}
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-muted-foreground w-20">生年月日</p>
            <p className="text-foreground text-right flex-1">{new Date(dateOfBirth).toLocaleDateString("ja-JP")}</p>
          </div>

          {/* Sex */}
          {sex && (
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-muted-foreground w-20">性別</p>
              <p className="text-foreground text-right flex-1">
                {sex === "Male" ? "男" : sex === "Female" ? "女" : sex}
              </p>
            </div>
          )}

          {/* Age */}
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-muted-foreground w-20">年齢</p>
            <p className="text-foreground text-right flex-1">{age}歳</p>
          </div>

          {/* Height */}
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-muted-foreground w-20">身長</p>
            <p className="text-foreground text-right flex-1">{height} cm</p>
          </div>

          {/* Weight */}
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-muted-foreground w-20">体重</p>
            <p className="text-foreground text-right flex-1">{weight} kg</p>
          </div>

          {/* Blood Type */}
          {bloodType && (
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-muted-foreground w-20">血液型</p>
              <p className="text-foreground font-semibold text-right flex-1 bg-blue-50 dark:bg-blue-950/30 px-3 py-1 rounded-full text-sm">
                {bloodType}
              </p>
            </div>
          )}

          {/* Address */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground mb-2">住所</p>
            <p className="text-foreground leading-relaxed">{address}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
