'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { ProjectFormData } from '@/lib/types';
import { processVideoUrl } from '@/lib/video';

export async function createProjectAction(data: ProjectFormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const { type } = processVideoUrl(data.video_url);

  const payload = {
    ...data,
    user_id: user.id,
    video_type: type === 'unknown' ? null : type,
  };

  const { data: newProject, error } = await supabase
    .from('projects')
    .insert(payload)
    .select('id')
    .single();

  if (error) {
    console.error('Error creating project:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/projects');
  // Return the newly created project ID so we can navigate to it for editing collaborators
  return { success: true, projectId: newProject.id };
}

export async function updateProjectAction(id: string, data: ProjectFormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const { type } = processVideoUrl(data.video_url);

  const payload = {
    ...data,
    video_type: type === 'unknown' ? null : type,
  };

  const { error } = await supabase
    .from('projects')
    .update(payload)
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error updating project:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/projects');
  revalidatePath(`/dashboard/projects/${id}`);
  
  // Revalidate the public profile page. 
  // Note: For a real app we might want to get the profile username first to revalidate specifically
  revalidatePath('/u/[username]', 'page');

  return { success: true };
}

export async function deleteProjectAction(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting project:', error);
    return { error: error.message };
  }

  revalidatePath('/dashboard/projects');
  revalidatePath('/u/[username]', 'page');

  return { success: true };
}