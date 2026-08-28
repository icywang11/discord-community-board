import Link from "next/link";
import { CommunityName } from "@/components/community-name";
import { Mascot } from "@/components/mascot";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { caseStudies } from "@/lib/cases";
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
          从复盘里抽出带对照数字的场次。先看环比和倍率，再决定要不要复用。
        </p>

        <div className="mt-8 flex flex-col gap-5">
          {caseStudies.map((item) => (
            <article
              key={item.id}
              className={cn(
                "rounded-[2rem] border-[3px] border-white p-5 shadow-[0_12px_32px_rgba(255,122,162,0.1)] sm:p-6",
                TONE[item.tone],
              )}
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
                <div className="flex min-w-0 flex-1 gap-3">
                  <Mascot kind={item.mascot} className="size-16 shrink-0 sm:size-20" />
                  <div className="min-w-0">
                    <p className="text-xs text-rose-400">
                      <CommunityName label={`社区 ${item.community}`} /> · {item.practice}
                    </p>
                    <h2 className="mt-1 font-cute text-2xl text-rose-500">{item.activity}</h2>
                    <p className="mt-2 text-sm leading-7 text-foreground/75">{item.takeaway}</p>
                    <Link href={item.href} className="mt-3 inline-block text-sm text-rose-500 underline-offset-4 hover:underline">
                      去看这场的明细 →
                    </Link>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col justify-between gap-4 lg:w-[22rem]">
                  <div className="rounded-3xl bg-white/80 px-4 py-3 text-center">
                    <p className="text-xs text-rose-400">{item.headlineNote}</p>
                    <p className={cn("font-num mt-1 text-4xl", HEADLINE[item.tone])}>{item.headline}</p>
                  </div>
                  <div className="overflow-x-auto rounded-3xl bg-white/80 text-sm">
                    <div className="min-w-[20rem]">
                      <div className="grid grid-cols-[5.5rem_1fr_1fr_5.5rem] gap-x-2 border-b border-rose-100 px-3 py-2 text-[11px] text-rose-400">
                        <span>口径</span>
                        <span>对照</span>
                        <span>这场</span>
                        <span>变化</span>
                      </div>
                      {item.compare.map((row) => (
                        <div
                          key={row.label}
                          className="grid grid-cols-[5.5rem_1fr_1fr_5.5rem] gap-x-2 px-3 py-2 text-xs leading-5 text-foreground/80"
                        >
                          <span>{row.label}</span>
                          <span>{row.before}</span>
                          <span>{row.after}</span>
                          <span className="font-medium text-rose-500">{row.delta}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
