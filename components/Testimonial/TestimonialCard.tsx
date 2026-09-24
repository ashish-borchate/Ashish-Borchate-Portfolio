import type { Testimonial } from "@/data/testimonials";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { cn } from "@/lib/utils";

type TestimonialCardProps = {
  testimonial: Testimonial;
  compact?: boolean;
  className?: string;
};

export function TestimonialCard({
  testimonial,
  compact,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "rounded-xl border border-border bg-surface/30 p-6",
        compact && "p-5",
        className,
      )}
    >
      <blockquote className="text-pretty text-sm leading-relaxed text-foreground sm:text-base">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="font-medium">{testimonial.name}</p>
          <p className="text-sm text-muted">
            {testimonial.role}, {testimonial.company}
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted">
            Worked together on: {testimonial.context}
          </p>
        </div>
        {testimonial.logo ? (
          <CompanyLogo
            src={testimonial.logo}
            alt=""
            label="[COMPANY LOGO]"
            className="shrink-0"
          />
        ) : null}
      </figcaption>
    </figure>
  );
}
