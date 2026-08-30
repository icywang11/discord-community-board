import Link from "next/link";
import { CommunityName } from "@/components/community-name";
import { Mascot } from "@/components/mascot";
import { SiteHeader } from "@/components/site-header";
import { caseHighlights, caseStudies } from "@/lib/cases";

export default function CasesPage() {
  return (
    <div className="relative min-h-full">
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="kicker">Page 03 · Selected works</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">代表做法</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          先看盘里最亮的对照数字，再决定要不要复用。倍率、环比都来自同社区、同类型场次。
        </p>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
          {caseHighlights.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="bg-white px-5 py-6 text-center transition hover:bg-[#f7f6f2]">
              <p className="font-num text-4xl leading-none">{item.value}</p>
              <p className="mt-2 text-xs text-muted-foreground">{item.label}</p>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {caseStudies.map((item) => (
            <article key={item.id} id={item.id} className="card-editorial scroll-mt-24 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <Mascot kind={item.mascot} className="size-14 shrink-0" />
                  <div className="min-w-0">
                    <p className="kicker">
                      <CommunityName label={`社区 ${item.community}`} /> · {item.practice}
                    </p>
                    <h2 className="mt-2 font-display text-2xl sm:text-3xl">{item.activity}</h2>
                  </div>
                </div>
                <div className="text-left sm:min-w-[11rem] sm:text-right">
                  <p className="font-num text-4xl leading-none">{item.headline}</p>
                  <p className="mt-2 max-w-[16rem] text-[11px] leading-5 text-muted-foreground sm:ml-auto">
                    {item.headlineNote}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border">
                {item.compare.map((row) => (
                  <div key={row.label} className="bg-white p-4">
                    <p className="mb-2 text-[11px] tracking-[0.18em] uppercase text-muted-foreground">{row.label}</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">对照</p>
                        <p className="mt-1 text-sm leading-snug sm:text-base">{row.before}</p>
                        {row.beforeHint ? (
                          <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground">{row.beforeHint}</p>
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">这场</p>
                        <p className="mt-1 text-sm leading-snug sm:text-base">{row.after}</p>
                        {row.afterHint ? (
                          <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground">{row.afterHint}</p>
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">变化</p>
                        <p className="mt-1 font-display text-lg leading-snug">{row.delta}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-foreground/75">{item.takeaway}</p>
              <Link href={item.href} className="mt-3 inline-block text-[11px] tracking-[0.18em] uppercase hover:underline">
                去看这场的明细 →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-6 text-[11px] tracking-[0.2em] uppercase">
          <Link href="/communities" className="hover:underline">
            查看社区详情 →
          </Link>
          <Link href="/tips" className="hover:underline">
            下一步：运营提示 →
          </Link>
        </div>
      </main>
    </div>
  );
}
