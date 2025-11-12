-- Remove SSW score column from students table
ALTER TABLE public.students DROP COLUMN IF EXISTS ssw_score;
