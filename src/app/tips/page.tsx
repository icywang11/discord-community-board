import Link from "next/link";
import { Mascot } from "@/components/mascot";
import { SiteHeader } from "@/components/site-header";
import { playbookTips } from "@/lib/playbook";

export default function TipsPage() {
  return (
    <div className="relative min-h-full">
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="kicker">Page 04 · How we work</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">今后怎么做</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
          对照数字在案例页。社区 C 已经把中奖重复率从 57.94% 降到 34.48%，排期时优先复用能换血的玩法。
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {playbookTips.map((tip) => (
            <article key={tip.title} className="card-editorial p-6">
              <div className="flex items-start gap-4">
                <Mascot kind={tip.mascot} className="size-12 shrink-0" />
                <div className="min-w-0">
                  <p className="kicker">{tip.tag}</p>
                  <h2 className="mt-2 font-display text-2xl">{tip.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-foreground/75">{tip.body}</p>
                  {tip.href ? (
                    <Link href={tip.href} className="mt-4 inline-block text-[11px] tracking-[0.18em] uppercase hover:underline">
                      {tip.hrefLabel ?? "去看明细 →"}
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-6 text-[11px] tracking-[0.2em] uppercase">
          <Link href="/cases" className="hover:underline">
            查看代表做法 →
          </Link>
          <Link href="/optimize" className="hover:underline">
            下一步：数据优化 →
          </Link>
        </div>
      </main>
    </div>
  );
}
