"use client";

import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/Testimonial/TestimonialCard";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function TestimonialWall() {
  const [activeId, setActiveId] = useState<string | null>(testimonials[0]?.id ?? null);
  const active = testimonials.find((t) => t.id === activeId) ?? testimonials[0];

  return (
    <section id="testimonials" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title="WHAT PEOPLE I'VE WORKED WITH SAY" />
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <ul className="flex flex-wrap gap-2 lg:col-span-4 lg:flex-col">
            {testimonials.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(t.id)}
                  className={cn(
                    "w-full rounded-lg border px-4 py-3 text-left transition-colors",
                    activeId === t.id
                      ? "border-accent/40 bg-accent-muted"
                      : "border-border bg-surface/30 hover:border-accent/25",
                  )}
                >
                  <p className="text-sm font-medium">{t.role}</p>
                  <p className="text-xs text-muted">{t.company}</p>
                </button>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-8">
            {active ? <TestimonialCard testimonial={active} /> : null}
          </div>
        </div>

        <div className="mt-20">
          <SectionHeading title="PEOPLE I'VE WORKED WITH" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {testimonials.map((t) => (
              <button
                key={`wall-${t.id}`}
                type="button"
                onClick={() => setActiveId(t.id)}
                className="rounded-lg border border-border px-4 py-4 text-left hover:border-accent/30"
              >
                <p className="text-sm font-medium">{t.role}</p>
                <p className="text-muted">{t.company}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
