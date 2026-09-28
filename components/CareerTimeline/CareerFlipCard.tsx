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
  const isNarrow = useMediaQuery("(max-width: 767px)");

  const useTapInteraction = !hoverCapable || isNarrow;

  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const hintId = useId();

  const showBack =
    Boolean(detail) && (flipped || (hoverCapable && hovered && !useTapInteraction));

  const toggleFlip = useCallback(() => {
    if (!detail) return;
    setFlipped((value) => !value);
  }, [detail]);

  if (!detail) return null;

  if (reducedMotion) {
    return (
      <article className="overflow-hidden rounded-xl border border-border bg-surface/40 p-5 sm:p-7 md:border-accent/20 md:p-8 lg:p-10">
        <CardFront
          entry={entry}
          hintId={hintId}
          isMobile={useTapInteraction}
          staticHint
        />
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

  const shellHeight = showBack
    ? "min-h-[min(70vh,28rem)] sm:min-h-[26rem]"
    : "min-h-[12.5rem] sm:min-h-[13.5rem]";

  return (
    <div
      className={cn("w-full min-w-0", shellHeight)}
      onMouseEnter={() => hoverCapable && !useTapInteraction && setHovered(true)}
      onMouseLeave={() => {
        if (hoverCapable && !useTapInteraction) setHovered(false);
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={showBack}
        aria-describedby={hintId}
        onClick={() => {
          if (useTapInteraction) toggleFlip();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleFlip();
          }
        }}
        className={cn(
          "relative h-full min-h-[inherit] w-full min-w-0 overflow-hidden rounded-xl outline-none",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          useTapInteraction ? "cursor-pointer" : "cursor-default",
        )}
      >
        <div className="h-full min-h-[inherit] [perspective:1200px]">
          <motion.div
            className="relative h-full min-h-[inherit] w-full [transform-style:preserve-3d]"
            animate={{ rotateY: showBack ? 180 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 h-full min-h-[inherit] [backface-visibility:hidden] [transform:translateZ(1px)]"
              aria-hidden={showBack}
            >
              <div className="flex h-full min-h-[inherit] flex-col rounded-xl border border-border bg-surface/50 p-5 sm:p-7 md:border-accent/20 md:p-8 lg:p-10">
                <CardFront
                  entry={entry}
                  hintId={hintId}
                  isMobile={useTapInteraction}
                />
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 h-full min-h-[inherit] [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(1px)]"
              aria-hidden={!showBack}
            >
              <div className="flex h-full min-h-[inherit] flex-col rounded-xl border border-accent/25 bg-charcoal p-5 sm:p-7 md:p-8 lg:p-10">
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-0.5 [-webkit-overflow-scrolling:touch]">
                  <CardBack detail={detail} />
                </div>
                {useTapInteraction ? (
                  <p className="mt-4 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted">
                    Tap again to return
                  </p>
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>
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
    <div className="flex h-full min-h-[10rem] flex-col justify-between sm:min-h-[11rem]">
      <div>
        <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl md:text-3xl">
          {entry.company}
        </h3>
        <p className="mt-2 text-sm text-foreground/90 sm:text-base">{entry.role}</p>
        <p className="mt-1 text-sm text-muted">{entry.period}</p>
      </div>
      <p
        id={hintId}
        className={cn(
          "mt-5 inline-flex min-h-10 items-center font-mono text-[11px] font-medium uppercase tracking-[0.12em] sm:mt-6",
          isMobile || staticHint
            ? "text-accent"
            : "text-accent/90",
        )}
      >
        {staticHint
          ? "Expand for details"
          : isMobile
            ? "Tap to know more →"
            : "Hover to explore →"}
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
