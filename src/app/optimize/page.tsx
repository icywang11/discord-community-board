import Link from "next/link";
import { CommunityName } from "@/components/community-name";
import { Mascot } from "@/components/mascot";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import {
  optimizeCommunity,
  optimizeFacts,
  optimizeGoals,
  optimizeMoves,
  optimizeRefs,
} from "@/lib/optimize";
import { cn } from "@/lib/utils";

export default function OptimizePage() {
  return (
    <div className="relative min-h-full">
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="font-cute text-sm tracking-[0.28em] text-rose-400">PAGE 05</p>
        <h1 className="mt-2 font-cute text-4xl text-rose-500 sm:text-5xl">社区数据优化</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/70">
          <CommunityName label={`社区 ${optimizeCommunity}`} /> 这一盘：先看数字卡在哪，再改玩法、盯目标和别处能借的做法。奖励只写品类，不写具体代币名。
        </p>

        <section className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <Mascot kind="grape" className="size-12" />
            <h2 className="font-cute text-2xl text-violet-500">这盘数字</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {optimizeFacts.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.8rem] border-[3px] border-white bg-[#f8f4ff] p-5 shadow-[0_10px_28px_rgba(255,122,162,0.08)]"
              >
                <h3 className="font-cute text-xl text-violet-500">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-foreground/75">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Mascot kind="berry" className="size-12" />
            <h2 className="font-cute text-2xl text-rose-500">准备怎么改</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {optimizeMoves.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.8rem] border-[3px] border-white bg-[#fff5f8] p-5 shadow-[0_10px_28px_rgba(255,122,162,0.08)]"
              >
                <h3 className="font-cute text-xl text-rose-500">{item.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground/75">
                  {item.items.map((line) => (
                    <li key={line} className="rounded-2xl bg-white/80 px-3 py-2">
                      {line}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Mascot kind="mint" className="size-12" />
            <h2 className="font-cute text-2xl text-teal-600">先盯这些目标</h2>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            {optimizeGoals.map((group) => (
              <article
                key={group.tier}
                className="rounded-[1.8rem] border-[3px] border-white bg-[#f3fffb] p-5 shadow-[0_10px_28px_rgba(255,122,162,0.08)]"
              >
                <p className="font-cute text-xs tracking-[0.2em] text-teal-500">{group.tier}</p>
                <div className="mt-3 space-y-3">
                  {group.items.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/80 px-3 py-3">
                      <p className="text-sm font-medium text-teal-700">{item.label}</p>
                      <p className="mt-1 text-sm leading-6 text-foreground/70">{item.body}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Mascot kind="pudding" className="size-12" />
            <h2 className="font-cute text-2xl text-amber-500">别处在用的做法</h2>
          </div>
          <p className="mb-4 max-w-2xl text-sm leading-7 text-foreground/65">
            只保留玩法本身，不出现具体产品名。能借的是动作，不是皮肤。
          </p>
          <div className="grid gap-3 lg:grid-cols-3">
            {optimizeRefs.map((group) => (
              <article
                key={group.group}
                className="rounded-[1.8rem] border-[3px] border-white bg-[#fff8e8] p-5 shadow-[0_10px_28px_rgba(255,122,162,0.08)]"
              >
                <h3 className="font-cute text-xl text-amber-500">{group.group}</h3>
                <div className="mt-3 space-y-3">
                  {group.items.map((item) => (
                    <div key={item.play} className="rounded-2xl bg-white/80 px-3 py-3">
                      <p className="text-sm font-medium text-foreground/80">{item.play}</p>
                      <p className="mt-1 text-sm leading-6 text-foreground/60">{item.note}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/communities/c"
            className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "h-12 rounded-full px-7 text-base text-rose-500")}
          >
            查看<CommunityName label="社区 C" className="mx-1" />明细
          </Link>
          <Link href="/tips" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7 text-base")}>
            回到运营提示
          </Link>
        </div>
      </main>
    </div>
  );
}
