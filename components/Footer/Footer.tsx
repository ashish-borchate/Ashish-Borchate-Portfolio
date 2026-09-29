import { brandName } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono tracking-wider">{brandName}</p>
        <p>Support Operations × Product Operations × Customer Experience</p>
      </div>
    </footer>
  );
}
