"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";

export type LoaderStage = "loading" | "assembled" | "transitioning" | "background";

interface ExperienceContextType {
  loaderStage: LoaderStage;
  loaderProgress: number; // 0 to 100
  scrollProgress: number;
  isLoaded: boolean;
  setLoaderStage: (stage: LoaderStage) => void;
  setLoaderProgress: (progress: number) => void;
  setScrollProgress: (progress: number) => void;
  skipLoader: () => void;
  replayLoader: () => void;
}

const ExperienceContext = createContext<ExperienceContextType | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [loaderStage, setLoaderStage] = useState<LoaderStage>("loading");
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeout1Ref = useRef<NodeJS.Timeout | null>(null);
  const timeout2Ref = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeout1Ref.current) clearTimeout(timeout1Ref.current);
    if (timeout2Ref.current) clearTimeout(timeout2Ref.current);
  }, []);

  const startLoaderCycle = useCallback(() => {
    clearAllTimers();
    setIsLoaded(false);
    setLoaderProgress(0);
    setLoaderStage("loading");

    // Smooth 2.2s progression from 0 to 100% so the loader and 7 vertical bars are clearly experienced
    const startTime = Date.now();
    const duration = 2200; // ms

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setLoaderProgress(progress);

      if (progress >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setLoaderStage("assembled");

        // Transition: 7 vertical bars slide upwards
        timeout1Ref.current = setTimeout(() => {
          setLoaderStage("transitioning");
          timeout2Ref.current = setTimeout(() => {
            setLoaderStage("background");
            setIsLoaded(true);
          }, 1600);
        }, 320);
      }
    }, 20);
  }, [clearAllTimers]);

  useEffect(() => {
    startLoaderCycle();
    return () => {
      clearAllTimers();
    };
  }, [startLoaderCycle, clearAllTimers]);

  const skipLoader = useCallback(() => {
    clearAllTimers();
    setLoaderProgress(100);
    setLoaderStage("transitioning");
    timeout2Ref.current = setTimeout(() => {
      setLoaderStage("background");
      setIsLoaded(true);
    }, 350);
  }, [clearAllTimers]);

  const replayLoader = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    startLoaderCycle();
  }, [startLoaderCycle]);

  return (
    <ExperienceContext.Provider
      value={{
        loaderStage,
        loaderProgress,
        scrollProgress,
        isLoaded,
        setLoaderStage,
        setLoaderProgress,
        setScrollProgress,
        skipLoader,
        replayLoader,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error("useExperience must be used within an ExperienceProvider");
  }
  return ctx;
}
