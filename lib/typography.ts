import { cn } from "@/lib/utils";

/** Mono section labels (CONTEXT, EXPERIENCE, etc.) — quiet, tracked. */
export const monoLabel =
  "font-mono text-[11px] font-normal uppercase tracking-[0.14em] leading-snug";

export const monoLabelAccent = cn(monoLabel, "text-accent");

export const monoLabelMuted = cn(monoLabel, "text-muted");

/** Interactive mono CTAs — slightly stronger than labels. */
export const monoCta =
  "font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-accent transition-[color,transform,opacity] duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const monoCtaRow = cn(
  monoCta,
  "inline-flex min-h-10 items-center group-hover/cta:translate-x-0.5",
);

export const monoCtaBlock = cn(
  monoCta,
  "flex min-h-10 w-full items-center group-hover/cta:translate-x-0.5",
);

/** Major section titles (Career evolution, Case studies, …). */
export const sectionTitle =
  "text-balance text-2xl font-medium tracking-tight text-primary leading-[1.1] min-[430px]:text-3xl sm:text-4xl md:text-5xl";

export const sectionSubtitle =
  "mt-4 text-pretty text-base leading-[1.65] text-muted sm:text-lg";

export const bodyCopy =
  "text-pretty text-sm leading-[1.65] text-muted sm:text-base";

export const bodyCopySecondary =
  "text-pretty text-sm leading-[1.65] text-secondary sm:text-base";

export const roleTitle = "text-sm text-secondary sm:text-base";

export const dateMeta = "text-sm text-subtle";

export const companyNameDisplay =
  "font-medium tracking-tight text-accent";

export const editorialTitle =
  "text-base font-medium tracking-tight text-primary sm:text-lg";
