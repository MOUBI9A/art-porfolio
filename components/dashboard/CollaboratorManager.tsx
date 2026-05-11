'use client';

import { useState, useEffect, useTransition } from 'react';
import { searchProfiles, addCollaborator, removeCollaborator, getProjectCollaborators } from '@/app/actions/collaborators';
import { Search, UserPlus, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ProjectCollaborator } from '@/lib/types';
import Image from 'next/image';

interface Props {
  projectId: string;
}

export default function CollaboratorManager({ projectId }: Props) {
  const [collaborators, setCollaborators] = useState<ProjectCollaborator[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  const [roleTitle, setRoleTitle] = useState('');
  
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function loadCollaborators() {
      const { collaborators: data } = await getProjectCollaborators(projectId);
      setCollaborators(data || []);
      setLoading(false);
    }
    loadCollaborators();
  }, [projectId]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setSearching(true);
        const { profiles, error } = await searchProfiles(searchQuery);
        if (!error) {
          setSearchResults(profiles || []);
        }
        setSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleAdd = () => {
    if (!selectedProfile || !roleTitle) return;

    startTransition(async () => {
      const { success, error } = await addCollaborator(projectId, selectedProfile.id, roleTitle);
      if (success) {
        toast.success('Collaborator added');
        setSearchQuery('');
        setSelectedProfile(null);
        setRoleTitle('');
        const { collaborators: updated } = await getProjectCollaborators(projectId);
        setCollaborators(updated || []);
      } else {
        toast.error(error || 'Failed to add collaborator');
      }
    });
  };

  const handleRemove = (collabId: string) => {
    startTransition(async () => {
      const { success, error } = await removeCollaborator(collabId, projectId);
      if (success) {
        toast.success('Collaborator removed');
        setCollaborators(prev => prev.filter(c => c.id !== collabId));
      } else {
        toast.error(error || 'Failed to remove collaborator');
      }
    });
  };

  if (loading) {
    return <div className="p-6 glass rounded-xl flex justify-center"><Loader2 className="animate-spin text-white/50" /></div>;
  }

  return (
    <div className="glass rounded-xl p-6 mt-8">
      <h3 className="text-lg font-medium text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Crew / Collaborators</h3>
      
      {/* Existing Collaborators */}
      <div className="space-y-3 mb-8">
        {collaborators.length === 0 ? (
          <p className="text-sm text-white/40">No collaborators added yet.</p>
        ) : (
          collaborators.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/20 relative">
                  {c.profile?.avatar_url ? (
                    <Image src={c.profile.avatar_url} alt="avatar" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white/50">
                      {(c.profile?.full_name || c.profile?.username || '?').charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{c.profile?.full_name || c.profile?.username}</p>
                  <p className="text-xs text-white/50">{c.role_title}</p>
                </div>
              </div>
              <button 
                onClick={() => handleRemove(c.id)} 
                disabled={isPending}
                className="p-2 text-white/40 hover:text-red-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add New Collaborator Form */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-sm font-medium text-white/70 mb-4">Add Crew Member</h4>
        
        {!selectedProfile ? (
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-white/30" size={16} />
            <input
              type="text"
              placeholder="Search by username or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors"
            />
            {searching && <Loader2 className="absolute right-3 top-3.5 text-white/30 animate-spin" size={16} />}
            
            {searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-[#111] border border-white/10 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {searchResults.map(profile => (
                  <button
                    key={profile.id}
                    onClick={() => {
                      setSelectedProfile(profile);
                      setSearchResults([]);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-white/5 text-left transition-colors border-b border-white/5 last:border-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden relative">
                       {profile.avatar_url && <Image src={profile.avatar_url} fill className="object-cover" alt="avatar" />}
                    </div>
                    <div>
                      <p className="text-sm text-white">{profile.full_name || profile.username}</p>
                      <p className="text-xs text-white/40 capitalize">{profile.niche}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-[var(--color-gold)]/30">
               <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden relative">
                  {selectedProfile.avatar_url && <Image src={selectedProfile.avatar_url} fill className="object-cover" alt="avatar" />}
               </div>
               <div className="flex-1">
                 <p className="text-sm text-white">{selectedProfile.full_name || selectedProfile.username}</p>
                 <p className="text-xs text-white/40 capitalize">{selectedProfile.niche}</p>
               </div>
               <button onClick={() => setSelectedProfile(null)} className="text-white/40 hover:text-white"><X size={16}/></button>
             </div>
             
             <div className="flex gap-3">
               <input
                 type="text"
                 placeholder="Role (e.g. Director of Photography)"
                 value={roleTitle}
                 onChange={(e) => setRoleTitle(e.target.value)}
                 className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors"
               />
               <button
                 onClick={handleAdd}
                 disabled={isPending || !roleTitle}
                 className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-gold)] text-black font-medium disabled:opacity-50 transition-opacity"
               >
                 {isPending ? <Loader2 className="animate-spin" size={18} /> : <UserPlus size={18} />}
                 Add
               </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}