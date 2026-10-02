"use client";

import type { ExperienceEntry } from "@/data/experience";
import { experienceTimeline } from "@/data/experience";
import { CareerFlipCard } from "@/components/CareerTimeline/CareerFlipCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { bodyCopy, companyNameDisplay, dateMeta, monoLabelAccent, roleTitle } from "@/lib/typography";
import { sectionScrollClassName } from "@/lib/sectionLayout";
import { formatExperiencePeriod } from "@/lib/formatExperiencePeriod";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const foundationEntries = experienceTimeline.filter((e) => e.emphasis === "compressed");

const CORE_CHAPTER_ORDER = ["yellow", "bybit", "koinx", "binance"] as const;

function orderedCoreEntries() {
  const primary = experienceTimeline.filter((e) => e.emphasis === "primary");
  return CORE_CHAPTER_ORDER.map((id) => primary.find((e) => e.id === id)).filter(
    (entry): entry is ExperienceEntry => Boolean(entry),
  );
}

function FoundationEntry({ entry }: { entry: ExperienceEntry }) {
  const textOnly = entry.logoDisplay === "text-only";

  return (
    <article className="relative flex h-full min-h-[7.5rem] flex-col rounded-xl border border-border bg-surface/30 p-4 sm:min-h-[8rem] sm:p-5">
      <div className="min-w-0">
        {!textOnly ? (
          <CompanyLogo
            src={entry.logo}
            alt={`${entry.company} logo`}
            label="[COMPANY LOGO]"
            className="h-9 min-w-[6rem]"
          />
        ) : null}
        <div className="flex items-start gap-2.5">
          <h3 className={cn("text-base sm:text-lg", companyNameDisplay)}>
            {entry.company}
          </h3>
        </div>
        <p className={cn("mt-1 text-xs sm:text-sm", roleTitle)}>{entry.role}</p>
        <p className={cn("mt-0.5 text-xs sm:text-sm", dateMeta)}>
          {formatExperiencePeriod(entry.period)}
        </p>
      </div>
    </article>
  );
}

export function CareerTimeline() {
  const ref = useRef<HTMLElement>(null);
  const lineTrackRef = useRef<HTMLDivElement>(null);
  const [lineFill, setLineFill] = useState(0);
  const [openEntryId, setOpenEntryId] = useState<string | null>(null);

  const updateLineFill = useCallback(() => {
    const track = lineTrackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const viewportCenter = window.innerHeight * 0.5;
    const fillPx = viewportCenter - rect.top;
    const ratio = rect.height > 0 ? fillPx / rect.height : 0;
    setLineFill(Math.min(1, Math.max(0, ratio)));
  }, []);

  useEffect(() => {
    updateLineFill();
    window.addEventListener("scroll", updateLineFill, { passive: true });
    window.addEventListener("resize", updateLineFill);
    return () => {
      window.removeEventListener("scroll", updateLineFill);
      window.removeEventListener("resize", updateLineFill);
    };
  }, [updateLineFill]);

  const sections = useMemo(
    () => [
      {
        id: "core",
        label: "Core professional chapters",
        description: "Scale, product feedback, speed under pressure, and building support from zero.",
        entries: orderedCoreEntries(),
        tier: "core" as const,
      },
      {
        id: "foundation",
        label: "Early foundation",
        description: "Where customer-facing operations and team leadership began.",
        entries: foundationEntries,
        tier: "foundation" as const,
      },
    ],
    [],
  );

  return (
    <section
      id="experience"
      ref={ref}
      className={cn(sectionScrollClassName, "py-14 sm:py-20 md:py-24")}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title="Experience" />

        <div className="relative mt-8 md:mt-12">
          <div
            ref={lineTrackRef}
            className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px overflow-hidden bg-border sm:left-4 md:block"
          >
            <div
              className="h-full w-full origin-top bg-accent transition-[transform] duration-150 ease-out will-change-transform"
              style={{ transform: `scaleY(${lineFill})` }}
            />
          </div>

          <div className="space-y-10 md:space-y-12">
            {sections.map((section) => (
              <div key={section.id}>
                <div className="md:pl-16">
                  <p className={monoLabelAccent}>{section.label}</p>
                  <p className={cn("mt-2 max-w-2xl", bodyCopy)}>
                    {section.description}
                  </p>
                </div>

                <ul
                  className={cn(
                    "relative mt-4 min-w-0 md:pl-16",
                    section.tier === "foundation"
                      ? "grid gap-3 sm:grid-cols-2 sm:items-stretch sm:gap-4"
                      : "space-y-6 sm:space-y-8",
                  )}
                >
                  {section.entries.map((entry) => (
                    <li key={entry.id} className="relative min-w-0">
                      {section.tier === "foundation" ? (
                        <FoundationEntry entry={entry} />
                      ) : (
                        <CareerFlipCard
                          entry={entry}
                          isOpen={openEntryId === entry.id}
                          onToggle={() =>
                            setOpenEntryId((current) =>
                              current === entry.id ? null : entry.id,
                            )
                          }
                        />
                      )}
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
