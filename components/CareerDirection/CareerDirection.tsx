import { careerDirection } from "@/data/careerDirection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CareerDirection() {
  return (
    <section className="border-y border-border bg-surface/20 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title={careerDirection.headline} />
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {careerDirection.intro}
        </p>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]">
          {careerDirection.coreAreasLabel}
        </p>
        <ul className="mt-4 max-w-xl space-y-2 text-sm text-foreground/90 sm:text-base">
          {careerDirection.coreAreas.map((area) => (
            <li key={area} className="border-l border-border pl-3">
              {area}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {careerDirection.closing}
        </p>
      </div>
    </section>
  );
}
