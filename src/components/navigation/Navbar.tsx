"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const sections = ["hero", "origin", "engineering", "capabilities", "future", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 180) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on desktop resize or Escape key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("#")) scrollTo(href, -80);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        isScrolled ? "py-2 sm:py-3" : "py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Floating Bar — Transparent Jet Black with Lime Accents */}
        <div
          className={`w-full flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 backdrop-blur-xl bg-black/85 border ${
            isScrolled
              ? "border-[#ccff00]/40 shadow-[0_8px_32px_rgba(0,0,0,0.95)]"
              : "border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.85)]"
          }`}
        >
          {/* Brand Logo in Left Corner — ONLY the logo mark, no text, on desktop & mobile */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center cursor-pointer group focus-visible:outline-none shrink-0"
            aria-label="INAN LABS Home"
          >
            <InanLogo height={isScrolled ? 26 : 30} markOnly={true} href="" />
          </button>

          {/* Desktop Navigation Links — In Lime Colour, hidden on mobile */}
          <nav
            className="hidden md:flex items-center gap-1.5"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all duration-200 cursor-pointer ${
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

          {/* Right Action CTA & Mobile Burger Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Get in Touch CTA Button */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/80 hover:bg-[#ccff00] text-[#ccff00] hover:text-black border border-[#ccff00] font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-[0_0_16px_rgba(204,255,0,0.25)] transition-all duration-200 cursor-pointer group"
            >
              <span className="hidden xs:inline">Get in touch</span>
              <span className="xs:hidden">Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ccff00] group-hover:text-black transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile Burger Menu Button — visible on screens < md */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border border-[#ccff00]/40 bg-black/70 text-[#ccff00] hover:bg-[#ccff00]/20 hover:border-[#ccff00] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden mt-2 p-4 rounded-3xl bg-black/95 backdrop-blur-2xl border border-[#ccff00]/30 shadow-[0_16px_40px_rgba(0,0,0,0.95)] animate-in fade-in slide-in-from-top-3 duration-200 flex flex-col gap-2"
          >
            <div className="px-2 py-1 mb-1 border-b border-white/10 flex items-center justify-between">
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#ccff00] font-bold">
                NAVIGATION MENU
              </span>
              <span className="text-[10px] text-white/40 uppercase">INAN LABS</span>
            </div>

            {NAV_LINKS.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left text-xs uppercase tracking-wider font-sans transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/50 font-bold"
                      : "text-white/80 hover:text-[#ccff00] hover:bg-white/5 border border-transparent font-medium"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
                  )}
                </button>
              );
            })}

            <div className="mt-2 pt-2 border-t border-white/10">
              <button
                onClick={() => handleNavClick("#contact")}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-sans text-xs font-bold uppercase tracking-wider shadow-[0_0_16px_rgba(204,255,0,0.3)] transition-all cursor-pointer"
              >
                <span>Initiate Inquiry</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
