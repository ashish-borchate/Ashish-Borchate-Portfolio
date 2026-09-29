import {
  monoLabelMuted,
  sectionSubtitle,
  sectionTitle,
} from "@/lib/typography";
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
        <p className={cn("mb-3", monoLabelMuted)}>{eyebrow}</p>
      ) : null}
      <h2 id={id} className={cn(sectionTitle, titleClassName)}>
        {title}
      </h2>
      {subtitle ? (
        <p className={sectionSubtitle}>{subtitle}</p>
      ) : null}
    </div>
  );
}
