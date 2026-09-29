const SHORT_MONTH: Record<string, string> = {
  january: "Jan",
  february: "Feb",
  march: "Mar",
  april: "Apr",
  may: "May",
  june: "Jun",
  july: "Jul",
  august: "Aug",
  september: "Sep",
  october: "Oct",
  november: "Nov",
  december: "Dec",
};

/** e.g. "December 2022 – February 2025" → "Dec 2022 – Feb 2025" */
export function formatExperiencePeriod(period: string): string {
  return period.replace(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/gi,
    (match) => SHORT_MONTH[match.toLowerCase()] ?? match,
  );
}
