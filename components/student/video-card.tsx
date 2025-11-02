"use client"

import { Card } from "@/components/ui/card"

interface StudentVideoCardProps {
  videoUrl?: string
}

export function StudentVideoCard({ videoUrl }: StudentVideoCardProps) {
  if (!videoUrl) return null

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold text-foreground">自己紹介動画</h2>
      <div className="aspect-video overflow-hidden rounded-lg bg-muted">
        <iframe
          src={videoUrl}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Card>
  )
}
