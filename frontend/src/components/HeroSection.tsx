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

  // 2. Canvas Rendering (Right-Aligned in Canvas Space)
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
      
      // Match exact frame black color
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      const isDesktop = width >= 1024;

      if (isDesktop) {
        // Render inside right 55% area of screen
        const targetAreaWidth = width * 0.58;
        const hRatio = targetAreaWidth / img.naturalWidth;
        const vRatio = height / img.naturalHeight;
        const ratio = Math.min(hRatio, vRatio) * 0.92;

        const drawW = img.naturalWidth * ratio;
        const drawH = img.naturalHeight * ratio;

        const shiftX = width * 0.42 + (targetAreaWidth - drawW) / 2;
        const shiftY = (height - drawH) / 2;

        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, shiftX, shiftY, drawW, drawH);
      } else {
        // Mobile fallback center
        const hRatio = width / img.naturalWidth;
        const vRatio = (height * 0.5) / img.naturalHeight;
        const ratio = Math.min(hRatio, vRatio) * 0.95;

        const drawW = img.naturalWidth * ratio;
        const drawH = img.naturalHeight * ratio;

        const shiftX = (width - drawW) / 2;
        const shiftY = height * 0.45 + (height * 0.5 - drawH) / 2;

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

  // Storyline Steps Transforms
  const step1Opacity = useTransform(smoothProgress, [0, 0.12, 0.22], [1, 1, 0]);
  const step1Y = useTransform(smoothProgress, [0, 0.22], [0, -30]);

  const step2Opacity = useTransform(smoothProgress, [0.25, 0.33, 0.47, 0.53], [0, 1, 1, 0]);
  const step2Y = useTransform(smoothProgress, [0.25, 0.33, 0.47, 0.53], [30, 0, 0, -30]);

  const step3Opacity = useTransform(smoothProgress, [0.56, 0.64, 0.76, 0.82], [0, 1, 1, 0]);
  const step3Y = useTransform(smoothProgress, [0.56, 0.64, 0.76, 0.82], [30, 0, 0, -30]);

  const step4Opacity = useTransform(smoothProgress, [0.85, 0.92, 1], [0, 1, 1]);
  const step4Y = useTransform(smoothProgress, [0.85, 0.92, 1], [30, 0, 0]);

  return (
    <div
      id="hero"
      ref={containerRef}
      className="relative h-[480vh] bg-[#050505] text-white selection:bg-emerald-500 selection:text-black font-sans antialiased"
    >
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_#34d399]" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-emerald-400 font-semibold">
              Loading Bijliride Telemetry
            </span>
          </div>
          <div className="w-60 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-150 shadow-[0_0_10px_#10b981]"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono text-zinc-500 mt-3">{loadPercent}% Complete</span>
        </div>
      )}

      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-between">
        
        {/* Fullscreen Canvas with Right-Aligned Image */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-0 pointer-events-none"
        />

        {/* Ambient Emerald Lights behind the bike */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none z-0" />
        <div className="absolute left-0 top-1/4 w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

        {/* Left Side Content Container */}
        <div className="relative z-10 w-full lg:w-[48%] h-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:pl-20 pointer-events-none">
          
          {/* STEP 1: Main Hero Pitch */}
          <motion.div
            style={{ opacity: step1Opacity, y: step1Y }}
            className="absolute inset-x-6 sm:inset-x-12 md:inset-x-16 lg:left-20 lg:right-8 flex flex-col justify-center pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono uppercase tracking-widest w-fit mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Next-Gen Urban EV
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Electrify Your Commute, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                Save More Everyday
              </span>
            </h1>

            <p className="mt-5 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg">
              Switch to smart electric mobility with <strong className="text-white font-semibold">Bijliride</strong> — ₹0.15/km running cost, modular battery swap, and real-time smart diagnostics.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 active:translate-y-0">
                Book Test Ride
              </button>
              <button className="px-7 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/10 transition-all">
                Download App
              </button>
            </div>

            <div className="flex items-center gap-2 mt-12 text-[11px] font-mono text-zinc-500 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Scroll to explore architecture
            </div>
          </motion.div>

          {/* STEP 2: Modular Hub Motor */}
          <motion.div
            style={{ opacity: step2Opacity, y: step2Y }}
            className="absolute inset-x-6 sm:inset-x-12 md:inset-x-16 lg:left-20 lg:right-8 flex flex-col justify-center pointer-events-auto"
          >
            <span className="text-xs font-mono font-bold text-emerald-400 tracking-[0.25em] uppercase mb-2">
              Powertrain Spec • 01
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Modular Hubcontrol <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Instant PMSM Motor
              </span>
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
              Synchronous high-efficiency motor engineered directly into the wheel assembly for instantaneous pickup and smooth incline climb.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6 max-w-sm">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="text-2xl font-black text-white">4.2 kW</div>
                <div className="text-[11px] font-mono text-zinc-500 uppercase mt-0.5">Peak Output</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="text-2xl font-black text-emerald-400">85 Nm</div>
                <div className="text-[11px] font-mono text-zinc-500 uppercase mt-0.5">Instant Torque</div>
              </div>
            </div>
          </motion.div>

          {/* STEP 3: Battery & Smart ECU */}
          <motion.div
            style={{ opacity: step3Opacity, y: step3Y }}
            className="absolute inset-x-6 sm:inset-x-12 md:inset-x-16 lg:left-20 lg:right-8 flex flex-col justify-center pointer-events-auto"
          >
            <span className="text-xs font-mono font-bold text-emerald-400 tracking-[0.25em] uppercase mb-2">
              Energy & Intelligence • 02
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Integrated Battery <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                & Advanced ECU
              </span>
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
              IP67-rated cylindrical cell array with continuous thermal monitoring and sub-60-second dock swapping at Bijliride hubs.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6 max-w-sm">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="text-2xl font-black text-white">140 km</div>
                <div className="text-[11px] font-mono text-zinc-500 uppercase mt-0.5">Range Per Swap</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <div className="text-2xl font-black text-emerald-400">&lt; 60s</div>
                <div className="text-[11px] font-mono text-zinc-500 uppercase mt-0.5">Swap Time</div>
              </div>
            </div>
          </motion.div>

          {/* STEP 4: Dual LED & Bodywork */}
          <motion.div
            style={{ opacity: step4Opacity, y: step4Y }}
            className="absolute inset-x-6 sm:inset-x-12 md:inset-x-16 lg:left-20 lg:right-8 flex flex-col justify-center pointer-events-auto"
          >
            <span className="text-xs font-mono font-bold text-emerald-400 tracking-[0.25em] uppercase mb-2">
              Chassis & Visibility • 03
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Modular Bodywork <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                & Dual LED Headlights
              </span>
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
              High-impact modular panels designed for quick maintenance, coupled with high-lux projector illumination.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 active:translate-y-0">
                Reserve Your EV Now
              </button>
              <button className="px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/10 transition-all">
                Find Nearest Hub
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}