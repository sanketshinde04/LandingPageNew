"use client";

import { useEffect, useRef } from "react";
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
  tile: 404, // plate width in ring units (R = a)
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

/* twelve flat plates in the site's own palette — near-blacks, deep greens,
   sage, and bone, in the order they read best going round */
const PLATES = [
  "#0d1310",
  "#a8d5b5",
  "#f2efe8",
  "#18261e",
  "#2f4a3a",
  "#c9d9cd",
  "#070907",
  "#5a7a67",
  "#e6ece7",
  "#1f2a24",
  "#8fbfa1",
  "#101a14",
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
   Twelve motifs, one per plate — the pieces a deployed system is made
   of. Each is drawn inside the 4:3 band that stays visible after the
   plate is cropped, at one stroke weight.
 * ------------------------------------------------------------------ */
function drawMotif(x: CanvasRenderingContext2D, i: number, ink: string) {
  const C = TS / 2; // the plate's centre
  x.save();
  x.translate(C, C);
  x.strokeStyle = ink;
  x.fillStyle = ink;
  x.lineWidth = 9;
  x.lineCap = "round";
  x.lineJoin = "round";

  const line = (x1: number, y1: number, x2: number, y2: number) => {
    x.beginPath();
    x.moveTo(x1, y1);
    x.lineTo(x2, y2);
    x.stroke();
  };
  const dot = (cx: number, cy: number, r: number) => {
    x.beginPath();
    x.arc(cx, cy, r, 0, Math.PI * 2);
    x.fill();
  };
  const box = (bx: number, by: number, bw: number, bh: number, r = 14) => {
    x.beginPath();
    x.moveTo(bx + r, by);
    x.arcTo(bx + bw, by, bx + bw, by + bh, r);
    x.arcTo(bx + bw, by + bh, bx, by + bh, r);
    x.arcTo(bx, by + bh, bx, by, r);
    x.arcTo(bx, by, bx + bw, by, r);
    x.closePath();
    x.stroke();
  };

  switch (i % 12) {
    case 0: // an agent graph
      line(-58, -34, 0, 34);
      line(0, 34, 58, -34);
      line(-58, -34, 58, -34);
      dot(-58, -34, 13);
      dot(58, -34, 13);
      dot(0, 34, 13);
      break;
    case 1: // a prompt
      box(-72, -46, 144, 78);
      line(-44, -18, 34, -18);
      line(-44, 8, 4, 8);
      break;
    case 2: // code
      line(-62, -40, 20, -40);
      line(-38, -8, 62, -8);
      line(-38, 24, 10, 24);
      break;
    case 3: // the measured result
      line(-66, 46, 66, 46);
      line(-44, 46, -44, 4);
      line(-14, 46, -14, -26);
      line(16, 46, 16, -6);
      line(46, 46, 46, -44);
      break;
    case 4: // a terminal
      line(-46, -30, -10, 2);
      line(-10, 2, -46, 34);
      line(6, 34, 52, 34);
      break;
    case 5: // verified
      box(-52, -56, 104, 112, 12);
      line(-26, 4, -8, 22);
      line(-8, 22, 28, -20);
      break;
    case 6: // voice
      [22, 46, 70, 40, 78, 34, 20].forEach((h, n) =>
        line(-66 + n * 22, -h / 2, -66 + n * 22, h / 2)
      );
      break;
    case 7: // a fleet of runs
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 3; c++) dot(-42 + c * 42, -42 + r * 42, 9);
      break;
    case 8: // structured output
      x.beginPath();
      x.moveTo(-18, -48);
      x.quadraticCurveTo(-46, -48, -46, -12);
      x.quadraticCurveTo(-46, 0, -60, 0);
      x.quadraticCurveTo(-46, 0, -46, 12);
      x.quadraticCurveTo(-46, 48, -18, 48);
      x.stroke();
      x.beginPath();
      x.moveTo(18, -48);
      x.quadraticCurveTo(46, -48, 46, -12);
      x.quadraticCurveTo(46, 0, 60, 0);
      x.quadraticCurveTo(46, 0, 46, 12);
      x.quadraticCurveTo(46, 48, 18, 48);
      x.stroke();
      break;
    case 9: // shipped
      line(-66, 0, 18, 0);
      line(-6, -26, 20, 0);
      line(-6, 26, 20, 0);
      line(50, -42, 50, 42);
      break;
    case 10: // an evaluation
      x.beginPath();
      x.arc(0, 16, 56, Math.PI, Math.PI * 1.82);
      x.stroke();
      line(0, 16, 34, -22);
      dot(0, 16, 10);
      break;
    default: // layers in production
      [-40, 0, 40].forEach((oy) => {
        x.beginPath();
        x.moveTo(0, oy - 26);
        x.lineTo(60, oy);
        x.lineTo(0, oy + 26);
        x.lineTo(-60, oy);
        x.closePath();
        x.stroke();
      });
      break;
  }
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
      const hi = mixRGB(base, [255, 255, 255], 0.14);
      const lo = mixRGB(base, [0, 0, 0], 0.2);

      const N = 150;
      const buf = mkc(N, N);
      const bx = buf.getContext("2d")!;
      const img = bx.createImageData(N, N);
      for (let py = 0; py < N; py++) {
        for (let px = 0; px < N; px++) {
          const u = (px + 0.5) / N;
          const v = (py + 0.5) / N;
          let s =
            0.5 + (fbm(n, u * 6.2, v * 6.2, 5) - 0.5) * 1.85 + (v - 0.5) * 0.09;
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

      drawMotif(x, i, luma(base) > 0.55 ? "rgba(12,18,14,0.62)" : "rgba(233,242,236,0.6)");

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
    const AXIS = [
      U[1] * V[2] - U[2] * V[1],
      U[2] * V[0] - U[0] * V[2],
      U[0] * V[1] - U[1] * V[0],
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
      "position:absolute;visibility:hidden;font-family:var(--font-inter)";
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,213,181,0.13),transparent_62%)]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
        aria-hidden
      />
    </div>
  );
}
