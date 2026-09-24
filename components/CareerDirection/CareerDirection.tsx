import { careerDirection } from "@/data/careerDirection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CareerDirection() {
  return (
    <section className="border-y border-border bg-surface/20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading title={careerDirection.headline} />
        <p className="mt-6 max-w-3xl text-muted">{careerDirection.copy}</p>
        <ul className="mt-10 flex flex-wrap gap-2">
          {careerDirection.roles.map((role) => (
            <li
              key={role}
              className="rounded-full border border-border px-4 py-2 text-xs text-foreground"
            >
              {role}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          Open to Web3 and non-Web3 teams where operations and product stay
          connected.
        </p>
      </div>
    </section>
  );
}
