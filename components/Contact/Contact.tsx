import { contactSection } from "@/data/contact";
import { profile } from "@/data/profile";
import {
  EmailIcon,
  LinkedInIcon,
  ResumeIcon,
  TelegramIcon,
} from "@/components/ui/ContactLinkIcons";
import { outlineCtaClassName } from "@/lib/outlineCta";
import { bodyCopySecondary } from "@/lib/typography";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import Link from "next/link";

const contactCtaClassName = cn(outlineCtaClassName, "gap-2");

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
        <p className={cn("mx-auto mt-6 max-w-xl", bodyCopySecondary)}>
          {contactSection.subline}
        </p>
        <div className="mx-auto mt-8 flex w-full max-w-none flex-col gap-2 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
          <a href={profile.links.emailHref} className={contactCtaClassName}>
            <EmailIcon />
            Email
          </a>
          <Link
            href={profile.links.telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            className={contactCtaClassName}
            aria-label={`Telegram ${profile.links.telegram}`}
          >
            <TelegramIcon />
            Telegram
          </Link>
          <Link
            href={profile.links.linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
            className={contactCtaClassName}
          >
            <LinkedInIcon />
            LinkedIn
          </Link>
          <Link
            href={profile.assets.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className={contactCtaClassName}
          >
            <ResumeIcon />
            Resume
          </Link>
        </div>
      </div>
    </section>
  );
}
