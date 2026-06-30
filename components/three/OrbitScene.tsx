"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { orbitScroll } from "@/lib/orbit-signal";

const MODEL = "/models/cayenne.glb";

// --- the car -----------------------------------------------------------------
function Car() {
  const { scene } = useGLTF(MODEL, false); // draco off; meshopt auto-enabled

  // Clone, center on x/z, drop wheels to y=0, and normalize length.
  const prepared = useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const targetLength = 4.4;
    const longest = Math.max(size.x, size.z);
    const scale = targetLength / (longest || 1);

    root.position.set(-center.x, -box.min.y, -center.z);
    root.scale.setScalar(scale);

    // Wrap so we can transform after grounding.
    const group = new THREE.Group();
    group.add(root);

    group.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && "envMapIntensity" in mat) {
          mat.envMapIntensity = 1.5;
          mat.needsUpdate = true;
        }
      }
    });
    return group;
  }, [scene]);

  const ref = useRef<THREE.Group>(null);

  // Subtle turntable drift only when the camera is idle (auto-orbit off-scroll
  // would otherwise feel static). When scroll-driven, the car stays put and the
  // camera does the moving.
  useFrame((_, dt) => {
    if (ref.current && orbitScroll.idle) {
      ref.current.rotation.y += dt * 0.12;
    }
  });

  return <primitive ref={ref} object={prepared} />;
}

// --- warm ambient dust (replaces the template's forge sparks) ---------------
function Dust({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, drift } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const drift: number[] = [];
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = Math.random() * 5 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 11;
      drift.push(0.04 + Math.random() * 0.09);
    }
    return { positions, drift };
  }, [count]);

  useFrame((_, dt) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < count; i += 1) {
      let y = arr.getY(i) + drift[i] * dt;
      if (y > 5) y = -0.5;
      arr.setY(i, y);
    }
    arr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#929192"
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// --- camera orbit driven by scroll ------------------------------------------
function CameraRig() {
  const { camera } = useThree();
  const cur = useRef(0);
  useFrame((state, dt) => {
    let t: number;
    if (orbitScroll.idle) {
      t = (state.clock.elapsedTime * 0.045) % 1; // slow auto-orbit
    } else {
      cur.current += (orbitScroll.progress - cur.current) * Math.min(1, dt * 4);
      t = cur.current;
    }
    const phi = t * Math.PI * 2 + Math.PI * 0.18; // start at a 3/4 front angle
    const radius = 6.6 - Math.sin(t * Math.PI) * 1.2;
    const y = 0.85 + Math.sin(t * Math.PI) * 1.35;
    camera.position.set(Math.sin(phi) * radius, y, Math.cos(phi) * radius);
    camera.lookAt(0, 0.65, 0);
  });
  return null;
}

export default function OrbitScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight
        position={[5, 8, 4]}
        angle={Math.PI / 4}
        penumbra={0.9}
        intensity={3.4}
        color="#FAF9FA"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-6, 4, -5]} intensity={1.15} color="#929192" />
      <directionalLight position={[-2, -3, 4]} intensity={0.42} color="#7C7B7E" />

      <CameraRig />
      <Car />
      <Dust />

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.62}
        scale={14}
        blur={2.6}
        far={6}
        resolution={1024}
        color="#000000"
      />

      {/* Local studio environment for crisp paint reflections (no network HDR). */}
      <Environment resolution={256}>
        <group rotation={[0, 0, 1]}>
          <Lightformer form="rect" intensity={3} color="#FAF9FA" position={[0, 5, -6]} scale={[12, 4, 1]} />
          <Lightformer form="rect" intensity={2.1} color="#929192" position={[-7, 1, -1]} scale={[3, 9, 1]} />
          <Lightformer form="rect" intensity={2.1} color="#FAF9FA" position={[7, 1, -1]} scale={[3, 9, 1]} />
          <Lightformer form="circle" intensity={3} color="#ffffff" position={[6, 3, 5]} scale={[4, 4, 1]} />
          <Lightformer form="rect" intensity={1.2} color="#555152" position={[0, -4, 2]} scale={[14, 3, 1]} />
        </group>
      </Environment>
    </>
  );
}

useGLTF.preload(MODEL);
