// ─── Database Types ──────────────────────────────────────────────────────────

export type VideoType = 'google_drive' | 'youtube' | 'vimeo' | 'unknown';
export type Niche = 'filmmaker' | 'programmer' | 'photographer' | 'sound_editor' | 'musician';
export type AppRole = 'user' | 'super_admin';

export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  niche: Niche;
  role: AppRole;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  description: string | null;
  role: string | null;
  video_url: string | null;
  video_type: VideoType | null;
  thumbnail_url: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  project_collaborators?: ProjectCollaborator[];
}

export interface Settings {
  id: string;
  user_id: string;
  name: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  instagram: string | null;
  social_linkedin: string | null;
  social_vimeo: string | null;
  social_x: string | null;
  social_website: string | null;
  hero_text: string | null;
  hero_video_url: string | null;
  profile_url: string | null;
  accent_color: string | null;
  bg_color: string | null;
  font_family: string | null;
  grain_opacity: number | null;
  template_id: string | null;
  custom_domain: string | null;
}

export interface Experience {
  id: string;
  user_id: string;
  company: string;
  role: string;
  description: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  display_order: number;
  created_at: string;
}

export interface ProjectCollaborator {
  id: string;
  project_id: string;
  profile_id: string;
  role_title: string;
  created_at: string;
  // Join property
  profile?: Profile;
}

// ─── Form Types ───────────────────────────────────────────────────────────────

export type ProjectFormData = {
  title: string;
  slug: string;
  description: string;
  role: string;
  video_url: string;
  thumbnail_url: string;
  display_order: number;
  is_published: boolean;
};

export type SettingsFormData = {
  name: string;
  bio: string;
  email: string;
  phone: string;
  instagram: string;
  social_linkedin: string;
  social_vimeo: string;
  social_x: string;
  social_website: string;
  hero_text: string;
  hero_video_url: string;
  accent_color: string;
  bg_color: string;
  font_family: string;
  grain_opacity: number;
};

// ─── Supabase Database Schema ─────────────────────────────────────────────────

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Profile;
        Update: Partial<Profile>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at'>>;
      };
      project_collaborators: {
        Row: ProjectCollaborator;
        Insert: Omit<ProjectCollaborator, 'id' | 'created_at' | 'profile'>;
        Update: Partial<Omit<ProjectCollaborator, 'id' | 'created_at' | 'profile'>>;
      };
      settings: {
        Row: Settings;
        Insert: Omit<Settings, 'id'>;
        Update: Partial<Omit<Settings, 'id'>>;
      };
      experience: {
        Row: Experience;
        Insert: Omit<Experience, 'id' | 'created_at'>;
        Update: Partial<Omit<Experience, 'id' | 'created_at'>>;
      };
    };
  };
};
