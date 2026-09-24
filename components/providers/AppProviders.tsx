"use client";

import { ReactLenis } from "lenis/react";
import { SoundProvider } from "@/context/sound-context";
import { usePrefersReducedMotion } from "@/lib/motion";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <SoundProvider>{children}</SoundProvider>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <SoundProvider>{children}</SoundProvider>
    </ReactLenis>
  );
}
