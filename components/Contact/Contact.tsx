import { contactSection } from "@/data/contact";
import { profile } from "@/data/profile";
import { outlineCtaClassName } from "@/lib/outlineCta";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 py-16 sm:scroll-mt-24 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SectionHeading
          title={contactSection.headline}
          className="mx-auto max-w-none text-center"
          titleClassName="whitespace-nowrap text-[clamp(1.2rem,4.2vw,3rem)] tracking-tight"
        />
        <div className="mx-auto mt-8 flex w-full max-w-[11.5rem] flex-col gap-2 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
          <Link href={profile.links.emailHref} className={outlineCtaClassName}>
            Email
          </Link>
          <Link
            href={profile.links.linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
            className={outlineCtaClassName}
          >
            LinkedIn
          </Link>
          <Link
            href={profile.assets.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className={outlineCtaClassName}
          >
            Resume
          </Link>
        </div>
      </div>
    </section>
  );
}
