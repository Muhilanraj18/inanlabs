"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import { InanLogo } from "@/components/brand/InanLogo";
import { ThemeToggle } from "./ThemeToggle";
import { GlassSurface } from "@/components/ui/GlassSurface";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
  activeSection: string;
  onNavigate: (href: string) => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  activeSection,
  onNavigate,
}: MobileMenuProps) {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative ml-auto flex flex-col w-[85%] max-w-sm h-full bg-background/95 backdrop-blur-2xl border-l border-white/10 p-6 shadow-2xl justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-border/60">
              <InanLogo height={30} />
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <GlassSurface
                  borderRadius={10}
                  borderWidth={0.08}
                  blur={10}
                  backgroundOpacity={0.15}
                  className="w-9 h-9 cursor-pointer hover:border-brand-red/60 transition-colors"
                  onClick={onClose}
                >
                  <div className="w-full h-full flex items-center justify-center text-foreground hover:text-brand-red">
                    <X className="w-5 h-5" />
                  </div>
                </GlassSurface>
              </div>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-2.5 py-6 my-auto" aria-label="Mobile Navigation">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <GlassSurface
                    key={link.href}
                    borderRadius={12}
                    borderWidth={0.07}
                    blur={isActive ? 14 : 8}
                    backgroundOpacity={isActive ? 0.28 : 0.06}
                    brightness={isActive ? 45 : 20}
                    className={`cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "border-brand-red/60 text-brand-red"
                        : "hover:border-white/20 text-foreground/80 hover:text-foreground"
                    }`}
                    onClick={() => {
                      onNavigate(link.href);
                      onClose();
                    }}
                  >
                    <div className="w-full flex items-center justify-between py-3 px-3.5">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-muted-foreground">
                          0{idx + 1}
                        </span>
                        <span className="text-base font-mono uppercase tracking-wider">
                          {link.label}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform text-brand-red ${
                          isActive ? "opacity-100 translate-x-0" : "opacity-40 -translate-x-1"
                        }`}
                      />
                    </div>
                  </GlassSurface>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="pt-6 border-t border-border/60 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>INAN LABS // 2026</span>
                <span className="text-brand-red">v1.0.0</span>
              </div>
              <GlassSurface
                borderRadius={12}
                borderWidth={0.08}
                blur={14}
                backgroundOpacity={0.35}
                brightness={45}
                className="w-full cursor-pointer hover:border-brand-red/70 shadow-lg shadow-brand-red/20"
                onClick={() => {
                  onNavigate("#contact");
                  onClose();
                }}
              >
                <div className="w-full py-3.5 text-white font-mono text-xs uppercase tracking-widest text-center font-semibold">
                  Initiate Inquiry
                </div>
              </GlassSurface>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
