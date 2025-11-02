-- Create students table with all required fields
CREATE TABLE IF NOT EXISTS public.students (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name TEXT NOT NULL,
  class_name TEXT NOT NULL,
  date_of_birth DATE,
  address TEXT,
  height INT,
  weight INT,
  video_url TEXT,
  photo_url TEXT,
  strengths TEXT,
  weaknesses TEXT,
  future_goals TEXT,
  education_history JSONB DEFAULT '[]'::JSONB,
  work_history JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin users table for authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Students: Allow anyone to select (public directory), admins can CRUD
CREATE POLICY "students_select_public"
  ON public.students FOR SELECT
  USING (true);

CREATE POLICY "students_insert_admin"
  ON public.students FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = current_user_id()
    )
  );

CREATE POLICY "students_update_admin"
  ON public.students FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = current_user_id()
    )
  );

CREATE POLICY "students_delete_admin"
  ON public.students FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = current_user_id()
    )
  );

-- Admin users table: Only allow select for admin operations
CREATE POLICY "admin_users_select"
  ON public.admin_users FOR SELECT
  USING (true);
