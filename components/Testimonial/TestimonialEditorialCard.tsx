"use client";

import type { Testimonial } from "@/data/testimonials";
import { TestimonialPortrait } from "@/components/Testimonial/TestimonialPortrait";
import { easeOut, usePrefersReducedMotion } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useId } from "react";

type TestimonialEditorialCardProps = {
  testimonial: Testimonial;
  isOpen: boolean;
  isDimmed: boolean;
  onToggle: () => void;
  layoutIndex: number;
  revealDelay?: number;
};

export function TestimonialEditorialCard({
  testimonial,
  isOpen,
  isDimmed,
  onToggle,
  layoutIndex,
  revealDelay = 0,
}: TestimonialEditorialCardProps) {
  const reduced = usePrefersReducedMotion();
  const hoverCapable = useMediaQuery("(hover: hover) and (pointer: fine)");
  const panelId = useId();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onToggle();
      }
    },
    [onToggle],
  );

  const motionTransition = reduced
    ? { duration: 0.15, delay: revealDelay }
    : { duration: 0.45, ease: easeOut, delay: revealDelay };

  const expandTransition = reduced
    ? { duration: 0.15 }
    : { duration: 0.45, ease: easeOut };

  return (
    <motion.li
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={motionTransition}
      className={cn(
        "min-w-0 list-none",
        isOpen && "md:col-span-2",
        layoutIndex % 2 === 1 && !isOpen && "md:translate-y-3 lg:translate-y-4",
      )}
    >
      <article
        className={cn(
          "group relative overflow-hidden rounded-xl border bg-surface/25 transition-[border-color,box-shadow,opacity,transform,filter] duration-300",
          isOpen
            ? "border-accent/35 shadow-[0_0_0_1px_rgba(91,141,239,0.12),0_24px_48px_rgba(0,0,0,0.35)]"
            : "border-border/80 hover:border-accent/25",
          isDimmed && !reduced && "scale-[0.98] opacity-45 blur-[0.5px] md:scale-[0.97]",
          isDimmed && reduced && "opacity-50",
          !isOpen &&
            hoverCapable &&
            "hover:-translate-y-0.5 hover:bg-surface/35 hover:shadow-[0_12px_32px_rgba(0,0,0,0.22)]",
        )}
      >
        <button
          type="button"
          className="flex w-full min-w-0 flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          onKeyDown={handleKeyDown}
        >
          <div className="flex gap-4 p-4 sm:p-5 md:p-5">
            <TestimonialPortrait
              name={testimonial.name}
              photo={testimonial.photo}
              active={isOpen}
              className="h-[4.25rem] w-[4.25rem] sm:h-[4.5rem] sm:w-[4.5rem]"
            />

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-foreground sm:text-xs">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-pretty text-sm text-muted">
                    {testimonial.role}
                    <span className="text-muted/70"> · </span>
                    {testimonial.company}
                  </p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={testimonial.logo}
                  alt=""
                  className="mt-0.5 h-6 w-auto max-w-[4.5rem] object-contain opacity-55 grayscale transition-opacity duration-300 group-hover:opacity-75"
                />
              </div>

              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-accent/85 sm:text-[10px]">
                {testimonial.contextLine}
              </p>

              {!isOpen ? (
                <>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/90 sm:text-[0.9375rem]">
                    &ldquo;{testimonial.previewQuote}&rdquo;
                  </p>
                  <p className="mt-4 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-accent transition-transform duration-200 group-hover:translate-x-0.5 sm:text-[11px]">
                    {hoverCapable ? "READ FULL FEEDBACK →" : "TAP TO READ FULL FEEDBACK →"}
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </button>

        <motion.div
          id={panelId}
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={expandTransition}
          className="overflow-hidden"
          aria-hidden={!isOpen}
        >
          <div className="border-t border-border/80 px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              How we worked together
            </p>
            <p className="mt-2 text-sm text-foreground">{testimonial.workingTogether}</p>
            <p className="mt-1 text-pretty text-xs leading-relaxed text-muted">
              {testimonial.relationship}
            </p>

            <div className="my-5 border-t border-border/80" aria-hidden />

            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Full feedback
            </p>
            {testimonial.quoteStatus === "sample" ? (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted/80">
                Placeholder copy — replace in data/testimonials.ts
              </p>
            ) : null}
            <blockquote className="mt-3 text-pretty text-sm leading-relaxed text-foreground sm:text-base">
              &ldquo;{testimonial.fullQuote}&rdquo;
            </blockquote>

            {testimonial.profileUrl ? (
              <a
                href={testimonial.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-xs text-accent underline-offset-4 hover:underline"
                onClick={(event) => event.stopPropagation()}
              >
                LinkedIn profile
              </a>
            ) : null}

            <div className="my-5 border-t border-border/80" aria-hidden />

            <button
              type="button"
              onClick={onToggle}
              className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-accent transition-colors hover:text-[#6b99f2] sm:text-[11px]"
            >
              Collapse ↑
            </button>
          </div>
        </motion.div>
      </article>
    </motion.li>
  );
}
