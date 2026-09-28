"use client";

import type { CaseStudySection } from "@/data/caseStudies";
import { caseStudies } from "@/data/caseStudies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useId, useState } from "react";

type VisualVariant = "build" | "scale" | "feedback" | "speed";

const order: { slug: string; variant: VisualVariant; sequence: string }[] = [
  { slug: "yellow", variant: "build", sequence: "01" },
  { slug: "binance", variant: "scale", sequence: "02" },
  { slug: "koinx", variant: "feedback", sequence: "03" },
  { slug: "bybit", variant: "speed", sequence: "04" },
];

const variantStyles: Record<VisualVariant, { border: string }> = {
  build: { border: "border-amber-500/15" },
  scale: { border: "border-accent/20" },
  feedback: { border: "border-emerald-500/15" },
  speed: { border: "border-cyan-500/15" },
};

function plainOutcome(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1");
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

function CaseStudyExpandedBody({
  data,
  variant,
}: {
  data: CaseStudySection;
  variant: VisualVariant;
}) {
  const styles = variantStyles[variant];
  return (
    <div className="space-y-7 border-t border-border pt-6 sm:space-y-8 sm:pt-7">
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
          {plainOutcome(data.outcome)}
        </p>
      </div>
    </div>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={cn(
        "h-4 w-4 shrink-0 text-muted transition-transform duration-300",
        expanded && "rotate-180 text-accent",
      )}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CaseStudyAccordionItem({
  data,
  variant,
  sequence,
  isOpen,
  onToggle,
}: {
  data: CaseStudySection;
  variant: VisualVariant;
  sequence: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const panelId = useId();
  const styles = variantStyles[variant];

  return (
    <article
      id={data.companySlug}
      className={cn(
        "scroll-mt-20 rounded-xl border bg-surface/30 transition-colors sm:scroll-mt-24",
        isOpen ? cn("border-accent/25", styles.border) : "border-border",
      )}
    >
      <button
        type="button"
        className="flex w-full min-w-0 items-start gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5 sm:py-5"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <ChevronIcon expanded={isOpen} />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              {sequence}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:text-[11px]">
              {data.company}
            </span>
          </span>
          <span className="mt-2 block text-base font-medium tracking-tight text-foreground sm:text-lg">
            {data.theme}
          </span>
          <span className="mt-2 block text-pretty text-sm leading-snug text-muted">
            {data.collapsedDescription}
          </span>
          <span className="mt-4 inline-flex min-h-10 items-center font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-accent sm:text-[11px]">
            {isOpen ? "COLLAPSE ↑" : "EXPLORE CASE STUDY →"}
          </span>
        </span>
      </button>

      <motion.div
        id={panelId}
        role="region"
        aria-hidden={!isOpen}
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={
          reduced ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
        }
        className="overflow-hidden"
      >
        <div className="px-4 pb-5 sm:px-5 sm:pb-6">
          <CaseStudyExpandedBody data={data} variant={variant} />
        </div>
      </motion.div>
    </article>
  );
}

export function WorkCaseStudies() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const handleToggle = useCallback((slug: string) => {
    setOpenSlug((current) => (current === slug ? null : slug));
  }, []);

  return (
    <section id="case-studies" className="py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6">
        <SectionHeading title="Case studies" />
        <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
          {order.map(({ slug, variant, sequence }) => {
            const data = caseStudies.find((c) => c.companySlug === slug);
            if (!data) return null;
            return (
              <CaseStudyAccordionItem
                key={slug}
                data={data}
                variant={variant}
                sequence={sequence}
                isOpen={openSlug === slug}
                onToggle={() => handleToggle(slug)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
