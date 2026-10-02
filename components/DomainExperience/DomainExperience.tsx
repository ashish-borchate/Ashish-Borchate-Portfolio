import { domainAreas } from "@/data/domainExperience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type DomainExperienceBlockProps = {
  embedded?: boolean;
};

/** Domain experience tiles — paired with Tools I Use in the expertise section. */
export function DomainExperienceBlock({ embedded }: DomainExperienceBlockProps) {
  return (
    <div className={embedded ? undefined : "mt-14 sm:mt-16 md:mt-20"} id={embedded ? undefined : "domain"}>
      <SectionHeading
        title="Domain experience"
        subtitle="Web3 and crypto product areas I've worked across."
      />
      <ul className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-2 sm:mt-10 sm:max-w-none sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
        {domainAreas.map((area) => (
          <li
            key={area}
            className={cn(
              "flex min-h-[3.1rem] items-center justify-center rounded-full border border-border bg-surface/20 px-3 py-2.5 text-center text-[11px] leading-snug text-secondary transition-colors hover:border-border-hover min-[390px]:text-xs sm:min-h-[3.5rem] sm:px-4 sm:text-sm",
            )}
          >
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
}
