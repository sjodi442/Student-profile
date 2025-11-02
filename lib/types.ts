export interface Student {
  id: number
  full_name: string
  class_name: string
  date_of_birth: string | null
  address: string | null
  height: number | null
  weight: number | null
  video_url: string | null
  photo_url: string | null
  strengths: string | null
  weaknesses: string | null
  future_goals: string | null
  education_history: Array<{
    school: string
    years: string
    description: string
  }>
  work_history: Array<{
    company: string
    position: string
    years: string
  }>
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  username: string
}
