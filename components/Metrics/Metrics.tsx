"use client";

import { impactMetrics } from "@/data/metrics";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";

function metricDisplayParts(value: string) {
  const range = value.match(/^(\d[\d.]*)\s*[–-]\s*(\d[\d.]*)$/);
  if (range) {
    return { primary: `${range[1]}–${range[2]}`, animatable: false as const };
  }
  const hours = value.match(/^(\d+)\s*hr$/i);
  if (hours) {
    return {
      primary: `${hours[1]} hr`,
      animatable: true as const,
      numeric: Number(hours[1]),
      suffix: " hr",
      decimals: 0,
    };
  }
  const plus = value.match(/^(\d+)\+$/);
  if (plus) {
    return {
      primary: value,
      animatable: true as const,
      numeric: Number(plus[1]),
      suffix: "+",
      decimals: 0,
    };
  }
  const pct = value.match(/^(\d+(?:\.\d+)?)%$/);
  if (pct) {
    return {
      primary: value,
      animatable: true as const,
      numeric: Number(pct[1]),
      suffix: "%",
      decimals: value.includes(".") ? 1 : 0,
    };
  }
  return { primary: value, animatable: false as const };
}

function MetricCard({
  metricId,
  value,
  label,
  note,
}: {
  metricId: string;
  value: string;
  label: string;
  note?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const finalText = metricDisplayParts(value).primary;
  const [display, setDisplay] = useState(finalText);
  const hasAnimated = useRef(false);

  useEffect(() => {
    hasAnimated.current = false;
    setDisplay(finalText);
  }, [metricId, value, finalText]);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) {
      setDisplay(finalText);
      return;
    }

    const parts = metricDisplayParts(value);
    if (!parts.animatable || parts.numeric === undefined) {
      setDisplay(finalText);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const { numeric, suffix = "", decimals = 0 } = parts as {
          numeric: number;
          suffix?: string;
          decimals?: number;
        };
        const duration = 1400;
        const start = performance.now();
        let frame = 0;

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          if (t >= 1) {
            setDisplay(finalText);
            return;
          }
          setDisplay(`${(numeric * eased).toFixed(decimals)}${suffix}`);
          frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { root: null, threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [metricId, value, finalText, reduced]);

  return (
    <div
      ref={ref}
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
    </div>
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
            <MetricCard
              key={m.id}
              metricId={m.id}
              value={m.value}
              label={m.label}
              note={m.note}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
