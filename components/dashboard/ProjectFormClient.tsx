'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  Trash2, 
  ArrowLeft, 
  Video, 
  Image as ImageIcon,
  Check,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Project, VideoType } from '@/lib/types';
import { generateSlug } from '@/lib/slug';
import { processVideoUrl } from '@/lib/video';
import toast from 'react-hot-toast';

interface Props {
  mode: 'create' | 'edit';
  project?: Project;
}

export default function ProjectFormClient({ mode, project }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    description: project?.description || '',
    role: project?.role || '',
    video_url: project?.video_url || '',
    thumbnail_url: project?.thumbnail_url || '',
    display_order: project?.display_order ?? 0,
  });

  const [videoPreview, setVideoPreview] = useState<{
    embedUrl: string;
    type: VideoType;
  }>({ embedUrl: '', type: 'unknown' });

  // Auto-slug generation
  useEffect(() => {
    if (mode === 'create' && formData.title) {
      setFormData(prev => ({ ...prev, slug: generateSlug(formData.title) }));
    }
  }, [formData.title, mode]);

  // Video URL processing
  useEffect(() => {
    if (formData.video_url) {
      setVideoPreview(processVideoUrl(formData.video_url));
    } else {
      setVideoPreview({ embedUrl: '', type: 'unknown' });
    }
  }, [formData.video_url]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `thumbnails/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('media') // User needs to create this bucket
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, thumbnail_url: publicUrl }));
      toast.success('Thumbnail uploaded');
    } catch (error: any) {
      toast.error('Error uploading image. Make sure "media" bucket exists and is public.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { type } = processVideoUrl(formData.video_url);
      const payload = {
        ...formData,
        video_type: type === 'unknown' ? null : type,
      };

      let error;
      if (mode === 'create') {
        const { error: err } = await supabase.from('projects').insert(payload);
        error = err;
      } else {
        const { error: err } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', project?.id);
        error = err;
      }

      if (error) throw error;

      toast.success(`Project ${mode === 'create' ? 'created' : 'updated'}`);
      router.push('/dashboard/projects');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Error saving project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    setLoading(true);
    const { error } = await supabase.from('projects').delete().eq('id', project?.id);

    if (error) {
      toast.error('Error deleting project');
      setLoading(false);
    } else {
      toast.success('Project deleted');
      router.push('/dashboard/projects');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Action Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-white/5">
        <Link 
          href="/dashboard/projects" 
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Projects</span>
        </Link>

        <div className="flex gap-3">
          {mode === 'edit' && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          )}
          <button
            id="save-project-btn"
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{ 
              background: 'linear-gradient(135deg, #c9a84c, #b8962e)', 
              color: '#0a0a0a' 
            }}
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            <span>{mode === 'create' ? 'Publish Project' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-xs tracking-widest uppercase text-white/40 font-semibold">General Information</h2>
            
            <div className="space-y-6 glass p-6 rounded-2xl border border-white/5">
              <div>
                <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Midnight Odyssey"
                  className="form-input text-lg font-medium"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">Slug (URL)</label>
                  <input
                    type="text"
                    required
                    placeholder="the-midnight-odyssey"
                    className="form-input"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Director, DOP"
                    className="form-input"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">Description</label>
                <textarea
                  placeholder="Tell the story behind this project..."
                  className="form-input h-32"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs tracking-widest uppercase text-white/40 font-semibold">Video Settings</h2>
              {videoPreview.type !== 'unknown' && (
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-gold-500/20 text-gold-500">
                  <Check size={10} />
                  <span>{videoPreview.type.replace('_', ' ')} Detected</span>
                </div>
              )}
            </div>
            
            <div className="space-y-6 glass p-6 rounded-2xl border border-white/5">
              <div>
                <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">Video URL</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20">
                    <Video size={18} />
                  </div>
                  <input
                    type="url"
                    required
                    placeholder="Paste YouTube, Vimeo or Google Drive link"
                    className="form-input pl-10"
                    value={formData.video_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                  />
                </div>
                <p className="text-[10px] mt-2 text-white/20">We automatically convert your link to an embeddable format.</p>
              </div>

              {videoPreview.embedUrl && (
                <div className="space-y-3">
                  <label className="block text-xs font-medium text-white/40 uppercase tracking-wider">Preview</label>
                  <div className="video-responsive rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                    <iframe
                      src={videoPreview.embedUrl}
                      allow="autoplay; fullscreen"
                      className="opacity-0 transition-opacity duration-700"
                      onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-xs tracking-widest uppercase text-white/40 font-semibold">Media</h2>
            <div className="glass p-6 rounded-2xl border border-white/5 space-y-6">
              <div>
                <label className="block text-xs font-medium text-white/40 mb-3 uppercase tracking-wider">Thumbnail Image</label>
                
                <div className="relative group cursor-pointer aspect-video rounded-xl overflow-hidden bg-white/5 border border-dashed border-white/10 hover:border-gold-500/50 transition-colors">
                  {formData.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={formData.thumbnail_url} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-white/20">
                      <ImageIcon size={32} strokeWidth={1.5} />
                      <span className="text-xs mt-2">No thumbnail</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer text-xs font-medium text-white bg-gold-500 px-4 py-2 rounded-lg">
                      {uploading ? 'Uploading...' : 'Upload New'}
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                    </label>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-[10px] font-medium text-white/20 mb-2 uppercase tracking-wider">Or enter URL manually</label>
                  <input
                    type="text"
                    placeholder="https://image-url.com/image.jpg"
                    className="form-input text-xs"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, thumbnail_url: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs tracking-widest uppercase text-white/40 font-semibold">Settings</h2>
            <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">Display Order</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.display_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                />
                <p className="text-[10px] mt-2 text-white/20">Smaller numbers appear first in the grid.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
