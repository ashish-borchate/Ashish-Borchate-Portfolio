import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export function ResumeCTA() {
  return (
    <section id="resume" className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SectionHeading
          title="WANT THE FULL PICTURE?"
          subtitle="Download the complete resume."
          className="mx-auto text-center"
        />
        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <MagneticButton
            href={profile.assets.resumePdf}
            variant="primary"
            external
            className="w-full sm:w-auto"
          >
            Preview Resume
          </MagneticButton>
          <a
            href={profile.assets.resumePdf}
            download
            className={cn(
              "inline-flex min-h-11 w-full items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground sm:w-auto",
              "hover:border-accent/40 hover:bg-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            )}
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
