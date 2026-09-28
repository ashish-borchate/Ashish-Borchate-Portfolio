"use client";

import { marqueeCompanies } from "@/data/companiesMarquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

function CompanyMarqueeItem({
  company,
  isActive,
  isDimmed,
  onHover,
  onToggle,
}: {
  company: (typeof marqueeCompanies)[number];
  isActive: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "group flex shrink-0 items-center gap-3 rounded-xl border bg-surface/20 px-4 py-3 transition-[border-color,background-color,opacity,box-shadow] duration-200 sm:px-5 sm:py-3.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? "border-accent/45 bg-surface/45 shadow-[0_0_0_1px_rgba(91,141,239,0.12)]"
          : "border-border/80 hover:border-accent/30",
        isDimmed && "opacity-40",
      )}
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onToggle}
      aria-pressed={isActive}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={company.logo}
        alt=""
        className={cn(
          "h-7 w-auto max-w-[5.5rem] object-contain object-left transition-opacity duration-200 sm:h-8 sm:max-w-[6rem]",
          isActive ? "opacity-100" : "opacity-55 group-hover:opacity-80",
        )}
      />
      <span
        className={cn(
          "whitespace-nowrap text-sm font-medium transition-colors sm:text-[0.9375rem]",
          isActive ? "text-foreground" : "text-muted group-hover:text-foreground/90",
        )}
      >
        {company.name}
      </span>
    </button>
  );
}

export function CompaniesMarquee() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const loop = [...marqueeCompanies, ...marqueeCompanies];
  const paused = activeKey !== null;

  const clearActive = useCallback(() => setActiveKey(null), []);
  const activate = useCallback((key: string) => setActiveKey(key), []);
  const toggle = useCallback(
    (key: string) => setActiveKey((current) => (current === key ? null : key)),
    [],
  );

  useEffect(() => {
    if (!activeKey) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (sectionRef.current && !sectionRef.current.contains(target)) {
        clearActive();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [activeKey, clearActive]);

  return (
    <section
      id="companies"
      ref={sectionRef}
      className="border-y border-border/80 bg-charcoal/20 py-12 sm:py-16 md:py-20"
      aria-label="Companies I've worked with"
      onMouseLeave={clearActive}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title="COMPANIES I'VE WORKED WITH" className="max-w-none" />
      </div>

      <div className="relative mt-8 min-w-0 overflow-hidden sm:mt-10">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent sm:w-16"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:w-16"
          aria-hidden
        />

        {reducedMotion ? (
          <ul className="flex flex-wrap justify-center gap-3 px-4 sm:gap-4 sm:px-6">
            {marqueeCompanies.map((company, index) => {
              const itemKey = `${company.id}-${index}`;
              return (
                <li key={itemKey}>
                  <CompanyMarqueeItem
                    company={company}
                    isActive={activeKey === itemKey}
                    isDimmed={Boolean(activeKey && activeKey !== itemKey)}
                    onHover={() => activate(itemKey)}
                    onToggle={() => toggle(itemKey)}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div
            className={cn(
              "company-marquee-track flex w-max gap-3 px-4 sm:gap-4 sm:px-6",
              paused && "company-marquee-paused",
            )}
          >
            {loop.map((company, index) => {
              const itemKey = `${company.id}-${index}`;
              return (
                <CompanyMarqueeItem
                  key={itemKey}
                  company={company}
                  isActive={activeKey === itemKey}
                  isDimmed={Boolean(activeKey && activeKey !== itemKey)}
                  onHover={() => activate(itemKey)}
                  onToggle={() => toggle(itemKey)}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
