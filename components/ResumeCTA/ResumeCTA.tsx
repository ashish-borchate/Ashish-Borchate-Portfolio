import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ResumeCTA() {
  return (
    <section id="resume" className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SectionHeading
          title="WANT THE FULL PICTURE?"
          subtitle="Download the complete resume."
          className="mx-auto text-center"
        />
        <div className="mt-10">
          <MagneticButton href={profile.assets.resumePdf} variant="primary" external>
            Download Resume
          </MagneticButton>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted">
            Place PDF at {profile.assets.resumePdf}
          </p>
        </div>
      </div>
    </section>
  );
}
