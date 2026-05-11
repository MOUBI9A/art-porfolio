import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 text-center">
      <div className="space-y-6 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-8xl md:text-9xl font-serif italic text-white/20 select-none">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-serif">Lost in the Edit</h2>
          <p className="text-white/60 font-sans">
            The page you are looking for has been cut from the final sequence or moved to another reel.
          </p>
        </div>

        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-block px-8 py-3 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 font-sans text-sm tracking-widest uppercase"
          >
            Return to Base
          </Link>
        </div>
      </div>
      
      {/* Decorative elements to match cinematic vibe */}
      <div className="absolute bottom-8 left-8 text-[10px] tracking-[0.2em] text-white/20 uppercase font-sans">
        Status: Scene Not Found
      </div>
      <div className="absolute top-8 right-8 text-[10px] tracking-[0.2em] text-white/20 uppercase font-sans">
        [ REC ]
      </div>
    </div>
  );
}
