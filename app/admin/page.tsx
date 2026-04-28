import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = { title: 'Super Admin Command Center' };

export default async function SuperAdminPage() {
  const supabase = await createClient();
  
  // 1. Verify Super Admin Access
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'super_admin') {
    // If you are not a super admin, we redirect you to your user dashboard
    redirect('/dashboard');
  }

  // 2. Fetch Global Stats
  const [
    { count: totalUsers },
    { count: totalProjects },
    { data: recentProfiles }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(10)
  ]);

  return (
    <div className="p-8 max-w-6xl mx-auto bg-black min-h-screen text-white font-mono">
      <div className="mb-12 border-b border-white/10 pb-8">
        <h1 className="text-4xl font-bold tracking-tighter text-red-500 uppercase">ArtifactOS // Command Center</h1>
        <p className="text-gray-500 mt-2">Authenticated as: {user.email} [SUPER_ADMIN]</p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Total Creative Souls</p>
          <p className="text-5xl font-bold">{totalUsers ?? 0}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Global Artifacts</p>
          <p className="text-5xl font-bold">{totalProjects ?? 0}</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl">
          <p className="text-xs text-red-500 uppercase tracking-widest mb-2">System Status</p>
          <p className="text-5xl font-bold text-green-500 animate-pulse">OPTIMAL</p>
        </div>
      </div>

      {/* User Management */}
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        RECENT ENTITIES
      </h2>
      
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-white/5 text-gray-500 uppercase text-[10px] tracking-widest">
              <th className="p-4">Username</th>
              <th className="p-4">Niche</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {recentProfiles?.map((p) => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold">{p.username}</td>
                <td className="p-4 uppercase text-xs text-blue-400">{p.niche}</td>
                <td className="p-4 text-gray-500">{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold">ACTIVE</span>
                </td>
                <td className="p-4">
                  <Link href={`/u/${p.username}`} className="text-gray-400 hover:text-white underline underline-offset-4">View Brain</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
