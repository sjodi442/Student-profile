-- Add JFT and SSW score fields to students table
ALTER TABLE public.students
ADD COLUMN IF NOT EXISTS jft_score INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS ssw_score INT DEFAULT 0;

-- Update sample data with test scores
UPDATE public.students
SET jft_score = 85, ssw_score = 78
WHERE full_name = 'Yuki Tanaka';

UPDATE public.students
SET jft_score = 92, ssw_score = 88
WHERE full_name = 'Hiroshi Yamamoto';

UPDATE public.students
SET jft_score = 79, ssw_score = 82
WHERE full_name = 'Sakura Nakamura';
