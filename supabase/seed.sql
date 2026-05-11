-- ─── MASTER DEMO DATA (ArtifactOS Showpiece) ──────────────────────────────────
-- Note: Replace '<USER_ID>' with a real user ID from auth.users to test locally.

-- 1. PROFILES
INSERT INTO public.profiles (id, username, full_name, avatar_url, niche, role) VALUES
('00000000-0000-0000-0000-000000000001', 'master', 'Artifact Master', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', 'filmmaker', 'super_admin'),
('00000000-0000-0000-0000-000000000002', 'zombie', 'Yassir Mattous', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800', 'filmmaker', 'user'),
('00000000-0000-0000-0000-000000000003', 'elara', 'Elara Vance', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800', 'photographer', 'user'),
('00000000-0000-0000-0000-000000000004', 'kai', 'Kai Chen', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800', 'programmer', 'user')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  avatar_url = EXCLUDED.avatar_url,
  niche = EXCLUDED.niche;

-- 2. SETTINGS
INSERT INTO public.settings (user_id, name, bio, email, instagram, hero_text, hero_video_url, template_id, accent_color) VALUES
('00000000-0000-0000-0000-000000000001', 'Artifact Master', 'The definitive cinematic interface for creators. ArtifactOS bridges the gap between vision and artifact.', 'master@artifact.os', 'artifact.os', 'THE CREATIVE\nOPERATING SYSTEM.', 'https://vimeo.com/1006144786', 'classic', '#c9a84c'),
('00000000-0000-0000-0000-000000000002', 'Yassir Mattous', 'Atmospheric filmmaker specializing in high-energy surrealism. Capturing moments that resonate with raw emotion.', 'zombie@artifact.os', 'therealzombie_officiel', 'THE ZOMBIE VISION.\nCAPTURING RAW ENERGY.', 'https://vimeo.com/108018156', 'modern', '#ff0055')
ON CONFLICT (user_id) DO UPDATE SET
  bio = EXCLUDED.bio,
  hero_text = EXCLUDED.hero_text,
  template_id = EXCLUDED.template_id;

-- 3. PROJECTS
INSERT INTO public.projects (user_id, title, slug, description, role, video_url, video_type, thumbnail_url, display_order) VALUES
('00000000-0000-0000-0000-000000000001', 'Apple: Flock', 'apple-flock', 'Imaginative technological synchronization.', 'Director of Photography', 'https://vimeo.com/1006144786', 'vimeo', 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=1600', 0),
('00000000-0000-0000-0000-000000000001', 'Severance: Title', 'severance-title', 'Organic forms vs sterile technology.', 'VFX Supervisor', 'https://vimeo.com/1066526515', 'vimeo', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600', 1),
('00000000-0000-0000-0000-000000000002', 'Mercedes: Valet Guys', 'mercedes-valet', 'High-octane thrill ride.', 'Director / Editor', 'https://vimeo.com/527503331', 'vimeo', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1600', 0)
ON CONFLICT (user_id, slug) DO NOTHING;

-- 4. EXPERIENCE
INSERT INTO public.experience (user_id, company, role, location, start_date, is_current) VALUES
('00000000-0000-0000-0000-000000000001', 'Somesuch & Co.', 'Executive Director', 'London, UK', '2023-01-01', true),
('00000000-0000-0000-0000-000000000002', 'Vice Media', 'Documentary Editor', 'Brooklyn, NY', '2017-08-20', false)
ON CONFLICT DO NOTHING;

