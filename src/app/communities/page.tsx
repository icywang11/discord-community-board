import Link from "next/link";
import { CommunityName } from "@/components/community-name";
import { CommunitySize } from "@/components/community-size";
import { Mascot } from "@/components/mascot";
import { SiteHeader } from "@/components/site-header";
import { catalog, avgRate, formatNumber, formatPercent, sum } from "@/lib/catalog";

export default function CommunitiesPage() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="font-cute text-sm tracking-[0.28em] text-rose-400">PAGE 02</p>
        <h1 className="mt-2 font-cute text-4xl text-rose-500 sm:text-5xl">Discord社区详情</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-foreground/70">
          四个社区入口。点进卡片看场次与人数。
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {catalog.communities.map((item, index) => (
            <Link
              key={item.id}
              href={`/communities/${item.id}`}
              className="group rounded-[2rem] border-2 border-white bg-white/80 p-5 shadow-[0_12px_36px_rgba(255,122,162,0.1)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(255,122,162,0.18)]"
            >
              <div className="flex items-start gap-4">
                <Mascot kind={item.mascot} className="size-24 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-rose-400">0{index + 1} / 04</p>
                  <h2 className="text-3xl text-rose-500">
                    <CommunityName label={item.label} />
                  </h2>
                  <CommunitySize size={item.size} className="mt-2" />
                  <p className="mt-2 text-sm leading-6 text-foreground/70">{item.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs">
                    <span className="rounded-full bg-rose-50 px-3 py-1">{item.period}</span>
                    <span className="rounded-full bg-teal-50 px-3 py-1">
                      {item.activities.length} 场
                    </span>
                    <span className="rounded-full bg-violet-50 px-3 py-1">
                      参与人数 {item.activities.length ? formatNumber(sum(item.activities, "participants")) : "待导入"}
                    </span>
                    {avgRate(item.activities) > 0 ? (
                      <span className="rounded-full bg-amber-50 px-3 py-1">
                        参与率 {formatPercent(avgRate(item.activities))}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/cases"
            className="rounded-full bg-white/80 px-5 py-2 font-cute text-sm text-rose-500 shadow-sm"
          >
            点击查看代表做法
          </Link>
        </div>
      </main>
    </div>
  );
}
