import Link from "next/link";
import { KpiCloud } from "@/components/kpi-cloud";
import { SiteHeader } from "@/components/site-header";
import { catalog, formatNumber, sum } from "@/lib/catalog";
import { caseHighlights } from "@/lib/cases";
import { playbookTips } from "@/lib/playbook";

export default function HomePage() {
  const totalActs = catalog.communities.reduce((acc, item) => acc + item.activities.length, 0);
  const totalPeople = catalog.communities.reduce(
    (acc, item) => acc + sum(item.activities, "participants"),
    0,
  );

  return (
    <div className="relative min-h-full">
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex items-end justify-between gap-4">
          <p className="kicker">Volume 01</p>
          <p className="kicker">Selected · 1–9月</p>
        </div>

        <section className="card-editorial mt-6 overflow-hidden px-6 py-10 sm:px-12 sm:py-14">
          <p className="kicker">Icy Wang · Community Archive</p>
          <h1 className="mt-5 font-display text-5xl leading-[0.95] text-foreground sm:text-7xl">
            <span className="italic">Discord</span>
            <span className="mt-2 block text-4xl sm:text-6xl">社区活动数据看板</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
            创建人 Icy Wang。目的是改善社区运营的现状，提升平时的效率。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            <span>四个社区</span>
            <span className="h-px w-8 bg-border" />
            <span>对照数字</span>
            <span className="h-px w-8 bg-border" />
            <span>可复用做法</span>
          </div>
        </section>

        <section className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <KpiCloud label="社区" value="4" />
          <KpiCloud label="活动场次" value={String(totalActs)} />
          <KpiCloud label="参与人数" value={formatNumber(totalPeople)} />
          <KpiCloud label="数据月份" value="1–9" />
        </section>

        <section className="mt-14 grid gap-4 lg:grid-cols-2">
          <Link href="/communities" className="card-editorial group p-6 transition hover:bg-white sm:p-8">
            <p className="kicker">Page 02 · Directory</p>
            <h2 className="mt-4 font-display text-3xl">社区详情</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">四个社区的场次、人数和明细表。</p>
            <p className="mt-8 text-[11px] tracking-[0.22em] uppercase text-foreground/70 group-hover:underline">
              Enter archive →
            </p>
          </Link>

          <Link href="/cases" className="card-editorial group grid grid-cols-[1.1fr_0.9fr] overflow-hidden">
            <div className="p-6 sm:p-8">
              <p className="kicker">Page 03</p>
              <h2 className="mt-4 font-display text-3xl">代表做法</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">对照数字里最亮的几场，先看倍率再复用。</p>
            </div>
            <div className="grid grid-cols-2 border-l border-border bg-[#f7f6f2]">
              {caseHighlights.map((item) => (
                <div key={item.id} className="flex flex-col justify-center border-b border-r border-border px-3 py-4 last:border-b-0 [&:nth-child(2)]:border-r-0 [&:nth-child(4)]:border-r-0">
                  <p className="font-num text-2xl leading-none">{item.value}</p>
                  <p className="mt-2 text-[10px] leading-4 text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </Link>

          <Link href="/tips" className="card-editorial group p-6 transition hover:bg-white sm:p-8">
            <p className="kicker">Page 04</p>
            <h2 className="mt-4 font-display text-3xl">运营提示</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {playbookTips.length} 条排期备忘。社区 C 中奖重复率已从 57.94% 降到 34.48%。
            </p>
            <p className="mt-8 text-[11px] tracking-[0.22em] uppercase text-foreground/70 group-hover:underline">
              How we work →
            </p>
          </Link>

          <Link href="/optimize" className="card-editorial group relative overflow-hidden p-6 sm:p-8">
            <p className="kicker">Page 05</p>
            <h2 className="mt-4 font-display text-3xl">数据优化</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              社区 C：中奖重复率 57.94% → 34.48%，发放明细可按场次查。
            </p>
            <p className="mt-6 font-num text-5xl leading-none">−23.46</p>
            <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">pt drop</p>
          </Link>
        </section>
      </main>
    </div>
  );
}
