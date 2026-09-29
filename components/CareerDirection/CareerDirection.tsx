import { careerDirection } from "@/data/careerDirection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bodyCopy, monoLabelAccent } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function CareerDirection() {
  return (
    <section className="border-y border-border bg-surface/20 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title={careerDirection.headline}
          className="max-w-none"
          titleClassName="whitespace-nowrap text-[clamp(1.15rem,3.8vw,3rem)] tracking-tight"
        />
        <p className={cn("mt-8", monoLabelAccent)}>{careerDirection.coreAreasLabel}</p>
        <ul className="mt-4 flex flex-wrap gap-2.5 sm:gap-3">
          {careerDirection.coreAreas.map((area) => (
            <li key={area.label}>
              <span className="inline-flex min-h-10 items-center rounded-lg border border-border bg-surface/20 px-4 py-3 text-sm text-secondary transition-colors hover:border-border-hover hover:text-primary">
                {area.label}
              </span>
            </li>
          ))}
        </ul>
        <p className={cn("mt-8 max-w-3xl", bodyCopy)}>{careerDirection.intro}</p>
        <p className={cn("mt-6 max-w-3xl", bodyCopy)}>{careerDirection.closing}</p>
      </div>
    </section>
  );
}
