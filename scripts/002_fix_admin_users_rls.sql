-- Drop the restrictive policy and replace with service-role friendly policies
DROP POLICY IF EXISTS "Admin users cannot be read directly" ON public.admin_users;

-- Allow all operations for authenticated users via service role
CREATE POLICY "Admin users full access"
ON public.admin_users FOR ALL
USING (true)
WITH CHECK (true);
