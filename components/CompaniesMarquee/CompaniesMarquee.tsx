"use client";

import { marqueeCompanies } from "@/data/companiesMarquee";
import { usePrefersReducedMotion } from "@/lib/motion";
import { monoLabelMuted } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

function CompanyMarqueeItem({
  company,
  isActive,
  isDimmed,
  onHover,
  onToggle,
  compact,
}: {
  company: (typeof marqueeCompanies)[number];
  isActive: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onToggle: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "company-marquee-item group flex w-full min-w-0 items-center justify-center rounded-xl border bg-surface/25 px-2 py-3 transition-[border-color,background-color,opacity,box-shadow] duration-200 sm:px-3 sm:py-3.5",
        compact && "min-h-[3.75rem] !w-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? "border-border-hover bg-surface/45 shadow-[0_0_0_1px_rgba(107,140,255,0.12)]"
          : "border-border hover:border-border-hover",
        isDimmed && "opacity-40",
      )}
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onToggle}
      aria-pressed={isActive}
      aria-label={company.name}
    >
      <span className="flex h-10 w-full min-w-0 items-center justify-center sm:h-11 md:h-12" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={company.logo}
          alt=""
          className={cn(
            "max-h-full w-auto max-w-full object-contain object-center transition-[opacity,filter] duration-200",
            compact
              ? "max-h-8 max-w-[min(100%,6.75rem)] min-[400px]:max-w-[7.25rem]"
              : company.logoClassName,
            isActive ? "opacity-100" : "opacity-65",
            company.id === "cinepolis" && (isActive ? "opacity-95" : "opacity-75"),
          )}
        />
      </span>
    </button>
  );
}

function CompaniesGrid({
  activeKey,
  activate,
  toggle,
  compact,
  className,
}: {
  activeKey: string | null;
  activate: (key: string) => void;
  toggle: (key: string) => void;
  compact?: boolean;
  className?: string;
}) {
  return (
    <ul className={className}>
      {marqueeCompanies.map((company, index) => {
        const itemKey = `${company.id}-${index}`;
        return (
          <li key={itemKey} className="min-w-0">
            <CompanyMarqueeItem
              company={company}
              isActive={activeKey === itemKey}
              isDimmed={Boolean(activeKey && activeKey !== itemKey)}
              onHover={() => activate(itemKey)}
              onToggle={() => toggle(itemKey)}
              compact={compact}
            />
          </li>
        );
      })}
    </ul>
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
      className="border-y border-border bg-charcoal/20 py-10 sm:py-16 md:py-20"
      aria-label="Companies I've worked with"
      onMouseLeave={clearActive}
    >
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className={monoLabelMuted}>COMPANIES I&apos;VE WORKED WITH</h2>
      </div>

      <div className="relative mx-auto mt-6 min-w-0 max-w-6xl overflow-hidden px-4 sm:mt-10 sm:px-6">
        <CompaniesGrid
          activeKey={activeKey}
          activate={activate}
          toggle={toggle}
          compact
          className="grid grid-cols-2 gap-2.5 min-[400px]:gap-3 min-[520px]:grid-cols-3 md:hidden"
        />

        <div className="relative hidden md:block">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent sm:w-10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent sm:w-10"
            aria-hidden
          />

          {reducedMotion ? (
            <CompaniesGrid
              activeKey={activeKey}
              activate={activate}
              toggle={toggle}
              className="grid grid-cols-3 gap-4 lg:grid-cols-5"
            />
          ) : (
            <div
              className={cn(
                "company-marquee-track flex w-max gap-4",
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
      </div>
    </section>
  );
}
