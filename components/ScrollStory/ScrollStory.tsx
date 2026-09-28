"use client";

import { journey } from "@/data/journey";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useSectionScrollProgress } from "@/lib/useSectionScrollProgress";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { useMemo, useRef } from "react";

const STAGE_COUNT = journey.stages.length;
const STAGES_END = 0.82;
const CLOSING_START = STAGES_END;

function stageProgress(raw: number) {
  if (raw >= STAGES_END) return 1;
  return raw / STAGES_END;
}

function activeStageIndex(progress: number): number {
  const pos = stageProgress(progress) * STAGE_COUNT;
  return Math.min(STAGE_COUNT - 1, Math.max(0, Math.floor(pos)));
}

function JourneyStageNode({
  index,
  title,
  activeIndex,
  layout,
}: {
  index: number;
  title: string;
  activeIndex: number;
  layout: "horizontal" | "vertical";
}) {
  const isActive = activeIndex === index;
  const isPast = activeIndex > index;

  return (
    <div
      className={cn(
        "relative z-10 min-w-0 transition-opacity duration-300",
        layout === "horizontal" ? "text-center" : "pl-8",
        isActive ? "opacity-100" : isPast ? "opacity-45" : "opacity-35",
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
            "rounded-full bg-accent transition-transform duration-300",
            layout === "vertical"
              ? "absolute left-[7px] h-2.5 w-2.5 -translate-x-1/2"
              : "h-2.5 w-2.5 shrink-0 ring-2 ring-background",
            isActive && "scale-110",
            !isActive && "opacity-40",
          )}
          aria-hidden
        />
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[11px]",
            isActive ? "text-foreground" : "text-muted",
          )}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

function JourneyTrack({
  progress,
  activeIndex,
  layout,
}: {
  progress: number;
  activeIndex: number;
  layout: "horizontal" | "vertical";
}) {
  const lineFill = stageProgress(progress);

  if (layout === "vertical") {
    return (
      <div className="relative mt-6 sm:mt-8">
        <div className="absolute bottom-2 left-[7px] top-2 w-px overflow-hidden bg-border">
          <div
            className="h-full w-full origin-top bg-accent transition-transform duration-150 ease-out"
            style={{ transform: `scaleY(${lineFill})` }}
          />
        </div>
        <div className="space-y-6 sm:space-y-7">
          {journey.stages.map((stage, index) => (
            <JourneyStageNode
              key={stage.id}
              index={index}
              title={stage.title}
              activeIndex={activeIndex}
              layout="vertical"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-8 md:mt-10">
      <div className="absolute left-[8%] right-[8%] top-[5px] h-px overflow-hidden bg-border sm:left-[10%] sm:right-[10%]">
        <div
          className="h-full w-full origin-left bg-accent transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${lineFill})` }}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-4 sm:gap-4">
        {journey.stages.map((stage, index) => (
          <JourneyStageNode
            key={stage.id}
            index={index}
            title={stage.title}
            activeIndex={activeIndex}
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
      className="border-y border-border py-14 sm:py-20"
      aria-label="Journey"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]">
          {journey.eyebrow}
        </p>
        <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
          {journey.introduction}
        </p>
        <ol className="mt-10 space-y-6 border-l border-border pl-5 md:mt-12 md:grid md:grid-cols-4 md:gap-6 md:space-y-0 md:border-l-0 md:pl-0">
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
        <p className="mt-10 text-center text-sm font-medium text-foreground sm:text-base md:mt-12">
          {journey.closing}
        </p>
      </div>
    </section>
  );
}

const SCROLL_RUNWAY_VH = { mobile: 420, desktop: 520 };

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const layout = isMobile ? "vertical" : "horizontal";
  const progress = useSectionScrollProgress(ref);

  const activeIndex = activeStageIndex(progress);
  const showClosing = progress >= CLOSING_START;
  const introOpacity =
    progress <= 0.04 ? 1 : progress <= 0.12 ? 1 - (progress - 0.04) / 0.08 * 0.45 : 0.55;
  const stage = journey.stages[activeIndex];

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
      <div className="sticky top-0 z-20 flex h-[100svh] min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-8 sm:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(91,141,239,0.04),transparent)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center px-4 sm:px-6">
          <div className="max-w-2xl transition-opacity duration-300" style={{ opacity: introOpacity }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]">
              {journey.eyebrow}
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
              {journey.introduction}
            </p>
          </div>

          <JourneyTrack progress={progress} activeIndex={activeIndex} layout={layout} />

          <div
            className="mx-auto mt-6 flex min-h-[4rem] max-w-xl items-center justify-center sm:mt-8 sm:min-h-[4.5rem]"
            aria-live="polite"
          >
            {!showClosing && stage ? (
              <p
                key={stage.id}
                className="text-pretty text-center text-sm leading-relaxed text-muted transition-opacity duration-300 sm:text-base"
              >
                {stage.description}
              </p>
            ) : null}
          </div>

          <div className="mt-6 flex min-h-[3rem] items-center justify-center sm:mt-8">
            <p
              className={cn(
                "mx-auto max-w-2xl text-center text-sm font-medium text-foreground transition-opacity duration-300 sm:text-base",
                showClosing ? "opacity-100" : "opacity-0",
              )}
            >
              {journey.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
