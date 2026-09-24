"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const nodes = [
  { label: "People", x: 12, y: 72 },
  { label: "Problems", x: 38, y: 48 },
  { label: "Systems", x: 62, y: 58 },
  { label: "Product", x: 88, y: 32 },
];

export function HeroVisual({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 20,
  });
  const sy = useSpring(useTransform(my, [-0.5, 0.5], [-6, 6]), {
    stiffness: 120,
    damping: 20,
  });

  return (
    <div
      className={cn("relative aspect-square w-full max-w-lg", className)}
      onMouseMove={(e) => {
        if (reduced) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div style={{ x: sx, y: sy }} className="absolute inset-0">
        <svg
          className="h-full w-full text-border"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <defs>
            <pattern
              id="grid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 8 0 L 0 0 0 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.15"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" opacity="0.6" />
          {nodes.slice(0, -1).map((n, i) => {
            const next = nodes[i + 1];
            return (
              <line
                key={`${n.label}-line`}
                x1={n.x}
                y1={n.y}
                x2={next.x}
                y2={next.y}
                stroke="rgba(91,141,239,0.35)"
                strokeWidth="0.4"
              />
            );
          })}
          {nodes.map((n) => (
            <g key={n.label}>
              <circle
                cx={n.x}
                cy={n.y}
                r="1.2"
                fill="rgba(91,141,239,0.9)"
              />
              <text
                x={n.x}
                y={n.y - 2.5}
                textAnchor="middle"
                className="fill-muted"
                fontSize="2.5"
                fontFamily="var(--font-geist-mono)"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </motion.div>
      <div className="pointer-events-none absolute inset-4 rounded-sm border border-border/60 bg-surface/30" />
    </div>
  );
}
