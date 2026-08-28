import Link from "next/link";
import { CommunityName } from "@/components/community-name";
import { Mascot } from "@/components/mascot";
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
    <div className="min-h-full">
      <SiteHeader />
      <main className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-10 sm:px-6 sm:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-center gap-8 opacity-80">
          <span className="text-4xl">✦</span>
          <span className="text-3xl text-rose-300">♡</span>
          <span className="text-4xl text-teal-300">✿</span>
        </div>
        <p className="relative font-display text-sm tracking-[0.35em] text-rose-400">PAGE 01</p>
        <h1 className="relative mt-3 text-center font-display text-5xl leading-tight text-rose-500 sm:text-6xl">
          社区活动
          <br />
          数据看板
        </h1>
        <p className="relative mt-5 max-w-xl text-center text-sm leading-7 text-foreground/70 sm:text-base">
          四个社区的活动效果对照本。人数一律按各场「参与人数」合计，不把浏览、曝光算进去。封面只放总览，点进下一页再选社区。
        </p>

        <div className="relative mt-8 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "社区", value: "4" },
            { label: "活动场次", value: String(totalActs) },
            { label: "参与人数", value: formatNumber(totalPeople) },
            { label: "数据月份", value: "1–9 月" },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border-2 border-white bg-white/80 px-3 py-4 text-center shadow-sm">
              <div className="text-xs text-rose-400">{item.label}</div>
              <div className="mt-1 font-display text-2xl text-rose-500">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="relative mt-10 flex flex-wrap justify-center gap-4">
          {catalog.communities.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <Mascot kind={item.mascot} className="size-20" />
              <CommunityName label={item.label} className="mt-1 text-rose-400" />
            </div>
          ))}
        </div>

        <Link
          href="/communities"
          className={cn(
            buttonVariants({ size: "lg" }),
            "relative mt-10 h-12 rounded-full px-8 font-display text-base",
          )}
        >
          翻到第二页 · Discord社区详情
        </Link>
      </main>
    </div>
  );
}
