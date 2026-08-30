import type { Insight } from "@/lib/insights";

const ICON = {
  good: "01",
  warn: "02",
  idea: "03",
};

export function InsightsPanel({ insights }: { insights: Insight[] }) {
  if (!insights.length) return null;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {insights.map((item, index) => (
        <article key={item.title} className="rounded-xl border border-border bg-white p-5 leading-6">
          <h3 className="flex items-center gap-3 font-display text-lg">
            <span className="kicker w-8">{ICON[item.tone] ?? String(index + 1).padStart(2, "0")}</span>
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
