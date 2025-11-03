import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function StudentListItem({ student }: { student: any }) {
  return (
    <Link href={`/student/${student.id}`} className="block group">
      <div className="flex items-center gap-4 px-4 py-3 border-b border-border hover:bg-muted/50 transition-colors">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
            {student.photo_url ? (
              <Image
                src={student.photo_url || "/placeholder.svg"}
                alt={student.full_name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
                quality={85}
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                <span className="text-lg">👤</span>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{student.full_name}</h3>
          <p className="text-sm text-muted-foreground truncate">{student.class_name}</p>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  )
}
