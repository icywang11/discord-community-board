import type { Insight } from "@/lib/insights";
import { cn } from "@/lib/utils";

const TONE = {
  good: "bg-teal-50 border-teal-100",
  warn: "bg-amber-50 border-amber-100",
  idea: "bg-violet-50 border-violet-100",
};

const ICON = {
  good: "♪",
  warn: "!",
  idea: "✦",
};

export function InsightsPanel({ insights }: { insights: Insight[] }) {
  if (!insights.length) return null;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {insights.map((item) => (
        <article
          key={item.title}
          className={cn("rounded-3xl border-2 p-4 leading-6", TONE[item.tone])}
        >
          <h3 className="flex items-center gap-2 font-display text-base">
            <span className="grid size-7 place-items-center rounded-full bg-white/80 text-sm">
              {ICON[item.tone]}
            </span>
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-foreground/80">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
