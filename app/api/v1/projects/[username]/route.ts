import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// We use the standard supabase-js client here because this is a public API route
// and doesn't need the SSR/Cookie complexities of the auth client for read-only data.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // 1. Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, niche')
      .eq('username', username)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // 2. Fetch public projects and their collaborators
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select(`
        id, 
        title, 
        slug, 
        description, 
        role, 
        video_url, 
        thumbnail_url,
        project_collaborators(
          role_title,
          profile:profiles(username, full_name, avatar_url)
        )
      `)
      .eq('user_id', profile.id)
      .order('display_order', { ascending: true });

    if (projectsError) {
      return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 });
    }

    // Format response
    const responseData = {
      profile: {
        username,
        name: profile.full_name,
        niche: profile.niche,
        avatar: profile.avatar_url,
      },
      projects: projects.map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        role: p.role,
        media: {
          video: p.video_url,
          thumbnail: p.thumbnail_url,
        },
        crew: p.project_collaborators?.map((c: any) => ({
          role: c.role_title,
          user: {
            username: c.profile?.username,
            name: c.profile?.full_name,
            avatar: c.profile?.avatar_url
          }
        })) || []
      }))
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
