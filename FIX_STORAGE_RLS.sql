-- FIX_STORAGE_RLS.sql
-- This creates permissive policies for the site-assets bucket
-- Run this in Supabase SQL Editor

-- First, drop any existing policies for site-assets (if they exist)
DROP POLICY IF EXISTS "Allow authenticated users full access to site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Access" ON storage.objects;

-- Create permissive policy: Allow any authenticated user to upload/read/delete in site-assets bucket
CREATE POLICY "Allow authenticated users full access to site-assets"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'site-assets')
WITH CHECK (bucket_id = 'site-assets');

-- Allow public read access (since bucket should be public for logos/images)
CREATE POLICY "Allow public read access to site-assets"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'site-assets');

-- Verify the policies were created
SELECT 
  policyname,
  cmd as command,
  roles,
  qual as using_expression
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
  AND (policyname LIKE '%site-assets%' OR policyname LIKE '%site%assets%')
ORDER BY policyname;
