import { cn } from "@/lib/utils";

/** Outline CTA used in hero and contact — glass accent pill. */
export const outlineCtaClassName =
  "inline-flex min-h-11 w-full min-w-0 items-center justify-center rounded-full border border-accent/35 bg-accent/10 px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent transition-[border-color,background-color,color,transform] duration-200 hover:border-accent/50 hover:bg-accent/15 hover:text-[#6b99f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.99] sm:w-auto";

export const outlineBadgeClassName =
  "inline-flex min-h-9 cursor-default items-center rounded-full border border-accent/35 bg-accent/10 px-3 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-accent transition-[border-color,background-color,color,transform] duration-200 hover:border-accent/50 hover:bg-accent/15 hover:text-[#6b99f2] min-[390px]:text-[10px] sm:px-3.5";

export function outlineCtaClass(className?: string) {
  return cn(outlineCtaClassName, className);
}
