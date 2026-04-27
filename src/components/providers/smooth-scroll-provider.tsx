"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import Lenis from "lenis";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    let frameId = 0;

    function onFrame(time: number) {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(onFrame);
    }

    frameId = window.requestAnimationFrame(onFrame);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
