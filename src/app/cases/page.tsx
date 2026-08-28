import Link from "next/link";
import { CommunityName } from "@/components/community-name";
import { Mascot } from "@/components/mascot";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { caseHighlights, caseStudies } from "@/lib/cases";
import { cn } from "@/lib/utils";

const TONE = {
  pink: "bg-[#fff5f8]",
  mint: "bg-[#f3fffb]",
  grape: "bg-[#f8f4ff]",
  sun: "bg-[#fff8e8]",
};

const HEADLINE = {
  pink: "text-rose-500",
  mint: "text-teal-600",
  grape: "text-violet-500",
  sun: "text-amber-500",
};

export default function CasesPage() {
  return (
    <div className="relative min-h-full">
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="font-cute text-sm tracking-[0.28em] text-rose-400">PAGE 03</p>
        <h1 className="mt-2 font-cute text-4xl text-rose-500 sm:text-5xl">代表做法</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/70">
          先看盘里最亮的对照数字，再决定要不要复用。倍率、环比都来自同社区、同类型场次。
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {caseHighlights.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "rounded-[1.8rem] border-[3px] border-white px-4 py-4 text-center shadow-[0_10px_28px_rgba(255,122,162,0.1)] transition hover:-translate-y-0.5",
                TONE[item.tone],
              )}
            >
              <p className={cn("font-num text-3xl sm:text-4xl", HEADLINE[item.tone])}>{item.value}</p>
              <p className="mt-1 text-xs text-foreground/60">{item.label}</p>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-6">
          {caseStudies.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className={cn(
                "scroll-mt-24 rounded-[2rem] border-[3px] border-white p-5 shadow-[0_12px_32px_rgba(255,122,162,0.1)] sm:p-7",
                TONE[item.tone],
              )}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <Mascot kind={item.mascot} className="size-16 shrink-0 sm:size-20" />
                  <div className="min-w-0">
                    <p className="text-xs text-rose-400">
                      <CommunityName label={`社区 ${item.community}`} /> · {item.practice}
                    </p>
                    <h2 className="mt-1 font-cute text-2xl text-rose-500 sm:text-3xl">{item.activity}</h2>
                  </div>
                </div>
                <div className="rounded-3xl bg-white/85 px-5 py-3 text-center sm:min-w-[11rem]">
                  <p className={cn("font-num text-4xl leading-none", HEADLINE[item.tone])}>{item.headline}</p>
                  <p className="mt-2 max-w-[16rem] text-[11px] leading-5 text-rose-400">{item.headlineNote}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {item.compare.map((row) => (
                  <div key={row.label} className="rounded-[1.6rem] bg-white/80 p-3 sm:p-4">
                    <p className="mb-2 text-[11px] tracking-wide text-rose-400">{row.label}</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] text-foreground/40">对照</p>
                        <p className="mt-1 text-sm font-medium leading-snug text-foreground/80 sm:text-base">
                          {row.before}
                        </p>
                        {row.beforeHint ? (
                          <p className="mt-0.5 text-[11px] leading-5 text-foreground/45">{row.beforeHint}</p>
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-foreground/40">这场</p>
                        <p className="mt-1 text-sm font-medium leading-snug text-foreground/85 sm:text-base">
                          {row.after}
                        </p>
                        {row.afterHint ? (
                          <p className="mt-0.5 text-[11px] leading-5 text-foreground/45">{row.afterHint}</p>
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-rose-300">变化</p>
                        <p className={cn("mt-1 text-sm font-semibold leading-snug sm:text-base", HEADLINE[item.tone])}>
                          {row.delta}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-sm leading-7 text-foreground/75">{item.takeaway}</p>
              <Link href={item.href} className="mt-3 inline-block text-sm text-rose-500 underline-offset-4 hover:underline">
                去看这场的明细 →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/communities"
            className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "h-12 rounded-full px-7 text-base text-rose-500")}
          >
            查看社区详情
          </Link>
          <Link href="/tips" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7 text-base")}>
            下一步：运营提示
          </Link>
        </div>
      </main>
    </div>
  );
}
