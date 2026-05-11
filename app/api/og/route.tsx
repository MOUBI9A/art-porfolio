import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return new Response('Username is required', { status: 400 });
    }

    // Initialize Supabase (Read-only)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Fetch user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url, niche')
      .eq('username', username)
      .single();

    if (!profile) {
      return new Response('Profile not found', { status: 404 });
    }

    const name = profile.full_name || username;
    const niche = (profile.niche || 'creative').replace('_', ' ');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050505',
            backgroundImage: 'radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)',
            padding: '40px',
            position: 'relative',
          }}
        >
          {/* Logo element */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#c9a84c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              A
            </div>
            <div style={{ color: '#fff', fontSize: '20px', fontWeight: '500', letterSpacing: '-0.02em' }}>
              ArtifactOS
            </div>
          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '100px',
                  border: '4px solid #c9a84c',
                  marginBottom: '24px',
                  objectFit: 'cover',
                }}
              />
            )}
            
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '8px',
                letterSpacing: '-0.04em',
              }}
            >
              {name}
            </h1>
            
            <div
              style={{
                fontSize: '24px',
                color: '#c9a84c',
                textTransform: 'uppercase',
                letterSpacing: '0.4em',
                fontWeight: '600',
              }}
            >
              {niche}
            </div>
          </div>

          {/* Footer badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              color: 'rgba(255,255,255,0.2)',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }}
          >
            Cinematic Portfolio // Identity Verified
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
