"use client";

import { marqueeCompanies } from "@/data/companiesMarquee";
import { usePrefersReducedMotion } from "@/lib/motion";
import { monoLabelAccent } from "@/lib/typography";
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
        "company-marquee-item group flex shrink-0 items-center justify-center rounded-xl border bg-surface/25 px-3 py-3 transition-[border-color,background-color,opacity,box-shadow] duration-200 sm:px-3.5 sm:py-3.5",
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
      <span className="flex h-10 w-full items-center justify-center sm:h-11 md:h-12" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={company.logo}
          alt=""
          className={cn(
            "max-h-8 w-auto max-w-[6.5rem] object-contain object-center transition-[opacity,filter] duration-200 sm:max-h-9 sm:max-w-[7.5rem] md:max-h-10 md:max-w-[8.5rem]",
            isActive ? "opacity-100" : "opacity-65",
            company.id === "cinepolis" && "brightness-0 invert",
            company.id === "cinepolis" && (isActive ? "opacity-95" : "opacity-75"),
          )}
        />
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
      className="border-y border-border bg-charcoal/20 py-10 sm:py-16 md:py-20"
      aria-label="Companies I've worked with"
      onMouseLeave={clearActive}
    >
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className={monoLabelAccent}>COMPANIES I&apos;VE WORKED WITH</h2>
      </div>

      <div className="mx-auto mt-6 w-full min-w-0 max-w-6xl sm:mt-10">
        {reducedMotion ? (
          <ul className="grid grid-cols-2 gap-2.5 px-4 min-[480px]:grid-cols-3 min-[480px]:gap-3 sm:px-6 lg:grid-cols-5">
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
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="company-marquee-viewport">
            <div
              className={cn(
                "company-marquee-track flex w-max gap-3 sm:gap-4",
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
          </div>
        )}
      </div>
    </section>
  );
}
