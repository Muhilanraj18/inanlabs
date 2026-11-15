"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-lg border border-border/40 flex items-center justify-center opacity-0 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <GlassSurface
      borderRadius={10}
      borderWidth={0.08}
      blur={12}
      backgroundOpacity={0.18}
      brightness={35}
      className={`w-9 h-9 cursor-pointer hover:border-brand-red/60 transition-all duration-200 group ${className}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <div
        className="w-full h-full flex items-center justify-center relative"
        title={`Switch to ${isDark ? "light" : "dark"} theme`}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      >
        <span className="sr-only">Toggle theme</span>
        {isDark ? (
          <Sun className="w-4 h-4 text-foreground/85 group-hover:text-brand-red transition-colors" />
        ) : (
          <Moon className="w-4 h-4 text-foreground/85 group-hover:text-brand-red transition-colors" />
        )}
        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_6px_#ff0022]" />
      </div>
    </GlassSurface>
  );
}

export default ThemeToggle;
