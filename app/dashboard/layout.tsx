import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import { Toaster } from 'react-hot-toast';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#0a0a0a' }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: '14px',
          },
        }}
      />
      <Sidebar userEmail={user.email ?? ''} />
      <main className="flex-1 flex flex-col min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}
