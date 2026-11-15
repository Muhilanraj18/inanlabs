"use client";

import React from "react";
import { Sparkles, Move3d } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-end items-center pb-10 sm:pb-14 px-4 overflow-hidden cursor-grab active:cursor-grabbing select-none"
      aria-label="Hero Stage — Interactive 3D Model"
    >
      {/* Subtle floating interactive indicator */}
      <div className="pointer-events-none flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-[#ccff00]/40 shadow-[0_0_20px_rgba(204,255,0,0.15)] text-white/90 text-xs font-sans tracking-widest uppercase font-semibold transition-all duration-300">
        <Move3d className="w-3.5 h-3.5 text-[#ccff00] animate-pulse" />
        <span className="text-[11px] sm:text-xs text-[#ccff00]">Interactive 3D · Drag to Rotate</span>
      </div>
    </section>
  );
}

export default HeroSection;
