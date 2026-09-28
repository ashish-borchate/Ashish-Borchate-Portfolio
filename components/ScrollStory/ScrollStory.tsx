"use client";

import { journey } from "@/data/journey";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useSectionScrollProgress } from "@/lib/useSectionScrollProgress";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { useMemo, useRef } from "react";

const STAGE_COUNT = journey.stages.length;
const STAGES_END = 0.88;
const CLOSING_START = STAGES_END;

function stageProgress(raw: number) {
  if (raw >= STAGES_END) return 1;
  return raw / STAGES_END;
}

/** Single source of truth: line, labels, and description stay in sync. */
function useJourneyState(scrollProgress: number) {
  const pos = stageProgress(scrollProgress) * STAGE_COUNT;
  const activeIndex = Math.min(
    STAGE_COUNT - 1,
    Math.max(0, Math.floor(pos)),
  );
  const lineFill =
    STAGE_COUNT <= 1 ? stageProgress(scrollProgress) : Math.min(1, pos / (STAGE_COUNT - 1));
  const showClosing = scrollProgress >= CLOSING_START;

  return { activeIndex, lineFill, pos, showClosing };
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
            "font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[11px]",
            isActive ? "text-accent" : "text-muted",
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
      id="story"
      className="border-y border-border py-12 sm:py-16"
      aria-label="Journey"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]">
            {journey.eyebrow}
          </p>
          <p className="text-sm font-medium text-accent/90 sm:text-base">
            {journey.closing}
          </p>
        </div>
        <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
          {journey.introduction}
        </p>
        <ol className="mt-8 space-y-5 border-l border-border pl-5 md:grid md:grid-cols-4 md:gap-6 md:space-y-0 md:border-l-0 md:pl-0">
          {journey.stages.map((stage) => (
            <li key={stage.id} className="md:border-l md:border-border md:pl-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground">
                {stage.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Shorter runway = less empty scroll; still enough for four steps. */
const SCROLL_RUNWAY_VH = { mobile: 165, desktop: 210 };

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const layout = isMobile ? "vertical" : "horizontal";
  const scrollProgress = useSectionScrollProgress(ref);
  const { activeIndex, lineFill, pos } = useJourneyState(scrollProgress);

  const stage = journey.stages[activeIndex];
  const introOpacity =
    scrollProgress <= 0.05 ? 1 : scrollProgress <= 0.14 ? 0.65 : 0.5;

  const sectionHeight = useMemo(
    () => 100 + (isMobile ? SCROLL_RUNWAY_VH.mobile : SCROLL_RUNWAY_VH.desktop),
    [isMobile],
  );

  if (reduced) {
    return <JourneyStatic />;
  }

  return (
    <section
      id="story"
      ref={ref}
      className="relative border-y border-border"
      style={{ height: `${sectionHeight}vh` }}
      aria-label="Journey"
    >
      <div className="sticky top-0 z-20 flex max-h-[100dvh] min-h-0 flex-col justify-start overflow-hidden pb-5 pt-[4.75rem] sm:pb-6 sm:pt-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(91,141,239,0.03),transparent)]" />
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div
            className="max-w-3xl transition-opacity duration-300"
            style={{ opacity: introOpacity }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
              <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]">
                {journey.eyebrow}
              </p>
              {stage ? (
                <p
                  key={stage.id}
                  className="text-pretty text-sm font-normal leading-snug text-accent sm:text-base"
                  aria-live="polite"
                >
                  {stage.description}
                </p>
              ) : null}
            </div>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted sm:mt-2.5 sm:text-base">
              {journey.introduction}
            </p>
            <p className="mt-2 text-pretty text-xs leading-snug text-muted/80 sm:text-sm">
              {journey.closing}
            </p>
          </div>

          <JourneyTrack lineFill={lineFill} pos={pos} layout={layout} />
        </div>
      </div>
    </section>
  );
}
