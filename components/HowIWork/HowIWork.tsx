"use client";

import { howIWorkSteps } from "@/data/howIWork";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

export function HowIWork() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="how-i-work" ref={ref} className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="How I work"
          subtitle="Discover → Diagnose → Build → Measure"
        />
        <div className="relative mt-16 space-y-4">
          {howIWorkSteps.map((step, index) => (
            <HowIWorkStep
              key={step.id}
              step={step}
              index={index}
              total={howIWorkSteps.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowIWorkStep({
  step,
  index,
  total,
  scrollYProgress,
}: {
  step: (typeof howIWorkSteps)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.1, end - 0.05, end],
    [0.35, 1, 1, 0.35],
  );

  return (
    <motion.article
      style={{ opacity }}
      className="sticky top-24 grid gap-6 rounded-xl border border-border bg-charcoal/80 p-8 backdrop-blur-sm md:grid-cols-[auto_1fr]"
    >
      <p className="font-mono text-4xl text-accent/80">{step.number}</p>
      <div>
        <h3 className="text-2xl font-medium tracking-tight">{step.title}</h3>
        <ul className="mt-4 space-y-2 text-muted">
          {step.items.map((item) => (
            <li key={item} className="text-sm leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted/60">
          Step {index + 1} of {total}
        </p>
      </div>
    </motion.article>
  );
}
