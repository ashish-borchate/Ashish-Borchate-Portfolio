"use client";

import type { ExperienceEntry } from "@/data/experience";
import { formatExperiencePeriod } from "@/lib/formatExperiencePeriod";
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

const experienceCtaClassName =
  "flex w-full min-h-10 items-center justify-center font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-accent sm:justify-start sm:text-[11px]";

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
  const showLogo = entry.logoDisplay !== "text-only";
  const periodLabel = formatExperiencePeriod(entry.period);

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-5 sm:gap-6",
        compact && "items-center sm:items-stretch",
      )}
    >
      <div
        className={cn(
          "flex min-w-0 w-full items-center justify-between gap-4 sm:gap-6 md:gap-8",
          compact && "justify-center sm:justify-between",
        )}
      >
        <div
          className={cn(
            "min-w-0 flex-1",
            compact && "flex-none text-center sm:flex-1 sm:text-left",
          )}
        >
          <h3
            className={cn(
              "text-xl font-medium tracking-tight text-accent sm:text-2xl md:text-3xl",
              compact && "w-full text-center sm:text-left",
            )}
          >
            {entry.company}
          </h3>
          {!compact ? (
            <>
              {entry.roleMobile ? (
                <>
                  <p className="mt-2 truncate text-sm text-foreground/90 sm:hidden">
                    {entry.roleMobile}
                  </p>
                  <p className="mt-2 hidden truncate text-sm text-foreground/90 sm:block sm:text-base">
                    {entry.role}
                  </p>
                </>
              ) : (
                <p className="mt-2 truncate text-sm text-foreground/90 sm:text-base">
                  {entry.role}
                </p>
              )}
              <p className="mt-1 text-sm text-muted">{periodLabel}</p>
            </>
          ) : null}
        </div>
        {showLogo && !compact ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={entry.logo}
            alt={`${entry.company} logo`}
            className="h-8 w-auto max-w-[5.5rem] shrink-0 object-contain opacity-95 sm:h-9 sm:max-w-[6.5rem] md:h-10 md:max-w-[7.5rem]"
          />
        ) : null}
      </div>
      <p id={hintId} className={experienceCtaClassName}>
        {isOpen ? "COLLAPSE ↑" : "TAP TO EXPLORE MORE"}
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
