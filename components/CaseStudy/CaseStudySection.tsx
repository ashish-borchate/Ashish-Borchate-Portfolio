"use client";

import type { CaseStudySection } from "@/data/caseStudies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { usePrefersReducedMotion } from "@/lib/motion";

type VisualVariant = "build" | "scale" | "feedback" | "speed";

const variantStyles: Record<VisualVariant, { border: string; accent: string }> =
  {
    build: { border: "border-amber-500/15", accent: "text-amber-200/90" },
    scale: { border: "border-accent/20", accent: "text-accent" },
    feedback: { border: "border-emerald-500/15", accent: "text-emerald-200/90" },
    speed: { border: "border-cyan-500/15", accent: "text-cyan-200/90" },
  };

type CaseStudyProps = {
  data: CaseStudySection;
  variant: VisualVariant;
};

export function CaseStudySectionBlock({ data, variant }: CaseStudyProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 1]);
  const styles = variantStyles[variant];

  return (
    <section
      id={data.companySlug}
      ref={ref}
      className={cn(
        "scroll-mt-20 border-t border-border py-14 sm:scroll-mt-24 sm:py-20 md:py-28",
        styles.border,
      )}
    >
      <motion.div
        style={
          reduceMotion || isMobile ? undefined : { y, opacity }
        }
        className="relative mx-auto max-w-6xl px-4 sm:px-6"
      >
        <SectionHeading
          eyebrow={data.company}
          title={data.theme}
          subtitle={`${data.role} · ${data.period}`}
        />

        <div className="mt-8 space-y-8 sm:mt-10 lg:grid lg:grid-cols-12 lg:gap-10 lg:space-y-0">
          <div className="space-y-6 lg:col-span-7">
            <StoryBlock title="Context" body={data.context} />
            <StoryBlock title="Challenge" body={data.challenge} />
            <StoryBlock title="Outcome" body={data.outcome} />
          </div>

          <div className="lg:col-span-5 lg:pt-1">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              How I achieved it
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {data.howIAchieved.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "rounded-full border border-border bg-surface/50 px-3 py-1.5 text-xs text-foreground sm:text-sm",
                    styles.border,
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StoryBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
        {body}
      </p>
    </div>
  );
}
