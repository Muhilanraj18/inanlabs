"use client";

import React from "react";
import Link from "next/link";

interface InanLogoProps {
  variant?: "auto" | "light" | "dark";
  className?: string;
  height?: number; // base height in px
  markOnly?: boolean;
  href?: string;
  priority?: boolean;
}

export function InanLogo({
  className = "",
  height = 32,
  markOnly = false,
  href = "",
  priority = false,
}: InanLogoProps) {
  // Brand logo aspect ratio: 2048 x 682 (~ 3.003 : 1)
  const fullWidth = Math.round(height * 3.003);
  // Brand mark-only aspect ratio: 656 x 365 (~ 1.797 : 1)
  const markWidth = Math.round(height * 1.797);

  const logoContent = (
    <div
      className={`relative inline-flex items-center select-none ${className}`}
      style={{
        height: `${height}px`,
        width: markOnly ? `${markWidth}px` : `${fullWidth}px`,
      }}
      aria-label="INAN LABS Logo"
    >
      <img
        src={markOnly ? "/brand/inan_labs_symbol_transparent.png" : "/brand/inan_labs_transparent.png"}
        alt="INAN LABS"
        className={`h-full w-auto object-contain block transition-transform group-hover:scale-105 ${
          markOnly
            ? "drop-shadow-[0_0_1.5px_rgba(255,255,255,0.85)]"
            : "drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
        }`}
        style={{
          height: `${height}px`,
          backgroundColor: "transparent",
        }}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm group transition-transform active:scale-[0.98]"
        aria-label="INAN LABS Home"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

export default InanLogo;
