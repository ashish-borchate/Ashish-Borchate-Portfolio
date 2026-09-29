"use client";

import type { Testimonial } from "@/data/testimonials";
import { TestimonialPortrait } from "@/components/Testimonial/TestimonialPortrait";
import { easeOut, usePrefersReducedMotion } from "@/lib/motion";
import {
  bodyCopy,
  bodyCopySecondary,
  monoCtaRow,
  monoLabel,
  monoLabelAccent,
  monoLabelMuted,
} from "@/lib/typography";
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

const expandEase = "cubic-bezier(0.22, 1, 0.36, 1)";

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

  const panelDuration = reduced ? "150ms" : "550ms";

  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={motionTransition}
      className={cn(
        "min-w-0 list-none transition-[opacity,transform] duration-500 ease-out",
        isOpen && "md:col-span-2",
        isOpen && layoutIndex % 2 === 1 && "md:col-start-1",
        layoutIndex % 2 === 1 && !isOpen && "md:translate-y-3 lg:translate-y-4",
        isDimmed && !reduced && "opacity-55 md:scale-[0.995]",
        isDimmed && reduced && "opacity-50",
      )}
    >
      <article
        className={cn(
          "group/cta group relative overflow-hidden rounded-xl border bg-surface/25 transition-[border-color,box-shadow,background-color] duration-500 ease-out",
          isOpen
            ? "border-border-hover shadow-[0_0_0_1px_rgba(107,140,255,0.12),0_24px_48px_rgba(0,0,0,0.35)]"
            : "border-border hover:border-border-hover",
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
          <div className="p-4 sm:p-5 md:p-5">
            <motion.div
              layout={!reduced}
              className={cn(
                "flex min-w-0 gap-4",
                isOpen ? "items-center" : "items-start",
              )}
              transition={
                reduced
                  ? { duration: 0.15 }
                  : { duration: 0.55, ease: easeOut }
              }
            >
              <TestimonialPortrait
                name={testimonial.name}
                photo={testimonial.photo}
                active={isOpen}
                className="h-[4.25rem] w-[4.25rem] shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]"
              />

              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    "flex justify-between gap-3 transition-[align-items] ease-out",
                    isOpen ? "items-center" : "items-start",
                  )}
                  style={{
                    transitionDuration: panelDuration,
                    transitionTimingFunction: expandEase,
                  }}
                >
                  <div className="min-w-0">
                    <p className={cn(monoLabel, "text-primary sm:text-[11px]")}>
                      {testimonial.name}
                    </p>
                    <p
                      className={cn(
                        bodyCopy,
                        "transition-[margin] ease-out",
                        isOpen ? "mt-0.5" : "mt-1",
                      )}
                      style={{
                        transitionDuration: panelDuration,
                        transitionTimingFunction: expandEase,
                      }}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={testimonial.logo}
                    alt={`${testimonial.company} logo`}
                    className={cn(
                      "h-7 w-auto max-w-[5rem] shrink-0 object-contain opacity-95 transition-[opacity,margin] duration-300 group-hover:opacity-100",
                      isOpen ? "mt-0" : "mt-0.5",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] ease-out",
                    isOpen ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100",
                  )}
                  style={{
                    transitionDuration: panelDuration,
                    transitionTimingFunction: expandEase,
                  }}
                  aria-hidden={isOpen}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className={cn("mt-3", bodyCopySecondary)}>
                      &ldquo;{testimonial.previewQuote}&rdquo;
                    </p>
                    <p className={cn("mt-4", monoCtaRow)}>
                      {hoverCapable ? "READ FULL FEEDBACK →" : "TAP TO READ FULL FEEDBACK →"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </button>

        <div
          id={panelId}
          className={cn(
            "grid transition-[grid-template-rows] ease-out",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
          style={{
            transitionDuration: panelDuration,
            transitionTimingFunction: expandEase,
          }}
          aria-hidden={!isOpen}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={cn(
                "border-t border-border px-4 pb-5 pt-4 transition-opacity ease-out sm:px-5 sm:pb-6 sm:pt-5",
                isOpen ? "opacity-100 delay-75" : "opacity-0",
              )}
              style={{
                transitionDuration: reduced ? "150ms" : "400ms",
                transitionTimingFunction: expandEase,
              }}
            >
              <p className={monoLabelAccent}>How we worked together</p>
              <p className={cn("mt-2", bodyCopySecondary)}>
                {testimonial.workingTogether}
                <span className="text-muted"> — </span>
                {testimonial.relationship}
              </p>

              <div className="my-5 border-t border-border" aria-hidden />

              <p className={monoLabelMuted}>Full feedback</p>
              <div className={cn("mt-3 space-y-3", bodyCopySecondary)}>
                {testimonial.fullQuote.split(/\n\n+/).map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>

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

              <div className="my-5 border-t border-border" aria-hidden />

              <button
                type="button"
                onClick={onToggle}
                className={monoCtaRow}
              >
                COLLAPSE ↑
              </button>
            </div>
          </div>
        </div>
      </article>
    </motion.li>
  );
}
