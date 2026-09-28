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
    : { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };

  if (reducedMotion) {
    return (
      <article className="overflow-hidden rounded-xl border border-border bg-surface/40 p-5 sm:p-7 md:border-accent/20 md:p-8 lg:p-10">
        <CardFront entry={entry} hintId={hintId} showMarker={!showBack} />
        <button
          type="button"
          aria-expanded={showBack}
          onClick={toggleFlip}
          className="mt-4 text-left font-mono text-[10px] uppercase tracking-wider text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {showBack ? "Hide details" : "Tap to know more →"}
        </button>
        {showBack ? (
          <div className="mt-4 border-t border-border pt-4">
            <CardBack detail={detail} />
          </div>
        ) : null}
      </article>
    );
  }

  const shellHeight = showBack
    ? "min-h-[min(70vh,28rem)] sm:min-h-[26rem]"
    : "min-h-[12.5rem] sm:min-h-[13.5rem]";

  return (
    <div className={cn("w-full min-w-0", shellHeight)}>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={showBack}
        aria-describedby={hintId}
        onClick={toggleFlip}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleFlip();
          }
        }}
        className={cn(
          "relative h-full min-h-[inherit] w-full min-w-0 cursor-pointer overflow-hidden rounded-xl outline-none transition-colors",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          showBack ? "border border-accent/25" : "border border-border",
        )}
      >
        <motion.div
          className="absolute inset-0 flex h-full min-h-[inherit] flex-col rounded-xl bg-surface/50 p-5 sm:p-7 md:p-8 lg:p-10"
          initial={false}
          animate={{ opacity: showBack ? 0 : 1, y: showBack ? -8 : 0 }}
          transition={transition}
          aria-hidden={showBack}
        >
          <CardFront entry={entry} hintId={hintId} showMarker={!showBack} />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex h-full min-h-[inherit] flex-col rounded-xl bg-charcoal p-5 sm:p-7 md:p-8 lg:p-10"
          initial={false}
          animate={{ opacity: showBack ? 1 : 0, y: showBack ? 0 : 10 }}
          transition={transition}
          aria-hidden={!showBack}
        >
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-0.5 [-webkit-overflow-scrolling:touch]">
            <CardBack detail={detail} />
          </div>
          <p className="mt-4 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted">
            Tap again to return
          </p>
        </motion.div>
      </div>
    </div>
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
    <div className="flex h-full min-h-[10rem] flex-col justify-between sm:min-h-[11rem]">
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
        Tap to know more →
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
