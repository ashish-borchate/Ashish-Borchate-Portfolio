"use client";

import { journey } from "@/data/journey";
import { usePrefersReducedMotion } from "@/lib/motion";
import { bodyCopy, monoLabelAccent, sectionTitle } from "@/lib/typography";
import { useSectionScrollProgress } from "@/lib/useSectionScrollProgress";
import { sectionScrollClassName } from "@/lib/sectionLayout";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { useMemo, useRef } from "react";

const journeyLineClass = cn(monoLabelAccent, "leading-snug");

function JourneySectionTitle() {
  return (
    <h2 className={cn(sectionTitle, "md:text-[2.75rem]")}>How I think</h2>
  );
}

function JourneyIntroLine() {
  return (
    <p className={cn(journeyLineClass, "mt-3 text-pretty sm:mt-4")}>
      <span>JOURNEY</span>
      <span className="px-2 text-accent/70" aria-hidden>
        ·
      </span>
      <span className="normal-case">From customer insights to a better product experience</span>
    </p>
  );
}
const journeyStageLine = bodyCopy;

const STAGE_COUNT = journey.stages.length;
const IMPROVE_STAGE_INDEX = STAGE_COUNT - 1;

function JourneyBelowTrack({
  stageDescription,
  showFooter,
}: {
  stageDescription: string | null;
  showFooter: boolean;
}) {
  return (
    <div className="mx-auto mt-10 max-w-2xl space-y-4 text-center sm:mt-12 md:mt-14">
      {stageDescription ? (
        <p key={stageDescription} className={journeyStageLine} aria-live="polite">
          {stageDescription}
        </p>
      ) : null}
      {showFooter ? (
        <p className={journeyStageLine} aria-live="polite">{journey.trackFooter}</p>
      ) : null}
    </div>
  );
}

function stageProgress(raw: number) {
  return Math.min(1, Math.max(0, raw));
}

/** Single source of truth: line, labels, and description stay in sync. */
function useJourneyState(scrollProgress: number) {
  const pos = stageProgress(scrollProgress) * STAGE_COUNT;
  const activeIndex = Math.min(
    STAGE_COUNT - 1,
    Math.max(0, Math.floor(pos)),
  );
  const lineFill =
    STAGE_COUNT <= 1
      ? stageProgress(scrollProgress)
      : Math.min(1, pos / (STAGE_COUNT - 1));

  return { activeIndex, lineFill, pos };
}

function JourneyStageNode({
  index,
  title,
  pos,
  layout,
}: {
  index: number;
  title: string;
  pos: number;
  layout: "horizontal" | "vertical";
}) {
  const isActive = Math.floor(pos) === index && pos < STAGE_COUNT;
  const isPast = pos > index + 0.02;

  return (
    <div
      className={cn(
        "relative z-10 min-w-0 transition-opacity duration-200",
        layout === "horizontal" ? "text-center" : "pl-8",
        isActive ? "opacity-100" : isPast ? "opacity-55" : "opacity-38",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2.5",
          layout === "horizontal" ? "flex-col" : "flex-row",
        )}
      >
        <span
          className={cn(
            "rounded-full bg-accent transition-all duration-200",
            layout === "vertical"
              ? "absolute left-[7px] h-2.5 w-2.5 -translate-x-1/2"
              : "h-2.5 w-2.5 shrink-0 ring-2 ring-background",
            isActive && "scale-110 shadow-[0_0_12px_rgba(91,141,239,0.55)]",
            !isActive && !isPast && "opacity-35",
            isPast && !isActive && "opacity-70",
          )}
          aria-hidden
        />
        <span
          className={cn(
            monoLabelAccent,
            "tracking-[0.12em]",
            !isActive && "text-muted",
          )}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

function JourneyTrack({
  lineFill,
  pos,
  layout,
}: {
  lineFill: number;
  pos: number;
  layout: "horizontal" | "vertical";
}) {
  if (layout === "vertical") {
    return (
      <div className="relative mt-5 sm:mt-6">
        <div className="absolute bottom-1 left-[7px] top-1 w-px overflow-hidden bg-border">
          <div
            className="h-full w-full origin-top bg-accent transition-transform duration-100 ease-out"
            style={{ transform: `scaleY(${lineFill})` }}
          />
        </div>
        <div className="space-y-5 sm:space-y-6">
          {journey.stages.map((stage, index) => (
            <JourneyStageNode
              key={stage.id}
              index={index}
              title={stage.title}
              pos={pos}
              layout="vertical"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-6 md:mt-7">
      <div className="absolute left-[8%] right-[8%] top-[5px] h-px overflow-hidden bg-border sm:left-[10%] sm:right-[10%]">
        <div
          className="h-full w-full origin-left bg-accent transition-transform duration-100 ease-out"
          style={{ transform: `scaleX(${lineFill})` }}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-5 sm:grid-cols-4 sm:gap-4">
        {journey.stages.map((stage, index) => (
          <JourneyStageNode
            key={stage.id}
            index={index}
            title={stage.title}
            pos={pos}
            layout="horizontal"
          />
        ))}
      </div>
    </div>
  );
}

function JourneyStatic() {
  return (
    <section
      id="how-i-work"
      className={cn(sectionScrollClassName, "border-b border-border py-12 sm:py-16")}
      aria-label="How I think"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <JourneySectionTitle />
        <JourneyIntroLine />
        <p className={cn("mt-3 max-w-2xl sm:mt-3.5", bodyCopy)}>
          {journey.introduction}
        </p>
        <ol className="mt-8 space-y-5 border-l border-border pl-5 md:grid md:grid-cols-4 md:gap-6 md:space-y-0 md:border-l-0 md:pl-0">
          {journey.stages.map((stage) => (
            <li key={stage.id} className="md:border-l md:border-border md:pl-4">
              <p className={cn(monoLabelAccent, "text-primary")}>{stage.title}</p>
              <p className={cn("mt-2", bodyCopy)}>{stage.description}</p>
            </li>
          ))}
        </ol>
        <JourneyBelowTrack stageDescription={null} showFooter />
      </div>
    </section>
  );
}

/** Scroll runway: enough for four steps; ends when journey completes (no dead tail). */
const SCROLL_RUNWAY_VH = { mobile: 150, desktop: 185 };

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const layout = isMobile ? "vertical" : "horizontal";
  const scrollProgress = useSectionScrollProgress(ref);
  const { activeIndex, lineFill, pos } = useJourneyState(scrollProgress);

  const stage = journey.stages[activeIndex];
  const onImproveStage = activeIndex === IMPROVE_STAGE_INDEX;

  const sectionHeight = useMemo(
    () => 100 + (isMobile ? SCROLL_RUNWAY_VH.mobile : SCROLL_RUNWAY_VH.desktop),
    [isMobile],
  );

  if (reduced) {
    return <JourneyStatic />;
  }

  return (
    <section
      ref={ref}
      id="how-i-work"
      className="relative border-b border-border"
      style={{ height: `${sectionHeight}vh` }}
      aria-label="How I think"
    >
      <div
        className={cn(
          sectionScrollClassName,
          "sticky top-[var(--header-offset)] z-20 flex h-[calc(100dvh-var(--header-offset))] max-h-[calc(100svh-var(--header-offset))] flex-col justify-center overflow-hidden py-6 sm:py-8",
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(91,141,239,0.03),transparent)]" />
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <JourneySectionTitle />
            <JourneyIntroLine />

            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted sm:mt-3.5 sm:text-base">
              {journey.introduction}
            </p>
          </div>

          <JourneyTrack lineFill={lineFill} pos={pos} layout={layout} />

          <JourneyBelowTrack
            stageDescription={!onImproveStage ? (stage?.description ?? null) : null}
            showFooter={onImproveStage}
          />
        </div>
      </div>
    </section>
  );
}
