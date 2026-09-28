"use client";

import type { ExperienceEntry } from "@/data/experience";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useId } from "react";

type CareerFlipCardProps = {
  entry: ExperienceEntry;
  isOpen: boolean;
  onToggle: () => void;
};

export function CareerFlipCard({ entry, isOpen, onToggle }: CareerFlipCardProps) {
  const detail = entry.detail;
  const reducedMotion = usePrefersReducedMotion();
  const hintId = useId();

  const showBack = Boolean(detail) && isOpen;

  const toggleFlip = useCallback(() => {
    if (!detail) return;
    onToggle();
  }, [detail, onToggle]);

  if (!detail) return null;

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <article
      className={cn(
        "overflow-hidden rounded-xl border bg-surface/50 transition-colors",
        showBack ? "border-accent/25" : "border-border",
      )}
    >
      <button
        type="button"
        className="w-full min-w-0 px-5 py-5 text-left sm:p-7 md:p-8 lg:p-10"
        aria-expanded={showBack}
        aria-describedby={hintId}
        onClick={toggleFlip}
      >
        <CardFront entry={entry} hintId={hintId} showMarker={!showBack} />
      </button>

      <motion.div
        initial={false}
        animate={{
          height: showBack ? "auto" : 0,
          opacity: showBack ? 1 : 0,
        }}
        transition={transition}
        className="overflow-hidden"
        aria-hidden={!showBack}
      >
        <div className="border-t border-border px-5 pb-5 sm:px-7 sm:pb-7 md:px-8 md:pb-8 lg:px-10 lg:pb-10">
          <CardBack detail={detail} />
          <button
            type="button"
            onClick={toggleFlip}
            className="mt-5 font-mono text-[10px] uppercase tracking-wider text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            COLLAPSE ↑
          </button>
        </div>
      </motion.div>
    </article>
  );
}

function CardFront({
  entry,
  hintId,
  showMarker = true,
}: {
  entry: ExperienceEntry;
  hintId: string;
  showMarker?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col">
      <div>
        <div className="flex items-start gap-2.5 sm:gap-3">
          {showMarker ? (
            <span
              className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(91,141,239,0.45)] sm:mt-3"
              aria-hidden
            />
          ) : null}
          <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl md:text-3xl">
            {entry.company}
          </h3>
        </div>
        <p className="mt-2 text-sm text-foreground/90 sm:text-base">{entry.role}</p>
        <p className="mt-1 text-sm text-muted">{entry.period}</p>
      </div>
      <p
        id={hintId}
        className="mt-5 inline-flex min-h-10 items-center font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-accent sm:mt-6"
      >
        TAP TO EXPLORE ROLE →
      </p>
    </div>
  );
}

function CardBack({ detail }: { detail: NonNullable<ExperienceEntry["detail"]> }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          What I worked on
        </h4>
        <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted">
          {detail.workedOn.map((item) => (
            <li key={item} className="border-l border-border pl-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          What I learned
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-muted">{detail.learned}</p>
      </div>
    </div>
  );
}
