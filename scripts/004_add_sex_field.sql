-- Add sex/gender field to students table
ALTER TABLE public.students
ADD COLUMN IF NOT EXISTS sex TEXT;

-- Update sample data with sex values
UPDATE public.students
SET sex = CASE 
  WHEN full_name = 'Yuki Tanaka' THEN 'Female'
  WHEN full_name = 'Hiroshi Yamamoto' THEN 'Male'
  WHEN full_name = 'Sakura Nakamura' THEN 'Female'
  ELSE 'Other'
END
WHERE sex IS NULL;
