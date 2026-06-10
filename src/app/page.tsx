"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion as framerMotion } from "framer-motion";
import { animate as motionOneAnimate } from "motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import the 3D Canvas component to bypass SSR errors
const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-zinc-900/40 rounded-2xl border border-white/5 text-zinc-400 backdrop-blur-md">
      Loading 3D Wave Shader...
    </div>
  ),
});

export default function Home() {
  const gsapBoxRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (!gsapBoxRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gsapBoxRef.current,
        { scale: 0.8, opacity: 0.2, y: 60 },
        {
          scale: 1.1,
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: gsapBoxRef.current,
            start: "top 85%",
            end: "bottom 50%",
            scrub: 1.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Motion One Animation handler
  const triggerMotionOne = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    motionOneAnimate("#motion-one-box" as any, { 
      rotate: [0, 180, 360], 
      scale: [1, 1.25, 1], 
      borderRadius: ["1rem", "50%", "1rem"] 
    }, { 
      duration: 1.5, 
      ease: "easeInOut" 
    });
  };

  return (
    <main className="flex-1 flex flex-col items-center w-full px-6 py-12 md:px-24 max-w-7xl mx-auto overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center w-full py-16 gap-8 relative">
        <framerMotion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
            CREATIVE STACK
          </h1>
          <p className="text-zinc-500 font-semibold tracking-widest text-xs uppercase sm:text-sm">
            Next.js 15 &bull; TypeScript &bull; Tailwind v4
          </p>
        </framerMotion.div>

        <framerMotion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed font-light"
        >
          An ultra-premium boilerplate combining GSAP ScrollTrigger, Lenis smooth scrolling, Framer Motion, Three.js, React Three Fiber, GLSL Shaders, and Motion One.
        </framerMotion.p>

        <framerMotion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-3xl aspect-[16/10] mt-8"
        >
          <Scene />
        </framerMotion.div>

        <div className="absolute bottom-8 text-zinc-500 flex flex-col items-center gap-2 text-xs tracking-wider uppercase font-medium">
          <span>Scroll down for animations</span>
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* GSAP Section */}
      <section className="min-h-screen flex flex-col items-center justify-center w-full max-w-3xl py-24 gap-8">
        <h2 className="text-3xl md:text-6xl font-extrabold text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text">
          GSAP ScrollTrigger
        </h2>
        <p className="text-zinc-400 text-center max-w-md leading-relaxed font-light">
          This element is animated dynamically using GSAP ScrollTrigger, working harmoniously with Lenis smooth scrolling.
        </p>
        <div className="h-[200px] flex items-center justify-center">
          <div
            ref={gsapBoxRef}
            className="w-48 h-48 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-3xl flex items-center justify-center text-zinc-950 font-black tracking-wide shadow-2xl shadow-cyan-500/20"
          >
            GSAP Box
          </div>
        </div>
      </section>

      {/* Motion One Section */}
      <section className="min-h-screen flex flex-col items-center justify-center w-full max-w-3xl py-24 gap-8">
        <h2 className="text-3xl md:text-6xl font-extrabold text-transparent bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text">
          Motion One (Animate)
        </h2>
        <p className="text-zinc-400 text-center max-w-md leading-relaxed font-light">
          Lightweight, high-performance web animations. Click the trigger to launch a GPU-accelerated transition.
        </p>
        <div className="h-[240px] flex flex-col items-center justify-between gap-8">
          <div
            id="motion-one-box"
            className="w-40 h-40 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center text-white font-black shadow-2xl shadow-rose-500/20"
          >
            Motion One
          </div>
          <button
            onClick={triggerMotionOne}
            className="px-8 py-3.5 bg-white text-zinc-950 rounded-full font-bold transition duration-300 hover:bg-zinc-200 active:scale-95 shadow-lg shadow-white/10"
          >
            Animate Box
          </button>
        </div>
      </section>
    </main>
  );
}
