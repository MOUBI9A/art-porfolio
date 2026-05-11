import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

let supabaseInstance: any = null;
const getSupabase = () => {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase environment variables are missing');
    }
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseInstance;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profile_id, project_id, page_path, referrer } = body;

    if (!profile_id || !page_path) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = getSupabase();

    // Get IP for hashing
    const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

    // Get User Agent
    const userAgent = request.headers.get('user-agent') || '';
    
    const { error } = await supabase.from('page_views').insert({
      profile_id,
      project_id: project_id || null,
      page_path,
      referrer,
      ip_hash: ipHash,
      browser: userAgent.substring(0, 255), 
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
