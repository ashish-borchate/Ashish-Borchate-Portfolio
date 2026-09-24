"use client";

import { toolCategories } from "@/data/tools";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Tools() {
  const [hovered, setHovered] = useState<string | null>(null);
  const activeTool = toolCategories
    .flatMap((c) => c.tools)
    .find((t) => t.id === hovered);

  return (
    <section id="tools" className="py-24 sm:py-32">
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
                  <button
                    key={tool.id}
                    type="button"
                    onMouseEnter={() => setHovered(tool.id)}
                    onFocus={() => setHovered(tool.id)}
                    onMouseLeave={() => setHovered(null)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-medium transition-colors",
                      hovered === tool.id
                        ? "border-accent/40 bg-accent-muted text-foreground"
                        : "border-border bg-surface/40 text-muted hover:text-foreground",
                    )}
                  >
                    {tool.name}
                    {!tool.verified ? (
                      <span className="ml-1 text-[10px] text-muted/70">*</span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-8 min-h-[5rem] rounded-xl border border-border bg-surface/30 p-6"
          aria-live="polite"
        >
          {activeTool ? (
            <>
              <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                {activeTool.name}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {activeTool.uses.map((u) => (
                  <li
                    key={u}
                    className="rounded-md border border-border/80 px-2 py-1 text-xs text-muted"
                  >
                    {u}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-muted">
              Hover or focus a tool to see verified use cases. Items marked * await
              verification.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
