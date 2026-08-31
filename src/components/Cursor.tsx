"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: a crisp accent dot that tracks the pointer 1:1, with a
 * glassy ring trailing on a spring. Expands over interactive elements.
 * Only mounts on fine-pointer devices; the native cursor is hidden via CSS.
 */
export default function Cursor() {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setActive(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: Event) => {
      const t = e.target as Element | null;
      setHovering(!!t?.closest?.("a, button, [role='button'], summary, input, textarea"));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, true);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver, true);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!active) return null;

  return (
    /* above the booking dialog (z-200), or the cursor vanishes over it */
    <div className="pointer-events-none fixed inset-0 z-[300]" aria-hidden>
      {/* trailing glass ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{
            scale: pressed ? 0.7 : hovering ? 1.7 : 1,
            opacity: hovering ? 0.9 : 0.55,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 bg-white/[0.04] backdrop-blur-[2px]"
        />
      </motion.div>
      {/* core dot */}
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgba(79,140,255,0.8)]" />
      </motion.div>
    </div>
  );
}
