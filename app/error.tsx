'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 text-center">
      <div className="space-y-6 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-8xl md:text-9xl font-serif italic text-white/20 select-none">500</h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-serif">Static on the Line</h2>
          <p className="text-white/60 font-sans text-sm">
            Something went wrong during playback. We encountered an unexpected technical glitch.
          </p>
          {error.digest && (
            <p className="text-white/20 font-mono text-[10px] mt-4 uppercase tracking-tighter">
              Error Hash: {error.digest}
            </p>
          )}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-white text-black hover:bg-white/90 transition-all duration-300 font-sans text-sm tracking-widest uppercase"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-8 py-3 border border-white/20 hover:bg-white/10 transition-all duration-300 font-sans text-sm tracking-widest uppercase"
          >
            Go Home
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-8 text-[10px] tracking-[0.2em] text-red-500 uppercase font-sans animate-pulse">
        System Warning: Unexpected Interrupt
      </div>
    </div>
  );
}
