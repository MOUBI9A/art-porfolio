'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Film, 
  Settings, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  User
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

interface SidebarProps {
  userEmail: string;
}

export default function Sidebar({ userEmail }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [username, setUsername] = useState<string | null>(null);
  const [siteUrl, setSiteUrl] = useState<string>('');

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();
        if (data) {
          setUsername(data.username);
          
          // Construct Dynamic Pro URL
          if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            const protocol = window.location.protocol;
            
            // If on localhost or vercel preview, stay on subpath
            if (hostname === 'localhost' || hostname.includes('vercel.app')) {
              setSiteUrl(`/u/${data.username}`);
            } else {
              // Production: use subdomain
              setSiteUrl(`${protocol}//${data.username}.${hostname}`);
            }
          }
        }
      }
    }
    fetchProfile();
  }, [supabase]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Logged out');
      router.push('/auth/login');
      router.refresh();
    }
  };

  const navItems = [
    { 
      label: 'Overview', 
      href: '/dashboard', 
      icon: LayoutDashboard 
    },
    { 
      label: 'Projects', 
      href: '/dashboard/projects', 
      icon: Film 
    },
    { 
      label: 'Experience', 
      href: '/dashboard/experience', 
      icon: User 
    },
    { 
      label: 'Site Settings', 
      href: '/dashboard/settings', 
      icon: Settings 
    },
  ];

  return (
    <aside 
      className="w-64 h-screen sticky top-0 flex flex-col border-r"
      style={{ 
        background: '#0a0a0a', 
        borderColor: 'rgba(255,255,255,0.06)' 
      }}
    >
      {/* Brand */}
      <div className="p-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-black"
            style={{ background: 'var(--color-gold)' }}
          >
            A
          </div>
          <span className="text-xl font-medium tracking-tight text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
            ArtifactOS
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* Profile/Footer */}
      <div className="p-4 mt-auto border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3 px-3 py-4 mb-2">
          <div className="w-8 h-8 rounded-full bg-charcoal-700 flex items-center justify-center text-white/40">
            <User size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{userEmail.split('@')[0]}</p>
            <p className="text-xs text-white/40 truncate">{userEmail}</p>
          </div>
        </div>

        <Link 
          href={username ? `/u/${username}` : "/"} 
          target="_blank"
          className="sidebar-link mb-1 group"
        >
          <ExternalLink size={18} className="group-hover:text-gold-500 transition-all duration-300" />
          <span>View Site</span>
          {username && (
            <span className="ml-auto text-[8px] opacity-0 group-hover:opacity-20 font-mono tracking-tighter uppercase transition-opacity">
              {username}.artifact.os
            </span>
          )}
        </Link>

        <button 
          onClick={handleLogout}
          className="sidebar-link w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
