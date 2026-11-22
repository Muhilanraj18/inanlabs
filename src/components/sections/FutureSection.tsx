"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function FutureSection() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="future"
      className="relative min-h-[85vh] flex flex-col justify-center py-24 sm:py-28 overflow-hidden bg-transparent text-foreground font-sans"
      aria-label="Section — Future"
    >
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Vision Statement */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="font-sans text-xs tracking-widest text-[#066680] uppercase font-bold">
                Future
              </span>
              <span className="h-px w-10 bg-[#066680]/40" />
              <span className="text-xs font-sans text-[#2d3139] uppercase font-semibold">
                A Future in Progress
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-[#090a10]">
              The best part is{" "}
              <span className="text-[#066680] font-black">what comes next.</span>
            </h2>

            <p className="text-lg sm:text-xl text-[#181a24] font-medium leading-relaxed max-w-2xl">
              We&apos;re building the foundations for ideas that can become useful,
              thoughtful, and lasting digital products.
            </p>

            <p className="text-base text-[#2d3139] font-normal leading-relaxed max-w-2xl">
              As an independent laboratory, our roadmap is shaped not by artificial
              hype cycles, but by the relentless pursuit of solutions to stubborn
              technical problems. We invest in research that compounds over decades.
            </p>

            <div className="pt-4">
              <button
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#066680] hover:bg-[#090a10] text-white font-sans text-xs tracking-widest uppercase font-bold shadow-[0_0_24px_rgba(6,102,128,0.3)] transition-all duration-300 cursor-pointer group"
                onClick={() => scrollTo("#contact", -80)}
              >
                <span>Collaborate with us</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Directional Frontiers */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 rounded-2xl border border-black/15 bg-[#0c0e18]/90 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#51E2F5]" />
                <span className="font-sans text-xs text-[#51E2F5] uppercase font-bold">
                  FRONTIER // 01
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Deterministic Autonomous Synthesis
              </h3>
              <p className="text-xs text-white/85 leading-relaxed font-normal">
                Advancing mathematical safeguards and bounded verification for multi-agent workflows.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-black/15 bg-[#0c0e18]/90 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#51E2F5]" />
                <span className="font-sans text-xs text-[#51E2F5] uppercase font-bold">
                  FRONTIER // 02
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Zero-Trust Local State Gossip
              </h3>
              <p className="text-xs text-white/85 leading-relaxed font-normal">
                Decentralized CRDT consensus primitives operating across edge runtimes without centralized cloud dependency.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-black/15 bg-[#0c0e18]/90 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#51E2F5]" />
                <span className="font-sans text-xs text-[#51E2F5] uppercase font-bold">
                  FRONTIER // 03
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                High-Precision Spatial Computing
              </h3>
              <p className="text-xs text-white/85 leading-relaxed font-normal">
                WebGPU procedural spatial generation pipelines engineered for real-time mathematical simulation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FutureSection;
