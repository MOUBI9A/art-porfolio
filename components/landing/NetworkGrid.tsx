'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Profile } from '@/lib/types';

interface NetworkGridProps {
  profiles: Profile[];
}

export default function NetworkGrid({ profiles }: NetworkGridProps) {
  return (
    <section className="py-32 bg-black border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-3xl font-serif text-white mb-4">The Live Network</h2>
            <p className="text-white/40 max-w-sm font-light text-sm">Join the ecosystem of elite directors, devs, and visionaries.</p>
          </div>
          <Link href="/auth/signup" className="text-xs tracking-widest uppercase text-gold-500 hover:text-white transition-colors">
            Connect Now →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5">
          {profiles.map((p) => (
            <Link 
              key={p.id}
              href={`/u/${p.username}`}
              className="group relative aspect-square bg-[#050505] flex flex-col justify-center items-center overflow-hidden"
            >
              {p.avatar_url && (
                <Image src={p.avatar_url} alt={p.full_name || ''} fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700" />
              )}
              <div className="relative z-10 text-center p-4">
                 <h4 className="text-sm font-medium text-white group-hover:text-gold-500 transition-colors">{p.full_name}</h4>
                 <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{p.niche.replace('_', ' ')}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
