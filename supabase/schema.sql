-- ─── TABLES ──────────────────────────────────────────────────────────────────

-- Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  role TEXT,
  video_url TEXT,
  video_type TEXT CHECK (video_type IN ('google_drive', 'youtube', 'vimeo')),
  thumbnail_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Settings Table (Singleton)
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  instagram TEXT,
  hero_text TEXT,
  hero_video_url TEXT,
  profile_url TEXT,
  accent_color TEXT DEFAULT '#c9a84c',
  bg_color TEXT DEFAULT '#0a0a0a',
  font_family TEXT DEFAULT 'playfair',
  grain_opacity NUMERIC DEFAULT 0.05
);

-- Experience Table
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  location TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── ROW LEVEL SECURITY (RLS) ────────────────────────────────────────────────

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;

-- Projects: Anyone can read, only authenticated can write
DROP POLICY IF EXISTS "Public read projects" ON public.projects;
CREATE POLICY "Public read projects" ON public.projects
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Auth write projects" ON public.projects;
CREATE POLICY "Auth write projects" ON public.projects
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Settings: Anyone can read, only authenticated can write
DROP POLICY IF EXISTS "Public read settings" ON public.settings;
CREATE POLICY "Public read settings" ON public.settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Auth write settings" ON public.settings;
CREATE POLICY "Auth write settings" ON public.settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Experience: Anyone can read, only authenticated can write
DROP POLICY IF EXISTS "Public read experience" ON public.experience;
CREATE POLICY "Public read experience" ON public.experience
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Auth write experience" ON public.experience;
CREATE POLICY "Auth write experience" ON public.experience
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ─── SETUP INITIAL SETTINGS ──────────────────────────────────────────────────

-- Insert initial row if not exists
INSERT INTO public.settings (name, hero_text)
SELECT 'Director Name', 'Crafting stories that move the world.'
WHERE NOT EXISTS (SELECT 1 FROM public.settings);

-- ─── STORAGE BUCKETS ─────────────────────────────────────────────────────────

/*
  NOTE: Run these in the SQL Editor to ensure the 'media' bucket exists 
  and is public for thumbnails.
*/

-- Create media bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'media' bucket
DROP POLICY IF EXISTS "Media Public Access" ON storage.objects;
CREATE POLICY "Media Public Access" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Media Auth Upload" ON storage.objects;
CREATE POLICY "Media Auth Upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "Media Auth Delete" ON storage.objects;
CREATE POLICY "Media Auth Delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'media');
