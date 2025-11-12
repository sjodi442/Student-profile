-- Add SSW job category field to students table
ALTER TABLE public.students 
ADD COLUMN IF NOT EXISTS ssw_job_category TEXT DEFAULT NULL;

-- Update sample data with SSW job categories
UPDATE public.students 
SET ssw_job_category = '介護' 
WHERE full_name = 'Yuki Tanaka';

UPDATE public.students 
SET ssw_job_category = '飲食製造業' 
WHERE full_name = 'Hiroshi Yamamoto';

UPDATE public.students 
SET ssw_job_category = '外食' 
WHERE full_name = 'Sakura Nakamura';
