"use client";

import { impactMetrics } from "@/data/metrics";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/** Values like 80–100 or 4 hr should not run broken numeric animation. */
function metricDisplayParts(value: string) {
  const range = value.match(/^(\d[\d.]*)\s*[–-]\s*(\d[\d.]*)$/);
  if (range) {
    return { primary: `${range[1]}–${range[2]}`, animatable: false };
  }
  const hours = value.match(/^(\d+)\s*hr$/i);
  if (hours) {
    return { primary: hours[1], animatable: true, numeric: Number(hours[1]), suffix: "" };
  }
  const plus = value.match(/^(\d+)\+$/);
  if (plus) {
    return { primary: value, animatable: true, numeric: Number(plus[1]), suffix: "+" };
  }
  const pct = value.match(/^(\d+(?:\.\d+)?)%$/);
  if (pct) {
    return {
      primary: value,
      animatable: true,
      numeric: Number(pct[1]),
      suffix: "%",
      decimals: value.includes(".") ? 1 : 0,
    };
  }
  return { primary: value, animatable: false };
}

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
  const parts = metricDisplayParts(value);
  const [display, setDisplay] = useState(parts.primary);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) {
      setDisplay(parts.primary);
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
  }, [reduced, parts.primary]);

  useEffect(() => {
    if (!started || reduced || !parts.animatable || parts.numeric === undefined) {
      setDisplay(parts.primary);
      return;
    }
    const numeric = parts.numeric;
    const suffix = parts.suffix ?? "";
    const decimals = "decimals" in parts ? parts.decimals : 0;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(`${(numeric * eased).toFixed(decimals)}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, reduced, parts]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      className="rounded-xl border border-border bg-surface/50 p-4 sm:p-6"
    >
      <p className="font-mono text-2xl font-medium tracking-tight text-accent min-[430px]:text-3xl sm:text-4xl">
        {display}
      </p>
      <p className="mt-2 text-sm text-foreground/90">{label}</p>
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
    <section id="impact" className="py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Impact"
          title="Evidence, not exaggeration."
          subtitle="Highlights drawn from verified support operations work."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {impactMetrics.map((m) => (
            <MetricCard key={m.id} value={m.value} label={m.label} note={m.note} />
          ))}
        </div>
      </div>
    </section>
  );
}
