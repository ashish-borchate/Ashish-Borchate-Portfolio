export type NavItem = {
  id: string;
  label: string;
  href: string;
};

/** Primary nav — order matches main page sections. */
export const siteNav: NavItem[] = [
  { id: "impact", label: "Impact", href: "#impact" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "case-studies", label: "Case Studies", href: "#case-studies" },
  { id: "testimonials", label: "Testimonials", href: "#testimonials" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const navSectionIds = siteNav.map((item) => item.id.replace(/^#/, ""));

export const brandName = "ASHISH BORCHATE";
