import { formatNumber, formatPercent } from "@/lib/catalog";
import type { Activity } from "@/lib/types";
import { cn } from "@/lib/utils";

const PODIUM = ["♡ 冠军", "✦ 亚军", "❀ 季军"];
const HEIGHT = ["mt-0", "mt-4", "mt-8"];

export function TopThree({ activities }: { activities: Activity[] }) {
  if (!activities.length) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-rose-200 bg-white/60 p-8 text-center text-sm text-rose-400">
        这一屏还没有可排名的活动。
      </div>
    );
  }
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {activities.map((item, index) => (
        <article
          key={item.id}
          className={cn(
            "rounded-3xl border-2 border-white bg-white/85 p-4 shadow-[0_10px_30px_rgba(255,122,162,0.12)]",
            HEIGHT[index],
          )}
        >
          <p className="font-display text-sm text-rose-400">{PODIUM[index]}</p>
          <h3 className="mt-2 line-clamp-2 font-medium leading-6">{item.name}</h3>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-2xl bg-rose-50 px-3 py-2">
              <dt className="text-rose-400">参与人次</dt>
              <dd className="mt-1 font-display text-lg text-rose-500">{formatNumber(item.participants)}</dd>
            </div>
            <div className="rounded-2xl bg-teal-50 px-3 py-2">
              <dt className="text-teal-500">参与率</dt>
              <dd className="mt-1 font-display text-lg text-teal-600">{formatPercent(item.rate)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
            {item.type} · {item.period || item.month}
            {item.region !== "综合" ? ` · ${item.region}` : ""}
          </p>
        </article>
      ))}
    </div>
  );
}
