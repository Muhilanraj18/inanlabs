"use client";

import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SceneFallback } from "./SceneFallback";
import { useExperience } from "./ExperienceContext";

// Dynamically import the WebGL Canvas to prevent SSR issues with Next.js
const DynamicCanvas = dynamic(
  () => import("./ExperienceInner").then((mod) => mod.ExperienceInner),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  }
);

// Dynamically import Vanta Clouds background
const VantaCloudsBackground = dynamic(
  () => import("./VantaCloudsBackground").then((mod) => mod.VantaCloudsBackground),
  { ssr: false }
);

class CanvasErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("WebGL Canvas encountered an issue, transitioning to fallback visual:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface ExperienceCanvasProps {
  scrollProgress: number;
}

export function ExperienceCanvas({ scrollProgress }: ExperienceCanvasProps) {
  useExperience();
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Detect reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Detect WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Show fallback if WebGL is unavailable or reduced motion is requested
  if (hasWebGL === false || isReducedMotion) {
    return <SceneFallback progress={scrollProgress} />;
  }

  if (hasWebGL === null) {
    return <SceneFallback progress={scrollProgress} />;
  }

  // Canvas is positioned at z-[2] with transparent background, revealed as the Loader (z-40) lifts
  const zClass = "z-[2]";

  return (
    <>
      <VantaCloudsBackground scrollProgress={scrollProgress} />
      <div
        className={`fixed inset-0 pointer-events-none overflow-hidden transition-all duration-700 ${zClass}`}
        aria-hidden="true"
      >
        <CanvasErrorBoundary fallback={<SceneFallback progress={scrollProgress} />}>
          <Suspense fallback={<SceneFallback progress={scrollProgress} />}>
            <DynamicCanvas scrollProgress={scrollProgress} />
          </Suspense>
        </CanvasErrorBoundary>
      </div>
    </>
  );
}
