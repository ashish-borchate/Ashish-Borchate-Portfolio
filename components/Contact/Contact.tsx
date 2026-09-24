import { contactSection } from "@/data/contact";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SectionHeading
          title={contactSection.headline}
          subtitle={contactSection.subline}
          className="mx-auto text-center"
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <MagneticButton href={profile.links.emailHref} variant="primary">
            Email Me
          </MagneticButton>
          <MagneticButton href={profile.links.linkedInHref} variant="ghost" external>
            LinkedIn
          </MagneticButton>
          <MagneticButton href={profile.assets.resumePdf} variant="ghost" external>
            Download Resume
          </MagneticButton>
        </div>
        <p className="mt-6 text-xs text-muted">
          Contact URLs: {profile.links.email} · {profile.links.linkedIn}
        </p>
      </div>
    </section>
  );
}
