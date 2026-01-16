-- Add theme_colors column to business_profiles table
-- This stores manual color palette overrides per template, e.g.
-- { "t4": { "accent": "#7c3aed", "accent2": "#06b6d4", ... }, "t6": { ... } }

alter table public.business_profiles
add column if not exists theme_colors jsonb null;

comment on column public.business_profiles.theme_colors is 'Stores manual theme/palette overrides per template key (t1/t3/t4/t5/t6).';

