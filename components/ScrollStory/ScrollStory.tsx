"use client";

import { careerStorySteps } from "@/data/experience";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

function StoryLine({
  text,
  progress,
  index,
  total,
  compact,
}: {
  text: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
  compact: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    progress,
    [start, start + 0.08, end - 0.05, end],
    compact ? [0.35, 1, 1, 0.35] : [0.15, 1, 1, 0.15],
  );
  const blur = useTransform(progress, [start, start + 0.1], compact ? [2, 0] : [6, 0]);
  const scale = useTransform(progress, [start, start + 0.12], [0.98, 1]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.p
      style={{ opacity, scale, filter }}
      className="text-center text-xl font-medium tracking-tight min-[430px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
    >
      {text}
    </motion.p>
  );
}

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 639px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const steps = careerStorySteps;
  const sectionHeight = steps.length * (isMobile ? 32 : 55);

  if (reduced) {
    return (
      <section id="story" className="border-y border-border py-14 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-center sm:space-y-8 sm:px-6">
          {steps.map((s) => (
            <p key={s.id} className="text-xl font-medium min-[430px]:text-2xl">
              {s.headline}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="story"
      ref={ref}
      className="relative"
      style={{ height: `${sectionHeight}vh` }}
      aria-label="Career story"
    >
      <div className="sticky top-0 flex h-[100dvh] max-h-[100svh] items-center justify-center overflow-hidden px-1">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(91,141,239,0.04),transparent)]" />
        <div className="mx-auto flex max-w-4xl flex-col gap-5 px-4 sm:gap-8 sm:px-6 md:gap-10">
          {steps.map((step, i) => (
            <StoryLine
              key={step.id}
              text={step.headline}
              progress={scrollYProgress}
              index={i}
              total={steps.length}
              compact={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
