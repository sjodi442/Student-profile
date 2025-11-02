-- Add blood_type field to students table
ALTER TABLE public.students 
ADD COLUMN IF NOT EXISTS blood_type VARCHAR(3);

-- Update sample data with blood types
UPDATE public.students 
SET blood_type = 'O+' 
WHERE full_name = 'Yuki Tanaka';

UPDATE public.students 
SET blood_type = 'A+' 
WHERE full_name = 'Hiroshi Yamamoto';

UPDATE public.students 
SET blood_type = 'B+' 
WHERE full_name = 'Sakura Nakamura';
