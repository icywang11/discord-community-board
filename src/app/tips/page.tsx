import Link from "next/link";
import { Mascot } from "@/components/mascot";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { playbookTips } from "@/lib/playbook";
import { cn } from "@/lib/utils";

const TONE = {
  pink: "bg-[#fff5f8] border-white",
  mint: "bg-[#f3fffb] border-white",
  grape: "bg-[#f8f4ff] border-white",
  sun: "bg-[#fff8e8] border-white",
};

export default function TipsPage() {
  return (
    <div className="relative min-h-full">
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="font-cute text-sm tracking-[0.28em] text-rose-400">PAGE 04</p>
        <h1 className="mt-2 font-cute text-4xl text-rose-500 sm:text-5xl">今后怎么做</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-foreground/70">
          对照数字在上一页。这里是复用时的排期备忘。
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {playbookTips.map((tip) => (
            <article
              key={tip.title}
              className={cn(
                "rounded-[2rem] border-[3px] p-5 shadow-[0_12px_32px_rgba(255,122,162,0.1)]",
                TONE[tip.tone],
              )}
            >
              <div className="flex items-start gap-3">
                <Mascot kind={tip.mascot} className="sanrio-bounce size-16 shrink-0" />
                <div className="min-w-0">
                  <p className="font-cute text-xs text-rose-400">♡ {tip.tag}</p>
                  <h2 className="mt-1 font-cute text-2xl text-rose-500">{tip.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-foreground/75">{tip.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/cases"
            className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "h-12 rounded-full px-7 text-base text-rose-500")}
          >
            查看代表做法
          </Link>
          <Link
            href="/optimize"
            className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7 text-base")}
          >
            下一步：数据优化
          </Link>
        </div>
      </main>
    </div>
  );
}
