"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "@/shaders/lens.vert";
import fragmentShader from "@/shaders/lens.frag";

interface LensPlaneProps {
  src: string;
  radius: number;
}

function LensPlane({ src, radius }: LensPlaneProps) {
  const texture = useLoader(THREE.TextureLoader, src);
  const { size, gl } = useThree();

  const target = useRef(new THREE.Vector2(0.5, 0.55));
  const pos = useRef(new THREE.Vector2(0.5, 0.55));
  const vel = useRef(new THREE.Vector2(0, 0));
  const intensityTarget = useRef(0);
  const smoothedSpeed = useRef(0);

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
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    uniforms.uTexture.value = texture;
    const img = texture.image as HTMLImageElement | undefined;
    if (img?.width) uniforms.uImageRes.value.set(img.width, img.height);
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
      if (inside) target.current.set(x, y);
    };
    const onLeave = () => {
      intensityTarget.current = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
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

    uniforms.uMouse.value.copy(pos.current);
    uniforms.uVelocity.value = smoothedSpeed.current;
    uniforms.uIntensity.value +=
      (intensityTarget.current - uniforms.uIntensity.value) * Math.min(1, dt * 5);
    uniforms.uTime.value += dt;
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
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
  radius = 0.13,
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
    };
  }, [src]);

  return (
    <div className={className} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {enabled && (
        <Canvas
          className="absolute inset-0"
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
