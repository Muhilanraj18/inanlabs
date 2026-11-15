"use client";

import React from "react";

interface Principle {
  step: string;
  title: string;
  description: string;
  artifact: string;
}

const PRINCIPLES: Principle[] = [
  {
    step: "01",
    title: "Structural Modeling",
    description:
      "Every system begins with formal specifications of state boundaries, invariants, and failure domains before any production code is committed.",
    artifact: "FORMAL SCHEMA // STATE INVARIANTS",
  },
  {
    step: "02",
    title: "Isolated Implementation",
    description:
      "Components are authored as modular, independently verifiable units with zero-copy interfaces and deterministic behavior.",
    artifact: "MICRO-ENCLAVES // ZERO DEPENDENCY BLOAT",
  },
  {
    step: "03",
    title: "Adversarial Stress Testing",
    description:
      "We subject protocols to simulated network partitions, Byzantine actor corruption, and extreme load spikes to verify self-healing properties.",
    artifact: "CHAOS INJECTION // BYZANTINE VALIDATION",
  },
  {
    step: "04",
    title: "Continuous Observability",
    description:
      "Real-time telemetry and structural metrics are compiled directly into the binary runtime, leaving zero blind spots in production operation.",
    artifact: "EMBEDDED TELEMETRY // REAL-TIME TRACING",
  },
];

export function EngineeringSection() {
  return (
    <section
      id="engineering"
      className="relative min-h-[85vh] flex flex-col justify-center py-24 sm:py-28 overflow-hidden bg-transparent text-foreground font-sans"
      aria-label="Section — Engineering"
    >
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-14">
          {/* Section Header */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-sans text-xs tracking-widest text-[#BCECE2] uppercase font-bold">
                Engineering
              </span>
              <span className="h-px w-10 bg-[#BCECE2]/50" />
              <span className="text-xs font-sans text-[#a1a1aa] uppercase font-semibold">
                Turning Ideas into Systems
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-foreground">
              From possibility to{" "}
              <span className="text-[#BCECE2] font-black">something real.</span>
            </h2>

            <p className="text-lg sm:text-xl text-[#a1a1aa] font-medium leading-relaxed">
              Good engineering turns promising ideas into coherent systems through
              careful design, implementation, iteration, and testing.
            </p>
          </div>

          {/* Structured Engineering Process */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            {PRINCIPLES.map((p) => (
              <div
                key={p.step}
                className="py-4 border-l border-[#BCECE2]/30 pl-5 flex flex-col justify-between group hover:border-[#BCECE2] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between font-sans text-xs mb-4 text-[#a1a1aa]">
                    <span className="text-[#BCECE2] font-bold">[{p.step}]</span>
                    <span className="font-semibold">PHASE</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-[#BCECE2] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed font-normal">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 font-sans text-[11px] text-[#BCECE2]/75 tracking-wider font-semibold">
                  {p.artifact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EngineeringSection;
