"use client";

import { impactMetrics } from "@/data/metrics";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

function MetricCard({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.2, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, value]);

  useEffect(() => {
    if (!started || reduced) {
      setDisplay(value);
      return;
    }
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    const prefix = value.match(/^[^\d]*/)?.[0] ?? "";
    const suffix = value.match(/[^\d.]*$/)?.[0] ?? "";
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(
        `${prefix}${(numeric * eased).toFixed(value.includes(".") ? 1 : 0)}${suffix}`,
      );
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, reduced, value]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      className="rounded-xl border border-border bg-surface/50 p-4 sm:p-6"
    >
      <p className="font-mono text-2xl font-medium tracking-tight text-foreground min-[430px]:text-3xl sm:text-4xl">
        {display}
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
      {note ? (
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted/70">
          {note}
        </p>
      ) : null}
    </motion.div>
  );
}

export function Metrics() {
  return (
    <section id="impact" className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Impact"
          title="Evidence, not exaggeration."
          subtitle="Highlights drawn from verified support operations work."
        />
        <div className="mt-8 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {impactMetrics.map((m) => (
            <MetricCard key={m.id} value={m.value} label={m.label} note={m.note} />
          ))}
        </div>
      </div>
    </section>
  );
}
