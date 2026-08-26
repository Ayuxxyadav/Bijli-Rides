import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/70 backdrop-blur-md border-b border-gray-800/60 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xl font-bold tracking-wider text-white">VOLT<span className="text-emerald-400">RIDE</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#hero" className="hover:text-emerald-400 transition-colors">Home</a>
          <a href="#specs" className="hover:text-emerald-400 transition-colors">Specs</a>
          <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
        </div>

        <button className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          Pre-Order
        </button>
      </div>
    </nav>
  );
}