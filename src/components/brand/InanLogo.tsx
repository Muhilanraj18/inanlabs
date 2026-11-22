"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface InanLogoProps {
  variant?: "auto" | "light" | "dark";
  className?: string;
  height?: number;
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
  const fullWidth = Math.round(height * 3.003);
  const markWidth = Math.round(height * 1.797);

  const src = markOnly
    ? "/brand/inan_labs_symbol_transparent.png"
    : "/brand/inan_labs_transparent.png";

  const logoContent = (
    <div
      className={`relative inline-flex items-center select-none ${className}`}
      style={{
        height: `${height}px`,
        width: markOnly ? `${markWidth}px` : `${fullWidth}px`,
      }}
      aria-label="INAN LABS Logo"
    >
      <Image
        src={src}
        alt="INAN LABS"
        width={markOnly ? markWidth : fullWidth}
        height={height}
        priority={priority}
        className={`h-full w-auto object-contain block transition-transform group-hover:scale-105 ${
          markOnly
            ? "drop-shadow-[0_0_1.5px_rgba(255,255,255,0.85)]"
            : "drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
        }`}
        style={{ backgroundColor: "transparent" }}
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

