'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function searchProfiles(query: string) {
  if (!query || query.length < 2) return { profiles: [] };
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  // Search by username or full_name, excluding the current user
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, full_name, avatar_url, niche')
    .neq('id', user.id)
    .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
    .limit(5);

  if (error) {
    console.error('Error searching profiles:', error);
    return { error: 'Failed to search profiles' };
  }

  return { profiles: data };
}

export async function addCollaborator(projectId: string, profileId: string, roleTitle: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  // Verify the user owns the project
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('id')
    .eq('id', projectId)
    .eq('user_id', user.id)
    .single();

  if (projectError || !project) {
    return { error: 'Project not found or unauthorized' };
  }

  const { error } = await supabase
    .from('project_collaborators')
    .insert({
      project_id: projectId,
      profile_id: profileId,
      role_title: roleTitle
    });

  if (error) {
    console.error('Error adding collaborator:', error);
    return { error: error.message };
  }

  // Assuming dashboard is at /dashboard/projects/[id]
  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/u/[username]`, 'page'); // Over-revalidating for safety on public pages
  
  return { success: true };
}

export async function removeCollaborator(collaboratorId: string, projectId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  // RLS will enforce that only the project owner can delete, 
  // but we can also double check
  const { error } = await supabase
    .from('project_collaborators')
    .delete()
    .eq('id', collaboratorId)
    .eq('project_id', projectId);

  if (error) {
    console.error('Error removing collaborator:', error);
    return { error: 'Failed to remove collaborator' };
  }

  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/u/[username]`, 'page');
  
  return { success: true };
}

export async function getProjectCollaborators(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('project_collaborators')
    .select('*, profile:profiles(id, username, full_name, avatar_url, niche)')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching collaborators:', error);
    return { collaborators: [] };
  }

  return { collaborators: data };
}