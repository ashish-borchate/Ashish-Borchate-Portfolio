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
    <section id="testimonials" className="border-t border-border py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title="WHAT PEOPLE I'VE WORKED WITH SAY" />
        <div className="mt-8 grid gap-6 md:mt-12 lg:grid-cols-12 lg:gap-8">
          <ul className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((t) => (
              <li key={t.id} className="shrink-0 lg:shrink">
                <button
                  type="button"
                  onClick={() => setActiveId(t.id)}
                  className={cn(
                    "min-h-11 w-[10.5rem] rounded-lg border px-4 py-3 text-left transition-colors sm:w-full",
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
          <div className="min-w-0 lg:col-span-8">
            {active ? <TestimonialCard testimonial={active} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
