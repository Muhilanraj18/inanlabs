"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CAPABILITIES, Capability } from "@/content/capabilities";
import { ArrowUpRight, Code2, Sparkles, Terminal, Wrench, Boxes, X, ShieldCheck } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function CapabilitiesSection() {
  const [selectedCap, setSelectedCap] = useState<Capability | null>(null);
  const [mounted, setMounted] = useState(false);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close modal on Escape key and lock page scroll completely when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCap(null);
    };

    if (selectedCap) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCap, lenis]);

  const getIcon = (id: string) => {
    switch (id) {
      case "software-engineering": return <Code2 className="w-5 h-5 text-[#51E2F5]" />;
      case "ai-applications": return <Sparkles className="w-5 h-5 text-[#51E2F5]" />;
      case "developer-tools": return <Terminal className="w-5 h-5 text-[#51E2F5]" />;
      case "product-design": return <Wrench className="w-5 h-5 text-[#51E2F5]" />;
      default: return <Boxes className="w-5 h-5 text-[#51E2F5]" />;
    }
  };

  return (
    <section
      id="capabilities"
      className="relative min-h-[90vh] flex flex-col justify-center py-24 sm:py-28 overflow-hidden bg-transparent text-foreground font-sans"
      aria-label="Section — Capabilities and Services"
    >
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-16">
          {/* Section Header */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-sans text-xs tracking-widest text-[#066680] uppercase font-bold">
                Services & Capabilities
              </span>
              <span className="h-px w-10 bg-[#066680]/40" />
              <span className="text-xs font-sans text-[#2d3139] uppercase tracking-wider font-semibold">
                Engineering Disciplines
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-[#090a10]">
              Disciplines engineered for the future.
            </h2>

            <p className="text-lg sm:text-xl text-[#181a24] font-medium leading-relaxed">
              Our work spans core distributed systems, intelligent agent architectures, and ergonomic developer
              platforms—engineered with mathematical restraint and uncompromising craft.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap) => (
              <button
                key={cap.id}
                onClick={() => setSelectedCap(cap)}
                className="text-left cursor-pointer group transition-all duration-300 hover:scale-[1.018] hover:-translate-y-1 focus-visible:outline-none"
                aria-label={`View confidential details for ${cap.title}`}
              >
                <div
                  className="p-7 flex flex-col justify-between h-full min-h-[260px] rounded-2xl bg-[#0c0e18]/90 backdrop-blur-xl border border-black/15 shadow-xl group-hover:border-[#51E2F5]/60 group-hover:shadow-[0_8px_32px_rgba(81,226,245,0.2)] transition-all duration-300"
                >
                  {/* Top row */}
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex flex-col gap-1">
                        <span className="font-sans text-[11px] text-[#51E2F5] font-bold tracking-widest uppercase">
                          SERVICE // {cap.number}
                        </span>
                        <div className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center bg-white/5 group-hover:border-[#51E2F5] group-hover:bg-[#51E2F5]/10 transition-all duration-300">
                          {getIcon(cap.id)}
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-[#51E2F5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>

                    <h3 className="text-xl font-bold mb-2.5 text-white group-hover:text-[#51E2F5] transition-colors duration-300 leading-tight">
                      {cap.title}
                    </h3>

                    <p className="text-[13px] text-white/80 leading-relaxed font-normal">
                      {cap.shortDescription}
                    </p>
                  </div>

                  {/* Bottom row */}
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {cap.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-sans font-semibold text-[#f5f5f5] border border-white/10 group-hover:border-[#51E2F5]/40 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {cap.technologies.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-sans font-medium text-[#51E2F5]">
                          +{cap.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Symmetrical, Center-Aligned & Fully Viewable Modal Portal — Scroll-Isolated */}
      {mounted && selectedCap && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md font-sans"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cap-modal-title"
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onClick={() => setSelectedCap(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] my-auto flex flex-col bg-[#0c0e18] border border-white/20 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden text-[#f5f5f5]"
            style={{
              animation: "scaleIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            {/* 01. Modal Header (Sticky / Shrink-0) */}
            <div className="flex items-center justify-between border-b border-white/15 px-6 py-4.5 shrink-0 bg-[#0c0e18]">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#51E2F5] animate-pulse" />
                <div className="flex items-center gap-2 font-sans text-xs">
                  <span className="text-[#51E2F5] font-bold tracking-wider uppercase">
                    CONFIDENTIAL // SERVICE {selectedCap.number}
                  </span>
                  <span className="text-white/40 hidden sm:inline">•</span>
                  <span className="text-white/70 hidden sm:inline uppercase text-[11px] font-medium">
                    Proprietary Specification
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCap(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-[#51E2F5] transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 02. Scrollable Modal Body (Isolated internal scrolling) */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain px-6 py-5 space-y-5 text-left"
              data-lenis-prevent
            >
              {/* Title & Objective */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#51E2F5]/15 border border-[#51E2F5]/40 flex items-center justify-center shrink-0">
                    {getIcon(selectedCap.id)}
                  </div>
                  <h3 id="cap-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#ffffff]">
                    {selectedCap.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#51E2F5]/15 border border-[#51E2F5]/30 font-sans text-xs text-[#51E2F5] font-bold tracking-wide uppercase">
                    CORE OBJECTIVE // {selectedCap.focus}
                  </span>
                </div>
              </div>

              {/* Architecture Overview */}
              <div>
                <h4 className="font-sans text-xs text-[#51E2F5] uppercase tracking-wider mb-2 font-bold">
                  SYSTEM ARCHITECTURE & PROTOCOL
                </h4>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal bg-black/50 p-4 rounded-xl border border-white/10">
                  {selectedCap.details}
                </p>
              </div>

              {/* Confidential Security & Governance Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
                <div className="p-3 rounded-lg bg-black/40 border border-white/10 flex flex-col gap-1">
                  <span className="text-white/60 text-[10px] uppercase tracking-wider font-semibold">
                    SECURITY CLASSIFICATION
                  </span>
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#51E2F5]" />
                    Tier-1 Protected // Restricted
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-black/40 border border-white/10 flex flex-col gap-1">
                  <span className="text-white/60 text-[10px] uppercase tracking-wider font-semibold">
                    VERIFICATION GUARANTEE
                  </span>
                  <span className="text-white font-bold">
                    100% Deterministic Invariants
                  </span>
                </div>
              </div>

              {/* Technical Protocols & Stack */}
              <div>
                <h4 className="font-sans text-xs text-[#51E2F5] uppercase tracking-wider mb-2 font-bold">
                  TECHNICAL PROTOCOLS & STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCap.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/10 font-sans text-xs font-semibold text-[#f5f5f5] border border-white/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 03. Modal Footer (Sticky / Shrink-0) */}
            <div className="px-6 py-4 border-t border-white/15 flex items-center justify-between gap-4 font-sans shrink-0 bg-[#0c0e18]">
              <span className="text-xs text-white/60 tracking-wider font-medium">
                INAN LABS // SPEC-0{selectedCap.number}
              </span>
              <button
                onClick={() => setSelectedCap(null)}
                className="px-5 py-2.5 rounded-lg bg-[#51E2F5] hover:bg-[#9DF9EF] text-black text-xs font-sans tracking-wider uppercase font-bold shadow-md shadow-[#51E2F5]/30 transition-all cursor-pointer"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
          <style>{`
            @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `}</style>
        </div>,
        document.body
      )}
    </section>
  );
}

export default CapabilitiesSection;
