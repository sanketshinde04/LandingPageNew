"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** the furthest a magnetic element will ever travel from its resting place */
const MAX_PULL = 7;
const clamp = (value: number, limit: number) =>
  Math.max(-limit, Math.min(limit, value));

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function Magnetic({
  children,
  className,
  strength = 0.12,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.35 });

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    // capped, so a wide button cannot drag itself halfway across the section
    x.set(clamp((e.clientX - r.left - r.width / 2) * strength, MAX_PULL));
    y.set(clamp((e.clientY - r.top - r.height / 2) * strength, MAX_PULL));
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
