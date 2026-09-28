"use client";

import type { ImpactMetric } from "@/data/metrics";
import { impactMetrics } from "@/data/metrics";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";

function ImpactExploreHint({ showBack }: { showBack: boolean }) {
  const isTouch = useMediaQuery("(max-width: 767px)");
  if (showBack || !isTouch) return null;
  return (
    <p className="mt-4 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-accent/90">
      TAP TO EXPLORE
    </p>
  );
}

type ImpactFlipCardProps = {
  metric: ImpactMetric;
  isOpen: boolean;
  onToggle: () => void;
};

function ImpactFlipCard({ metric, isOpen, onToggle }: ImpactFlipCardProps) {
  const reduced = usePrefersReducedMotion();
  const hoverCapable = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [hovered, setHovered] = useState(false);

  const showBack = hoverCapable ? hovered || isOpen : isOpen;

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onToggle();
      }
    },
    [onToggle],
  );

  const transition = reduced
    ? { duration: 0 }
    : { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div
      className="min-h-[11.5rem] sm:min-h-[12.5rem]"
      onMouseEnter={() => hoverCapable && setHovered(true)}
      onMouseLeave={() => hoverCapable && setHovered(false)}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={showBack}
        onClick={() => {
          if (!hoverCapable) onToggle();
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative h-full min-h-[inherit] w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-surface/50 outline-none transition-colors",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          showBack && "border-accent/25",
        )}
      >
        <motion.div
          className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5"
          initial={false}
          animate={{ opacity: showBack ? 0 : 1, y: showBack ? -6 : 0 }}
          transition={transition}
          aria-hidden={showBack}
          style={{ pointerEvents: showBack ? "none" : "auto" }}
        >
          <div>
            <p className="font-mono text-2xl font-medium tracking-tight text-accent min-[430px]:text-3xl">
              {metric.value}
            </p>
            <p className="mt-2 text-sm text-foreground/90">{metric.label}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted/70">
              {metric.context}
            </p>
          </div>
          <ImpactExploreHint showBack={showBack} />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-charcoal/95 p-5 sm:p-6"
          initial={false}
          animate={{ opacity: showBack ? 1 : 0, y: showBack ? 0 : 8 }}
          transition={transition}
          aria-hidden={!showBack}
          style={{ pointerEvents: showBack ? "auto" : "none" }}
        >
          <p className="max-w-[16.5rem] text-pretty text-center text-sm leading-relaxed text-muted sm:max-w-[18rem] sm:text-[0.9375rem]">
            {metric.back}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function Metrics() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <section id="impact" className="py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Impact"
          title="THE WORK, IN NUMBERS."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {impactMetrics.map((metric) => (
            <ImpactFlipCard
              key={metric.id}
              metric={metric}
              isOpen={openId === metric.id}
              onToggle={() => handleToggle(metric.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
