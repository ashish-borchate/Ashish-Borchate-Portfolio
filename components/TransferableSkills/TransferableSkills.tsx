"use client";

import { transferableCopy, transferablePhases } from "@/data/transferableSkills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

export function TransferableSkills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="about"
      ref={ref}
      className="border-y border-border bg-charcoal/30 py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title={transferableCopy.headline} />
        <div className="mt-4 space-y-1 text-sm text-muted sm:text-base">
          {transferableCopy.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={inView && !reduced ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.45 }}
          className="mt-10 grid grid-cols-1 gap-3 min-[430px]:grid-cols-2 sm:mt-12 sm:gap-4"
        >
          {transferablePhases.map((phase) => (
            <article
              key={phase.id}
              className="rounded-xl border border-border/80 bg-surface/30 p-4 sm:p-5"
            >
              <p className="font-mono text-[10px] text-accent/90">{phase.number}</p>
              <h3 className="mt-2 text-sm font-medium tracking-wide text-foreground sm:text-base">
                {phase.title}
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {phase.items.map((item) => (
                  <li key={item} className="leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
