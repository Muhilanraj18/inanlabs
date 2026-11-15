"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { InanLogo3DModel } from "./InanLogo3DModel";
import { SceneLighting } from "./SceneLighting";
import { ExperienceCamera } from "./ExperienceCamera";
import { DriftingCloudsThroughLogo } from "./DriftingCloudsThroughLogo";

interface ExperienceInnerProps {
  scrollProgress: number;
}

export function ExperienceInner({ scrollProgress }: ExperienceInnerProps) {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handlePointerMove = (e: MouseEvent) => {
      // Normalize pointer between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer({ x, y });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" || theme === "dark" : true;

  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.12,
      }}
      camera={{ position: [0, 0, 7.5], fov: 45, near: 0.1, far: 50 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <ExperienceCamera scrollProgress={scrollProgress} />
      <SceneLighting isDark={isDark} scrollProgress={scrollProgress} />
      <DriftingCloudsThroughLogo scrollProgress={scrollProgress} />
      <InanLogo3DModel
        scrollProgress={scrollProgress}
        isDark={isDark}
        pointer={pointer}
      />
    </Canvas>
  );
}
