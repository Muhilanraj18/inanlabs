"use client";

import React from "react";

export function OriginSection() {
  return (
    <section
      id="origin"
      className="relative min-h-[85vh] flex flex-col justify-center py-24 sm:py-28 overflow-hidden bg-transparent text-foreground font-sans"
      aria-label="Section — Origin"
    >
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Simple Section Title */}
          <div className="lg:col-span-3 flex flex-col gap-2 border-l-2 border-[#51e2f5] pl-4">
            <span className="font-sans text-xs tracking-widest text-[#51e2f5] uppercase font-bold">
              Origin
            </span>
            <span className="text-xs font-sans text-white/70 uppercase tracking-wider font-semibold">
              From an idea to a possibility
            </span>
          </div>

          {/* Core Editorial Copy */}
          <div className="lg:col-span-9 max-w-3xl">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-8 text-foreground drop-shadow-md">
              Every meaningful product begins with a question.
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium leading-relaxed mb-12 drop-shadow-sm">
              We believe useful technology starts with understanding a problem,
              exploring possibilities, and finding a thoughtful way forward.
            </p>

            {/* Three Foundational Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/20">
              {[
                {
                  num: "01",
                  label: "INQUIRY",
                  title: "Understand Deeply",
                  desc: "We interrogate the problem space without assuming conventional solutions are the only answer.",
                },
                {
                  num: "02",
                  label: "EXPERIMENT",
                  title: "Explore Rigorously",
                  desc: "Hypotheses are tested with functional prototypes, stress-testing edge cases and mathematical boundaries.",
                },
                {
                  num: "03",
                  label: "PURPOSE",
                  title: "Build for Utility",
                  desc: "Software engineered not for novelty, but to solve real computational and human challenges.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="flex flex-col gap-3 py-3 px-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 group hover:border-[#51e2f5] transition-all"
                >
                  <span className="font-sans text-xs text-[#51e2f5] font-bold">
                    [ {item.num} / {item.label} ]
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#51e2f5] transition-colors">{item.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed font-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OriginSection;
