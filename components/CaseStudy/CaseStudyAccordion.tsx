"use client";

import type { CaseStudySection } from "@/data/caseStudies";
import { caseStudies } from "@/data/caseStudies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePrefersReducedMotion } from "@/lib/motion";
import {
  bodyCopy,
  bodyCopySecondary,
  editorialTitle,
  monoCtaRow,
  monoLabelAccent,
} from "@/lib/typography";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useId, useState } from "react";

const order: { slug: string; sequence: string }[] = [
  { slug: "yellow", sequence: "01" },
  { slug: "binance", sequence: "02" },
  { slug: "koinx", sequence: "03" },
  { slug: "bybit", sequence: "04" },
];

function plainOutcome(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1");
}

function StoryBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className={monoLabelAccent}>{title}</h3>
      <p className={cn("mt-2", bodyCopy)}>{body}</p>
    </div>
  );
}

function CaseStudyExpandedBody({ data }: { data: CaseStudySection }) {
  return (
    <div className="space-y-7 border-t border-border pt-6 sm:space-y-8 sm:pt-7">
      <StoryBlock title="Context" body={data.context} />
      <StoryBlock title="Challenge" body={data.challenge} />
      <div>
        <h3 className={monoLabelAccent}>Action</h3>
        <ul className="mt-3 space-y-2 sm:mt-3.5">
          {data.action.map((item) => (
            <li key={item} className={cn("border-l border-border pl-3", bodyCopy)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-border bg-surface/40 px-4 py-4 sm:px-5 sm:py-5">
        <h3 className={monoLabelAccent}>Outcome</h3>
        <p className={cn("mt-2.5", bodyCopySecondary)}>{plainOutcome(data.outcome)}</p>
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
  sequence,
  isOpen,
  onToggle,
}: {
  data: CaseStudySection;
  sequence: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const panelId = useId();

  return (
    <article
      id={data.companySlug}
      className={cn(
        "group/cta scroll-mt-20 rounded-xl border bg-surface/30 transition-[border-color,background-color] duration-200 sm:scroll-mt-24",
        isOpen
          ? "border-border-hover"
          : "border-border hover:border-border-hover hover:bg-surface/40",
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
            <span className={monoLabelAccent}>{sequence}</span>
            <span className={cn(monoLabelAccent, "tracking-[0.12em]")}>{data.company}</span>
          </span>
          <span className={cn("mt-2 block uppercase", editorialTitle)}>{data.theme}</span>
          <span className={cn("mt-2 block leading-snug", bodyCopy)}>{data.collapsedDescription}</span>
          <span className={cn("mt-4", monoCtaRow)}>
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
          <CaseStudyExpandedBody data={data} />
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
    <section
      id="case-studies"
      className="scroll-mt-20 py-14 sm:scroll-mt-24 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6">
        <SectionHeading title="Case studies" />
        <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
          {order.map(({ slug, sequence }) => {
            const data = caseStudies.find((c) => c.companySlug === slug);
            if (!data) return null;
            return (
              <CaseStudyAccordionItem
                key={slug}
                data={data}
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
