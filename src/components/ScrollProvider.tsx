"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import "lenis/dist/lenis.css";

function GsapBridge() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

interface ScrollProviderProps {
  children: ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.6,
      }}
    >
      <GsapBridge />
      {children}
    </ReactLenis>
  );
}
