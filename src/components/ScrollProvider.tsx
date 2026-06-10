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
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <GsapBridge />
      {children}
    </ReactLenis>
  );
}
