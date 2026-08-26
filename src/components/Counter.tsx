"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface CounterProps {
  to: number;
  suffix?: string;
  className?: string;
}

/**
 * Counts up from zero when the number is genuinely on screen.
 *
 * The previous version started at "top 88%" — the moment the digits clipped the
 * bottom of the viewport — so the count was usually over before anyone had
 * looked at it. This waits until half the element is in view.
 */
export default function Counter({ to, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = to.toLocaleString() + suffix;
      return;
    }

    const controls = animate(0, to, {
      duration: 1.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        el.textContent = Math.round(value).toLocaleString() + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
