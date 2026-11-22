"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface VantaCloudsBackgroundProps {
  scrollProgress?: number;
}

export function VantaCloudsBackground({ scrollProgress = 0 }: VantaCloudsBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let effect: any = null;
    let isMounted = true;

    // Ensure global THREE is available for Vanta
    if (typeof window !== "undefined") {
      (window as any).THREE = THREE;
    }

    const initVanta = async () => {
      try {
        // Dynamically import Vanta Clouds
        const vantaModule = await import("vanta/dist/vanta.clouds.min.js");
        const CLOUDS = (vantaModule.default && (vantaModule.default as any).default)
          ? (vantaModule.default as any).default
          : (vantaModule.default || (window as any).VANTA?.CLOUDS);

        if (isMounted && vantaRef.current && CLOUDS && !effect) {
          effect = CLOUDS({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            speed: 1.0,
            // ── ORIGINAL DAYTIME CLOUD COLOUR & LIGHTING ──
            skyColor: 0x68b8d7,        // Clean bright daytime blue sky
            cloudColor: 0xadc1de,      // Silvery-white cumulus clouds
            cloudShadowColor: 0x183550,// Deep atmospheric cloud shadow
            sunColor: 0xffa919,        // Golden sun
            sunlightColor: 0xffa933,    // Warm sunlight rays
            sunGlareColor: 0xff6633,   // Sun glare
            backgroundColor: 0xffffff, // Crisp clean backdrop
          });
          setIsReady(true);
        }
      } catch (err) {
        console.warn("Could not initialize Vanta.CLOUDS:", err);
      }
    };

    initVanta();

    return () => {
      isMounted = false;
      if (effect && typeof effect.destroy === "function") {
        try {
          effect.destroy();
        } catch {
          // Ignore destroy errors during unmount
        }
      }
    };
  }, []);

  // Gracefully fade Vanta clouds as user scrolls into the content chapters (Origin, Engineering, etc.)
  const p = Math.min(Math.max(scrollProgress, 0), 1);
  const opacity = Math.max(0, 1 - p / 0.22);

  return (
    <div
      ref={vantaRef}
      id="vanta-clouds-hero"
      className="fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-500 overflow-hidden"
      style={{
        zIndex: 0,
        opacity: isReady ? opacity : 0,
      }}
      aria-hidden="true"
    />
  );
}

export default VantaCloudsBackground;
