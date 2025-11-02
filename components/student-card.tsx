import { Card } from "@/components/ui/card"

export function StudentCard({ student }: { student: any }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-muted">
        {student.photo_url ? (
          <img
            src={student.photo_url || "/placeholder.svg"}
            alt={student.full_name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl text-muted-foreground">👤</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2">{student.full_name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{student.class_name}</p>
      </div>
    </Card>
  )
}
