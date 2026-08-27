import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0c0b0e]/80 backdrop-blur-xl border-b border-white/[0.08] px-6 py-4 transition-all selection:bg-emerald-500 selection:text-black">
      {/* Top subtle glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-xl font-black tracking-tight text-white uppercase font-mono">
            BIJLIRIDE<span className="text-emerald-400">.</span>
          </span>
        </a>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-zinc-400">
          <a href="#hero" className="hover:text-emerald-400 transition-colors">
            Architecture
          </a>
          <a href="#specs" className="hover:text-emerald-400 transition-colors">
            Feature
          </a>
          <a href="#features" className="hover:text-emerald-400 transition-colors">
            Telemetry
          </a>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:translate-y-0">
            Book Ride ↗
          </button>
        </div>
      </div>
    </nav>
  );
}