import { domainAreas } from "@/data/domainExperience";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function DomainExperience() {
  return (
    <section id="domain" className="border-t border-border py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="DOMAIN EXPERIENCE"
          subtitle="Web3 and crypto product areas — a domain layer, not the whole story."
        />
        <ul className="mt-8 grid gap-2.5 sm:mt-12 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
          {domainAreas.map((area) => (
            <li
              key={area}
              className="rounded-lg border border-border/80 bg-surface/20 px-4 py-3 text-sm text-muted transition-colors hover:border-accent/25 hover:text-foreground"
            >
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
