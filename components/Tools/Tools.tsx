"use client";

import { toolCategories } from "@/data/tools";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Tools() {
  return (
    <section id="tools" className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="TOOLS I'VE WORKED WITH"
          subtitle="Hands-on operational experience — not a keyword list."
        />
        <div className="mt-12 space-y-10">
          {toolCategories.map((cat) => (
            <div key={cat.id}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {cat.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.tools.map((tool) => (
                  <span
                    key={tool.id}
                    className="inline-flex min-h-10 items-center rounded-full border border-border bg-surface/40 px-4 py-2.5 text-xs font-medium text-muted"
                  >
                    {tool.name}
                    {!tool.verified ? (
                      <span className="ml-1 text-[10px] text-muted/70">*</span>
                    ) : null}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
