"use client";

import type { ImpactMetric } from "@/data/metrics";
import { impactMetrics } from "@/data/metrics";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bodyCopy, monoCtaRow, monoLabelMuted } from "@/lib/typography";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";

function ImpactExploreHint({ showBack }: { showBack: boolean }) {
  const isTouch = useMediaQuery("(max-width: 767px)");
  if (showBack || !isTouch) return null;
  return (
    <p className={cn("mt-4", monoCtaRow, "justify-center text-accent/90")}>
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
          showBack && "border-border-hover",
        )}
      >
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 py-5 text-center sm:px-5"
          initial={false}
          animate={{ opacity: showBack ? 0 : 1, y: showBack ? -6 : 0 }}
          transition={transition}
          aria-hidden={showBack}
          style={{ pointerEvents: showBack ? "none" : "auto" }}
        >
          <div className="flex w-full flex-col items-center">
            <p className="font-mono text-2xl font-medium tracking-tight text-accent min-[430px]:text-3xl">
              {metric.value}
            </p>
            <p className="mt-2 text-sm text-secondary">{metric.label}</p>
            <p className={cn("mt-1", monoLabelMuted, "tracking-[0.1em]")}>
              {metric.context}
            </p>
            <ImpactExploreHint showBack={showBack} />
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-charcoal/95 p-5 sm:p-6"
          initial={false}
          animate={{ opacity: showBack ? 1 : 0, y: showBack ? 0 : 8 }}
          transition={transition}
          aria-hidden={!showBack}
          style={{ pointerEvents: showBack ? "auto" : "none" }}
        >
          <p className={cn("max-w-[16.5rem] text-center sm:max-w-[18rem]", bodyCopy)}>
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
    <section
      id="impact"
      className="scroll-mt-20 py-14 sm:scroll-mt-24 sm:py-20 md:py-24"
    >
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
