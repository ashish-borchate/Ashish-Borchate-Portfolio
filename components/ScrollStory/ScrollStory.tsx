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
import { useMemo, useRef, useState } from "react";

const STAGE_COUNT = journey.stages.length;
const CLOSING_START = 0.82;

function stageProgress(raw: number) {
  return Math.min(1, raw / CLOSING_START);
}

function stageOpacity(progress: number, index: number): number {
  const pos = stageProgress(progress) * STAGE_COUNT;
  if (pos >= index + 1) return 0.48;
  if (pos >= index) {
    const t = pos - index;
    if (t < 0.15) return 0.38 + (t / 0.15) * 0.62;
    return 1;
  }
  return 0.34;
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
  const opacity = useTransform(progress, (p) => stageOpacity(p, index));
  const dotOpacity = useTransform(progress, (p) => {
    const pos = stageProgress(p) * STAGE_COUNT;
    return pos >= index && pos < index + 1 ? 1 : 0.3;
  });
  const titleOpacity = useTransform(progress, (p) => {
    const pos = stageProgress(p) * STAGE_COUNT;
    return pos >= index && pos < index + 1 ? 1 : 0.65;
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
          layout === "horizontal" ? "flex-col sm:flex-col" : "flex-row",
        )}
      >
        <motion.span
          style={{ opacity: dotOpacity }}
          className={cn(
            "rounded-full bg-accent",
            layout === "vertical"
              ? "absolute left-[7px] h-2.5 w-2.5 -translate-x-1/2"
              : "h-2.5 w-2.5 shrink-0 ring-2 ring-background",
          )}
          aria-hidden
        />
        <motion.span
          style={{ opacity: titleOpacity }}
          className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground sm:text-[11px]"
        >
          {title}
        </motion.span>
      </div>
    </motion.div>
  );
}

function ActiveDescription({ progress }: { progress: MotionValue<number> }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(progress, "change", (p) => {
    setActiveIndex(activeStageIndex(p));
  });

  const descriptionOpacity = useTransform(progress, (p) => {
    const pos = stageProgress(p) * STAGE_COUNT;
    const idx = activeStageIndex(p);
    return pos >= idx && pos < idx + 1 ? 1 : 0;
  });

  return (
    <motion.div
      style={{ opacity: descriptionOpacity }}
      className="mt-6 min-h-[4.5rem] sm:min-h-[5rem] md:mt-8"
    >
      <p className="text-pretty text-sm leading-relaxed text-muted sm:text-base">
        {journey.stages[activeIndex]?.description}
      </p>
    </motion.div>
  );
}

function JourneyClosing({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [CLOSING_START, CLOSING_START + 0.12],
    [0, 1],
  );
  const y = useTransform(progress, [CLOSING_START, CLOSING_START + 0.12], [8, 0]);

  return (
    <motion.p
      style={{ opacity, y }}
      className="mt-6 max-w-2xl text-sm font-medium text-foreground sm:mt-8 sm:text-base md:mx-auto md:text-center"
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
      <div className="relative mt-8 sm:mt-10">
        <div className="absolute bottom-2 left-[7px] top-2 w-px overflow-hidden bg-border">
          <motion.div
            style={{ scaleY: lineProgress }}
            className="h-full w-full origin-top bg-accent"
          />
        </div>
        <div className="space-y-7 sm:space-y-8">
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
    <div className="relative mt-10 md:mt-12">
      <div className="absolute left-[12%] right-[12%] top-[5px] h-px overflow-hidden bg-border">
        <motion.div
          style={{ scaleX: lineProgress, transformOrigin: "0% 50%" }}
          className="h-full w-full bg-accent"
        />
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-4 sm:gap-4">
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
  const opacity = useTransform(progress, [0, 0.06], [0.75, 1]);

  return (
    <motion.div style={{ opacity }} className="max-w-2xl">
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

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const layout = isMobile ? "vertical" : "horizontal";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const sectionHeight = useMemo(() => (isMobile ? 155 : 190), [isMobile]);

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
      <div className="sticky top-0 flex h-[100dvh] max-h-[100svh] items-center overflow-hidden py-6 sm:py-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(91,141,239,0.03),transparent)]" />
        <div className="mx-auto w-full max-w-6xl overflow-hidden px-4 sm:px-6">
          <JourneyIntro progress={scrollYProgress} />
          <JourneyTrack progress={scrollYProgress} layout={layout} />
          <ActiveDescription progress={scrollYProgress} />
          <JourneyClosing progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
