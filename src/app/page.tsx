import Link from "next/link";
import { BounceText } from "@/components/bounce-text";
import { KpiCloud } from "@/components/kpi-cloud";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { catalog, formatNumber, sum } from "@/lib/catalog";
import { cn } from "@/lib/utils";

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

        <div className="relative mt-12 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/communities"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 rounded-full px-7 text-base",
            )}
          >
            点击查看社区详情
          </Link>
          <Link
            href="/tips"
            className={cn(
              buttonVariants({ size: "lg", variant: "secondary" }),
              "h-12 rounded-full px-7 text-base text-rose-500",
            )}
          >
            点击查看运营提示
          </Link>
        </div>
      </main>
    </div>
  );
}
