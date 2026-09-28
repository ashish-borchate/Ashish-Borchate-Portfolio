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

function parseEmphasis(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-medium text-accent">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

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
        "scroll-mt-20 border-t border-border py-12 sm:scroll-mt-24 sm:py-16 md:py-20",
        styles.border,
      )}
    >
      <motion.div
        style={reduceMotion || isMobile ? undefined : { y, opacity }}
        className="relative mx-auto max-w-6xl px-4 sm:px-6"
      >
        <SectionHeading
          eyebrow={data.company}
          title={data.theme}
          subtitle={`${data.role} · ${data.period}`}
        />

        <div className="mt-8 space-y-7 sm:mt-9 sm:space-y-8">
          <StoryBlock title="Context" body={data.context} />
          <StoryBlock title="Challenge" body={data.challenge} />

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Action
            </h3>
            <ul className="mt-3 space-y-2 sm:mt-3.5">
              {data.action.map((item) => (
                <li
                  key={item}
                  className="border-l border-border pl-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={cn(
              "rounded-xl border bg-surface/40 px-4 py-4 sm:px-5 sm:py-5",
              styles.border,
            )}
          >
            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Outcome
            </h3>
            <p className="mt-2.5 text-pretty text-sm leading-relaxed text-accent sm:text-base">
              {parseEmphasis(data.outcome)}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StoryBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
        {title}
      </h3>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted sm:text-base">
        {body}
      </p>
    </div>
  );
}
