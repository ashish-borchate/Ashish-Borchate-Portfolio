"use client";

import type { ExperienceEntry } from "@/data/experience";
import { experienceTimeline } from "@/data/experience";
import { CareerFlipCard } from "@/components/CareerTimeline/CareerFlipCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const foundationEntries = experienceTimeline.filter((e) => e.emphasis === "compressed");
const coreEntries = experienceTimeline.filter((e) => e.emphasis === "primary");

function FoundationEntry({ entry }: { entry: ExperienceEntry }) {
  const textOnly = entry.logoDisplay === "text-only";

  return (
    <article className="relative flex h-full min-h-[7.5rem] flex-col rounded-xl border border-border/70 bg-surface/30 p-4 sm:min-h-[8rem] sm:p-5">
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
          <h3 className="text-base font-medium tracking-tight text-accent sm:text-lg">
            {entry.company}
          </h3>
        </div>
        <p className="mt-1 text-xs text-muted sm:text-sm">{entry.role}</p>
        <p className="mt-0.5 text-xs text-muted/90 sm:text-sm">{entry.period}</p>
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
        id: "foundation",
        label: "Early foundation",
        description: "Where customer-facing operations and team leadership began.",
        entries: foundationEntries,
        tier: "foundation" as const,
      },
      {
        id: "core",
        label: "Core professional chapters",
        description: "Scale, product feedback, speed under pressure, and building support from zero.",
        entries: coreEntries,
        tier: "core" as const,
      },
    ],
    [],
  );

  return (
    <section
      id="experience"
      ref={ref}
      className="scroll-mt-20 py-14 sm:scroll-mt-24 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Experience" title="Career evolution" />

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
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent sm:text-[11px]">
                    {section.label}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm text-muted">
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
