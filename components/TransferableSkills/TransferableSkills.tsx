"use client";

import { transferableCopy, transferablePhases } from "@/data/transferableSkills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const inputName = "transferable-skill";

export function TransferableSkills() {
  return (
    <section
      id="about"
      className="border-y border-border bg-charcoal/30 py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title={transferableCopy.headline} />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {transferableCopy.intro}
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {transferableCopy.principles}
        </p>

        <div className="transferable-tabs mt-10 sm:mt-12">
          {transferablePhases.map((p, index) => (
            <input
              key={p.id}
              type="radio"
              name={inputName}
              id={`skill-${p.id}`}
              defaultChecked={index === 0}
              className="sr-only"
            />
          ))}

          <div
            className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8"
            role="tablist"
            aria-label="Transferable capabilities"
          >
            <div className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col lg:items-stretch lg:overflow-visible lg:pb-0 lg:pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {transferablePhases.map((p) => (
                <label
                  key={p.id}
                  htmlFor={`skill-${p.id}`}
                  id={`tab-${p.id}`}
                  className={cn(
                    "skill-tab-label min-h-11 shrink-0 cursor-pointer rounded-full border px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-wider transition-colors min-[430px]:text-[11px] lg:w-full lg:shrink",
                    "border-border text-muted hover:border-accent/30 hover:text-foreground",
                  )}
                >
                  {p.title}
                </label>
              ))}
            </div>

            <div className="min-w-0 lg:col-span-8 lg:pt-1">
              {transferablePhases.map((p) => (
                <div
                  key={p.id}
                  id={`panel-${p.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${p.id}`}
                  className={cn(
                    "skill-tab-panel rounded-xl border border-border bg-surface/30 p-5 sm:p-8",
                    `skill-tab-panel-${p.id}`,
                  )}
                >
                  <p className="font-mono text-[10px] text-accent/90">{p.number}</p>
                  <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground sm:text-xl">
                    {p.title}
                  </h3>
                  <ul className="mt-5 space-y-2.5 sm:mt-6">
                    {p.items.map((item) => (
                      <li
                        key={item}
                        className="border-l border-border pl-3 text-sm leading-relaxed text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
