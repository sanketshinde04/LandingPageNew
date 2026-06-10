"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface CounterProps {
  to: number;
  suffix?: string;
  className?: string;
}

export default function Counter({ to, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = to.toLocaleString() + suffix;
      return;
    }
    const state = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(state, {
        n: to,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = Math.round(state.n).toLocaleString() + suffix;
        },
      });
    });
    return () => ctx.revert();
  }, [to, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
