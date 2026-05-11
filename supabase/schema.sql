-- ─── TABLES ──────────────────────────────────────────────────────────────────

-- Profiles Table (Links to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  niche TEXT CHECK (niche IN ('filmmaker', 'programmer', 'photographer', 'sound_editor', 'musician')),
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  role TEXT,
  video_url TEXT,
  video_type TEXT CHECK (video_type IN ('google_drive', 'youtube', 'vimeo')),
  thumbnail_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, slug)
);

-- Project Collaborators Table (The Collaborative Network)
CREATE TABLE IF NOT EXISTS public.project_collaborators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role_title TEXT NOT NULL, -- e.g., 'Director of Photography', 'Sound Designer'
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(project_id, profile_id)
);

-- Settings Table (Per-user settings)
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
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
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
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

-- Page Views Table (Analytics)
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  page_path TEXT NOT NULL,
  referrer TEXT,
  browser TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── ROW LEVEL SECURITY (RLS) ────────────────────────────────────────────────

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Page Views: Anonymous insert allowed, read only for the profile owner
DROP POLICY IF EXISTS "Anonymous insert page_views" ON public.page_views;
CREATE POLICY "Anonymous insert page_views" ON public.page_views FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Owner read page_views" ON public.page_views;
CREATE POLICY "Owner read page_views" ON public.page_views FOR SELECT TO authenticated USING (auth.uid() = profile_id);

-- Profiles: Anyone can read, only the user can write
DROP POLICY IF EXISTS "Public read profiles" ON public.profiles;
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Auth write profiles" ON public.profiles;
CREATE POLICY "Auth write profiles" ON public.profiles FOR ALL TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Projects: Anyone can read, only owner can write
DROP POLICY IF EXISTS "Public read projects" ON public.projects;
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Auth write projects" ON public.projects;
CREATE POLICY "Auth write projects" ON public.projects FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Project Collaborators: Anyone can read, project owner can write
DROP POLICY IF EXISTS "Public read project_collaborators" ON public.project_collaborators;
CREATE POLICY "Public read project_collaborators" ON public.project_collaborators FOR SELECT USING (true);

DROP POLICY IF EXISTS "Project owner write collaborators" ON public.project_collaborators;
CREATE POLICY "Project owner write collaborators" ON public.project_collaborators FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND user_id = auth.uid())
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND user_id = auth.uid())
);

-- Settings: Anyone can read, owner can write
DROP POLICY IF EXISTS "Public read settings" ON public.settings;
CREATE POLICY "Public read settings" ON public.settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Auth write settings" ON public.settings;
CREATE POLICY "Auth write settings" ON public.settings FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Experience: Anyone can read, owner can write
DROP POLICY IF EXISTS "Public read experience" ON public.experience;
CREATE POLICY "Public read experience" ON public.experience FOR SELECT USING (true);

DROP POLICY IF EXISTS "Auth write experience" ON public.experience;
CREATE POLICY "Auth write experience" ON public.experience FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ─── STORAGE BUCKETS ─────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Media Public Access" ON storage.objects;
CREATE POLICY "Media Public Access" ON storage.objects FOR SELECT TO public USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Media Auth Upload" ON storage.objects;
CREATE POLICY "Media Auth Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "Media Auth Delete" ON storage.objects;
CREATE POLICY "Media Auth Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media');

-- ─── WEBHOOKS & TRIGGERS ─────────────────────────────────────────────────────

-- Example: Function to log when a new collaborator is added
-- In a real production environment, you would use this to trigger a webhook 
-- via pg_net (Supabase HTTP extension) to your Next.js API to send an email.

CREATE OR REPLACE FUNCTION public.handle_new_collaborator()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into an audit log or trigger an external webhook via http request.
  -- Example of calling an Edge Function (requires pg_net extension):
  -- PERFORM net.http_post(
  --   url := 'https://<project-ref>.supabase.co/functions/v1/notify-collaborator',
  --   headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb,
  --   body := json_build_object('project_id', NEW.project_id, 'profile_id', NEW.profile_id)::jsonb
  -- );
  
  -- For now, we just raise a notice in Postgres logs
  RAISE NOTICE 'New collaborator added: Profile % to Project %', NEW.profile_id, NEW.project_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run the function whenever a new collaborator is added
DROP TRIGGER IF EXISTS on_collaborator_added ON public.project_collaborators;
CREATE TRIGGER on_collaborator_added
  AFTER INSERT ON public.project_collaborators
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_collaborator();

-- ─── FUNCTIONS ───────────────────────────────────────────────────────────────

-- RPC: Delete User Data (Danger Zone)
CREATE OR REPLACE FUNCTION public.delete_user_data()
RETURNS void AS $$
BEGIN
  -- We delete from public.profiles. 
  -- Due to ON DELETE CASCADE on all referencing tables (settings, projects, etc.),
  -- this will clean up all associated user data.
  DELETE FROM public.profiles WHERE id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


