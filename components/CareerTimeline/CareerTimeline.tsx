"use client";

import type { ExperienceEntry } from "@/data/experience";
import { experienceTimeline } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

const foundationEntries = experienceTimeline.filter((e) => e.emphasis === "compressed");
const coreEntries = experienceTimeline.filter((e) => e.emphasis === "primary");

function TimelineEntry({
  entry,
  tier,
}: {
  entry: ExperienceEntry;
  tier: "foundation" | "core";
}) {
  const isFoundation = tier === "foundation";
  const textOnly = entry.logoDisplay === "text-only";

  return (
    <motion.article
      layout
      className={cn(
        "relative rounded-xl border bg-surface/40 transition-colors",
        isFoundation
          ? "border-border/70 p-4 sm:p-5"
          : "border-border p-5 sm:p-7 md:border-accent/20 md:p-8 md:shadow-[inset_3px_0_0_0_rgba(91,141,239,0.45)] lg:p-10",
      )}
      whileHover={
        !isFoundation ? { borderColor: "rgba(91, 141, 239, 0.28)" } : undefined
      }
    >
      <span
        className={cn(
          "absolute top-6 rounded-full bg-accent md:hidden",
          isFoundation ? "left-0 h-1.5 w-1.5 -translate-x-[calc(0.75rem+1px)]" : "left-0 h-2 w-2 -translate-x-[calc(0.75rem+2px)]",
        )}
        aria-hidden
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          {!textOnly ? (
            <CompanyLogo
              src={entry.logo}
              alt={`${entry.company} logo`}
              label="[COMPANY LOGO]"
              className={cn(isFoundation && "h-9 min-w-[6rem]")}
            />
          ) : null}
          <h3
            className={cn(
              "font-medium tracking-tight",
              textOnly && "mt-0",
              !textOnly && (isFoundation ? "mt-3" : "mt-4"),
              isFoundation
                ? "text-base sm:text-lg"
                : "text-xl sm:text-2xl md:text-3xl",
            )}
          >
            {entry.company}
          </h3>
          <p
            className={cn(
              "mt-1 text-muted",
              isFoundation ? "text-xs sm:text-sm" : "text-sm sm:text-base",
            )}
          >
            {entry.role} · {entry.period}
          </p>
        </div>
        <span
          className={cn(
            "w-fit shrink-0 rounded-full border border-border font-mono uppercase tracking-wider text-muted",
            isFoundation
              ? "px-2.5 py-1 text-[9px]"
              : "px-3 py-1 text-[10px] text-foreground/80",
          )}
        >
          {entry.stage}
        </span>
      </div>
      <p
        className={cn(
          "mt-3 leading-relaxed text-muted sm:mt-4",
          isFoundation ? "text-xs sm:text-sm" : "text-sm sm:text-base",
        )}
      >
        {entry.oneLiner}
      </p>
    </motion.article>
  );
}

export function CareerTimeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const sections = useMemo(
    () => [
      {
        id: "foundation",
        label: "Early foundation",
        description: "Where the people-first operating mindset began.",
        entries: foundationEntries,
        tier: "foundation" as const,
      },
      {
        id: "core",
        label: "Core professional chapters",
        description: "Scale, speed, product feedback, and systems at the center of the story.",
        entries: coreEntries,
        tier: "core" as const,
      },
    ],
    [],
  );

  return (
    <section id="experience" ref={ref} className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Career evolution"
          subtitle="Six companies — early foundation compressed, core chapters expanded."
        />

        <div className="relative mt-10 md:mt-16">
          <div className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px overflow-hidden bg-border sm:left-4 md:block">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-accent"
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {sections.map((section) => (
              <div key={section.id}>
                <div className="md:pl-16">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/90 sm:text-[11px]">
                    {section.label}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm text-muted">
                    {section.description}
                  </p>
                </div>

                <ul
                  className={cn(
                    "mt-5 md:pl-16",
                    section.tier === "foundation"
                      ? "grid gap-3 sm:grid-cols-2 sm:gap-4"
                      : "relative space-y-5 border-l border-border/80 pl-5 sm:space-y-7 sm:pl-6 md:border-l-0 md:pl-0",
                  )}
                >
                  {section.entries.map((entry) => (
                    <li key={entry.id}>
                      <TimelineEntry entry={entry} tier={section.tier} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
