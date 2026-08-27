import React from 'react';
import { motion } from 'framer-motion';

const specs = [
  { label: "Top Speed", value: "115 km/h", sub: "Hyper Mode Enabled" },
  { label: "Certified Range", value: "185 km", sub: "Single Full Charge" },
  { label: "Acceleration", value: "2.9 sec", sub: "0 to 40 km/h" },
  { label: "Fast Charging", value: "20 min", sub: "80% Rapid Boost" },
];

export default function SpecsSection() {
  return (
    <section id="specs" className="py-24 bg-black-950 px-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Engineered for <span className="text-emerald-400">Peak Performance</span>
          </h2>
          <p className="mt-3 text-gray-400">Aerodynamic design meets zero emissions torque.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-gray-900/60 border border-gray-800/80 hover:border-emerald-500/40 transition-all hover:-translate-y-1"
            >
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{item.label}</p>
              <p className="text-4xl font-extrabold text-white mt-2">{item.value}</p>
              <p className="text-xs text-emerald-400/80 mt-2">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}