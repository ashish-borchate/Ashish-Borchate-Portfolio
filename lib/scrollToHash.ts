/** Scroll to in-page section id, accounting for sticky header offset. */
export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = hash.replace(/^#/, "");
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  const root = document.documentElement;
  const offset =
    parseFloat(getComputedStyle(root).getPropertyValue("--header-offset")) || 88;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}
