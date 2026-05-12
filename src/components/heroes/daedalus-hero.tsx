"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import type { Group, Mesh, Points, PointsMaterial } from "three";
import * as THREE from "three";

/**
 * Daedalus Workshop hero scene.
 *
 * Mood targets (see Resources/Prompts/Anomali007-Site-Hero-Prompts.md §1A):
 * - Workbench at 2am, three floating holographic project panels above it
 * - Warm overhead key light from upper-left, faint dust haze, hex-grid floor
 * - Three-eyed alien glyph etched into the bench as a maker's mark
 * - Palette: deep black bg, surface-glass panels, electric-teal accent,
 *   warm gold-amber key light
 */

const TEAL = "#2dd4bf";
const AMBER = "#e5a833";
const BG = "#0a0a0b";
const SURFACE = "#141417";
const BORDER = "#27272a";

type Panel = {
  id: string;
  title: string;
  metric: string;
  status: "BUILDING" | "LIVE" | "COMPLETED";
};

const PANELS: Panel[] = [
  {
    id: "mlc",
    title: "MASS Lead Connect",
    metric: "1,100+ commits",
    status: "BUILDING",
  },
  {
    id: "bto",
    title: "Beat The Odds",
    metric: "1,400+ commits",
    status: "BUILDING",
  },
  {
    id: "th",
    title: "Token Holder",
    metric: "159+ commits",
    status: "BUILDING",
  },
];

function Workbench() {
  return (
    <group position={[0, -0.3, 0]}>
      {/* Bench surface — narrower so panels read as the focal point */}
      <RoundedBox
        args={[4.2, 0.16, 1.8]}
        radius={0.04}
        smoothness={3}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={SURFACE}
          roughness={0.55}
          metalness={0.25}
        />
      </RoundedBox>

      {/* Brass inlay strip — a thin amber line running across the bench front */}
      <mesh position={[0, 0.085, 0.88]}>
        <boxGeometry args={[3.8, 0.005, 0.01]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.55} />
      </mesh>

      {/* Alien glyph — three small ovals etched into the bench, brighter amber */}
      <group position={[1.4, 0.09, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        {[-0.09, 0, 0.09].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <circleGeometry args={[0.028, 24]} />
            <meshBasicMaterial color={AMBER} transparent opacity={0.55} />
          </mesh>
        ))}
      </group>

      {/* Brass-mark text positioned on the bench — implied via small bar */}
      <mesh position={[-1.4, 0.09, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 0.04]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.4} />
      </mesh>

      {/* Bench legs */}
      {[
        [-1.95, -0.55, -0.75],
        [1.95, -0.55, -0.75],
        [-1.95, -0.55, 0.75],
        [1.95, -0.55, 0.75],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.1, 0.7, 0.1]} />
          <meshStandardMaterial color="#0d0d10" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingPanel({
  panel,
  position,
  rotationY,
  delay,
}: {
  panel: Panel;
  position: [number, number, number];
  rotationY: number;
  delay: number;
}) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() + delay;
    ref.current.position.y = position[1] + Math.sin(t * 0.7) * 0.04;
  });

  return (
    <group ref={ref} position={position} rotation={[0, rotationY, 0]}>
      {/* Panel back-plate (thin glass card) */}
      <RoundedBox args={[1.45, 0.92, 0.02]} radius={0.04} smoothness={3}>
        <meshPhysicalMaterial
          color={SURFACE}
          roughness={0.4}
          metalness={0.1}
          transmission={0.15}
          thickness={0.02}
          transparent
          opacity={0.92}
        />
      </RoundedBox>

      {/* Teal edge glow ring */}
      <mesh position={[0, 0, 0.012]}>
        <ringGeometry args={[0.73, 0.74, 64]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.35} />
      </mesh>

      {/* HTML overlay with the actual content */}
      <Html
        transform
        occlude="blending"
        distanceFactor={1}
        position={[0, 0, 0.02]}
        style={{ width: "320px", height: "200px", pointerEvents: "none" }}
      >
        <div
          className="flex h-full w-full flex-col justify-between rounded-lg border p-3"
          style={{
            background:
              "linear-gradient(135deg, rgba(20,20,23,0.95), rgba(10,10,11,0.85))",
            borderColor: BORDER,
          }}
        >
          {/* status pill */}
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-[10px] tracking-wider"
              style={{ color: TEAL }}
            >
              {panel.status}
            </span>
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: TEAL,
                boxShadow: `0 0 8px ${TEAL}`,
              }}
            />
          </div>

          {/* title + metric */}
          <div>
            <h3
              className="font-display text-lg font-semibold leading-tight"
              style={{ color: "#e4e4e7" }}
            >
              {panel.title}
            </h3>
            <p
              className="mt-1 font-mono text-xs"
              style={{ color: "#a1a1aa" }}
            >
              {panel.metric}
            </p>
          </div>

          {/* mini spark line — pure SVG, no data */}
          <svg viewBox="0 0 100 20" className="h-5 w-full">
            <polyline
              points="0,15 10,12 20,14 30,8 40,10 50,6 60,9 70,4 80,7 90,3 100,5"
              fill="none"
              stroke={TEAL}
              strokeOpacity="0.7"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Html>
    </group>
  );
}

function FloorGrid() {
  return (
    <gridHelper
      args={[24, 24, "#1a1a1f", "#141417"]}
      position={[0, -0.85, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function DustHaze() {
  const ref = useRef<Points>(null);
  const count = 180;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = Math.random() * 3.5 - 0.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const mat = ref.current.material as PointsMaterial;
    mat.opacity = 0.35 + Math.sin(performance.now() * 0.0005) * 0.05;
    ref.current.rotation.y += dt * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={AMBER}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Parallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    // Very gentle camera-group parallax based on mouse position
    ref.current.rotation.y +=
      (mouse.x * 0.08 - ref.current.rotation.y) * 0.04;
    ref.current.rotation.x +=
      (-mouse.y * 0.04 - ref.current.rotation.x) * 0.04;
  });

  return <group ref={ref}>{children}</group>;
}

export function DaedalusHero({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [0, 1.2, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={[BG]} />
        <fog attach="fog" args={[BG, 6, 13]} />

        {/* Lighting: warm key from upper-left + cool fill + tight spot pool on bench */}
        <ambientLight intensity={0.18} />
        <directionalLight
          position={[-3.5, 4, 2]}
          intensity={1.6}
          color={AMBER}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[2.5, 2, 2.5]} intensity={0.5} color={TEAL} />
        <pointLight position={[-2.5, 2, 2.5]} intensity={0.3} color={TEAL} />
        <spotLight
          position={[0, 4, 1.5]}
          angle={0.45}
          penumbra={0.9}
          intensity={1.2}
          color="#fff5e0"
          castShadow
          target-position={[0, -0.2, 0]}
        />
        {/* Warm pool of light on the bench surface */}
        <pointLight
          position={[0, 1.2, 1]}
          intensity={0.6}
          color={AMBER}
          distance={3.5}
          decay={2}
        />

        <Suspense fallback={null}>
          <Parallax>
            <Workbench />
            <FloatingPanel
              panel={PANELS[0]}
              position={[-1.85, 1.25, -0.1]}
              rotationY={0.22}
              delay={0}
            />
            <FloatingPanel
              panel={PANELS[1]}
              position={[0, 1.45, 0.2]}
              rotationY={0}
              delay={1.2}
            />
            <FloatingPanel
              panel={PANELS[2]}
              position={[1.85, 1.25, -0.1]}
              rotationY={-0.22}
              delay={2.4}
            />
            <FloorGrid />
            <DustHaze />
          </Parallax>
        </Suspense>
      </Canvas>
    </div>
  );
}
