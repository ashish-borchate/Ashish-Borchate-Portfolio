import { contactSection } from "@/data/contact";
import { profile } from "@/data/profile";
import {
  EmailIcon,
  LinkedInIcon,
  ResumeIcon,
  TelegramIcon,
} from "@/components/ui/ContactLinkIcons";
import { sectionScrollClassName } from "@/lib/sectionLayout";
import { monoCta, bodyCopySecondary } from "@/lib/typography";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import Link from "next/link";

const contactCtaClassName = cn(
  monoCta,
  "inline-flex min-h-11 w-full min-w-0 items-center justify-center gap-2 rounded-full border border-border bg-accent-muted/20 px-4 py-2.5 tracking-[0.12em] text-accent",
  "transition-[border-color,box-shadow,background-color,transform] duration-200",
  "hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(91,141,239,0.14)]",
  "active:scale-[0.99] active:border-accent/55 active:shadow-[0_0_24px_rgba(91,141,239,0.18)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

export function Contact() {
  return (
    <section id="contact" className={cn(sectionScrollClassName, "py-16 sm:py-24 md:py-32")}>
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SectionHeading
          title={contactSection.headline}
          className="mx-auto max-w-none text-center"
          titleClassName="text-balance text-[clamp(1.2rem,4.2vw,3rem)] tracking-tight"
        />
        <p className={cn("mx-auto mt-6 max-w-xl", bodyCopySecondary)}>
          {contactSection.subline}
        </p>
        <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-2 sm:mt-10 sm:max-w-none sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
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
