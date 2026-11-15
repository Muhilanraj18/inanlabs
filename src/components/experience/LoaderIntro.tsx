"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useExperience } from "./ExperienceContext";

interface LoaderIntroProps {
  onComplete?: () => void;
}

export function LoaderIntro({ onComplete }: LoaderIntroProps) {
  const { loaderStage, setLoaderStage, loaderProgress } = useExperience();
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);

  // 7 distinct vertical rectangular shutter panels for upward wipe
  const columnIndices = [0, 1, 2, 3, 4, 5, 6];

  useEffect(() => {
    if (loaderStage === "loading" || loaderStage === "assembled") {
      setMounted(true);
      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current);
        if (backdropRef.current) gsap.killTweensOf(backdropRef.current);
        gsap.killTweensOf(columnsRef.current);
        if (contentRef.current) gsap.killTweensOf(contentRef.current);

        gsap.set(containerRef.current, { display: "block", opacity: 1 });
        if (backdropRef.current) gsap.set(backdropRef.current, { opacity: 1, yPercent: 0 });
        gsap.set(columnsRef.current, { yPercent: 0 });
        if (contentRef.current) gsap.set(contentRef.current, { opacity: 1, y: 0 });
      }
    } else if (loaderStage === "transitioning") {
      // 1. Dissolve the center loader content upward
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.45,
          ease: "power2.inOut",
        });
      }

      // 2. Backdrop moves up seamlessly with the first shutter
      if (backdropRef.current) {
        gsap.to(backdropRef.current, {
          yPercent: -100,
          duration: 1.3,
          ease: "power4.inOut",
        });
      }

      // 3. The 7 Electric Lime rectangular vertical shutter panels slide UPWARD staggered
      if (columnsRef.current.length > 0) {
        gsap.to(columnsRef.current, {
          yPercent: -100,
          duration: 1.35,
          ease: "power4.inOut",
          stagger: {
            each: 0.08,
            from: "start",
          },
          onComplete: () => {
            setMounted(false);
            setLoaderStage("background");
            onComplete?.();
          },
        });
      }
    } else if (loaderStage === "background") {
      setMounted(false);
    }
  }, [loaderStage, onComplete, setLoaderStage]);

  if (!mounted && loaderStage === "background") {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none select-none overflow-hidden font-sans"
      role="status"
      aria-live="polite"
      aria-label="Loading Experience"
    >
      {/* Electric Lime underlay */}
      <div
        ref={backdropRef}
        className="absolute inset-0 w-full h-full bg-[#ccff00] pointer-events-none"
      />

      {/* 7 Vertical rectangular shutter bars in Electric Lime */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {columnIndices.map((i) => (
          <div
            key={i}
            ref={(el) => {
              columnsRef.current[i] = el;
            }}
            className="absolute top-0 bottom-0 bg-[#ccff00] border-r border-black/15 border-l border-white/20 border-b-4 border-b-black shadow-[0_0_35px_rgba(0,0,0,0.25)]"
            style={{
              left: `calc(${i} * (100% / 7) - 1px)`,
              width: `calc((100% / 7) + 2px)`,
              backgroundColor: "#ccff00",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3), inset 0 0 40px rgba(0, 0, 0, 0.04)",
              transform: "translate3d(0, 0, 0)",
              willChange: "transform",
            }}
          >
            {/* Top subtle vertical accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />
            {/* Bottom edge accent */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Modern Rethink Sans Central Loader Typography — ZERO loading numbers */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center font-sans pointer-events-none"
      >
        <div className="flex flex-col items-center gap-5 max-w-md">
          {/* Brand Mark in Solid Jet Black */}
          <div className="w-16 h-10 relative flex items-center justify-center">
            <img
              src="/brand/inan-mark-clean.png"
              alt="INAN LABS"
              className="h-full w-auto object-contain filter brightness-0"
            />
          </div>

          {/* Status Tag Pill */}
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/10 border border-black/25 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <span className="font-sans text-xs font-black tracking-[0.28em] text-[#080808] uppercase">
              CHAPTER 01 // INITIALIZING
            </span>
          </div>

          {/* Sleek Horizontal Progress Track (NO number counter) */}
          <div className="w-64 sm:w-80 h-1.5 bg-black/15 rounded-full overflow-hidden mt-1 p-[1px] shadow-inner">
            <div
              className="h-full bg-black rounded-full transition-all duration-75 ease-out"
              style={{ width: `${loaderProgress}%` }}
            />
          </div>

          {/* 7 Vertical Bar Channel Indicators */}
          <div className="flex items-center justify-center gap-2 mt-1">
            {columnIndices.map((idx) => {
              const active = loaderProgress >= ((idx + 1) / 7) * 95;
              return (
                <div
                  key={idx}
                  className={`w-4 sm:w-6 h-1 rounded-full transition-all duration-300 ${
                    active ? "bg-black shadow-[0_0_6px_rgba(0,0,0,0.6)]" : "bg-black/20"
                  }`}
                />
              );
            })}
          </div>

          <span className="font-sans text-xs font-bold tracking-[0.25em] text-[#080808]/80 uppercase mt-1">
            INAN LABS · SYSTEMS ARCHITECTURE
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoaderIntro;
