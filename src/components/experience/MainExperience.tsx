"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExperienceProvider, useExperience } from "@/components/experience/ExperienceContext";
import { ExperienceCanvas } from "@/components/experience/ExperienceCanvas";
import { LoaderIntro } from "@/components/experience/LoaderIntro";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { OriginSection } from "@/components/sections/OriginSection";
// IdentitySection removed per user request
// ExplorationSection removed per user request
import { EngineeringSection } from "@/components/sections/EngineeringSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
// ProductsSection removed per user request
import { FutureSection } from "@/components/sections/FutureSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { GlassSurface } from "@/components/ui/GlassSurface";

function MainContent() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const { setScrollProgress: setContextScroll, replayLoader, loaderStage } = useExperience();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        setContextScroll(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, [setContextScroll]);

  // Synchronize main content reveal with 3D logo transition
  useEffect(() => {
    const isReady = loaderStage === "transitioning" || loaderStage === "background";
    if (isReady) {
      gsap.to([navbarRef.current, mainRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
      });
    } else {
      gsap.set([navbarRef.current, mainRef.current], {
        opacity: 0,
        y: 24,
      });
    }
  }, [loaderStage]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-transparent text-foreground selection:bg-brand-red selection:text-white overflow-x-hidden w-full"
    >
      {/* ── 01. PERSISTENT GLOBAL 3D WEBGL ENGINE ('N' LOGO MODEL SMALL IN BACKGROUND) ── */}
      <ExperienceCanvas scrollProgress={scrollProgress} />

      {/* ── 02. CINEMATIC 3D LOADER HUD OVERLAY (Z-20 & Z-40) ── */}
      <LoaderIntro />

      {/* ── 05. GLOBAL NAVIGATION BAR (Z-50) ── */}
      <div ref={navbarRef} className="relative z-50 transition-opacity">
        <Navbar />
      </div>

      {/* ── 06. REPLAY 3D INTRO FLOATING TRIGGER (GLASS SURFACE) ── */}
      {loaderStage === "background" && (
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={replayLoader}
            className="px-4 py-2 rounded-full backdrop-blur-xl bg-black/80 border border-[#ccff00]/40 hover:border-[#ccff00] text-[#ccff00] font-sans text-xs uppercase tracking-wider font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.2)] transition-all duration-300 cursor-pointer group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
            <span>REPLAY 3D INTRO</span>
          </button>
        </div>
      )}

      {/* ── 07. CONTINUOUS SCROLL-DRIVEN CONTENT CHAPTERS (Z-10) ── */}
      <main ref={mainRef} className="relative z-10 flex flex-col transition-opacity">
        {/* 01 // HERO (CLEAR OPEN 3D STAGE) */}
        <HeroSection />

        {/* 02 // ORIGIN */}
        <OriginSection />

        {/* 03 // IDENTITY — removed */}
        {/* 04 // EXPLORATION — removed */}

        {/* 05 // ENGINEERING */}
        <EngineeringSection />

        {/* 06 // CAPABILITIES */}
        <CapabilitiesSection />

        {/* 07 // PRODUCTS — removed */}

        {/* 08 // THE WAY FORWARD */}
        <FutureSection />

        {/* 09 // CONTACT */}
        <ContactSection />
      </main>

      {/* 08 // FOOTER */}
      <Footer />
    </div>
  );
}

export function MainExperience() {
  return (
    <ExperienceProvider>
      <MainContent />
    </ExperienceProvider>
  );
}

export default MainExperience;
