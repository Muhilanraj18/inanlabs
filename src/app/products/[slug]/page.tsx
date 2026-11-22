import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/content/products";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeft,
  Cpu,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found — INAN LABS",
    };
  }

  return {
    title: `${product.name} — INAN LABS`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const getStatusBadge = (status: string) => {
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
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors selection:bg-brand-red selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-12">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-brand-red transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Systems Index</span>
          </Link>
        </div>

        {/* Product Identity Header */}
        <div className="border-b border-border/60 pb-10 mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-brand-red font-semibold">
              {product.category}
            </span>
            <span className="text-border">/</span>
            {product.version && (
              <span className="font-mono text-xs text-muted-foreground">
                {product.version}
              </span>
            )}
            <span
              className={`px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider font-mono border ${getStatusBadge(
                product.status
              )}`}
            >
              {product.status}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-foreground mb-4">
            {product.name}
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl">
            {product.tagline}
          </p>
        </div>

        {/* Metrics Bar */}
        {product.metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-muted/40 rounded-lg border border-border mb-12">
            {product.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground uppercase">
                  {m.label}
                </span>
                <span className="text-2xl font-mono font-semibold text-foreground">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Deep Dive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Main Architectural Description */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div>
              <span className="font-mono text-xs text-brand-red uppercase tracking-wider block mb-3 font-semibold">
                SYSTEM SPECIFICATION
              </span>
              <p className="text-lg text-foreground/90 leading-relaxed font-light mb-6">
                {product.fullDescription}
              </p>
            </div>

            {/* Architecture Overview */}
            <div className="p-8 rounded-lg border border-border glass-panel">
              <div className="flex items-center gap-2 font-mono text-xs text-brand-red mb-4 font-semibold">
                <Cpu className="w-4 h-4" />
                <span>ARCHITECTURAL IMPLEMENTATION</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {product.architectureOverview}
              </p>
            </div>

            {/* Feature List */}
            <div>
              <span className="font-mono text-xs text-brand-red uppercase tracking-wider block mb-4 font-semibold">
                INTRINSIC CAPABILITIES
              </span>
              <div className="flex flex-col gap-3">
                {product.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded border border-border/80 bg-muted/20 flex items-start gap-3"
                  >
                    <span className="font-mono text-xs text-brand-red font-bold mt-0.5">
                      [{i + 1}]
                    </span>
                    <span className="text-sm text-foreground/90 font-light leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Metadata */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Tech Stack */}
            <div className="p-6 rounded-lg border border-border glass-panel">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-4">
                TECHNICAL FOUNDATIONS
              </span>
              <div className="flex flex-wrap gap-2">
                {product.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded bg-muted text-xs font-mono text-foreground border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* System Status Readout */}
            <div className="p-6 rounded-lg border border-border glass-panel flex flex-col gap-3 font-mono text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>LIFECYCLE</span>
                <span className="text-foreground">{product.status}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>COMPLIANCE</span>
                <span className="text-brand-red">FORMALLY VERIFIED</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>LICENSE</span>
                <span className="text-foreground">INAN PROPRIETARY</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col gap-3">
              <Link
                href="/#contact"
                className="w-full py-3.5 bg-brand-red text-white hover:bg-red-600 rounded font-mono text-xs tracking-wider uppercase text-center transition-colors shadow-lg shadow-brand-red/20 font-medium"
              >
                Inquire Access
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
