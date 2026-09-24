"use client";

import type { CaseStudySection } from "@/data/caseStudies";
import { getTestimonialsByIds } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/Testimonial/TestimonialCard";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

type VisualVariant = "build" | "scale" | "feedback" | "speed";

const variantStyles: Record<
  VisualVariant,
  { border: string; gradient: string; flowClass: string }
> = {
  build: {
    border: "border-amber-500/20",
    gradient: "from-amber-500/5 to-transparent",
    flowClass: "flex flex-col gap-2 md:flex-row md:flex-wrap",
  },
  scale: {
    border: "border-accent/25",
    gradient: "from-accent/10 to-transparent",
    flowClass: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
  },
  feedback: {
    border: "border-emerald-500/20",
    gradient: "from-emerald-500/5 to-transparent",
    flowClass: "flex flex-col gap-3",
  },
  speed: {
    border: "border-cyan-500/20",
    gradient: "from-cyan-500/5 to-transparent",
    flowClass: "flex flex-wrap gap-2",
  },
};

type CaseStudyProps = {
  data: CaseStudySection;
  variant: VisualVariant;
};

export function CaseStudySectionBlock({ data, variant }: CaseStudyProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useMediaQuery("(max-width: 767px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const styles = variantStyles[variant];
  const linkedTestimonials = getTestimonialsByIds(data.testimonialIds);

  return (
    <section
      id={data.companySlug}
      ref={ref}
      className={cn(
        "scroll-mt-20 border-t border-border py-16 sm:scroll-mt-24 sm:py-24 md:py-32",
        styles.border,
      )}
    >
      <motion.div
        style={reduceMotion ? undefined : { y, opacity }}
        className="relative mx-auto max-w-6xl px-4 sm:px-6"
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 h-64 bg-gradient-to-b opacity-50",
            styles.gradient,
          )}
          aria-hidden
        />
        <SectionHeading
          eyebrow={data.company}
          title={data.theme}
          subtitle={`${data.role} · ${data.period}`}
        />

        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-6 text-sm leading-relaxed text-muted">
            <div>
              <h3 className="mb-2 font-mono text-[10px] uppercase tracking-wider text-foreground">
                Context
              </h3>
              <p>{data.context}</p>
            </div>
            <div>
              <h3 className="mb-2 font-mono text-[10px] uppercase tracking-wider text-foreground">
                Challenge
              </h3>
              <p>{data.challenge}</p>
            </div>
            <div>
              <h3 className="mb-2 font-mono text-[10px] uppercase tracking-wider text-foreground">
                Outcome
              </h3>
              <p>{data.outcome}</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface/40 p-4 sm:p-6">
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Flow
            </h3>
            <div className={cn("mt-4", styles.flowClass)}>
              {data.flowSteps.map((step, i) => (
                <div
                  key={step}
                  className={cn(
                    "rounded-md border border-border/80 bg-background/40 px-3 py-2 text-xs text-foreground",
                    variant === "speed" && "md:animate-pulse md:[animation-duration:3s]",
                    i === data.flowSteps.length - 1 && variant === "build" && "border-accent/30",
                  )}
                >
                  {step}
                  {i < data.flowSteps.length - 1 && variant !== "speed" ? (
                    <span className="ml-2 hidden text-muted md:inline">→</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <InfoBlock title="Systems created" items={data.systemsCreated} />
          <InfoBlock title="Product involvement" items={data.productInvolvement} />
          <InfoBlock title="Tools" items={data.tools} />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-border px-4 py-3"
            >
              <p className="font-mono text-lg text-foreground">{m.value}</p>
              <p className="text-xs text-muted">{m.label}</p>
            </div>
          ))}
        </div>

        {linkedTestimonials.length > 0 ? (
          <div className="mt-16">
            <h3 className="mb-6 text-lg font-medium">
              What the people I worked with say
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {linkedTestimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} compact />
              ))}
            </div>
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-border/80 p-4">
      <h4 className="font-mono text-[10px] uppercase tracking-wider text-muted">
        {title}
      </h4>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {items.map((item) => (
          <li key={item} className="border-l border-border pl-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
