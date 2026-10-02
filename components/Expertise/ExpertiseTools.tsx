import { DomainExperienceBlock } from "@/components/DomainExperience/DomainExperience";
import { toolsSection, toolsList } from "@/data/tools";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionScrollClassName } from "@/lib/sectionLayout";

export function ExpertiseTools() {
  return (
    <section
      id="expertise"
      className={`${sectionScrollClassName} py-16 sm:py-24 md:py-32`}
      aria-label="Domain experience and tools"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <DomainExperienceBlock embedded />
        <div className="mt-14 sm:mt-16 md:mt-20">
          <SectionHeading title={toolsSection.title} subtitle={toolsSection.intro} />
          <ul className="mt-10 flex flex-wrap gap-2 sm:mt-12">
            {toolsList.map((name) => (
              <li key={name}>
                <span className="inline-flex min-h-10 items-center rounded-full border border-border bg-surface/40 px-4 py-2.5 text-xs font-medium text-muted transition-[border-color,color] duration-200 hover:border-border-hover hover:text-secondary">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
