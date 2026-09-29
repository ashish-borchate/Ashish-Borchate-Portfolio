import { monoCta } from "@/lib/typography";
import { cn } from "@/lib/utils";

/** Outline CTA used in hero and contact — glass accent pill. */
export const outlineCtaClassName = cn(
  monoCta,
  "inline-flex min-h-11 w-full min-w-0 items-center justify-center rounded-full border border-border-hover bg-accent-muted px-6 py-3 tracking-[0.14em] transition-[border-color,background-color,color,transform,opacity] duration-200 hover:border-accent/45 hover:bg-accent/15 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.99] sm:w-auto",
);

export const outlineBadgeClassName = cn(
  monoCta,
  "inline-flex min-h-9 cursor-default items-center rounded-full border border-border-hover bg-accent-muted px-3 py-1.5 text-[10px] tracking-[0.14em] transition-[border-color,background-color,color,transform,opacity] duration-200 hover:border-accent/45 hover:bg-accent/15 min-[390px]:text-[11px] sm:px-3.5",
);

export function outlineCtaClass(className?: string) {
  return cn(outlineCtaClassName, className);
}
