"use client";

import type { ExperienceEntry } from "@/data/experience";
import { formatExperiencePeriod } from "@/lib/formatExperiencePeriod";
import { usePrefersReducedMotion } from "@/lib/motion";
import {
  bodyCopy,
  dateMeta,
  monoCtaBlock,
  monoLabelAccent,
  roleTitle,
} from "@/lib/typography";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useId } from "react";

type CareerFlipCardProps = {
  entry: ExperienceEntry;
  isOpen: boolean;
  onToggle: () => void;
};

function ExperienceLogo({
  entry,
  className,
}: {
  entry: ExperienceEntry;
  className?: string;
}) {
  if (entry.logoDisplay === "text-only") return null;
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={entry.logo}
      alt={`${entry.company} logo`}
      className={cn("w-auto shrink-0 object-contain opacity-95", className)}
    />
  );
}

function RoleLines({
  entry,
  className,
}: {
  entry: ExperienceEntry;
  className?: string;
}) {
  return (
    <div className={className}>
      {entry.roleMobile ? (
        <>
          <p className={cn("truncate sm:hidden", roleTitle)}>{entry.roleMobile}</p>
          <p className={cn("mt-2 hidden truncate sm:block", roleTitle)}>{entry.role}</p>
        </>
      ) : (
        <p className={cn("truncate", roleTitle)}>{entry.role}</p>
      )}
    </div>
  );
}

export function CareerFlipCard({ entry, isOpen, onToggle }: CareerFlipCardProps) {
  const detail = entry.detail;
  const reducedMotion = usePrefersReducedMotion();
  const hintId = useId();

  const showBack = Boolean(detail) && isOpen;
  const showLogo = entry.logoDisplay !== "text-only";

  const toggleFlip = useCallback(() => {
    if (!detail) return;
    onToggle();
  }, [detail, onToggle]);

  if (!detail) return null;

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  const periodLabel = formatExperiencePeriod(entry.period);
  const experienceCtaClassName = cn(
    monoCtaBlock,
    "justify-center sm:justify-start",
  );

  return (
    <article
      className={cn(
        "group/cta overflow-hidden rounded-xl border bg-surface/50 transition-colors",
        showBack ? "border-border-hover" : "border-border hover:border-border-hover",
      )}
    >
      <button
        type="button"
        className="w-full min-w-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        aria-expanded={showBack}
        aria-describedby={!showBack ? hintId : undefined}
        onClick={toggleFlip}
      >
        {!showBack ? (
          <>
            {showLogo ? (
              <div className="flex justify-center px-5 py-8 sm:hidden">
                <ExperienceLogo entry={entry} className="h-9 max-w-[8rem]" />
              </div>
            ) : (
              <div className="px-5 py-8 sm:hidden">
                <p className="text-center text-lg font-medium text-accent">{entry.company}</p>
              </div>
            )}

            <div className="hidden min-w-0 sm:block sm:p-7 md:p-8 lg:p-10">
              <div className="flex min-w-0 items-center justify-between gap-6 md:gap-8">
                {showLogo ? (
                  <ExperienceLogo
                    entry={entry}
                    className="h-9 max-w-[7rem] md:h-10 md:max-w-[8rem]"
                  />
                ) : (
                  <p className="text-xl font-medium text-accent">{entry.company}</p>
                )}
                <div className="min-w-0 flex-1 text-left">
                  <RoleLines entry={entry} />
                  <p className={cn("mt-1", dateMeta)}>{periodLabel}</p>
                  <p id={hintId} className={cn("mt-5", experienceCtaClassName)}>
                    TAP TO EXPLORE MORE
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </button>

      {showBack ? (
        <div className="w-full min-w-0">
          <div className="flex flex-col items-center px-5 pb-2 pt-6 text-center sm:hidden">
            {showLogo ? (
              <ExperienceLogo entry={entry} className="h-9 max-w-[8rem]" />
            ) : (
              <p className="text-lg font-medium text-accent">{entry.company}</p>
            )}
            <RoleLines entry={entry} className="mt-3 w-full max-w-md" />
            <p className={cn("mt-1", dateMeta)}>{periodLabel}</p>
          </div>

          <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-7 sm:pb-2 sm:pt-7 md:px-8 md:pt-8 lg:px-10 lg:pt-10">
            {showLogo ? (
              <ExperienceLogo
                entry={entry}
                className="h-9 max-w-[7rem] md:h-10 md:max-w-[8rem]"
              />
            ) : (
              <p className="text-xl font-medium text-accent">{entry.company}</p>
            )}
            <button
              type="button"
              className={cn(experienceCtaClassName, "w-auto shrink-0")}
              onClick={toggleFlip}
            >
              COLLAPSE ↑
            </button>
          </div>
        </div>
      ) : null}

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
        <div className="border-t border-border px-5 pb-6 pt-4 sm:px-7 sm:pb-7 sm:pt-6 md:px-8 md:pb-8 md:pt-7 lg:px-10 lg:pb-10 lg:pt-8">
          {showBack ? (
            <button
              type="button"
              className={cn(experienceCtaClassName, "mb-5 sm:hidden")}
              onClick={toggleFlip}
            >
              COLLAPSE ↑
            </button>
          ) : null}
          <CardBack detail={detail} />
        </div>
      </motion.div>
    </article>
  );
}

function CardBack({ detail }: { detail: NonNullable<ExperienceEntry["detail"]> }) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h4 className={monoLabelAccent}>What I worked on</h4>
        <ul className={cn("mt-3 space-y-2.5", bodyCopy)}>
          {detail.workedOn.map((item) => (
            <li key={item} className="border-l border-border pl-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className={monoLabelAccent}>What I learned</h4>
        <p className={cn("mt-3", bodyCopy)}>{detail.learned}</p>
      </div>
    </div>
  );
}
