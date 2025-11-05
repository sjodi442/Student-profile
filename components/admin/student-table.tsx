"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function StudentTable({ students, onRefresh }: { students: any[]; onRefresh: () => void }) {
  const [deleting, setDeleting] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    setDeleting(id)
    try {
      const response = await fetch(`/api/admin/students/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        onRefresh()
      }
    } catch (error) {
      console.error("Delete failed:", error)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Sex</TableHead>
          <TableHead>Blood Type</TableHead>
          <TableHead>JFT Score</TableHead>
          <TableHead>SSW Score</TableHead>
          <TableHead>Date of Birth</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.full_name}</TableCell>
            <TableCell>{student.class_name}</TableCell>
            <TableCell>{student.sex === "Male" ? "男" : student.sex === "Female" ? "女" : "-"}</TableCell>
            <TableCell>{student.blood_type || "-"}</TableCell>
            <TableCell>{student.jft_score || "-"}</TableCell>
            <TableCell>{student.ssw_score || "-"}</TableCell>
            <TableCell>{student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : "-"}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link href={`/admin/dashboard/edit/${student.id}`}>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Delete Student?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. {student.full_name} will be permanently removed from the database.
                    </AlertDialogDescription>
                    <div className="flex justify-end gap-2">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(student.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleting === student.id ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
