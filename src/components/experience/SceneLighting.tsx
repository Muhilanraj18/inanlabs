"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

interface SceneLightingProps {
  isDark: boolean;
  scrollProgress: number;
}

export function SceneLighting({ isDark }: SceneLightingProps) {
  const redPointRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // 1. Gentle pulsing of the red light anchor near the red mark
    if (redPointRef.current) {
      redPointRef.current.intensity = isDark
        ? 3.8 + Math.sin(time * 2.2) * 0.9
        : 2.4 + Math.sin(time * 2.2) * 0.5;
    }

    // 2. Dynamic rim light sweeping subtly across beveled chamfers
    if (rimLightRef.current) {
      const sweepX = Math.cos(time * 0.6) * 4;
      const sweepZ = Math.sin(time * 0.6) * 3 - 4;
      rimLightRef.current.position.set(sweepX, 5, sweepZ);
    }
  });

  return (
    <>
      {/* ── HIGH-TECH STUDIO ENVIRONMENT REFLECTION MAP (LOCAL OFFLINE HDR) ── */}
      <Environment files="/textures/environment/potsdamer_platz_1k.hdr" environmentIntensity={isDark ? 0.6 : 0.9} />

      {/* ── AMBIENT BASE LIGHTING ── */}
      <ambientLight
        intensity={isDark ? 0.65 : 1.1}
        color={isDark ? "#12131a" : "#ffffff"}
      />

      {/* ── PRIMARY KEY LIGHT (SHADOW CASTER) ── */}
      <directionalLight
        ref={keyLightRef}
        position={[6, 7, 6]}
        intensity={isDark ? 3.2 : 2.6}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00008}
      />

      {/* ── SPECULAR RIM LIGHT (CATCHES BEVEL CHAMFERS) ── */}
      <directionalLight
        ref={rimLightRef}
        position={[-5, 4, -4]}
        intensity={isDark ? 2.4 : 1.5}
        color={isDark ? "#94a3b8" : "#f1f5f9"}
      />

      {/* ── BRAND CRIMSON POINT LIGHT (CASTS RADIANCE ONTO MODEL) ── */}
      <pointLight
        ref={redPointRef}
        position={[-2.0, 1.35, 0.9]}
        color="#ff0022"
        distance={7.0}
        decay={2.0}
        intensity={isDark ? 3.8 : 2.2}
      />

      {/* ── SECONDARY COOL FILL LIGHT ── */}
      <directionalLight
        position={[-6, -3, 3]}
        intensity={isDark ? 1.0 : 0.7}
        color={isDark ? "#1e2230" : "#e2e8f0"}
      />

      {/* ── GROUND UPWARD BOUNCE ── */}
      <directionalLight
        position={[0, -6, 2]}
        intensity={isDark ? 0.35 : 0.55}
        color={isDark ? "#0f1118" : "#cbd5e1"}
      />
    </>
  );
}
