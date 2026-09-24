"use client";

import { careerStorySteps } from "@/data/experience";
import { easeOut, usePrefersReducedMotion } from "@/lib/motion";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";

function StoryLine({
  text,
  progress,
  index,
  total,
}: {
  text: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, start + 0.08, end - 0.05, end], [0.15, 1, 1, 0.15]);
  const blur = useTransform(progress, [start, start + 0.1], [6, 0]);
  const scale = useTransform(progress, [start, start + 0.12], [0.96, 1]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.p
      style={{ opacity, scale, filter }}
      className="text-center text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
    >
      {text}
    </motion.p>
  );
}

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const steps = careerStorySteps;

  if (reduced) {
    return (
      <section id="story" className="border-y border-border py-20">
        <div className="mx-auto max-w-3xl space-y-8 px-4 text-center sm:px-6">
          {steps.map((s) => (
            <p key={s.id} className="text-2xl font-medium">
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
      style={{ height: `${steps.length * 55}vh` }}
      aria-label="Career story"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(91,141,239,0.04),transparent)]" />
        <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 sm:px-6">
          {steps.map((step, i) => (
            <StoryLine
              key={step.id}
              text={step.headline}
              progress={scrollYProgress}
              index={i}
              total={steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
