"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

export default function SceneCanvas({
  children,
  cameraZ = 6,
  bloom = 0.8,
  effects = true,
}: {
  children: React.ReactNode;
  cameraZ?: number;
  bloom?: number;
  effects?: boolean;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      camera={{ position: [0, 0.7, cameraZ], fov: 38, near: 0.1, far: 100 }}
    >
      <Suspense fallback={null}>{children}</Suspense>
      {effects && (
        <EffectComposer enableNormalPass={false}>
          <Bloom
            intensity={bloom}
            luminanceThreshold={0.62}
            luminanceSmoothing={0.18}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.25} darkness={0.9} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
