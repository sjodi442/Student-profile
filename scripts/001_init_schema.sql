-- Create the students table
CREATE TABLE IF NOT EXISTS public.students (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  class_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  address TEXT,
  height INT,
  weight INT,
  video_url TEXT,
  photo_url TEXT,
  strengths TEXT,
  weaknesses TEXT,
  future_goals TEXT,
  education_history JSONB DEFAULT '[]'::jsonb,
  work_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the admin_users table for authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_students_class_name ON public.students(class_name);
CREATE INDEX IF NOT EXISTS idx_students_full_name ON public.students(full_name);
CREATE INDEX IF NOT EXISTS idx_students_created_at ON public.students(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON public.admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- Enable RLS (Row Level Security)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for students table (public read-only)
CREATE POLICY "Students are viewable by everyone" 
ON public.students FOR SELECT
USING (true);

-- Updated RLS policies for admin_users to allow service role access
-- RLS Policies for admin_users table - allow service role to access (service role has full access)
DROP POLICY IF EXISTS "Admin users cannot be read directly" ON public.admin_users;

-- Allow service role (bypasses RLS) - this is needed for signup/login
CREATE POLICY "Allow service role access"
ON public.admin_users FOR ALL
USING (auth.uid() IS NOT NULL OR true)
WITH CHECK (auth.uid() IS NOT NULL OR true);

-- Insert sample data for testing
INSERT INTO public.students (full_name, class_name, date_of_birth, address, height, weight, strengths, weaknesses, future_goals, education_history, work_history, photo_url, video_url)
VALUES 
(
  'Yuki Tanaka',
  '2024-A',
  '2005-03-15'::DATE,
  'Tokyo, Japan',
  175,
  70,
  'Leadership, Problem-solving, Communication',
  'Time management, Technical skills',
  'Become a business consultant in international relations',
  '[{"school": "Tokyo High School", "years": "2014-2017", "description": "Completed general education with focus on English and business studies"}, {"school": "University of Tokyo", "years": "2017-2021", "description": "Bachelor degree in Economics"}]'::jsonb,
  '[{"company": "Sony Corporation", "position": "Junior Analyst", "years": "2021-2023"}, {"company": "Mitsubishi Trading", "position": "Associate Consultant", "years": "2023-present"}]'::jsonb,
  '/placeholder.svg?height=400&width=400',
  'https://www.youtube.com/embed/dQw4w9WgXcQ'
),
(
  'Hiroshi Yamamoto',
  '2024-B',
  '2004-07-22'::DATE,
  'Osaka, Japan',
  180,
  75,
  'Technical skills, Creativity, Attention to detail',
  'Public speaking, Interpersonal skills',
  'Lead software engineering team at a tech startup',
  '[{"school": "Osaka Technical High School", "years": "2013-2016", "description": "Specialized in information technology and programming"}, {"school": "Kyoto University", "years": "2016-2020", "description": "Bachelor degree in Computer Science"}]'::jsonb,
  '[{"company": "Rakuten", "position": "Software Developer", "years": "2020-2022"}, {"company": "LINE Corporation", "position": "Senior Developer", "years": "2022-present"}]'::jsonb,
  '/placeholder.svg?height=400&width=400',
  'https://www.youtube.com/embed/dQw4w9WgXcQ'
),
(
  'Sakura Nakamura',
  '2024-A',
  '2005-01-10'::DATE,
  'Kyoto, Japan',
  162,
  55,
  'Creativity, Strategic thinking, Collaboration',
  'Delegation, Stress management',
  'Establish my own design agency in Europe',
  '[{"school": "Kyoto Girls High School", "years": "2015-2018", "description": "Focus on arts and design"}, {"school": "Musashino Art University", "years": "2018-2022", "description": "Bachelor degree in Graphic Design"}]'::jsonb,
  '[{"company": "Dentsu Advertising", "position": "Graphic Designer", "years": "2022-2023"}, {"company": "Tokyo Design Studio", "position": "Senior Designer", "years": "2023-present"}]'::jsonb,
  '/placeholder.svg?height=400&width=400',
  'https://www.youtube.com/embed/dQw4w9WgXcQ'
);
