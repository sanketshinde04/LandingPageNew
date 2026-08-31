"use client";

import { useEffect, useRef } from "react";
import { AI_MARKS } from "@/lib/aiMarks";
import { hero } from "@/lib/content";

/* ------------------------------------------------------------------ *
   A ring of twelve plates orbiting a tilted plane, with the wordmark
   drawn between the far half and the near half — so plates pass in
   front of the word as they come round.

   Adapted from the Gallery Heading study. What is kept is the geometry:
   the ring plane, the perspective projection, the per-tile affine basis,
   and the depth sandwich. What is replaced is everything the eye reads —
   our palette, our type, and a slow idle rather than a dead stop, because
   a hero that only moves on hover reads as broken.
 * ------------------------------------------------------------------ */

/** square design frame; every length below is in this space */
const D = 2160;

const RING = {
  cx: D / 2,
  cy: D / 2,
  a: 866, // projected semi-major axis
  ratio: 0.58, // semi-minor / semi-major -> the plane's tilt
  axis: -19, // screen angle of the major axis (deg, y down)
  n: 12,
  tile: 372, // plate width in ring units (R = a)
  aspect: 0.75, // plate height / width — a 4:3 landscape crop
  radius: 0.2, // corner radius as a fraction of the width
  dist: 13, // camera distance in ring radii
  phase: 90,
};

/* How far the ring actually reaches, so it can be scaled to fill whatever box
   it is given instead of being fitted to a square frame it never fills.
   |C.x| and |C.y| peak at these values as psi goes round a tilted ellipse. */
const RAD = (RING.axis * Math.PI) / 180;
const REACH_X =
  Math.hypot(Math.cos(RAD), Math.sin(RAD) * RING.ratio) * RING.a + RING.tile / 2;
const REACH_Y =
  (Math.hypot(Math.sin(RAD), Math.cos(RAD) * RING.ratio) * RING.a +
    (RING.tile * RING.aspect) / 2) *
  1.08; // the near side of the ring is magnified by the perspective

/** seconds for one full revolution at full speed */
const DUR = 26;
const TS = 448; // plate texture resolution

/** the word is fitted to this width, so it always clears the plates */
const WORD_WIDTH = 1470;
const WORD_TRACKING = 0.035;

/** the ring idles here and eases up to 1 while a pointer is over it */
const IDLE_RATE = 0.16;
const EASE = 0.5;

/* twelve flat plates in the site's own palette — deep navies, blue, cyan
   and ice, in the order they read best going round */
const PLATES = [
  "#0c1424",
  "#4f8cff",
  "#eef3ff",
  "#16233d",
  "#2b4a86",
  "#c3d6f5",
  "#070c16",
  "#22d3ee",
  "#e2ecfb",
  "#1a2a48",
  "#7fb0ff",
  "#101a2e",
];

/* ---------------------------- helpers ---------------------------- */

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

function mkc(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  return c;
}

function rgbOf(hex: string): [number, number, number] {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function mixRGB(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

/** value noise on a 64x64 lattice, smoothstep-interpolated and wrapped */
function noiseField(seed: number) {
  const g = new Float32Array(4096);
  const r = rng(seed);
  for (let i = 0; i < 4096; i++) g[i] = r();
  return (x: number, y: number) => {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    let fx = x - x0;
    let fy = y - y0;
    fx = fx * fx * (3 - 2 * fx);
    fy = fy * fy * (3 - 2 * fy);
    const ra = (y0 & 63) * 64;
    const rb = ((y0 + 1) & 63) * 64;
    const ca = x0 & 63;
    const cb = (x0 + 1) & 63;
    const a = g[ra + ca];
    const b = g[ra + cb];
    const c = g[rb + ca];
    const d = g[rb + cb];
    return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
  };
}

function fbm(
  n: (x: number, y: number) => number,
  x: number,
  y: number,
  oct: number
) {
  let v = 0;
  let amp = 0.5;
  let f = 1;
  let tot = 0;
  for (let i = 0; i < oct; i++) {
    v += amp * n(x * f, y * f);
    tot += amp;
    amp *= 0.5;
    f *= 2;
  }
  return v / tot;
}


function luma(c: [number, number, number]) {
  return (c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114) / 255;
}

/* ------------------------------------------------------------------ *
   One brand mark per plate — the tools a build is actually assembled
   from. Each arrives as a 24x24 path, so it is scaled about the plate's
   centre and filled in ink that contrasts with the plate underneath.
 * ------------------------------------------------------------------ */
const MARK_BOX = 24;
/** how much of the plate's short side the mark takes up */
const MARK_SCALE = 0.36;

function drawMark(x: CanvasRenderingContext2D, i: number, ink: string) {
  const mark = AI_MARKS[i % AI_MARKS.length];
  if (!mark) return;
  /* the plate is cropped to 4:3, so the short side is what has to fit */
  const size = TS * RING.aspect * MARK_SCALE;
  const k = size / MARK_BOX;
  x.save();
  x.translate(TS / 2, TS * 0.4);
  x.scale(k, k);
  x.translate(-MARK_BOX / 2, -MARK_BOX / 2);
  x.fillStyle = ink;
  x.fill(new Path2D(mark.path));
  x.restore();
}

function drawMarkLabel(x: CanvasRenderingContext2D, i: number, ink: string) {
  const mark = AI_MARKS[i % AI_MARKS.length];
  if (!mark) return;
  x.save();
  x.fillStyle = ink;
  x.globalAlpha = 0.78;
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.font = "600 27px monospace";
  const label = mark.label.toUpperCase();
  const measured = x.measureText(label).width;
  if (measured > TS * 0.68) {
    x.font = `600 ${Math.max(20, (27 * TS * 0.68) / measured)}px monospace`;
  }
  x.fillText(label, TS / 2, TS * 0.76);
  x.restore();
}

function roundRectPath(
  x: CanvasRenderingContext2D,
  w: number,
  h: number,
  r: number
) {
  x.beginPath();
  x.moveTo(-w / 2 + r, -h / 2);
  x.lineTo(w / 2 - r, -h / 2);
  x.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  x.lineTo(w / 2, h / 2 - r);
  x.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  x.lineTo(-w / 2 + r, h / 2);
  x.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  x.lineTo(-w / 2, -h / 2 + r);
  x.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  x.closePath();
}

/* ------------------------------ view ------------------------------ */

export default function HeroRing({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- one grain tile, shared by every plate ---------- */
    const grainTile = (() => {
      const c = mkc(160, 160);
      const x = c.getContext("2d")!;
      const d = x.createImageData(160, 160);
      const r = rng(0x51f3);
      for (let i = 0; i < d.data.length; i += 4) {
        const v = 128 + (r() - 0.5) * 104;
        d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
        d.data[i + 3] = 255;
      }
      x.putImageData(d, 0, 0);
      return c;
    })();

    /* ---------- twelve plates: flat colour under a slow rise of noise ---------- */
    const paintPlate = (x: CanvasRenderingContext2D, hex: string, i: number) => {
      const base = rgbOf(hex);
      const n = noiseField(0x2c41 + i * 9176);
      const hi = mixRGB(base, [255, 255, 255], 0.1);
      const lo = mixRGB(base, [0, 0, 0], 0.12);

      const N = 150;
      const buf = mkc(N, N);
      const bx = buf.getContext("2d")!;
      const img = bx.createImageData(N, N);
      for (let py = 0; py < N; py++) {
        for (let px = 0; px < N; px++) {
          const u = (px + 0.5) / N;
          const v = (py + 0.5) / N;
          let s =
            0.5 + (fbm(n, u * 6.2, v * 6.2, 5) - 0.5) * 0.95 + (v - 0.5) * 0.06;
          s = s < 0 ? 0 : s > 1 ? 1 : s;
          const c =
            s < 0.5 ? mixRGB(lo, base, s * 2) : mixRGB(base, hi, (s - 0.5) * 2);
          const o = (py * N + px) * 4;
          img.data[o] = c[0];
          img.data[o + 1] = c[1];
          img.data[o + 2] = c[2];
          img.data[o + 3] = 255;
        }
      }
      bx.putImageData(img, 0, 0);

      x.save();
      x.imageSmoothingEnabled = true;
      x.drawImage(buf, 0, 0, TS, TS);
      x.restore();

      drawMark(x, i, luma(base) > 0.55 ? "rgba(10,16,12,0.72)" : "rgba(236,244,239,0.72)");
      drawMarkLabel(
        x,
        i,
        luma(base) > 0.55 ? "rgba(10,16,12,0.72)" : "rgba(236,244,239,0.72)"
      );

      /* the same film grain the rest of the page carries */
      x.save();
      x.globalCompositeOperation = "overlay";
      x.globalAlpha = 0.11;
      x.fillStyle = x.createPattern(grainTile, "repeat")!;
      x.fillRect(0, 0, TS, TS);
      x.restore();
    };

    const front: HTMLCanvasElement[] = [];
    const back: HTMLCanvasElement[] = [];
    for (let i = 0; i < PLATES.length; i++) {
      const c = mkc(TS, TS);
      paintPlate(c.getContext("2d")!, PLATES[i], i);
      front.push(c);

      /* the far side of the ring: drained and sunk towards the page ground */
      const d = mkc(TS, TS);
      const y = d.getContext("2d")!;
      y.drawImage(c, 0, 0);
      y.globalCompositeOperation = "saturation";
      y.fillStyle = "rgba(128,128,128,0.35)";
      y.fillRect(0, 0, TS, TS);
      y.globalCompositeOperation = "multiply";
      y.fillStyle = "rgba(8,12,10,0.55)";
      y.fillRect(0, 0, TS, TS);
      back.push(d);
    }

    /* ---------- ring basis: u/v span the plane, z points at the viewer ---------- */
    const ax = (RING.axis * Math.PI) / 180;
    const cf = RING.ratio;
    const sf = Math.sqrt(1 - cf * cf);
    const U = [Math.cos(ax), Math.sin(ax), 0];
    const V = [-Math.sin(ax) * cf, Math.cos(ax) * cf, sf];
    /* U x V, negated. The cross product's screen-y component comes out at
       -0.77 — it points up the screen, while a canvas texture's +y runs down,
       so using it directly draws every plate upside down. */
    const AXIS = [
      -(U[1] * V[2] - U[2] * V[1]),
      -(U[2] * V[0] - U[0] * V[2]),
      -(U[0] * V[1] - U[1] * V[0]),
    ];

    let W = 0;
    let H = 0;
    let K = 1;
    let OX = 0;
    let OY = 0;
    let wordLayer: HTMLCanvasElement | null = null;

    const d2sx = (x: number) => OX + x * K;
    const d2sy = (y: number) => OY + y * K;

    /* the face is read off the DOM, so the canvas uses the same webfont the
       rest of the page does rather than a lookalike */
    const probe = document.createElement("span");
    probe.style.cssText =
      "position:absolute;visibility:hidden;font-family:var(--font-instrument),'Avenir Next','Segoe UI Variable','Helvetica Neue',system-ui,sans-serif";
    document.body.appendChild(probe);
    const sansFamily = getComputedStyle(probe).fontFamily || "Inter, sans-serif";
    probe.remove();

    /** set the word to a target width, centred on the ring */
    const buildWord = () => {
      wordLayer = mkc(W, H);
      const x = wordLayer.getContext("2d")!;
      const word = hero.mark;
      const target = WORD_WIDTH * K;

      const setFont = (size: number) => {
        x.font = `700 ${size}px ${sansFamily}`;
        if ("letterSpacing" in x) {
          (
            x as CanvasRenderingContext2D & { letterSpacing: string }
          ).letterSpacing = `${WORD_TRACKING * size}px`;
        }
      };

      const PROBE = 200;
      setFont(PROBE);
      const probeWidth = x.measureText(word).width || 1;
      const size = (PROBE * target) / probeWidth;
      setFont(size);

      const m = x.measureText(word);
      const cap = m.actualBoundingBoxAscent || size * 0.71;

      x.save();
      x.textAlign = "center";
      x.textBaseline = "alphabetic";
      x.fillStyle = "#ffffff";
      /* the trailing letter-space would push the word off centre, so half of
         it is taken back */
      x.fillText(
        word,
        d2sx(RING.cx) + (WORD_TRACKING * size) / 2,
        d2sy(RING.cy) + cap / 2
      );
      x.restore();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      W = Math.round(rect.width * dpr);
      H = Math.round(rect.height * dpr);
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      /* fit the ring's own reach, not the design frame, so it fills the box */
      K = Math.min(W / (2 * REACH_X), H / (2 * REACH_Y)) * 0.98;
      OX = W / 2 - RING.cx * K;
      OY = H / 2 - RING.cy * K;

      buildWord();
    };

    /* ---------- projection and one plate ---------- */
    const project = (p: number[]) => {
      const k = (RING.a * K * RING.dist) / (RING.dist - p[2]);
      return [d2sx(RING.cx) + k * p[0], d2sy(RING.cy) + k * p[1]];
    };

    const drawTile = (i: number, psi: number) => {
      const c = Math.cos(psi);
      const s = Math.sin(psi);
      const C = [c * U[0] + s * V[0], c * U[1] + s * V[1], c * U[2] + s * V[2]];
      const T = [
        -s * U[0] + c * V[0],
        -s * U[1] + c * V[1],
        -s * U[2] + c * V[2],
      ];
      const h = RING.tile / (2 * RING.a);
      const p0 = project(C);
      const pT = project([C[0] + T[0] * h, C[1] + T[1] * h, C[2] + T[2] * h]);
      const pA = project([
        C[0] + AXIS[0] * h,
        C[1] + AXIS[1] * h,
        C[2] + AXIS[2] * h,
      ]);
      const ex = pT[0] - p0[0];
      const ey = pT[1] - p0[1];
      const fx = pA[0] - p0[0];
      const fy = pA[1] - p0[1];
      if (Math.abs(ex * fy - ey * fx) < 0.4) return; // edge on

      const img = (C[2] > 0 ? front : back)[i % front.length];
      ctx.save();
      ctx.setTransform(
        (ex * 2) / TS,
        (ey * 2) / TS,
        (fx * 2) / TS,
        (fy * 2) / TS,
        p0[0],
        p0[1]
      );
      roundRectPath(ctx, TS, TS * RING.aspect, TS * RING.aspect * RING.radius);
      ctx.clip();
      ctx.drawImage(img, -TS / 2, -TS / 2, TS, TS);
      ctx.globalAlpha = C[2] > 0 ? 0.78 : 0.38;
      ctx.strokeStyle = C[2] > 0 ? "rgba(238,243,255,0.52)" : "rgba(160,184,224,0.3)";
      ctx.lineWidth = 7;
      roundRectPath(ctx, TS, TS * RING.aspect, TS * RING.aspect * RING.radius);
      ctx.stroke();
      ctx.restore();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    const render = (t: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.imageSmoothingQuality = "high";

      const spin = (t / DUR) * Math.PI * 2;
      const list: { i: number; psi: number; z: number }[] = [];
      for (let i = 0; i < RING.n; i++) {
        const psi =
          (RING.phase * Math.PI) / 180 - (i * 2 * Math.PI) / RING.n + spin;
        list.push({ i, psi, z: Math.sin(psi) * sf });
      }
      list.sort((a, b) => a.z - b.z);

      /* the word goes in between: far plates behind it, near ones over it */
      let drawnWord = false;
      for (let i = 0; i < list.length; i++) {
        if (!drawnWord && list[i].z > 0 && wordLayer) {
          ctx.drawImage(wordLayer, 0, 0);
          drawnWord = true;
        }
        drawTile(list[i].i, list[i].psi);
      }
      if (!drawnWord && wordLayer) ctx.drawImage(wordLayer, 0, 0);
    };

    resize();

    if (reduced) {
      render(DUR * 0.12);
      const onResize = () => {
        resize();
        render(DUR * 0.12);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    /* ---------- clock: idles slowly, comes up to speed under the pointer ---------- */
    let now = 0;
    let rate = IDLE_RATE;
    let hovering = false;
    let last = performance.now();
    let raf = 0;

    /* the first frame is painted synchronously, so the hero is never blank
       while the first animation frame is still pending */
    render(now);

    const frame = (stamp: number) => {
      const dt = Math.min(0.05, Math.max(0, (stamp - last) / 1000));
      last = stamp;
      const target = hovering ? 1 : IDLE_RATE;
      rate += (target - rate) * (1 - Math.exp(-dt / EASE));
      now = (now + dt * rate) % DUR;
      render(now);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const enter = () => {
      hovering = true;
    };
    const leave = () => {
      hovering = false;
    };
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointermove", enter);
    host.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);

    const observer = new ResizeObserver(() => {
      resize();
      render(now);
    });
    observer.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointermove", enter);
      host.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
    };
  }, []);

  return (
    <div ref={hostRef} className={`relative ${className ?? ""}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,140,255,0.15),transparent_62%)]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
        aria-hidden
      />
    </div>
  );
}
