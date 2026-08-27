
export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-28 bg-[#070707] px-6 relative overflow-hidden text-white selection:bg-emerald-500 selection:text-black font-sans antialiased"
    >
      {/* Layer 1: Matching Studio Dark Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080709] via-[#0c0b0e] to-[#121014] pointer-events-none" />

      {/* Layer 2: Seamless Top Transition Seam (No harsh lines) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Layer 3: Studio Ground Glow & Subtle Emerald Lighting */}
      <div className="absolute right-[5%] bottom-[15%] w-[650px] h-[350px] bg-[#221f26]/35 rounded-[100%] blur-[130px] pointer-events-none" />
      <div className="absolute left-[10%] top-1/3 w-[450px] h-[450px] bg-emerald-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Info Column */}
        <div>
          {/* HUD Status Header */}
          <div className="flex items-center gap-3 mb-4">
         
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-emerald-400 font-bold px-5">
              CONNECTIVITY
            </span>
          </div>

          <h2 className="mt-1.5 text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-[1.1]">
            Control Everything <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-500">
              Via Smartphone
            </span>
          </h2>

          <p className="mt-5 text-[#9e9aa6] text-sm sm:text-base leading-relaxed border-l-2 border-white/10 pl-4 max-w-lg">
            Keyless ignition, real-time GPS tracking, battery health diagnostics, and turn-by-turn navigation directly linked to your digital EV cockpit.
          </p>

          <ul className="mt-8 space-y-4 text-zinc-300 font-mono text-xs sm:text-sm">
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              Over-the-air (OTA) performance updates
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              Anti-theft geofencing alarms & remote kill
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              Smart regenerative braking curve mode
            </li>
          </ul>

          <div className="mt-8">
            <button className="px-7 py-3 rounded-xl bg-[#17151d] hover:bg-[#201e27] text-zinc-200 font-mono text-xs uppercase tracking-wider border border-white/10 transition-all hover:border-emerald-500/40">
              Explore App Interface ↗
            </button>
          </div>
        </div>

        {/* Right EV Scooter Showcase Card */}
        <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-[#141217]/80 backdrop-blur-xl p-3 shadow-2xl transition-all duration-500 hover:border-emerald-500/40">
          
          {/* Top Status Badge */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c0b0e]/90 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono font-semibold tracking-wider text-emerald-300 uppercase">
              Bijliride Telemetry
            </span>
          </div>

          {/* Electric Scooter Image Frame */}
          <div className="relative h-[420px] w-full rounded-2xl overflow-hidden bg-[#0c0b0e]">
            <img
              src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200&auto=format&fit=crop"
              alt="Bijliride Smart Electric Scooter"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Matching Dark Studio Blending Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0e] via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-emerald-500/5 mix-blend-overlay pointer-events-none" />
          </div>

          {/* Bottom Telemetry Mini-Pills */}
          <div className="absolute bottom-6 inset-x-6 z-20 grid grid-cols-3 gap-2">
            <div className="p-3 rounded-xl bg-[#0c0b0e]/90 border border-white/10 backdrop-blur-md text-center">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Top Speed</div>
              <div className="text-sm font-bold text-white mt-0.5 font-mono">85 km/h</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0c0b0e]/90 border border-white/10 backdrop-blur-md text-center">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Range</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5 font-mono">140 KM</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0c0b0e]/90 border border-white/10 backdrop-blur-md text-center">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Swap Dock</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5 font-mono">&lt; 60s</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}