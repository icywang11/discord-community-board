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
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="kicker">Page 02 · Directory</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">社区详情</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
          四个社区入口。点进卡片看场次与人数。
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {catalog.communities.map((item, index) => (
            <Link
              key={item.id}
              href={`/communities/${item.id}`}
              className="card-editorial group p-6 transition hover:bg-white sm:p-7"
            >
              <div className="flex items-start gap-5">
                <Mascot kind={item.mascot} className="size-16 shrink-0 sm:size-20" />
                <div className="min-w-0">
                  <p className="kicker">0{index + 1} / 04</p>
                  <h2 className="mt-2 text-3xl">
                    <CommunityName label={item.label} />
                  </h2>
                  <CommunitySize size={item.size} className="mt-3" />
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] tracking-wide text-muted-foreground">
                    <span className="rounded-full border border-border px-3 py-1">{item.period}</span>
                    <span className="rounded-full border border-border px-3 py-1">{item.activities.length} 场</span>
                    <span className="rounded-full border border-border px-3 py-1">
                      参与人数 {item.activities.length ? formatNumber(sum(item.activities, "participants")) : "待导入"}
                    </span>
                    {avgRate(item.activities) > 0 ? (
                      <span className="rounded-full border border-border px-3 py-1">
                        参与率 {formatPercent(avgRate(item.activities))}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-6 text-[11px] tracking-[0.2em] uppercase">
          <Link href="/cases" className="hover:underline">
            代表做法 →
          </Link>
          <Link href="/tips" className="hover:underline">
            运营提示 →
          </Link>
          <Link href="/optimize" className="hover:underline">
            数据优化 →
          </Link>
        </div>
      </main>
    </div>
  );
}
