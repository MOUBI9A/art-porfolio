import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const [
    { count: projectCount },
    { data: recentProjectsData },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
    supabase
      .from('projects')
      .select('id, title, thumbnail_url, created_at, role')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(4),
  ]);

  const recentProjects = recentProjectsData as any[];

  const stats = [
    { label: 'My Projects', value: projectCount ?? 0, href: '/dashboard/projects' },
  ];

  return (
    <div className="p-8 max-w-5xl w-full">
      {/* Header */}
      <div className="mb-10">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-1"
          style={{ color: 'var(--color-gold)' }}
        >
          Overview
        </p>
        <h1
          className="text-3xl font-medium"
          style={{ fontFamily: 'var(--font-playfair)', color: '#fff' }}
        >
          Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="glass-strong rounded-xl p-6 hover:border-gold-500 transition-colors duration-200"
            style={{ borderColor: 'rgba(201,168,76,0.15)' }}
          >
            <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
              {stat.label}
            </p>
            <p className="text-4xl font-light" style={{ color: '#fff', fontFamily: 'var(--font-playfair)' }}>
              {stat.value}
            </p>
          </Link>
        ))}

        <Link
          href="/dashboard/projects/new"
          className="rounded-xl p-6 flex flex-col justify-between transition-all duration-200 hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
            border: '1px solid rgba(201,168,76,0.25)',
          }}
        >
          <p className="text-sm mb-2" style={{ color: 'var(--color-gold)' }}>
            Quick Action
          </p>
          <p className="text-lg font-medium text-white">+ New Project</p>
        </Link>

        <Link
          href="/dashboard/settings"
          className="glass-strong rounded-xl p-6 flex flex-col justify-between transition-colors duration-200"
        >
          <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
            Quick Action
          </p>
          <p className="text-lg font-medium text-white">Edit Profile</p>
        </Link>
      </div>

      {/* Recent projects */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-medium tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
            Recent Projects
          </h2>
          <Link
            href="/dashboard/projects"
            className="text-xs transition-colors duration-200"
            style={{ color: 'var(--color-gold)' }}
          >
            View all →
          </Link>
        </div>

        {!recentProjects || recentProjects.length === 0 ? (
          <div
            className="glass rounded-xl p-10 text-center"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <p className="text-lg mb-3">No projects yet</p>
            <Link
              href="/dashboard/projects/new"
              className="inline-block text-sm px-5 py-2 rounded-lg transition-colors duration-200"
              style={{
                background: 'rgba(201,168,76,0.12)',
                color: 'var(--color-gold)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              Create your first project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentProjects.map((p) => (
              <Link
                key={p.id}
                href={`/dashboard/projects/${p.id}`}
                className="glass rounded-xl overflow-hidden flex items-center gap-4 p-4 transition-all duration-200 hover:border-white/10"
              >
                {p.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.thumbnail_url}
                    alt={p.title}
                    className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                ) : (
                  <div
                    className="w-16 h-12 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(201,168,76,0.1)' }}
                  >
                    <span style={{ fontSize: 20 }}>🎬</span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{p.title}</p>
                  {p.role && (
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-gold)' }}>
                      {p.role}
                    </p>
                  )}
                </div>
                <span className="ml-auto text-white/20 flex-shrink-0">→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
