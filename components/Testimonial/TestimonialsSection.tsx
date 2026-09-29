"use client";

import { getFeaturedTestimonials, testimonialsSection } from "@/data/testimonials";
import { TestimonialEditorialCard } from "@/components/Testimonial/TestimonialEditorialCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { easeOut, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export function TestimonialsSection() {
  const items = getFeaturedTestimonials();
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  useEffect(() => {
    if (!openId) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        setOpenId(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openId]);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="scroll-mt-20 border-y border-border py-16 sm:scroll-mt-24 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <SectionHeading
            title={testimonialsSection.title}
            subtitle={testimonialsSection.subtitle}
          />
        </motion.div>

        <motion.ul
          layout={!reduced}
          className={cn(
            "mt-10 grid grid-cols-1 gap-4 sm:mt-12 lg:mt-14",
            !openId && "md:grid-cols-2 md:gap-5 lg:gap-6",
          )}
          transition={{ layout: { duration: reduced ? 0.1 : 0.45, ease: easeOut } }}
        >
          {items.map((item, index) => (
            <TestimonialEditorialCard
              key={item.id}
              testimonial={item}
              isOpen={openId === item.id}
              anyExpanded={openId !== null}
              onToggle={() => toggle(item.id)}
              layoutIndex={index}
              revealDelay={reduced ? 0 : index * 0.08}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
