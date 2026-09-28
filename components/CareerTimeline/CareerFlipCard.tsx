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
        <CardHeader
          entry={entry}
          hintId={hintId}
          isOpen={showBack}
          compact={showBack}
        />
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
        <div className="border-t border-border px-5 pb-6 pt-6 sm:px-7 sm:pb-7 sm:pt-7 md:px-8 md:pb-8 md:pt-8 lg:px-10 lg:pb-10 lg:pt-8">
          <CardBack detail={detail} />
        </div>
      </motion.div>
    </article>
  );
}

function CardHeader({
  entry,
  hintId,
  isOpen,
  compact,
}: {
  entry: ExperienceEntry;
  hintId: string;
  isOpen: boolean;
  compact: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col">
      <h3 className="text-xl font-medium tracking-tight text-accent sm:text-2xl md:text-3xl">
        {entry.company}
      </h3>
      {!compact ? (
        <>
          <p className="mt-2 text-sm text-foreground/90 sm:text-base">{entry.role}</p>
          <p className="mt-1 text-sm text-muted">{entry.period}</p>
        </>
      ) : null}
      <p
        id={hintId}
        className="mt-5 inline-flex min-h-10 items-center font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-accent sm:mt-6"
      >
        {isOpen ? "COLLAPSE ↑" : "TAP TO EXPLORE ROLE →"}
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
