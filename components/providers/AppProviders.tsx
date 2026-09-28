"use client";

import { SoundProvider } from "@/context/sound-context";

/** Native document scroll so Framer `useScroll` (Journey pin, metrics) stays in sync. */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return <SoundProvider>{children}</SoundProvider>;
}
