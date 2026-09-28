"use client";

import { impactMetrics } from "@/data/metrics";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Metrics() {
  return (
    <section id="impact" className="py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Impact"
          title="Evidence, not exaggeration."
          subtitle="Highlights drawn from verified support operations work."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {impactMetrics.map((m) => (
            <div
              key={m.id}
              className="rounded-xl border border-border bg-surface/50 p-4 sm:p-6"
            >
              <p className="font-mono text-2xl font-medium tracking-tight text-accent min-[430px]:text-3xl sm:text-4xl">
                {m.value}
              </p>
              <p className="mt-2 text-sm text-foreground/90">{m.label}</p>
              {m.note ? (
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted/70">
                  {m.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
