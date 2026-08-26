import React from 'react';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gray-900/30 px-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">Smart Connectivity</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 leading-tight">
            Control Everything via Smartphone
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Keyless ignition, real-time GPS tracking, battery health diagnostics, and turn-by-turn navigation directly on your EV cluster console.
          </p>

          <ul className="mt-8 space-y-4 text-gray-300">
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Over-the-air (OTA) performance updates
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Anti-theft geofencing alarms
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Smart regenerative braking mode
            </li>
          </ul>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-gray-800 bg-gradient-to-br from-emerald-950/20 to-gray-900 p-8 flex items-center justify-center min-h-[350px]">
          <div className="text-center">
            <div className="text-6xl font-black text-emerald-400 tracking-wider">APP UI</div>
            <p className="text-sm text-gray-500 mt-2">Smart Dashboard Preview</p>
          </div>
        </div>
      </div>
    </section>
  );
}