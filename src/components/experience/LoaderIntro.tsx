"use client";

import React, { useEffect, useState } from "react";
import { useExperience } from "./ExperienceContext";

interface LoaderIntroProps {
  onComplete?: () => void;
}

export function LoaderIntro({ onComplete }: LoaderIntroProps) {
  const { loaderStage, setLoaderStage, setIsLoaded } = useExperience();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(true);

  // 7 vertical rectangular panels in Electric Lime
  const columnIndices = [0, 1, 2, 3, 4, 5, 6];

  useEffect(() => {
    if (loaderStage === "loading" || loaderStage === "assembled") {
      setMounted(true);
      setIsTransitioning(false);
    } else if (loaderStage === "transitioning") {
      // Use double requestAnimationFrame to ensure the initial translate3d(0, 0, 0) is committed
      // before triggering the hardware-accelerated GPU compositor transition
      let timer: NodeJS.Timeout;
      const rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });

      // Total sequence time: 6 * 0.1s (stagger) + 0.8s (duration) = 1.4s
      timer = setTimeout(() => {
        setMounted(false);
        setLoaderStage("background");
        setIsLoaded(true);
        onComplete?.();
      }, 1500);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timer);
      };
    } else if (loaderStage === "background") {
      setMounted(false);
    }
  }, [loaderStage, onComplete, setLoaderStage, setIsLoaded]);

  if (!mounted && loaderStage === "background") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none select-none overflow-hidden"
      role="status"
      aria-label="Loading Experience"
    >
      {/* 7 Vertical rectangular panels in Electric Lime — GPU Compositor Hardware Accelerated */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {columnIndices.map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 bg-[#ccff00]"
            style={{
              left: `calc(${i} * 100% / 7)`,
              width: `calc(100% / 7 + 1.5px)`,
              backgroundColor: "#ccff00",
              transform: isTransitioning
                ? "translate3d(0, -100%, 0)"
                : "translate3d(0, 0, 0)",
              transition: isTransitioning
                ? `transform 0.8s cubic-bezier(0.76, 0, 0.24, 1) ${i * 0.1}s`
                : "none",
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default LoaderIntro;
