"use client";

import { transferableCopy, transferablePhases } from "@/data/transferableSkills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function TransferableSkills() {
  const [active, setActive] = useState(transferablePhases[0]?.id);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const phase = transferablePhases.find((p) => p.id === active);

  return (
    <section
      id="about"
      ref={ref}
      className="border-y border-border bg-charcoal/30 py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title={transferableCopy.headline} />
        <div className="mt-8 max-w-3xl space-y-3 text-muted">
          {transferableCopy.paragraphs.map((p) => (
            <p key={p} className="text-sm leading-relaxed sm:text-base">
              {p}
            </p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mt-12 grid gap-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {transferablePhases.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(p.id)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-wider transition-colors min-[430px]:text-[11px] lg:w-full lg:shrink",
                  active === p.id
                    ? "border-accent/50 bg-accent-muted text-foreground"
                    : "border-border text-muted hover:text-foreground",
                )}
              >
                {p.title}
              </button>
            ))}
          </div>
          <div className="lg:col-span-8">
            {phase ? (
              <div className="rounded-xl border border-border p-5 sm:p-8">
                <h3 className="text-xl font-medium">{phase.title}</h3>
                <ul className="mt-6 space-y-3">
                  {phase.items.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-muted"
                    >
                      <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                      {item}
                      {i < phase.items.length - 1 ? (
                        <span className="ml-auto hidden text-border lg:inline">↓</span>
                      ) : null}
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
