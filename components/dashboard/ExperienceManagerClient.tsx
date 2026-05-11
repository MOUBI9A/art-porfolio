'use client';

import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  Save, 
  Briefcase,
  Calendar,
  MapPin,
  Loader2,
  X
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Experience } from '@/lib/types';
import toast from 'react-hot-toast';

interface Props {
  initialExperience: Experience[];
  userId: string;
}

export default function ExperienceManagerClient({ initialExperience, userId }: Props) {
  const [experience, setExperience] = useState<Experience[]>(initialExperience);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const supabase = createClient();

  const [newItem, setNewItem] = useState({
    company: '',
    role: '',
    location: '',
    description: '',
    start_date: '',
    end_date: '',
    is_current: false,
    display_order: experience.length,
  });

  const handleAdd = async () => {
    if (!newItem.company || !newItem.role) {
      toast.error('Company and Role are required');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('experience')
        .insert([{ ...newItem, user_id: userId }])
        .select()
        .single();

      if (error) throw error;

      setExperience([...experience, data]);
      setNewItem({
        company: '',
        role: '',
        location: '',
        description: '',
        start_date: '',
        end_date: '',
        is_current: false,
        display_order: experience.length + 1,
      });
      setIsAdding(false);
      toast.success('Experience added');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const { error } = await supabase
        .from('experience')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setExperience(experience.filter(item => item.id !== id));
      toast.success('Deleted successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Trigger */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/40 hover:text-white hover:border-white/20 transition-all group"
        >
          <Plus size={20} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium">Add Work Experience</span>
        </button>
      )}

      {/* Add Form */}
      {isAdding && (
        <div className="glass-strong rounded-2xl p-6 border border-gold-500/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-white">New Experience</h3>
            <button onClick={() => setIsAdding(false)} className="text-white/40 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Company</label>
              <input
                type="text"
                placeholder="e.g. Marvel Studios"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-gold-500/50 outline-none"
                value={newItem.company}
                onChange={e => setNewItem({ ...newItem, company: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Role</label>
              <input
                type="text"
                placeholder="e.g. Lead Cinematographer"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-gold-500/50 outline-none"
                value={newItem.role}
                onChange={e => setNewItem({ ...newItem, role: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Location</label>
              <input
                type="text"
                placeholder="e.g. Los Angeles, CA"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-gold-500/50 outline-none"
                value={newItem.location}
                onChange={e => setNewItem({ ...newItem, location: e.target.value })}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Start Date</label>
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-gold-500/50 outline-none [color-scheme:dark]"
                  value={newItem.start_date}
                  onChange={e => setNewItem({ ...newItem, start_date: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">End Date</label>
                <input
                  type="date"
                  disabled={newItem.is_current}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-gold-500/50 outline-none [color-scheme:dark] disabled:opacity-20"
                  value={newItem.end_date}
                  onChange={e => setNewItem({ ...newItem, end_date: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="hidden"
                checked={newItem.is_current}
                onChange={e => setNewItem({ ...newItem, is_current: e.target.checked, end_date: '' })}
              />
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${newItem.is_current ? 'bg-gold-500 border-gold-500' : 'border-white/20 group-hover:border-white/40'}`}>
                {newItem.is_current && <div className="w-2 h-2 bg-black rounded-sm" />}
              </div>
              <span className="text-sm text-white/60">I currently work here</span>
            </label>
          </div>

          <div className="mb-6">
            <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Description</label>
            <textarea
              rows={3}
              placeholder="Describe your achievements and responsibilities..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-gold-500/50 outline-none resize-none"
              value={newItem.description}
              onChange={e => setNewItem({ ...newItem, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsAdding(false)}
              className="px-6 py-2 rounded-lg text-sm text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={loading}
              className="px-6 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-white/90 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Save Experience
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {experience.map((item) => (
          <div 
            key={item.id}
            className="glass rounded-2xl p-6 flex gap-6 group hover:border-white/10 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/20 flex-shrink-0 group-hover:bg-gold-500/10 group-hover:text-gold-500 transition-colors">
              <Briefcase size={24} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-medium text-white">{item.role}</h4>
                  <p className="text-gold-500/80 font-medium">{item.company}</p>
                </div>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-white/10 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-white/40 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>
                    {item.start_date ? new Date(item.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'N/A'}
                    {' - '}
                    {item.is_current ? 'Present' : item.end_date ? new Date(item.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'N/A'}
                  </span>
                </div>
                {item.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>

              {item.description && (
                <p className="text-sm text-white/60 leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}

        {experience.length === 0 && !isAdding && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-white/20">No experience records found. Add your first one above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
