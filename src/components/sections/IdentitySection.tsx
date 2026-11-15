"use client";

import React from "react";

const AXIOMS = [
  {
    num: "01",
    tag: "DISCIPLINE",
    title: "Mathematical Precision",
    desc: "We reject arbitrary complexity. Every architectural decision, line of code, and interface component is guided by rigorous necessity and clear logic.",
    spec: "SPEC // ZERO CONCURRENCY HAZARDS",
  },
  {
    num: "02",
    tag: "CONTINUITY",
    title: "End-to-End Craft",
    desc: "From low-level data structures and memory layouts to typography hierarchy and spatial layout, design and engineering are one continuous discipline.",
    spec: "SPEC // INTEGRATED DESIGN SYSTEMS",
  },
  {
    num: "03",
    tag: "LONGEVITY",
    title: "Built to Endure",
    desc: "We design tools and software systems with durability in mind—primitives that remain dependable as technologies evolve and scale demands grow.",
    spec: "SPEC // DETERMINISTIC LIFECYCLE",
  },
];

export function IdentitySection() {
  return (
    <section
      id="identity"
      className="relative min-h-[85vh] flex flex-col justify-center py-24 sm:py-28 overflow-hidden bg-transparent text-white"
      aria-label="Section — Identity"
    >
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-14">
          {/* Simple Section Header */}
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-widest text-brand-red uppercase font-semibold">
                Identity
              </span>
              <span className="h-px w-10 bg-brand-red/50" />
              <span className="text-xs font-mono text-white/50 uppercase">
                The INAN LABS World
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] text-white">
              Built through curiosity.
              <br />
              <span className="text-white/50 font-light">Shaped by engineering.</span>
            </h2>

            <p className="text-lg sm:text-xl text-white/60 font-light leading-relaxed pt-2">
              INAN LABS is being built around a simple ambition: explore ideas, develop
              useful solutions, and turn promising concepts into products people can use.
            </p>
          </div>

          {/* Axioms (Simple, Open, Integrated) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/10">
            {AXIOMS.map((ax) => (
              <div
                key={ax.num}
                className="flex flex-col justify-between group py-2 border-l border-white/10 pl-5"
              >
                <div>
                  <div className="font-mono text-xs text-white/50 mb-4 flex items-center justify-between">
                    <span>AXIOM {ax.num}</span>
                    <span className="text-brand-red font-semibold">{ax.tag}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-brand-red transition-colors">
                    {ax.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    {ax.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 font-mono text-[10px] text-white/40">
                  {ax.spec}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default IdentitySection;
