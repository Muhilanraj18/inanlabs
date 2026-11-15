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
  // Clean logo aspect ratio: 1970 x 328 (~ 6.006 : 1)
  const fullWidth = Math.round(height * 6.006);
  // Mark-only aspect ratio: 640 x 370 (~ 1.73 : 1)
  const markWidth = Math.round(height * 1.73);

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
        src={markOnly ? "/brand/inan-mark-clean.png" : "/brand/inan-logo-clean.png"}
        alt="INAN LABS"
        className="h-full w-auto object-contain block"
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
