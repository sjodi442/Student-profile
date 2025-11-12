"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [jobCategory, setJobCategory] = useState("")
  const [sex, setSex] = useState("")
  const router = useRouter()

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams()

    if (query.trim()) {
      params.append("q", query)
    }
    if (jobCategory) {
      params.append("category", jobCategory)
    }
    if (sex) {
      params.append("sex", sex)
    }

    const queryString = params.toString()
    router.push(`/search${queryString ? `?${queryString}` : ""}`)
  }, [query, jobCategory, sex, router])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          placeholder="Search by name or class..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <button
          onClick={handleSearch}
          className="rounded-md bg-primary px-6 py-2 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Search
        </button>
      </div>

      <div className="flex gap-2">
        <select
          value={jobCategory}
          onChange={(e) => setJobCategory(e.target.value)}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All Job Categories</option>
          <option value="介護">介護 (Care Work)</option>
          <option value="飲食製造業">飲食製造業 (Food Manufacturing)</option>
          <option value="外食">外食 (Food Service)</option>
        </select>

        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All Genders</option>
          <option value="Male">Male (男性)</option>
          <option value="Female">Female (女性)</option>
        </select>
      </div>
    </div>
  )
}
