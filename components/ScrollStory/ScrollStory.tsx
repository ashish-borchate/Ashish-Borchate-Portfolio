"use client";

import { journey } from "@/data/journey";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

const STAGE_COUNT = journey.stages.length;
/** Scroll progress [0, STAGES_END) maps linearly across all journey stages. */
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
  progress,
  layout,
}: {
  index: number;
  title: string;
  progress: MotionValue<number>;
  layout: "horizontal" | "vertical";
}) {
  const opacity = useTransform(progress, (p) => {
    const idx = activeStageIndex(p);
    if (idx === index) return 1;
    if (idx > index) return 0.45;
    return 0.32;
  });
  const dotScale = useTransform(progress, (p) => {
    const idx = activeStageIndex(p);
    return idx === index ? 1.15 : 1;
  });
  const dotOpacity = useTransform(progress, (p) => {
    const idx = activeStageIndex(p);
    return idx === index ? 1 : 0.35;
  });

  return (
    <motion.div
      style={{ opacity }}
      className={cn(
        "relative z-10 min-w-0",
        layout === "horizontal" ? "text-center" : "pl-8",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2.5",
          layout === "horizontal" ? "flex-col" : "flex-row",
        )}
      >
        <motion.span
          style={{ opacity: dotOpacity, scale: dotScale }}
          className={cn(
            "rounded-full bg-accent",
            layout === "vertical"
              ? "absolute left-[7px] h-2.5 w-2.5 -translate-x-1/2"
              : "h-2.5 w-2.5 shrink-0 ring-2 ring-background",
          )}
          aria-hidden
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground sm:text-[11px]">
          {title}
        </span>
      </div>
    </motion.div>
  );
}

function ActiveStageScene({ progress }: { progress: MotionValue<number> }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showClosing, setShowClosing] = useState(false);

  useMotionValueEvent(progress, "change", (p) => {
    setShowClosing(p >= CLOSING_START);
    setActiveIndex(activeStageIndex(p));
  });

  useLayoutEffect(() => {
    setActiveIndex(activeStageIndex(progress.get()));
  }, [progress]);

  const sceneOpacity = useTransform(progress, (p) => {
    if (p >= CLOSING_START) return 0;
    const pos = stageProgress(p) * STAGE_COUNT;
    const idx = activeStageIndex(p);
    const local = pos - idx;
    if (local < 0.08) return 0.38 + (local / 0.08) * 0.62;
    if (local > 0.92) return (1 - local) / 0.08;
    return 1;
  });

  const stage = journey.stages[activeIndex];

  return (
    <motion.div
      style={{ opacity: sceneOpacity }}
      className="mx-auto flex min-h-[5.5rem] max-w-xl flex-col justify-center sm:min-h-[6rem]"
      aria-live="polite"
    >
      {stage && !showClosing ? (
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/90 sm:text-[11px]">
            Step {activeIndex + 1} of {STAGE_COUNT}
          </p>
          <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground sm:text-xl">
            {stage.title}
          </h3>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted sm:text-base">
            {stage.description}
          </p>
        </>
      ) : null}
    </motion.div>
  );
}

function JourneyClosing({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [CLOSING_START, CLOSING_START + 0.1],
    [0, 1],
  );
  const y = useTransform(progress, [CLOSING_START, CLOSING_START + 0.1], [12, 0]);

  return (
    <motion.p
      style={{ opacity, y }}
      className="mx-auto max-w-2xl text-center text-sm font-medium text-foreground sm:text-base"
    >
      {journey.closing}
    </motion.p>
  );
}

function JourneyTrack({
  progress,
  layout,
}: {
  progress: MotionValue<number>;
  layout: "horizontal" | "vertical";
}) {
  const lineProgress = useTransform(progress, (p) => stageProgress(p));

  if (layout === "vertical") {
    return (
      <div className="relative mt-6 sm:mt-8">
        <div className="absolute bottom-2 left-[7px] top-2 w-px overflow-hidden bg-border">
          <motion.div
            style={{ scaleY: lineProgress }}
            className="h-full w-full origin-top bg-accent"
          />
        </div>
        <div className="space-y-6 sm:space-y-7">
          {journey.stages.map((stage, index) => (
            <JourneyStageNode
              key={stage.id}
              index={index}
              title={stage.title}
              progress={progress}
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
        <motion.div
          style={{ scaleX: lineProgress, transformOrigin: "0% 50%" }}
          className="h-full w-full bg-accent"
        />
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-4 sm:gap-4">
        {journey.stages.map((stage, index) => (
          <JourneyStageNode
            key={stage.id}
            index={index}
            title={stage.title}
            progress={progress}
            layout="horizontal"
          />
        ))}
      </div>
    </div>
  );
}

function JourneyIntro({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.04, 0.12], [1, 1, 0.55]);
  const y = useTransform(progress, [0, 0.12], [0, -6]);

  return (
    <motion.div style={{ opacity, y }} className="max-w-2xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]">
        {journey.eyebrow}
      </p>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
        {journey.introduction}
      </p>
    </motion.div>
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

/** Extra viewport heights of scroll “runway” after one full screen of pinned content. */
const SCROLL_RUNWAY_VH = { mobile: 420, desktop: 520 };

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const layout = isMobile ? "vertical" : "horizontal";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

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
          <JourneyIntro progress={scrollYProgress} />
          <JourneyTrack progress={scrollYProgress} layout={layout} />
          <ActiveStageScene progress={scrollYProgress} />
          <div className="mt-6 flex min-h-[3rem] items-center justify-center sm:mt-8">
            <JourneyClosing progress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}
