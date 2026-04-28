'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  User, 
  Mail, 
  Phone, 
  Instagram, 
  Type, 
  Video,
  Loader2,
  Check,
  Info,
  RotateCcw
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Settings, Profile, Niche } from '@/lib/types';
import { processVideoUrl } from '@/lib/video';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface Props {
  settings: Settings | null;
  profile: Profile | null;
}

export default function SettingsFormClient({ settings, profile }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: settings?.name || '',
    bio: settings?.bio || '',
    email: settings?.email || '',
    phone: settings?.phone || '',
    instagram: settings?.instagram || '',
    hero_text: settings?.hero_text || '',
    hero_video_url: settings?.hero_video_url || '',
    profile_url: settings?.profile_url || '',
    accent_color: settings?.accent_color || '#c9a84c',
    bg_color: settings?.bg_color || '#0a0a0a',
    font_family: settings?.font_family || 'playfair',
    grain_opacity: settings?.grain_opacity || 0.05,
    template_id: settings?.template_id || 'classic',
    niche: profile?.niche || 'filmmaker' as Niche,
  });

  const [uploading, setUploading] = useState(false);

  const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `profile-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, profile_url: publicUrl }));
      toast.success('Profile picture uploaded');
    } catch (error: any) {
      toast.error('Error uploading image');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleResetColors = () => {
    setFormData(prev => ({
      ...prev,
      accent_color: '#c9a84c',
      bg_color: '#0a0a0a',
      font_family: 'playfair',
      grain_opacity: 0.05,
    }));
    toast.success('Design defaults restored');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { niche, ...settingsData } = formData;
      
      const [settingsUpdate, profileUpdate] = await Promise.all([
        settings?.id 
          ? supabase.from('settings').update(settingsData).eq('id', settings.id)
          : supabase.from('settings').insert(settingsData),
        profile?.id
          ? supabase.from('profiles').update({ niche }).eq('id', profile.id)
          : Promise.resolve({ error: null })
      ]);

      if (settingsUpdate.error) throw settingsUpdate.error;
      if (profileUpdate.error) throw profileUpdate.error;

      toast.success('Artifact Identity updated');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Error updating settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Dynamic Style Injection for Live Preview */}
      <style jsx global>{`
        :root {
          --color-gold: ${formData.accent_color};
          --color-bg: ${formData.bg_color};
        }
      `}</style>
      
      {/* Action Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-white/5">
        <div className="flex items-center gap-2 text-white/40">
          <Info size={16} />
          <span className="text-xs uppercase tracking-widest font-medium">Changes apply instantly to the public site</span>
        </div>

        <button
          id="save-settings-btn"
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg shadow-gold-500/10"
          style={{ 
            background: `linear-gradient(135deg, ${formData.accent_color}, ${formData.accent_color}dd)`, 
            color: '#000' 
          }}
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
          <span>{loading ? 'Saving...' : 'Update Production Site'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Profile Info */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <User size={16} style={{ color: formData.accent_color }} />
            <h2 className="text-xs tracking-widest uppercase text-white/40 font-semibold">Artist Profile</h2>
          </div>
          
          <div className="space-y-6 glass p-8 rounded-2xl border border-white/5 shadow-2xl">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group cursor-pointer w-40 h-40">
                {/* User's requested glow effect */}
                <div 
                  className="absolute -inset-3 rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity" 
                  style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.4), rgba(201,168,76,0.05))' }}
                />
                
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-gold-500/50 transition-colors">
                  {formData.profile_url ? (
                    <Image src={formData.profile_url} alt="Profile" fill className="object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-white/20">
                      <User size={40} strokeWidth={1} />
                      <span className="text-[10px] mt-2 uppercase tracking-widest font-bold">No Photo</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer text-[10px] font-bold text-white uppercase tracking-widest bg-gold-500/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                      {uploading ? 'Processing...' : 'Upload Photto'}
                      <input type="file" className="hidden" accept="image/*" onChange={handleProfileUpload} disabled={uploading} />
                    </label>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium">Profile Image</p>
            </div>

            {/* SaaS Niche & Template Selection */}
            <div className="pt-6 border-t border-white/5 space-y-6">
              <div>
                <label className="block text-xs font-medium text-white/40 mb-3 uppercase tracking-wider text-blue-400">System Identity (Niche)</label>
                <div className="grid grid-cols-2 gap-3">
                  {['filmmaker', 'programmer', 'photographer', 'sound_editor', 'musician'].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, niche: n as Niche }))}
                      className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${
                        formData.niche === n 
                          ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' 
                          : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                      }`}
                    >
                      {n.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/40 mb-3 uppercase tracking-wider">OS Template Style</label>
                <select 
                  className="form-input"
                  value={formData.template_id || 'classic'}
                  onChange={(e) => setFormData(prev => ({ ...prev, template_id: e.target.value }))}
                >
                  <option value="classic">Cinematic OS (Classic)</option>
                  <option value="terminal">Terminal OS (Hacker)</option>
                  <option value="gallery">Gallery OS (Minimal)</option>
                  <option value="studio">Studio OS (Vibrant)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">Professional Name</label>
              <input
                type="text"
                required
                placeholder="e.g. John Director"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">Bio / Intro</label>
              <textarea
                placeholder="Briefly describe your style and mission..."
                className="form-input h-32"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              />
            </div>

            <div className="pt-4 space-y-4">
              <label className="block text-xs font-medium text-white/40 uppercase tracking-wider">Contact & Social</label>
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input
                  type="email"
                  placeholder="Public email address"
                  className="form-input pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input
                  type="text"
                  placeholder="Public phone number (optional)"
                  className="form-input pl-10"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input
                  type="text"
                  placeholder="Instagram handle (without @)"
                  className="form-input pl-10"
                  value={formData.instagram}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Hero & Brand */}
        <div className="space-y-10">
          <section className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Type size={16} style={{ color: formData.accent_color }} />
              <h2 className="text-xs tracking-widest uppercase text-white/40 font-semibold">Hero Branding</h2>
            </div>
            
            <div className="space-y-6 glass p-8 rounded-2xl border border-white/5 shadow-2xl">
              <div>
                <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">Hero Headline</label>
                <textarea
                  required
                  placeholder="e.g. Crafting stories&#10;that move the world."
                  className="form-input h-28 italic"
                  style={{ 
                    fontFamily: formData.font_family === 'playfair' ? 'var(--font-playfair)' : 'var(--font-inter)', 
                    fontSize: '18px' 
                  }}
                  value={formData.hero_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, hero_text: e.target.value }))}
                />
                <p className="text-[10px] mt-2 text-white/20 italic">Tip: Use New Line to break text cinematicly.</p>
              </div>

              <div className="pt-4">
                <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">Hero Background Video</label>
                <div className="relative">
                  <Video className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="url"
                    placeholder="YouTube/Vimeo/Drive URL"
                    className="form-input pl-10"
                    value={formData.hero_video_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, hero_video_url: e.target.value }))}
                  />
                </div>
                {formData.hero_video_url && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-white/10 aspect-video bg-black/40 relative group">
                    <iframe
                      src={processVideoUrl(formData.hero_video_url).embedUrl}
                      className="w-full h-full relative z-10"
                      style={{ border: 'none' }}
                    />
                  </div>
                )}
                <p className="text-[10px] mt-2 text-white/20 italic">Tip: 4K YouTube & Vimeo Staff Picks recommended for cinematic quality.</p>
              </div>
            </div>
          </section>

          {/* Design Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: formData.accent_color }} />
                <h2 className="text-xs tracking-widest uppercase text-white/40 font-semibold">Appearance & Brand</h2>
              </div>
              <button
                type="button"
                onClick={handleResetColors}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[10px] text-white/40 hover:text-white transition-all border border-white/5"
              >
                <RotateCcw size={12} />
                <span>Reset to Defaults</span>
              </button>
            </div>
            
            <div className="space-y-8 glass p-8 rounded-2xl border border-white/5 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-medium text-white/40 mb-3 uppercase tracking-widest">Accent Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none"
                      value={formData.accent_color}
                      onChange={(e) => setFormData(prev => ({ ...prev, accent_color: e.target.value }))}
                    />
                    <span className="text-xs font-mono text-white/60">{formData.accent_color}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-white/40 mb-3 uppercase tracking-widest">Background</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none"
                      value={formData.bg_color}
                      onChange={(e) => setFormData(prev => ({ ...prev, bg_color: e.target.value }))}
                    />
                    <span className="text-xs font-mono text-white/60">{formData.bg_color}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-white/40 mb-4 uppercase tracking-widest">Typography Style</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, font_family: 'playfair' }))}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      formData.font_family === 'playfair' 
                        ? 'bg-white/10 border-white/20' 
                        : 'bg-transparent border-white/5 opacity-40 grayscale'
                    }`}
                  >
                    <span className="block text-xl" style={{ fontFamily: 'var(--font-playfair)' }}>Abc</span>
                    <span className="text-[10px] uppercase tracking-widest mt-1 block">Classic Serif</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, font_family: 'inter' }))}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      formData.font_family === 'inter' 
                        ? 'bg-white/10 border-white/20' 
                        : 'bg-transparent border-white/5 opacity-40 grayscale'
                    }`}
                  >
                    <span className="block text-xl" style={{ fontFamily: 'var(--font-inter)' }}>Abc</span>
                    <span className="text-[10px] uppercase tracking-widest mt-1 block">Modern Sans</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-[10px] font-medium text-white/40 uppercase tracking-widest">Film Grain Intensity</label>
                  <span className="text-[10px] font-mono text-white/40">{(formData.grain_opacity * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.2"
                  step="0.01"
                  className="w-full accent-gold-500 bg-white/5 h-1 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: formData.accent_color }}
                  value={formData.grain_opacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, grain_opacity: parseFloat(e.target.value) }))}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
