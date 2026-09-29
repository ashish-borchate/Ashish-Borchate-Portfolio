"use client";

import { transferableCopy, transferablePhases } from "@/data/transferableSkills";
import { DomainExperienceBlock } from "@/components/DomainExperience/DomainExperience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bodyCopy, frameworkStageLabel, monoLabelAccent } from "@/lib/typography";
import { cn } from "@/lib/utils";

const inputName = "transferable-skill";

export function TransferableSkills() {
  return (
    <section
      id="expertise"
      className="scroll-mt-20 border-y border-border bg-charcoal/30 py-16 sm:scroll-mt-24 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title={transferableCopy.headline}
          className="max-w-none"
          titleClassName="max-md:text-balance md:whitespace-nowrap"
        />
        <p className={cn("mt-4 max-w-3xl", bodyCopy)}>{transferableCopy.intro}</p>
        <p className={cn("mt-3 max-w-3xl", bodyCopy)}>{transferableCopy.principles}</p>

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
            className="skill-framework-rail"
            aria-hidden
          >
            {transferablePhases.map((p, index) => (
              <span key={p.id} className="contents">
                <span
                  className={cn(
                    "skill-framework-node",
                    `skill-framework-node-${p.id}`,
                  )}
                >
                  {p.title}
                </span>
                {index < transferablePhases.length - 1 ? (
                  <span className="skill-framework-connector" />
                ) : null}
              </span>
            ))}
          </div>

          <div
            className="grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8"
            role="tablist"
            aria-label="Transferable capabilities"
          >
            <div className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex lg:flex-col lg:justify-between lg:gap-5 lg:overflow-visible lg:pb-0 lg:py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {transferablePhases.map((p) => (
                <label
                  key={p.id}
                  htmlFor={`skill-${p.id}`}
                  id={`tab-${p.id}`}
                  className={cn(
                    "skill-tab-label flex min-h-11 shrink-0 cursor-pointer items-center justify-center rounded-full border px-4 py-2.5 text-center min-[430px]:px-5 lg:min-h-0 lg:flex-1 lg:w-full lg:shrink",
                    frameworkStageLabel,
                    "border-border text-muted transition-[color,border-color,background-color] duration-300 hover:border-border-hover hover:text-secondary",
                  )}
                >
                  {p.title}
                </label>
              ))}
            </div>

            <div className="min-w-0 lg:col-span-8">
              {transferablePhases.map((p) => (
                <div
                  key={p.id}
                  id={`panel-${p.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${p.id}`}
                  className={cn(
                    "skill-tab-panel min-h-[16rem] rounded-xl border border-border bg-surface/30 p-5 sm:min-h-[18rem] sm:p-8",
                    `skill-tab-panel-${p.id}`,
                  )}
                >
                  <p className={monoLabelAccent}>{p.number}</p>
                  <h3 className="skill-panel-title mt-2 text-lg font-medium tracking-tight text-primary sm:text-xl">
                    {p.title}
                  </h3>
                  <ul className="mt-5 space-y-2.5 sm:mt-6">
                    {p.items.map((item) => (
                      <li
                        key={item}
                        className={cn("border-l border-border pl-3", bodyCopy)}
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

        <DomainExperienceBlock />
      </div>
    </section>
  );
}
