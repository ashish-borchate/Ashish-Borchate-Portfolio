import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  titleClassName,
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-balance text-2xl font-medium tracking-tight text-foreground min-[430px]:text-3xl sm:text-4xl md:text-5xl",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-pretty text-base text-muted sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
