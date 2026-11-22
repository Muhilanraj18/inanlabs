"use client";

import React, { useEffect, useState } from "react";
import { useExperience } from "./ExperienceContext";

interface LoaderIntroProps {
  onComplete?: () => void;
}

// SVG path data for each letter of "INAN LABS"
// Hand-drawn style paths — each letter is a stroked SVG path that animates dashoffset
const LETTERS: { path: string; width: number; viewBox: string }[] = [
  // I
  {
    viewBox: "0 0 28 90",
    width: 20,
    path: "M14 8 L14 82",
  },
  // N
  {
    viewBox: "0 0 56 90",
    width: 42,
    path: "M8 82 L8 8 L48 82 L48 8",
  },
  // A
  {
    viewBox: "0 0 56 90",
    width: 42,
    path: "M4 82 L28 8 L52 82 M12 58 L44 58",
  },
  // N
  {
    viewBox: "0 0 56 90",
    width: 42,
    path: "M8 82 L8 8 L48 82 L48 8",
  },
  // space — no letter
  {
    viewBox: "0 0 24 90",
    width: 20,
    path: "",
  },
  // L
  {
    viewBox: "0 0 48 90",
    width: 36,
    path: "M10 8 L10 82 L44 82",
  },
  // A
  {
    viewBox: "0 0 56 90",
    width: 42,
    path: "M4 82 L28 8 L52 82 M12 58 L44 58",
  },
  // B
  {
    viewBox: "0 0 54 90",
    width: 40,
    path: "M10 8 L10 82 M10 8 C40 8 44 24 10 46 M10 46 C44 46 48 68 10 82",
  },
  // S
  {
    viewBox: "0 0 50 90",
    width: 38,
    path: "M44 18 C44 10 8 4 8 28 C8 50 44 42 44 64 C44 86 8 84 8 72",
  },
];

// Measure path length for dashoffset animation
function PathLetter({
  letter,
  animate,
  delay,
}: {
  letter: (typeof LETTERS)[0];
  animate: boolean;
  delay: number;
}) {
  if (!letter.path) return null;

  const duration = 0.55;

  return (
    <svg
      viewBox={letter.viewBox}
      style={{ width: letter.width, height: 90, overflow: "visible", flexShrink: 0 }}
      fill="none"
    >
      {letter.path.split(" M ").map((segment, si) => {
        const d = si === 0 ? segment : "M " + segment;
        return (
          <path
            key={si}
            d={d}
            stroke="#0c0e18"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{
              strokeDasharray: 400,
              strokeDashoffset: animate ? 0 : 400,
              transition: animate
                ? `stroke-dashoffset ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay + si * 0.08}s`
                : "none",
            }}
          />
        );
      })}
    </svg>
  );
}

export function LoaderIntro({ onComplete }: LoaderIntroProps) {
  const { loaderStage, setLoaderStage, setIsLoaded } = useExperience();
  const [mounted, setMounted] = useState(true);
  const [textAnimate, setTextAnimate] = useState(false);
  const [isPanelsLifting, setIsPanelsLifting] = useState(false);
  const [textVisible, setTextVisible] = useState(true);

  const columnIndices = [0, 1, 2, 3, 4, 5, 6];

  useEffect(() => {
    if (loaderStage === "loading" || loaderStage === "assembled") {
      setMounted(true);
      setIsPanelsLifting(false);
      setTextVisible(true);
      // Start handwriting animation after 200ms
      const t = setTimeout(() => setTextAnimate(true), 200);
      return () => clearTimeout(t);
    }

    if (loaderStage === "transitioning") {
      // 1. Fade text out first
      setTextVisible(false);

      const rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // 2. After text fades, lift panels
          setTimeout(() => {
            setIsPanelsLifting(true);
          }, 320);
        });
      });

      // Total: 320ms fade + 7 panels × 120ms stagger + 1100ms duration = ~2300ms
      const done = setTimeout(() => {
        setMounted(false);
        setLoaderStage("background");
        setIsLoaded(true);
        onComplete?.();
      }, 2800);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(done);
      };
    }

    if (loaderStage === "background") {
      setMounted(false);
    }
  }, [loaderStage, onComplete, setLoaderStage, setIsLoaded]);

  if (!mounted && loaderStage === "background") return null;

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none select-none overflow-hidden"
      role="status"
      aria-label="Loading"
    >
      {/* ── 7 Electric Lime panels ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {columnIndices.map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `calc(${i} * 100% / 7)`,
              width: `calc(100% / 7 + 1.5px)`,
              backgroundColor: "#ccff00",
              transform: isPanelsLifting
                ? "translate3d(0, -100%, 0)"
                : "translate3d(0, 0, 0)",
              transition: isPanelsLifting
                ? `transform 1.1s cubic-bezier(0.87, 0, 0.13, 1) ${i * 0.12}s`
                : "none",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          />
        ))}
      </div>

      {/* ── Handwritten "INAN LABS" text ── */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: textVisible ? 1 : 0,
          transition: textVisible
            ? "none"
            : "opacity 0.3s cubic-bezier(0.4, 0, 1, 1)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: "0 8px",
          }}
        >
          {LETTERS.map((letter, i) => {
            if (!letter.path) {
              return <div key={i} style={{ width: letter.width }} />;
            }
            const delay = i * 0.14;
            return (
              <PathLetter
                key={i}
                letter={letter}
                animate={textAnimate}
                delay={delay}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LoaderIntro;
