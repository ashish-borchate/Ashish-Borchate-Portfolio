import { caseStudies } from "@/data/caseStudies";
import { CaseStudySectionBlock } from "@/components/CaseStudy/CaseStudySection";

const order: { slug: string; variant: "build" | "scale" | "feedback" | "speed" }[] =
  [
    { slug: "yellow", variant: "build" },
    { slug: "binance", variant: "scale" },
    { slug: "koinx", variant: "feedback" },
    { slug: "bybit", variant: "speed" },
  ];

export function WorkCaseStudies() {
  return (
    <div id="work">
      {order.map(({ slug, variant }) => {
        const data = caseStudies.find((c) => c.companySlug === slug);
        if (!data) return null;
        return (
          <CaseStudySectionBlock key={slug} data={data} variant={variant} />
        );
      })}
    </div>
  );
}
