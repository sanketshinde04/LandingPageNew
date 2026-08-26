"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "@/shaders/lens.vert";
import fragmentShader from "@/shaders/lens.frag";

// must match RIPPLE_COUNT in lens.frag
const RIPPLE_COUNT = 24;

interface LensPlaneProps {
  src: string;
  radius: number;
}

function LensPlane({ src, radius }: LensPlaneProps) {
  const texture = useLoader(THREE.TextureLoader, src);
  const { size, gl } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const target = useRef(new THREE.Vector2(0.5, 0.55));
  const pos = useRef(new THREE.Vector2(0.5, 0.55));
  const vel = useRef(new THREE.Vector2(0, 0));
  const intensityTarget = useRef(0);
  const smoothedSpeed = useRef(0);
  const rippleIndex = useRef(0);
  const lastRipplePos = useRef(new THREE.Vector2(-1, -1));

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.55) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageRes: { value: new THREE.Vector2(1, 1) },
      uRadius: { value: radius },
      uVelocity: { value: 0 },
      uIntensity: { value: 0 },
      uTime: { value: 0 },
      uRipples: {
        value: Array.from(
          { length: RIPPLE_COUNT },
          () => new THREE.Vector4(-10, -10, -100, 0)
        ),
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const spawnRipple = (x: number, y: number, strength: number) => {
    const activeUniforms = materialRef.current?.uniforms || uniforms;
    const ripples = activeUniforms.uRipples.value;
    const timeVal = activeUniforms.uTime.value;
    ripples[rippleIndex.current].set(x, y, timeVal, strength);
    rippleIndex.current = (rippleIndex.current + 1) % RIPPLE_COUNT;
    lastRipplePos.current.set(x, y);
  };

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    
    const activeUniforms = materialRef.current?.uniforms || uniforms;
    activeUniforms.uTexture.value = texture;
    
    const img = texture.image as HTMLImageElement | undefined;
    if (img?.width) {
      activeUniforms.uImageRes.value.set(img.width, img.height);
    }
  }, [texture, uniforms]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      const margin = 0.08;
      const inside =
        x > -margin && x < 1 + margin && y > -margin && y < 1 + margin;
      intensityTarget.current = inside ? 1 : 0;
      if (inside) {
        target.current.set(x, y);
        // drop a water ring every few steps along the cursor's path
        const dx = x - lastRipplePos.current.x;
        const dy = y - lastRipplePos.current.y;
        if (dx * dx + dy * dy > 0.0085) {
          spawnRipple(x, y, 0.45);
        }
      }
    };
    const onDown = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) spawnRipple(x, y, 0.85);
    };
    const onLeave = () => {
      intensityTarget.current = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 30);

    // spring physics towards the cursor
    const stiffness = 110;
    const damping = 13;
    const ax =
      (target.current.x - pos.current.x) * stiffness - vel.current.x * damping;
    const ay =
      (target.current.y - pos.current.y) * stiffness - vel.current.y * damping;
    vel.current.x += ax * dt;
    vel.current.y += ay * dt;
    pos.current.x += vel.current.x * dt;
    pos.current.y += vel.current.y * dt;

    const speed = Math.min(vel.current.length() * 0.6, 1);
    smoothedSpeed.current += (speed - smoothedSpeed.current) * Math.min(1, dt * 5);

    const activeUniforms = materialRef.current?.uniforms || uniforms;

    activeUniforms.uMouse.value.copy(pos.current);
    activeUniforms.uVelocity.value = smoothedSpeed.current;
    activeUniforms.uIntensity.value +=
      (intensityTarget.current - activeUniforms.uIntensity.value) * Math.min(1, dt * 8);
    activeUniforms.uTime.value += dt;
    activeUniforms.uResolution.value.set(size.width, size.height);
    
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).__lensDebug = {
        pos: [pos.current.x, pos.current.y],
        target: [target.current.x, target.current.y],
        intensity: activeUniforms.uIntensity.value,
        time: activeUniforms.uTime.value,
        res: [size.width, size.height],
        imageRes: activeUniforms.uImageRes.value.toArray(),
        ripple0: activeUniforms.uRipples.value[0].toArray(),
        rippleIdx: rippleIndex.current,
      };
    }
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

interface LiquidLensProps {
  src: string;
  className?: string;
  radius?: number;
}

/**
 * Cinematic background image with a WebGL "liquid glass" lens that follows
 * the cursor — refraction, chromatic aberration, blur and spring physics.
 * Falls back to a plain image on touch devices or when WebGL is unavailable.
 */
export default function LiquidLens({
  src,
  className,
  radius = 0.095,
}: LiquidLensProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const canvas = document.createElement("canvas");
      webgl = !!(
        canvas.getContext("webgl2") || canvas.getContext("webgl")
      );
    } catch {
      webgl = false;
    }
    if (!finePointer || !webgl || reduced) return;

    // only mount the WebGL layer once the texture is known to load —
    // if the image fails, the plain <img> fallback stays in place
    const probe = new Image();
    probe.crossOrigin = "anonymous";
    probe.onload = () => setEnabled(true);
    probe.src = src;
    return () => {
      probe.onload = null;
      probe.onerror = null;
    };
  }, [src]);

  return (
    <div className={className} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {!enabled && (
        <img
          src={src}
          alt=""
          crossOrigin="anonymous"
          className="absolute inset-0 h-full w-full object-cover z-0"
          draggable={false}
        />
      )}
      {enabled && (
        <Canvas
          className="absolute inset-0 z-10"
          style={{ pointerEvents: "none" }}
          dpr={[1, 1.6]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          frameloop="always"
        >
          <Suspense fallback={null}>
            <LensPlane src={src} radius={radius} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
