import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-gray-950/70 backdrop-blur-md border-b border-gray-800/60 overflow-hidden selection:bg-emerald-500 selection:text-black font-sans antialiased">
      {/* Matching Studio Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080709] via-[#0c0b0e] to-[#060508] pointer-events-none" />

      {/* Ambient Lighting */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[220px] bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand & Telemetry Status */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
            
                <span className="text-xl font-black tracking-tight text-white uppercase">
                  BIJLIRIDE<span className="text-emerald-400">.</span>
                </span>
              </div>
              <p className="mt-4 text-xs leading-relaxed max-w-sm text-zinc-400">
                Next-generation urban electric mobility platform. Modular powertrain architecture, rapid dock swapping, and intelligent cloud telemetry.
              </p>
            </div>

          
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-300">
              Platform
            </span>
            <ul className="mt-4 space-y-2.5 text-xs font-mono">
              <li><a href="#hero" className="hover:text-emerald-400 transition-colors">EV Architecture</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Smart Telemetry</a></li>
              <li><a href="#specs" className="hover:text-emerald-400 transition-colors">PMSM Powertrain</a></li>
              <li><a href="#hubs" className="hover:text-emerald-400 transition-colors">Swap Stations</a></li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-300">
              Ecosystem
            </span>
            <ul className="mt-4 space-y-2.5 text-xs font-mono">
              <li><a href="#app" className="hover:text-emerald-400 transition-colors">Bijli Mobile App</a></li>
              <li><a href="#fleet" className="hover:text-emerald-400 transition-colors">Enterprise Fleet</a></li>
              <li><a href="#battery" className="hover:text-emerald-400 transition-colors">Battery As A Service</a></li>
              <li><a href="#firmware" className="hover:text-emerald-400 transition-colors">OTA Firmware</a></li>
            </ul>
          </div>

          {/* Quick Links Column 3 */}
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-300">
              Protocol
            </span>
            <ul className="mt-4 space-y-2.5 text-xs font-mono">
              <li><a href="#privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              <li><a href="#diagnostics" className="hover:text-emerald-400 transition-colors">Security Audit</a></li>
              <li><a href="#support" className="hover:text-emerald-400 transition-colors">Hub Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <p>© 2026 Bijliride Mobility Inc. All architecture rights reserved.</p>
       
          
        </div>
      </div>
    </footer>
  );
}