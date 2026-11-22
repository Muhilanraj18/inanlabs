"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/content/products";
import { ProductStatus } from "@/types/product";
import { ArrowUpRight } from "lucide-react";

export function ProductsSection() {
  const getStatusBadge = (status: ProductStatus) => {
    switch (status) {
      case "Launched":
        return "bg-brand-red text-white border-brand-red";
      case "Beta":
        return "bg-foreground text-background border-foreground";
      case "In Development":
        return "bg-muted text-foreground border-border";
      default:
        return "bg-transparent text-muted-foreground border-border/80 border-dashed";
    }
  };

  return (
    <section
      id="products"
      className="relative min-h-screen flex flex-col justify-center py-24 sm:py-28 overflow-hidden bg-transparent text-white"
      aria-label="Section — Products"
    >
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs tracking-widest text-brand-red uppercase font-semibold">
                Products
              </span>
              <span className="h-px w-10 bg-brand-red/50" />
              <span className="text-xs font-mono text-white/50 uppercase">
                Ideas Become Experiences
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-4 text-foreground">
              Built to be used,{" "}
              <span className="text-brand-red font-semibold">not just imagined.</span>
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
              Discover the products and experiments taking shape at INAN LABS.
            </p>
          </div>

          <div className="font-mono text-xs text-muted-foreground flex flex-col items-start md:items-end gap-1">
            <span>INDEX // {PRODUCTS.length} SYSTEMS DOCUMENTED</span>
            <span className="text-brand-red">STATUS // VERIFIED RUNTIMES</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border border-border glass-panel overflow-hidden flex flex-col justify-between group hover:border-brand-red/60 transition-all duration-300"
            >
              {/* Card Header & Status */}
              <div className="p-8 pb-4">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    {product.version && (
                      <span className="text-muted-foreground">{product.version}</span>
                    )}
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${getStatusBadge(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold text-foreground group-hover:text-brand-red transition-colors mb-2">
                  {product.name}
                </h3>

                <p className="font-mono text-xs text-brand-red/90 mb-4 tracking-wide">
                  {product.tagline}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed font-light mb-6">
                  {product.shortDescription}
                </p>

                {/* Metrics Readout */}
                {product.metrics && (
                  <div className="grid grid-cols-3 gap-2 py-4 px-4 bg-muted/50 rounded border border-border/40 font-mono text-xs mb-6">
                    {product.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground uppercase">
                          {m.label}
                        </span>
                        <span className="text-foreground font-semibold">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Features List */}
                <div className="flex flex-col gap-2">
                  {product.features.slice(0, 3).map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-foreground/80 font-light"
                    >
                      <span className="text-brand-red font-mono font-bold mt-0.5">
                        ›
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer with Link to Product Detail Page */}
              <div className="p-8 pt-6 border-t border-border/40 flex items-center justify-between bg-transparent">
                <div className="flex flex-wrap gap-1.5">
                  {product.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-background text-[10px] font-mono text-muted-foreground border border-border/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-foreground hover:text-brand-red font-medium transition-colors group/link"
                >
                  <span>Full Specification</span>
                  <ArrowUpRight className="w-4 h-4 text-brand-red transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
