"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "@/shaders/test.vert";
import fragmentShader from "@/shaders/test.frag";

export default function ShaderMesh() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2.5, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[5, 5, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={true}
        transparent={true}
        uniforms={{
          uTime: { value: 0 },
          uWaveSpeed: { value: 1.5 },
          uWaveFrequency: { value: 1.8 },
          uColor1: { value: new THREE.Color("#6366f1") }, // Indigo
          uColor2: { value: new THREE.Color("#d946ef") }, // Fuchsia
        }}
      />
    </mesh>
  );
}
