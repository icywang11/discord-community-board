import { formatNumber, formatPercent } from "@/lib/catalog";
import type { Activity } from "@/lib/types";
import { cn } from "@/lib/utils";

const PODIUM = ["01  冠军", "02  亚军", "03  季军"];

export function TopThree({ activities }: { activities: Activity[] }) {
  if (!activities.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-white/70 p-8 text-center text-sm text-muted-foreground">
        这一屏还没有可排名的活动。
      </div>
    );
  }
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {activities.map((item, index) => (
        <article key={item.id} className={cn("card-editorial p-5")}>
          <p className="kicker">{PODIUM[index]}</p>
          <h3 className="mt-3 line-clamp-2 font-display text-xl leading-7">{item.name}</h3>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-[#f7f6f2] px-3 py-2">
              <dt className="text-muted-foreground">参与人数</dt>
              <dd className="mt-1 font-num text-xl">{formatNumber(item.participants)}</dd>
            </div>
            <div className="rounded-lg bg-[#f7f6f2] px-3 py-2">
              <dt className="text-muted-foreground">参与率</dt>
              <dd className="mt-1 font-num text-xl">{formatPercent(item.rate)}</dd>
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
