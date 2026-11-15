"use client";

import React, { useState } from "react";
import { InanLogo } from "@/components/brand/InanLogo";
import { ArrowUp, Mail, Lock } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <footer className="relative bg-transparent border-t border-white/10 z-20 transition-colors font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <InanLogo height={36} href="" />

            <p className="text-sm text-[#a1a1aa] font-normal leading-relaxed max-w-sm">
              An independent technology company exploring possibilities,
              engineering solutions, and turning meaningful ideas into digital products.
            </p>

            <div className="flex items-center gap-2 font-sans text-xs text-[#BCECE2] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#BCECE2] animate-pulse" />
              <span>INAN CORE CLUSTER // ONLINE</span>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-3 flex flex-col gap-4 font-sans">
            <span className="text-xs uppercase tracking-wider text-[#BCECE2] font-bold">
              NAVIGATION
            </span>
            <ul className="flex flex-col gap-2.5 text-sm font-medium">
              <li>
                <button
                  onClick={() => scrollTo("#hero")}
                  className="text-white/70 hover:text-[#BCECE2] transition-colors cursor-pointer text-left"
                >
                  Hero Stage
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#origin")}
                  className="text-white/70 hover:text-[#BCECE2] transition-colors cursor-pointer text-left"
                >
                  About & Origin
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#engineering")}
                  className="text-white/70 hover:text-[#BCECE2] transition-colors cursor-pointer text-left"
                >
                  Engineering Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#capabilities")}
                  className="text-white/70 hover:text-[#BCECE2] transition-colors cursor-pointer text-left"
                >
                  Services & Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#future")}
                  className="text-white/70 hover:text-[#BCECE2] transition-colors cursor-pointer text-left"
                >
                  Vision & Future
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="text-white/70 hover:text-[#BCECE2] transition-colors cursor-pointer text-left"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Confidential Architecture Column */}
          <div className="lg:col-span-4 flex flex-col gap-4 font-sans">
            <span className="text-xs uppercase tracking-wider text-[#BCECE2] font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#BCECE2]" />
              CONFIDENTIAL PROTOCOLS
            </span>
            <div className="flex flex-col gap-3 text-xs text-foreground/80 font-normal">
              <div className="p-3.5 rounded-xl bg-[#0d0e12]/80 border border-white/10 shadow-sm flex flex-col gap-1">
                <span className="text-white font-bold">ZERO EXTERNAL LEAKAGE</span>
                <p className="text-[12px] text-[#a1a1aa] leading-relaxed">
                  All client systems, memory structures, and model weights operate in isolated, cryptographically bounded enclaves.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0d0e12]/80 border border-white/10 shadow-sm flex flex-col gap-1">
                <span className="text-white font-bold">FORMAL SPECIFICATIONS</span>
                <p className="text-[12px] text-[#a1a1aa] leading-relaxed">
                  Architecture diagrams and concurrency invariants are validated mathematically before runtime compilation.
                </p>
              </div>
            </div>
          </div>

          {/* Communications & Jump to Top */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <span className="font-sans text-xs uppercase tracking-wider text-[#BCECE2] font-bold">
                CONNECT
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/inan-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-foreground hover:border-[#BCECE2] transition-colors"
                  aria-label="GitHub Repository"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a
                  href="mailto:contact@inanlabs.com"
                  className="w-9 h-9 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-foreground hover:border-[#BCECE2] transition-colors"
                  aria-label="Email INAN LABS"
                >
                  <Mail className="w-4 h-4 text-[#BCECE2]" />
                </a>
              </div>
            </div>

            <div>
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-[#BCECE2] transition-colors shadow-md cursor-pointer font-sans text-xs tracking-wider uppercase text-white/80 hover:text-[#BCECE2]"
                onClick={() => scrollTo(0)}
              >
                <span className="font-semibold">Return to Top</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#BCECE2]" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-white/50">
          <div>
            <span>© 2026 INAN LABS. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Information
            </button>
            <span className="text-white/20">/</span>
            <span>Security Architecture</span>
            <span className="text-white/20">/</span>
            <span className="text-[#BCECE2] font-semibold">CONFIDENTIAL // v1.0.0</span>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg p-8 bg-[#0a0a0c] border border-[#348D9F]/40 rounded-2xl shadow-2xl">
            <div className="w-full flex flex-col">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="font-sans text-xs text-[#BCECE2] font-semibold uppercase">
                  LEGAL & PRIVACY SPECIFICATION
                </span>
                <button
                  onClick={() => setPrivacyModalOpen(false)}
                  className="font-sans text-xs text-white/70 hover:text-white px-2 py-0.5 border border-white/20 rounded cursor-pointer"
                >
                  [ CLOSE ]
                </button>
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">
                Data Minimization Commitment
              </h3>

              <div className="flex flex-col gap-3 text-xs text-[#a1a1aa] leading-relaxed mb-6 font-normal">
                <p>
                  INAN LABS adheres to strict zero-surveillance engineering principles. We do
                  not deploy third-party advertising trackers, sell behavioral telemetry, or
                  profile visitors.
                </p>
                <p>
                  Any communication submitted through our contact channels is used exclusively
                  for technical and business evaluation directly related to your inquiry.
                </p>
              </div>

              <button
                className="w-full py-3 rounded-full bg-[#348D9F] hover:bg-[#066680] text-white font-sans text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                onClick={() => setPrivacyModalOpen(false)}
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
