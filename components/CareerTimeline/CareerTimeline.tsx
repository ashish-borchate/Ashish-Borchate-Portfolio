"use client";

import { experienceTimeline } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CareerTimeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" ref={ref} className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Career evolution"
          subtitle="From customer-facing roles toward systems — compressed early chapters, expanded recent impact."
        />
        <div className="relative mt-16">
          <div className="absolute left-4 top-0 hidden h-full w-px overflow-hidden bg-border md:block">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-accent"
            />
          </div>
          <ul className="space-y-6">
            {experienceTimeline.map((entry) => (
              <li
                key={entry.id}
                className={cn(
                  "relative md:pl-16",
                  entry.emphasis === "compressed" && "opacity-80",
                )}
              >
                <span className="absolute left-[11px] top-8 hidden h-2 w-2 rounded-full bg-accent md:block" />
                <motion.article
                  layout
                  className={cn(
                    "rounded-xl border border-border bg-surface/40 p-6 transition-all",
                    entry.emphasis === "primary" &&
                      "md:p-8 md:shadow-[0_0_0_1px_rgba(91,141,239,0.08)]",
                    entry.emphasis === "compressed" && "md:py-4",
                  )}
                  whileHover={
                    entry.emphasis === "primary" ? { borderColor: "rgba(91,141,239,0.25)" } : {}
                  }
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <CompanyLogo
                        src={entry.logo}
                        alt={`${entry.company} logo`}
                        label="[COMPANY LOGO]"
                      />
                      <h3 className="mt-4 text-xl font-medium">{entry.company}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {entry.role} · {entry.period}
                      </p>
                    </div>
                    <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                      {entry.stage}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {entry.oneLiner}
                  </p>
                </motion.article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function EarlierChapters() {
  const compressed = experienceTimeline.filter((e) => e.emphasis === "compressed");
  return (
    <section className="pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title="EARLIER CHAPTERS" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {compressed.map((e) => (
            <li
              key={e.id}
              className="rounded-lg border border-border/70 bg-surface/30 px-4 py-3 text-sm"
            >
              <p className="font-medium">{e.company}</p>
              <p className="text-muted">
                {e.role} · {e.period}
              </p>
              <p className="mt-1 text-muted">{e.oneLiner}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
