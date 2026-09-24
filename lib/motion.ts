"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

export function usePrefersReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}

export const easeOut = [0.22, 1, 0.36, 1] as const;
