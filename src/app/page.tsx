import Link from "next/link";
import { BounceText } from "@/components/bounce-text";
import { KpiCloud } from "@/components/kpi-cloud";
import { SiteHeader } from "@/components/site-header";
import { catalog, formatNumber, sum } from "@/lib/catalog";
import { caseHighlights } from "@/lib/cases";
import { playbookTips } from "@/lib/playbook";
import { cn } from "@/lib/utils";

const HIGHLIGHT = {
  pink: "text-rose-500",
  mint: "text-teal-600",
  grape: "text-violet-500",
  sun: "text-amber-500",
} as const;

export default function HomePage() {
  const totalActs = catalog.communities.reduce((acc, item) => acc + item.activities.length, 0);
  const totalPeople = catalog.communities.reduce(
    (acc, item) => acc + sum(item.activities, "participants"),
    0,
  );

  return (
    <div className="relative min-h-full">
      <SiteHeader />
      <main className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 py-10 sm:px-6 sm:py-16">
        <p className="font-cute text-sm tracking-[0.28em] text-rose-400">PAGE 01</p>
        <h1 className="relative mt-3 text-center text-rose-500">
          <BounceText as="span" text="Discord" className="block text-5xl leading-tight sm:text-6xl" />
          <BounceText as="span" text="社区活动数据看板" className="mt-1 block text-4xl leading-tight sm:text-5xl" />
        </h1>

        <div className="relative mt-6 max-w-md text-center">
          <p className="font-cute text-base text-rose-500 sm:text-lg">创建人：Icy Wang</p>
          <p className="mt-2 text-sm leading-7 text-foreground/70 sm:text-base">
            目的是改善社区运营的现状，提升平时的效率。
          </p>
        </div>

        <div className="relative mt-10 grid w-full max-w-3xl grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4">
          <KpiCloud label="社区" value="4" tone="pink" />
          <KpiCloud label="活动场次" value={String(totalActs)} tone="mint" />
          <KpiCloud label="参与人数" value={formatNumber(totalPeople)} tone="grape" />
          <KpiCloud label="数据月份" value="1–9月" tone="sun" />
        </div>

        <section className="relative mt-12 grid w-full max-w-4xl gap-4 md:grid-cols-3">
          <Link
            href="/communities"
            className="rounded-[2rem] border-[3px] border-white bg-white/80 p-5 shadow-[0_12px_32px_rgba(255,122,162,0.1)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(255,122,162,0.18)]"
          >
            <p className="font-cute text-xs tracking-[0.2em] text-rose-400">PAGE 02</p>
            <h2 className="mt-2 font-cute text-2xl text-rose-500">社区详情</h2>
            <p className="mt-2 text-sm leading-6 text-foreground/65">四个社区的场次、人数和明细表。</p>
            <p className="mt-4 font-cute text-sm text-rose-500">点进去看 →</p>
          </Link>

          <Link
            href="/cases"
            className="rounded-[2rem] border-[3px] border-white bg-[#fff8e8] p-5 shadow-[0_12px_32px_rgba(255,122,162,0.1)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(255,122,162,0.18)]"
          >
            <p className="font-cute text-xs tracking-[0.2em] text-amber-500">PAGE 03</p>
            <h2 className="mt-2 font-cute text-2xl text-rose-500">代表做法</h2>
            <p className="mt-2 text-sm leading-6 text-foreground/65">对照数字里最亮的几场，先看倍率再复用。</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {caseHighlights.map((item) => (
                <div key={item.id} className="rounded-2xl bg-white/80 px-2 py-2 text-center">
                  <p className={cn("font-num text-lg leading-none", HIGHLIGHT[item.tone])}>{item.value}</p>
                  <p className="mt-1 text-[10px] leading-4 text-foreground/50">{item.label}</p>
                </div>
              ))}
            </div>
          </Link>

          <Link
            href="/tips"
            className="rounded-[2rem] border-[3px] border-white bg-[#f8f4ff] p-5 shadow-[0_12px_32px_rgba(255,122,162,0.1)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(255,122,162,0.18)]"
          >
            <p className="font-cute text-xs tracking-[0.2em] text-violet-400">PAGE 04</p>
            <h2 className="mt-2 font-cute text-2xl text-rose-500">运营提示</h2>
            <p className="mt-2 text-sm leading-6 text-foreground/65">
              {playbookTips.length} 条排期备忘。先做一键完成，爆款再拆成模板。
            </p>
            <p className="mt-4 font-cute text-sm text-violet-500">去看怎么做 →</p>
          </Link>
        </section>
      </main>
    </div>
  );
}
