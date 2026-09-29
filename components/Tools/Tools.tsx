import { toolsIntro, toolsList } from "@/data/tools";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Tools() {
  return (
    <section
      id="tools"
      className="scroll-mt-20 py-16 sm:scroll-mt-24 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="TOOLS I'VE WORKED WITH"
          subtitle={toolsIntro}
        />
        <ul className="mt-10 flex flex-wrap gap-2 sm:mt-12">
          {toolsList.map((name) => (
            <li key={name}>
              <span className="inline-flex min-h-10 items-center rounded-full border border-border bg-surface/40 px-4 py-2.5 text-xs font-medium text-muted transition-[border-color,color] duration-200 hover:border-accent/25 hover:text-foreground">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
