import { careerDirection } from "@/data/careerDirection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CareerDirection() {
  return (
    <section className="border-y border-border bg-surface/20 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title={careerDirection.headline}
          className="max-w-none"
          titleClassName="whitespace-nowrap text-[clamp(1.15rem,3.8vw,3rem)] tracking-tight"
        />
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-accent sm:text-[11px]">
          {careerDirection.coreAreasLabel}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2.5 sm:gap-3">
          {careerDirection.coreAreas.map((area) => (
            <li key={area.label}>
              <span className="inline-flex min-h-10 items-center rounded-lg border border-border/80 bg-surface/20 px-4 py-3 text-sm text-foreground transition-colors hover:border-accent/25 hover:text-foreground">
                {area.label}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {careerDirection.intro}
        </p>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {careerDirection.closing}
        </p>
      </div>
    </section>
  );
}
