import Image from "next/image"
import Link from "next/link"

export function StudentCard({ student }: { student: any }) {
  return (
    <Link href={`/student/${student.id}`} className="block group">
      <div className="overflow-hidden transition-all hover:shadow-lg hover:scale-105 rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer">
        <div className="flex gap-3 p-2">
          {/* Photo section */}
          <div className="overflow-hidden bg-muted relative w-32 h-32 flex-shrink-0 rounded">
            {student.photo_url ? (
              <Image
                src={student.photo_url || "/placeholder.svg"}
                alt={student.full_name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
                quality={90}
                priority={false}
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                <span className="text-2xl">👤</span>
              </div>
            )}
          </div>

          {/* Info section */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground line-clamp-1">{student.full_name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">{student.class_name}</p>

            <div className="mt-1.5 space-y-0.5 text-xs">
              {student.address && (
                <p className="text-muted-foreground line-clamp-1">
                  <span className="font-medium">住所:</span> {student.address}
                </p>
              )}
              {student.sex && (
                <p className="text-muted-foreground">
                  <span className="font-medium">性別:</span>{" "}
                  {student.sex === "Male" ? "男" : student.sex === "Female" ? "女" : student.sex}
                </p>
              )}
              <div className="flex gap-3 flex-wrap">
                {student.blood_type && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">血液型:</span> {student.blood_type}
                  </p>
                )}
                {student.height && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">身長:</span> {student.height}cm
                  </p>
                )}
                {student.weight && (
                  <p className="text-muted-foreground">
                    <span className="font-medium">体重:</span> {student.weight}kg
                  </p>
                )}
              </div>
              <div className="flex gap-2 flex-wrap pt-1">
                {student.jft_score !== undefined && student.jft_score !== null && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-medium">
                    JFT: {student.jft_score}
                  </span>
                )}
                {student.ssw_score !== undefined && student.ssw_score !== null && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 font-medium">
                    SSW: {student.ssw_score}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
