'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Profile } from '@/lib/types';

interface NetworkMatrixProps {
  profiles: Profile[];
}

export default function NetworkMatrix({ profiles }: NetworkMatrixProps) {
  return (
    <section id="featured" className="py-40 bg-black border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/[0.05] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-32 relative z-10">
        <div className="max-w-3xl">
          <span className="text-luxury text-[10px] text-gold-500 mb-6 block">The Collaborative Network</span>
          <h2 className="text-4xl md:text-7xl font-serif font-light text-white leading-none">
            A Grid of <br/>Creative Nodes.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5 border-y border-white/5">
        {profiles.length > 0 ? (
          profiles.map((profile, i) => (
            <Link 
              key={profile.id}
              href={`/u/${profile.username}`}
              className="group relative aspect-square bg-[#050505] overflow-hidden"
            >
              {profile.avatar_url && (
                <Image 
                  src={profile.avatar_url}
                  alt={profile.full_name || ''}
                  fill
                  className="object-cover opacity-20 grayscale group-hover:opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
              )}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-luxury text-[7px] text-gold-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                  {profile.niche.toUpperCase()}
                </span>
                <h4 className="text-lg font-serif font-light text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {profile.full_name}
                </h4>
              </div>
            </Link>
          ))
        ) : (
          [...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-[#050505] animate-pulse" />
          ))
        )}
      </div>
    </section>
  );
}
