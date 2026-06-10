"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ShaderMesh from "./ShaderMesh";

export default function Scene() {
  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/40 backdrop-blur-md">
      <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <ShaderMesh />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
