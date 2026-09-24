"use client";

import { howIWorkSteps } from "@/data/howIWork";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useMediaQuery } from "@/lib/useMediaQuery";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function HowIWork() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="how-i-work" ref={ref} className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="How I work"
          subtitle="Discover → Diagnose → Build → Measure"
        />
        <div
          className={cn(
            "relative mt-8 md:mt-16",
            isMobile ? "space-y-4" : "space-y-4",
          )}
        >
          {howIWorkSteps.map((step, index) => (
            <HowIWorkStep
              key={step.id}
              step={step}
              index={index}
              total={howIWorkSteps.length}
              scrollYProgress={scrollYProgress}
              staticLayout={isMobile}
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
  staticLayout,
}: {
  step: (typeof howIWorkSteps)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  staticLayout: boolean;
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
      style={staticLayout ? undefined : { opacity }}
      className={cn(
        "grid gap-4 rounded-xl border border-border bg-charcoal/80 p-5 backdrop-blur-sm min-[430px]:p-6 md:grid-cols-[auto_1fr] md:gap-6 md:p-8",
        !staticLayout && "sticky top-20 sm:top-24",
      )}
    >
      <p className="font-mono text-3xl text-accent/80 min-[430px]:text-4xl">{step.number}</p>
      <div>
        <h3 className="text-xl font-medium tracking-tight min-[430px]:text-2xl">{step.title}</h3>
        <ul className="mt-3 space-y-2 text-muted min-[430px]:mt-4">
          {step.items.map((item) => (
            <li key={item} className="text-sm leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted/60 min-[430px]:mt-4">
          Step {index + 1} of {total}
        </p>
      </div>
    </motion.article>
  );
}
