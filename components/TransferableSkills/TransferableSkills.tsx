"use client";

import { transferableCopy, transferablePhases } from "@/data/transferableSkills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

export function TransferableSkills() {
  const [active, setActive] = useState(transferablePhases[0]?.id);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduced = usePrefersReducedMotion();
  const phase = transferablePhases.find((p) => p.id === active);

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
          className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-12 lg:items-start lg:gap-8"
        >
          <div
            className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:items-stretch lg:overflow-visible lg:pb-0 lg:pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Transferable capabilities"
          >
            {transferablePhases.map((p) => {
              const selected = active === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`panel-${p.id}`}
                  id={`tab-${p.id}`}
                  onClick={() => setActive(p.id)}
                  className={cn(
                    "min-h-11 shrink-0 rounded-full border px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-wider transition-colors min-[430px]:text-[11px] lg:w-full lg:shrink",
                    selected
                      ? "border-accent/50 bg-accent-muted text-foreground"
                      : "border-border text-muted hover:border-accent/30 hover:text-foreground",
                  )}
                >
                  {p.title}
                </button>
              );
            })}
          </div>

          <div className="min-w-0 lg:col-span-8 lg:pt-1">
            {phase ? (
              <div
                id={`panel-${phase.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${phase.id}`}
                className="rounded-xl border border-border bg-surface/30 p-5 sm:p-8"
              >
                <p className="font-mono text-[10px] text-accent/90">{phase.number}</p>
                <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground sm:text-xl">
                  {phase.title}
                </h3>
                <ul className="mt-5 space-y-2.5 sm:mt-6">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="border-l border-border pl-3 text-sm leading-relaxed text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
