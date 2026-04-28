-- 🎬 ArtifactOS — Phase 1: Multi-Tenant SaaS Migration
-- This script transforms DirectorOS from a single portfolio to a Multi-User SaaS.

-- 1. PROFILES TABLE (Extends Auth.Users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  niche TEXT DEFAULT 'filmmaker' CHECK (niche IN ('filmmaker', 'programmer', 'photographer', 'sound_editor', 'musician')),
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. MIGRATE EXISTING TABLES TO MULTI-TENANT
-- Projects
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
-- Settings
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
-- Experience
ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 3. NEW SaaS COLUMNS
-- Settings needs theme and template info
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS template_id TEXT DEFAULT 'classic';
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS custom_domain TEXT UNIQUE;

-- 4. UPDATED RLS POLICIES (MULTI-TENANT)

-- Profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Projects
DROP POLICY IF EXISTS "Public read projects" ON public.projects;
CREATE POLICY "Public read projects" ON public.projects
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage own projects" ON public.projects;
CREATE POLICY "Users can manage own projects" ON public.projects
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Settings
DROP POLICY IF EXISTS "Public read settings" ON public.settings;
CREATE POLICY "Public read settings" ON public.settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage own settings" ON public.settings;
CREATE POLICY "Users can manage own settings" ON public.settings
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Experience
DROP POLICY IF EXISTS "Public read experience" ON public.experience;
CREATE POLICY "Public read experience" ON public.experience
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage own experience" ON public.experience;
CREATE POLICY "Users can manage own experience" ON public.experience
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 5. AUTOMATION: Trigger for new signups
-- This function creates a profile and default settings automatically.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create Profile
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    new.id, 
    LOWER(SPLIT_PART(new.email, '@', 1)) || '_' || SUBSTR(new.id::text, 1, 4), 
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );

  -- Create Default Settings for the new user
  INSERT INTO public.settings (user_id, name, hero_text)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'Welcome to my ArtifactOS portfolio.');

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function on every signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
