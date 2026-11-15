"use client";

import React from "react";

interface SceneFallbackProps {
  progress?: number;
}

export function SceneFallback({ progress = 0 }: SceneFallbackProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-transparent"
      aria-hidden="true"
      data-scroll-progress={progress.toFixed(2)}
    />
  );
}
