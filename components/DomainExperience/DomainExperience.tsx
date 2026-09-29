import { domainAreas } from "@/data/domainExperience";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Domain block nested under My Expertise (after skill tabs). */
export function DomainExperienceBlock() {
  return (
    <div
      id="domain"
      className="mt-14 sm:mt-16 md:mt-20"
    >
      <SectionHeading
        title="DOMAIN EXPERIENCE"
        subtitle="Web3 and crypto product areas — a domain layer, not the whole story."
      />
      <ul className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-2 sm:mt-10 sm:max-w-none sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
        {domainAreas.map((area) => (
          <li
            key={area}
            className="flex min-h-[3.1rem] items-center justify-center rounded-lg border border-border/80 bg-surface/20 px-2 py-2.5 text-center text-[11px] leading-snug text-foreground transition-colors hover:border-accent/25 min-[390px]:text-xs sm:min-h-[3.5rem] sm:px-3 sm:text-sm md:px-4"
          >
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
}
