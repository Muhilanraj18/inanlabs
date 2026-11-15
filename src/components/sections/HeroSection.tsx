"use client";

import React from "react";
import { Sparkles, Move3d } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-end items-center pb-10 sm:pb-14 px-4 overflow-hidden cursor-grab active:cursor-grabbing select-none"
      aria-label="Hero Stage — Interactive 3D Model"
    />
  );
}

export default HeroSection;
