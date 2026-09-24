"use client";

import { getFeaturedTestimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

export function TestimonialsSection() {
  const items = getFeaturedTestimonials();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="testimonials"
      ref={ref}
      className="border-y border-border py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Testimonials" title="People I've worked with" />

        <div className="mt-10 space-y-8 sm:mt-12 sm:space-y-10">
          {items.map((item, index) => (
            <motion.figure
              key={item.id}
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={inView && !reduced ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="border-t border-border pt-8 first:border-t-0 first:pt-0 sm:pt-10"
            >
              <blockquote className="text-pretty text-lg font-medium leading-snug tracking-tight text-foreground min-[430px]:text-xl sm:text-2xl">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5 flex flex-col gap-1 sm:mt-6">
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted">
                  {item.role}, {item.company}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
