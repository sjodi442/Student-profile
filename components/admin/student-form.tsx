"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface EducationEntry {
  school: string
  years: string
  description: string
}

interface WorkEntry {
  company: string
  position: string
  years: string
}

interface StudentData {
  id?: number
  full_name: string
  class_name: string
  date_of_birth: string
  address: string
  height: number
  weight: number
  video_url: string
  photo_url: string
  strengths: string
  weaknesses: string
  future_goals: string
  sex?: string
  blood_type?: string
  jft_score?: number
  ssw_score?: number
  ssw_job_category?: string
  education_history: EducationEntry[]
  work_history: WorkEntry[]
}

export function StudentForm({
  initialData,
  onSuccess,
}: {
  initialData?: StudentData
  onSuccess: () => void
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState<StudentData>(
    initialData || {
      full_name: "",
      class_name: "",
      date_of_birth: "",
      address: "",
      height: 0,
      weight: 0,
      video_url: "",
      photo_url: "",
      strengths: "",
      weaknesses: "",
      future_goals: "",
      sex: "",
      blood_type: "",
      jft_score: 0,
      ssw_score: 0,
      ssw_job_category: "",
      education_history: [],
      work_history: [],
    },
  )

  const [newEducation, setNewEducation] = useState({
    school: "",
    years: "",
    description: "",
  })

  const [newWork, setNewWork] = useState({
    company: "",
    position: "",
    years: "",
  })

  const handleInputChange = (field: keyof StudentData, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addEducation = () => {
    if (newEducation.school) {
      setForm((prev) => ({
        ...prev,
        education_history: [...prev.education_history, newEducation],
      }))
      setNewEducation({ school: "", years: "", description: "" })
    }
  }

  const removeEducation = (index: number) => {
    setForm((prev) => ({
      ...prev,
      education_history: prev.education_history.filter((_, i) => i !== index),
    }))
  }

  const addWork = () => {
    if (newWork.company) {
      setForm((prev) => ({
        ...prev,
        work_history: [...prev.work_history, newWork],
      }))
      setNewWork({ company: "", position: "", years: "" })
    }
  }

  const removeWork = (index: number) => {
    setForm((prev) => ({
      ...prev,
      work_history: prev.work_history.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const method = form.id ? "PUT" : "POST"
      const url = form.id ? `/api/admin/students/${form.id}` : "/api/admin/students"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || "Failed to save student")
        setLoading(false)
        return
      }

      onSuccess()
    } catch (err) {
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>}

      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Basic Information</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={form.full_name}
              onChange={(e) => handleInputChange("full_name", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="class_name">Class Name</Label>
            <Input
              id="class_name"
              value={form.class_name}
              onChange={(e) => handleInputChange("class_name", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={form.date_of_birth}
                onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="sex">Sex</Label>
              <select
                id="sex"
                value={form.sex || ""}
                onChange={(e) => handleInputChange("sex", e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
              >
                <option value="">Select sex...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={form.address} onChange={(e) => handleInputChange("address", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="blood_type">Blood Type</Label>
              <select
                id="blood_type"
                value={form.blood_type || ""}
                onChange={(e) => handleInputChange("blood_type", e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
              >
                <option value="">Select blood type...</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={form.height || ""}
                onChange={(e) => handleInputChange("height", Number.parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={form.weight || ""}
                onChange={(e) => handleInputChange("weight", Number.parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jft_score">JFT Score</Label>
              <Input
                id="jft_score"
                type="number"
                min="0"
                max="999"
                value={form.jft_score || ""}
                onChange={(e) => handleInputChange("jft_score", Number.parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="ssw_score">SSW Score</Label>
              <Input
                id="ssw_score"
                type="number"
                min="0"
                max="999"
                value={form.ssw_score || ""}
                onChange={(e) => handleInputChange("ssw_score", Number.parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="ssw_job_category">SSW Job Category</Label>
            <select
              id="ssw_job_category"
              value={form.ssw_job_category || ""}
              onChange={(e) => handleInputChange("ssw_job_category", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
            >
              <option value="">Select job category...</option>
              <option value="介護">介護 (Care/Nursing)</option>
              <option value="飲食製造業">飲食製造業 (Food Manufacturing)</option>
              <option value="外食">外食 (Food Service)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Media */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Media</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="photo_url">Photo URL</Label>
            <Input
              id="photo_url"
              type="url"
              value={form.photo_url}
              onChange={(e) => handleInputChange("photo_url", e.target.value)}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <Label htmlFor="video_url">Introduction Video URL</Label>
            <Input
              id="video_url"
              type="url"
              value={form.video_url}
              onChange={(e) => handleInputChange("video_url", e.target.value)}
              placeholder="https://www.youtube.com/embed/..."
            />
          </div>
        </div>
      </Card>

      {/* Personal Info */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Personal Information</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="strengths">Strengths</Label>
            <Textarea
              id="strengths"
              value={form.strengths}
              onChange={(e) => handleInputChange("strengths", e.target.value)}
              placeholder="List your strengths..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="weaknesses">Weaknesses</Label>
            <Textarea
              id="weaknesses"
              value={form.weaknesses}
              onChange={(e) => handleInputChange("weaknesses", e.target.value)}
              placeholder="List areas for improvement..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="future_goals">Future Goals</Label>
            <Textarea
              id="future_goals"
              value={form.future_goals}
              onChange={(e) => handleInputChange("future_goals", e.target.value)}
              placeholder="Your goals and dreams..."
              rows={3}
            />
          </div>
        </div>
      </Card>

      {/* Education History */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Education History</h2>
        <div className="space-y-4">
          {form.education_history.map((edu, idx) => (
            <div key={idx} className="flex items-start justify-between rounded-lg bg-muted p-3">
              <div className="flex-1">
                <p className="font-medium text-foreground">{edu.school}</p>
                <p className="text-sm text-muted-foreground">{edu.years}</p>
                {edu.description && <p className="mt-1 text-sm text-muted-foreground">{edu.description}</p>}
              </div>
              <button
                type="button"
                onClick={() => removeEducation(idx)}
                className="ml-2 text-destructive hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="space-y-3 border-t border-border pt-4">
            <Input
              placeholder="School name"
              value={newEducation.school}
              onChange={(e) =>
                setNewEducation((prev) => ({
                  ...prev,
                  school: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Years (e.g., 2015-2019)"
              value={newEducation.years}
              onChange={(e) =>
                setNewEducation((prev) => ({
                  ...prev,
                  years: e.target.value,
                }))
              }
            />
            <Textarea
              placeholder="Description (optional)"
              value={newEducation.description}
              onChange={(e) =>
                setNewEducation((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={2}
            />
            <Button type="button" onClick={addEducation} variant="outline" className="w-full bg-transparent">
              Add Education
            </Button>
          </div>
        </div>
      </Card>

      {/* Work History */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Work History</h2>
        <div className="space-y-4">
          {form.work_history.map((work, idx) => (
            <div key={idx} className="flex items-start justify-between rounded-lg bg-muted p-3">
              <div className="flex-1">
                <p className="font-medium text-foreground">{work.company}</p>
                <p className="text-sm text-muted-foreground">
                  {work.position} • {work.years}
                </p>
              </div>
              <button type="button" onClick={() => removeWork(idx)} className="ml-2 text-destructive hover:underline">
                Remove
              </button>
            </div>
          ))}

          <div className="space-y-3 border-t border-border pt-4">
            <Input
              placeholder="Company name"
              value={newWork.company}
              onChange={(e) =>
                setNewWork((prev) => ({
                  ...prev,
                  company: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Position"
              value={newWork.position}
              onChange={(e) =>
                setNewWork((prev) => ({
                  ...prev,
                  position: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Years (e.g., 2020-2023)"
              value={newWork.years}
              onChange={(e) =>
                setNewWork((prev) => ({
                  ...prev,
                  years: e.target.value,
                }))
              }
            />
            <Button type="button" onClick={addWork} variant="outline" className="w-full bg-transparent">
              Add Work Experience
            </Button>
          </div>
        </div>
      </Card>

      {/* Form Actions */}
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Saving..." : form.id ? "Update Student" : "Create Student"}
        </Button>
      </div>
    </form>
  )
}
