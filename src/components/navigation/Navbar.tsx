"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { InanLogo } from "@/components/brand/InanLogo";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

const NAV_LINKS = [
  { label: "About", href: "#origin" },
  { label: "Engineering", href: "#engineering" },
  { label: "Services", href: "#capabilities" },
  { label: "Vision", href: "#future" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const sections = ["hero", "origin", "engineering", "capabilities", "future", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) scrollTo(href, -80);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        isScrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Solid & Refined Floating Bar — Transparent Jet Black with Lime Accents */}
        <div
          className={`w-full flex items-center justify-between px-3 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 backdrop-blur-xl bg-black/80 border ${
            isScrolled
              ? "border-[#ccff00]/40 shadow-[0_8px_32px_rgba(0,0,0,0.95)]"
              : "border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.85)]"
          }`}
        >
          {/* Brand Logo in Left Top */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2 cursor-pointer group focus-visible:outline-none shrink-0"
            aria-label="INAN LABS Home"
          >
            <InanLogo height={isScrolled ? 24 : 28} href="" />
          </button>

          {/* Real & Required Navigation Links — In Lime Colour, no burger menu */}
          <nav
            className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-[calc(100vw-140px)] sm:max-w-none"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-sans uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/60 shadow-[0_0_14px_rgba(204,255,0,0.25)] font-bold"
                      : "text-[#ccff00]/75 hover:text-[#ccff00] hover:bg-[#ccff00]/10 border border-transparent font-medium"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#ccff00] rounded-full shadow-[0_0_8px_#ccff00]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA Button — Transparent Jet Black & Lime */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleNavClick("#contact")}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/80 hover:bg-[#ccff00] text-[#ccff00] hover:text-black border border-[#ccff00] font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-[0_0_16px_rgba(204,255,0,0.25)] transition-all duration-200 cursor-pointer group"
            >
              <span className="hidden xs:inline">Get in touch</span>
              <span className="xs:hidden">Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ccff00] group-hover:text-black transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
