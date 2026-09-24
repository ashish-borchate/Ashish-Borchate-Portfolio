"use client";

import type { ExperienceEntry } from "@/data/experience";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useId, useState } from "react";

type CareerFlipCardProps = {
  entry: ExperienceEntry;
};

export function CareerFlipCard({ entry }: CareerFlipCardProps) {
  const detail = entry.detail;
  const reducedMotion = usePrefersReducedMotion();
  const hoverCapable = useMediaQuery("(hover: hover) and (pointer: fine)");
  const isCoarsePointer = useMediaQuery("(max-width: 767px), (pointer: coarse)");

  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const hintId = useId();

  const showBack =
    !reducedMotion && Boolean(detail) && (flipped || (hoverCapable && hovered));

  const toggleFlip = useCallback(() => {
    if (!detail) return;
    setFlipped((value) => !value);
  }, [detail]);

  if (!detail) return null;

  if (reducedMotion) {
    return (
      <article className="overflow-hidden rounded-xl border border-border bg-surface/40 p-5 sm:p-7 md:border-accent/20 md:p-8 lg:p-10">
        <CardFront entry={entry} hintId={hintId} isMobile={isCoarsePointer} staticHint />
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`${entry.id}-details`}
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 text-left font-mono text-[10px] uppercase tracking-wider text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {expanded ? "Hide details" : "Show role details"}
        </button>
        {expanded ? (
          <div id={`${entry.id}-details`} className="mt-4 border-t border-border pt-4">
            <CardBack detail={detail} />
          </div>
        ) : null}
      </article>
    );
  }

  return (
    <div
      className="w-full min-w-0 [perspective:1200px]"
      onMouseEnter={() => hoverCapable && setHovered(true)}
      onMouseLeave={() => hoverCapable && setHovered(false)}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={showBack}
        aria-describedby={hintId}
        onClick={() => {
          if (!hoverCapable || isCoarsePointer) toggleFlip();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleFlip();
          }
        }}
        className={cn(
          "relative w-full min-w-0 cursor-default rounded-xl border border-border bg-charcoal/40 text-left outline-none",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          (!hoverCapable || isCoarsePointer) && "cursor-pointer",
        )}
      >
        <motion.div
          className="relative w-full [transform-style:preserve-3d]"
          animate={{ rotateY: showBack ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ minHeight: showBack ? undefined : "11.5rem" }}
        >
          <div
            className={cn(
              "w-full [backface-visibility:hidden]",
              showBack && "pointer-events-none absolute inset-0",
              !showBack && "relative",
            )}
          >
            <div className="rounded-xl border border-border bg-surface/50 p-5 sm:p-7 md:border-accent/20 md:p-8 lg:min-h-[11.5rem] lg:p-10">
              <CardFront entry={entry} hintId={hintId} isMobile={isCoarsePointer} />
            </div>
          </div>

          <div
            className={cn(
              "absolute inset-0 w-full [backface-visibility:hidden] [transform:rotateY(180deg)]",
            )}
          >
            <div className="flex h-full max-h-[min(70vh,28rem)] flex-col overflow-hidden rounded-xl border border-accent/25 bg-charcoal p-5 sm:max-h-[34rem] sm:p-7 md:p-8 lg:p-10">
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch]">
                <CardBack detail={detail} />
              </div>
              {!hoverCapable || isCoarsePointer ? (
                <p className="mt-4 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted">
                  Tap again to return
                </p>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function CardFront({
  entry,
  hintId,
  isMobile,
  staticHint,
}: {
  entry: ExperienceEntry;
  hintId: string;
  isMobile: boolean;
  staticHint?: boolean;
}) {
  return (
    <div className="flex min-h-[9.5rem] flex-col justify-between sm:min-h-[10.5rem]">
      <div>
        <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl md:text-3xl">
          {entry.company}
        </h3>
        <p className="mt-2 text-sm text-foreground/90 sm:text-base">{entry.role}</p>
        <p className="mt-1 text-sm text-muted">{entry.period}</p>
      </div>
      <p
        id={hintId}
        className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted/80"
      >
        {staticHint
          ? "Expand for details"
          : isMobile
            ? "Tap to know more"
            : "Hover to explore"}
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
