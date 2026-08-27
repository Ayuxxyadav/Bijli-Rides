import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const TOTAL_FRAMES = 151;

const getFrameUrl = (index: number) =>
  `/sequence/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadPercent, setLoadPercent] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.25,
  });

  // 1. Preload Images
  useEffect(() => {
    let loadedCount = 0;
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const checkDone = () => {
      loadedCount++;
      const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      if (!isCancelled) setLoadPercent(percent);

      if (loadedCount >= TOTAL_FRAMES && !isCancelled) {
        imagesRef.current = loadedImages;
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedImages[i] = img;
        checkDone();
      };
      img.onerror = () => {
        checkDone();
      };
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. Canvas Rendering
  useEffect(() => {
    if (!isLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (progress: number) => {
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
      );

      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Studio dark background fill
      ctx.fillStyle = "#0c0b0e";
      ctx.fillRect(0, 0, width, height);

      const isDesktop = width >= 1024;

      if (isDesktop) {
        const targetAreaWidth = width * 0.52;
        const hRatio = targetAreaWidth / img.naturalWidth;
        const vRatio = (height * 0.95) / img.naturalHeight;
        const ratio = Math.min(hRatio, vRatio) * 0.99;

        const drawW = img.naturalWidth * ratio;
        const drawH = img.naturalHeight * ratio;

        const shiftX = width * 0.47 + (targetAreaWidth - drawW) / 2;
        const shiftY = (height - drawH) / 2;

        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, shiftX, shiftY, drawW, drawH);
      } else {
        const hRatio = (width * 0.95) / img.naturalWidth;
        const vRatio = (height * 0.52) / img.naturalHeight;
        const ratio = Math.min(hRatio, vRatio) * 0.92;

        const drawW = img.naturalWidth * ratio;
        const drawH = img.naturalHeight * ratio;

        const shiftX = (width - drawW) / 2;
        const shiftY = height * 0.44 + (height * 0.52 - drawH) / 2;

        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, shiftX, shiftY, drawW, drawH);
      }

      ctx.restore();
    };

    render(smoothProgress.get());
    const unsub = smoothProgress.on("change", (latest) => {
      requestAnimationFrame(() => render(latest));
    });

    const handleResize = () => render(smoothProgress.get());
    window.addEventListener("resize", handleResize);

    return () => {
      unsub();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, smoothProgress]);

  // Storyline Steps Transforms with Consistent Smooth Offsets
  const step1Opacity = useTransform(smoothProgress, [0, 0.14, 0.22], [1, 1, 0]);
  const step1Y = useTransform(smoothProgress, [0, 0.22], [0, -20]);
  const step1Pointer = useTransform(smoothProgress, (v) => (v < 0.22 ? "auto" : "none"));

  const step2Opacity = useTransform(smoothProgress, [0.24, 0.32, 0.46, 0.52], [0, 1, 1, 0]);
  const step2Y = useTransform(smoothProgress, [0.24, 0.32, 0.46, 0.52], [20, 0, 0, -20]);
  const step2Pointer = useTransform(smoothProgress, (v) => (v >= 0.24 && v <= 0.52 ? "auto" : "none"));

  const step3Opacity = useTransform(smoothProgress, [0.54, 0.62, 0.76, 0.82], [0, 1, 1, 0]);
  const step3Y = useTransform(smoothProgress, [0.54, 0.62, 0.76, 0.82], [20, 0, 0, -20]);
  const step3Pointer = useTransform(smoothProgress, (v) => (v >= 0.54 && v <= 0.82 ? "auto" : "none"));

  const step4Opacity = useTransform(smoothProgress, [0.84, 0.92, 1], [0, 1, 1]);
  const step4Y = useTransform(smoothProgress, [0.84, 0.92, 1], [20, 0, 0]);
  const step4Pointer = useTransform(smoothProgress, (v) => (v >= 0.84 ? "auto" : "none"));

  return (
    <div
      id="hero"
      ref={containerRef}
      className="relative h-[480vh] bg-[#0c0b0e] text-white selection:bg-emerald-500 selection:text-black font-sans antialiased"
    >
      <style>{`
        html, body {
          scrollbar-width: none;
          -ms-overflow-style: none;
          background-color: #0c0b0e;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0b0e]">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_#34d399]" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-emerald-400 font-semibold">
              Calibrating Chassis Telemetry
            </span>
          </div>
          <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-150 shadow-[0_0_10px_#10b981]"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-zinc-500 mt-3">{loadPercent}% Synchronized</span>
        </div>
      )}

      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-between bg-[#0c0b0e]">
        {/* Layer 1: Studio Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080709] via-[#0c0b0e] to-[#121014] z-0" />

        {/* Layer 2: Ambient Floor Glow */}
        <div className="absolute right-[2%] bottom-[10%] w-[750px] h-[350px] bg-[#221f26]/35 rounded-[100%] blur-[120px] pointer-events-none z-0" />

        {/* Layer 3: Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-[1] pointer-events-none"
        />

        {/* Layer 4: Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0e] via-[#0c0b0e]/75 to-transparent lg:from-[#0c0b0e] lg:via-[#0c0b0e]/50 lg:to-transparent z-[2] pointer-events-none" />

        {/* Left Side Content Container with CSS Grid Overlay */}
        <div className="relative z-10 w-full lg:w-[48%] h-full grid grid-cols-1 items-center px-6 sm:px-12 md:px-16 lg:pl-20 pointer-events-none">

          {/* STEP 1: Main Platform Pitch */}
          <motion.div
            style={{ opacity: step1Opacity, y: step1Y, pointerEvents: step1Pointer }}
            className="col-start-1 row-start-1 flex flex-col justify-start max-w-xl py-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-emerald-400 font-medium">
                1.BOOT
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-white leading-[1.08] uppercase">
              Electrify Your Ride,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-500 font-extrabold">
                Save More every day
              </span>
            </h1>

            <p className="mt-4 text-[#9e9aa6] text-sm sm:text-base leading-relaxed max-w-lg border-l-2 border-white/10 pl-4">
              Switch to high-density smart electric transit. Engineered with ultra-low running overhead, continuous diagnostics, and sub-60s dock swaps.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <span className="px-3 py-1 rounded-md bg-[#16141c] border border-white/10 text-xs font-mono text-zinc-300">
                ₹0.15/km Cost
              </span>
              <span className="px-3 py-1 rounded-md bg-[#16141c] border border-white/10 text-xs font-mono text-zinc-300">
                AI Diagnostics
              </span>
              <span className="px-3 py-1 rounded-md bg-[#16141c] border border-white/10 text-xs font-mono text-emerald-400">
                Modular Architecture
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button className="relative group px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs font-mono uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] active:scale-[0.98]">
                Book Test Ride ↗
              </button>
              <button className="px-7 py-3.5 rounded-xl bg-[#17151d] hover:bg-[#201e27] text-zinc-200 font-mono text-xs uppercase tracking-wider border border-white/10 transition-all">
                Telemetry Specs
              </button>
            </div>
          </motion.div>

          {/* STEP 2: Powertrain Specs */}
          <motion.div
            style={{ opacity: step2Opacity, y: step2Y, pointerEvents: step2Pointer }}
            className="col-start-1 row-start-1 flex flex-col justify-start max-w-xl py-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-medium">
                2.PROPULSION
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-white tracking-tight uppercase leading-[1.08]">
              Instant PMSM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Hub Motor Core
              </span>
            </h2>

            <p className="mt-4 text-[#9e9aa6] text-sm sm:text-base leading-relaxed max-w-md border-l-2 border-emerald-500/30 pl-4">
              Integrated magnetic stator engineered directly into the wheel rim for lag-free torque delivery and superior hill climbing efficiency.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6 max-w-md">
              <div className="p-4 rounded-xl bg-[#141219]/90 border border-emerald-500/20 backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-400" />
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Peak Power</div>
                <div className="text-3xl font-black text-white mt-1 font-mono tracking-tight">4.2 <span className="text-sm text-emerald-400 font-normal">kW</span></div>
                <div className="text-[10px] font-mono text-emerald-400/80 mt-1">94.8% Efficiency</div>
              </div>

              <div className="p-4 rounded-xl bg-[#141219]/90 border border-white/10 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Wheel Torque</div>
                <div className="text-3xl font-black text-emerald-400 mt-1 font-mono tracking-tight">85 <span className="text-sm text-white font-normal">Nm</span></div>
                <div className="text-[10px] font-mono text-zinc-400 mt-1">0-40 in 3.1s</div>
              </div>
            </div>
          </motion.div>

          {/* STEP 3: Energy & Intelligence */}
          <motion.div
            style={{ opacity: step3Opacity, y: step3Y, pointerEvents: step3Pointer }}
            className="col-start-1 row-start-1 flex flex-col justify-start max-w-xl py-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-medium">
                3.ENERGY
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-white tracking-tight uppercase leading-[1.08]">
              Dock Swap <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Cell Array & ECU
              </span>
            </h2>

            <p className="mt-4 text-[#9e9aa6] text-sm sm:text-base leading-relaxed max-w-md border-l-2 border-emerald-500/30 pl-4">
              IP67-rated cylindrical lithium cells linked to a 32-bit automotive ECU for microsecond-level thermal and current monitoring.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6 max-w-md">
              <div className="p-4 rounded-xl bg-[#141219]/90 border border-white/10 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">IDC Certified Range</div>
                <div className="text-3xl font-black text-white mt-1 font-mono tracking-tight">140 <span className="text-sm text-emerald-400 font-normal">KM</span></div>
                <div className="text-[10px] font-mono text-zinc-400 mt-1">Dual Mode Regen</div>
              </div>

              <div className="p-4 rounded-xl bg-[#141219]/90 border border-emerald-500/20 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-400" />
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Battery Swap</div>
                <div className="text-3xl font-black text-emerald-400 mt-1 font-mono tracking-tight">&lt;60 <span className="text-sm text-white font-normal">SEC</span></div>
                <div className="text-[10px] font-mono text-emerald-400/80 mt-1">Plug-and-Go Ready</div>
              </div>
            </div>
          </motion.div>

          {/* STEP 4: Chassis & Optics */}
          <motion.div
            style={{ opacity: step4Opacity, y: step4Y, pointerEvents: step4Pointer }}
            className="col-start-1 row-start-1 flex flex-col justify-start max-w-xl py-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-medium">
                4.CHASSIS
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-white tracking-tight uppercase leading-[1.08]">
              Aero Fairings <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                & Matrix LED Array
              </span>
            </h2>

            <p className="mt-4 text-[#9e9aa6] text-sm sm:text-base leading-relaxed max-w-md border-l-2 border-emerald-500/30 pl-4">
              Quick-replace composite panels with aerodynamic contours and high-luminance projector optics for zero-compromise urban safety.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-[0.98]">
                Configure Ride ↗
              </button>
              <button className="px-7 py-3.5 rounded-xl bg-[#17151d] hover:bg-[#201e27] text-zinc-200 font-mono text-xs uppercase tracking-wider border border-white/10 transition-all">
                Locate Hubs
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}