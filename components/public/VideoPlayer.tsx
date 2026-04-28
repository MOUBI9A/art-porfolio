'use client';

import { useState, useRef } from 'react';
import { processVideoUrl } from '@/lib/video';

interface Props {
  videoUrl: string;
  thumbnailUrl?: string | null;
  title: string;
}

export default function VideoPlayer({ videoUrl, thumbnailUrl, title }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { embedUrl, type } = processVideoUrl(videoUrl);
  const hasVideo = !!embedUrl && type !== 'unknown';

  const placeholderThumb =
    thumbnailUrl ??
    `https://placehold.co/1280x720/111111/333333?text=${encodeURIComponent(title)}`;

  if (!hasVideo || !videoUrl) {
    return (
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{ aspectRatio: '16/9', background: '#111' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={placeholderThumb}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden relative"
      style={{ aspectRatio: '16/9', background: '#000' }}
    >
      {!isPlaying ? (
        /* Thumbnail + play button overlay */
        <button
          id={`play-video-${title.slice(0, 10).replace(/\s/g, '-').toLowerCase()}`}
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 w-full h-full group"
          aria-label={`Play ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={placeholderThumb}
            alt={`${title} thumbnail`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)',
            }}
          />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{
                background: 'rgba(201,168,76,0.9)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 0 40px rgba(201,168,76,0.3)',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#0a0a0a">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {/* Video type badge */}
          <div
            className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs uppercase tracking-wider"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {type === 'google_drive' ? 'Drive' : type === 'youtube' ? 'YouTube' : 'Vimeo'}
          </div>
        </button>
      ) : (
        /* Lazy-loaded iframe */
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        />
      )}
    </div>
  );
}
