"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BounceText } from "@/components/bounce-text";
import { CommunityName } from "@/components/community-name";
import { CountUp } from "@/components/count-up";
import { Mascot } from "@/components/mascot";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  optimizeBefore,
  optimizeCommunity,
  optimizeFacts,
  optimizeGoals,
  optimizeMix,
  optimizeMoves,
  optimizeRefs,
  optimizeResult,
  rewardRounds,
} from "@/lib/optimize";
import { cn } from "@/lib/utils";

const TONE = {
  grape: "bg-[#f8f4ff]",
  pink: "bg-[#fff5f8]",
  mint: "bg-[#f3fffb]",
  sun: "bg-[#fff8e8]",
  sky: "bg-[#eef8ff]",
};

export function OptimizeBoard() {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<"after" | "all">("after");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rewardRounds.filter((row) => {
      if (phase === "after" && !row.after) return false;
      if (!q) return true;
      return `${row.name} ${row.tag} ${row.period}`.toLowerCase().includes(q);
    });
  }, [query, phase]);

  const tableAwards = rows.reduce((acc, row) => acc + row.awards, 0);

  return (
    <div className="font-cute-ui">
      <p className="font-cute text-sm tracking-[0.28em] text-rose-400">PAGE 05</p>
      <h1 className="mt-2 text-rose-500">
        <BounceText as="span" text="社区数据优化" className="block text-4xl sm:text-5xl" />
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/70">
        <CommunityName label={`社区 ${optimizeCommunity}`} /> 这一盘按时间看：4–8 月先卡在哪，7 月下旬改玩法，然后对照发放结果。奖励只写人次，不写具体代币和名单。
      </p>

      <Tabs defaultValue="result" className="mt-8">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 rounded-[1.6rem] bg-white/80 p-2 shadow-sm">
          <TabsTrigger value="result" className="flex-none rounded-full px-4 py-2 font-cute data-active:bg-rose-400 data-active:text-white">
            落地结果
          </TabsTrigger>
          <TabsTrigger value="before" className="flex-none rounded-full px-4 py-2 font-cute data-active:bg-violet-400 data-active:text-white">
            调优前
          </TabsTrigger>
          <TabsTrigger value="plan" className="flex-none rounded-full px-4 py-2 font-cute data-active:bg-pink-400 data-active:text-white">
            优化方案
          </TabsTrigger>
          <TabsTrigger value="payouts" className="flex-none rounded-full px-4 py-2 font-cute data-active:bg-amber-400 data-active:text-white">
            发放明细
          </TabsTrigger>
        </TabsList>

        <TabsContent value="result" className="mt-6">
          <section className={cn("card-pop rounded-[2rem] border-[3px] border-white p-5 sm:p-7", TONE.sky)}>
            <div className="flex items-start gap-3">
              <Mascot kind="grape" className="sanrio-bounce size-16 shrink-0" />
              <div>
                <p className="font-cute text-xs tracking-[0.2em] text-sky-500">策略落地后</p>
                <h2 className="mt-1 font-cute text-2xl text-rose-500 sm:text-3xl">中奖重复率压下来了</h2>
                <p className="mt-2 text-sm leading-7 text-foreground/70">
                  {optimizeResult.since}针对获奖玩家重复度高，落地了活动设计调优。统计到现在：累计发放{" "}
                  {optimizeResult.awards} 人次，去重 {optimizeResult.uniqueWinners} 人。
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <div className="rounded-[1.6rem] bg-white/90 px-4 py-4 text-center">
                <p className="font-cute text-xs text-rose-400">调优前重复率</p>
                <p className="mt-1 font-num text-3xl text-violet-500 sm:text-4xl">
                  <CountUp value={optimizeResult.repeatBefore * 100} decimals={2} suffix="%" />
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-white/90 px-4 py-4 text-center">
                <p className="font-cute text-xs text-rose-400">调优后重复率</p>
                <p className="mt-1 font-num text-3xl text-rose-500 sm:text-4xl">
                  <CountUp value={optimizeResult.repeatAfter * 100} decimals={2} suffix="%" />
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-white/90 px-4 py-4 text-center">
                <p className="font-cute text-xs text-rose-400">下降</p>
                <p className="mt-1 font-num text-3xl text-teal-600 sm:text-4xl">
                  <CountUp value={optimizeResult.pointDrop} decimals={2} suffix="pt" />
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-white/90 px-4 py-4 text-center">
                <p className="font-cute text-xs text-rose-400">相对降幅</p>
                <p className="mt-1 font-num text-3xl text-amber-500 sm:text-4xl">
                  −<CountUp value={optimizeResult.relativeDrop * 100} decimals={2} suffix="%" />
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.6rem] bg-white/90 px-4 py-4">
                <p className="font-cute text-xs text-rose-400">发放人次</p>
                <p className="font-num mt-1 text-4xl text-rose-500">
                  <CountUp value={optimizeResult.awards} />
                </p>
                <p className="mt-1 text-xs text-foreground/50">策略生效后累计</p>
              </div>
              <div className="rounded-[1.6rem] bg-white/90 px-4 py-4">
                <p className="font-cute text-xs text-rose-400">不同获奖用户</p>
                <p className="font-num mt-1 text-4xl text-teal-600">
                  <CountUp value={optimizeResult.uniqueWinners} />
                </p>
                <p className="mt-1 text-xs text-foreground/50">去重后的人数</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-6 text-foreground/50">
              重复率 =（发放人次 − 去重人数）÷ 发放人次。调优前同一口径是 {(optimizeResult.repeatBefore * 100).toFixed(2)}%。
            </p>
          </section>
        </TabsContent>

        <TabsContent value="before" className="mt-6">
          <div className="mb-4 flex items-center gap-2">
            <Mascot kind="grape" className="sanrio-bounce size-12" />
            <h2 className="font-cute text-2xl text-violet-500">4–8 月先卡在哪</h2>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MiniKpi label="4–5 月场均" value={`${optimizeBefore.avgAprMay} 人`} />
            <MiniKpi label="6–7 月场均" value={`${optimizeBefore.avgJunJul} 人`} />
            <MiniKpi label="6–7 月发放" value={`${optimizeBefore.awards} 份`} />
            <MiniKpi label="中奖 ≥2 次" value={`${(optimizeBefore.twoPlusShare * 100).toFixed(2)}%`} />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {optimizeFacts.map((item, index) => (
              <article
                key={item.title}
                className={cn("card-pop rounded-[1.8rem] border-[3px] border-white p-5", TONE.grape)}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <h3 className="font-cute text-xl text-violet-500">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-foreground/75">{item.body}</p>
              </article>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plan" className="mt-6">
          <div className="mb-4 flex items-center gap-2">
            <Mascot kind="berry" className="sanrio-bounce size-12" />
            <h2 className="font-cute text-2xl text-rose-500">活动怎么改、奖励怎么配</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {optimizeMoves.map((item, index) => (
              <article
                key={item.title}
                className={cn("card-pop rounded-[1.8rem] border-[3px] border-white p-5", TONE.pink)}
                style={{ animationDelay: `${index * 0.08}s` }}
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
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {optimizeMix.map((item) => (
              <article key={item.grade} className={cn("rounded-[1.8rem] border-[3px] border-white p-5", TONE.sun)}>
                <p className="font-cute text-xs text-amber-500">建议占比</p>
                <p className="font-num mt-1 text-3xl text-amber-500">{item.share}</p>
                <p className="mt-1 font-cute text-lg text-rose-500">
                  {item.grade} · {item.form}
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground/65">{item.note}</p>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="font-cute text-2xl text-teal-600">先盯这些目标</h3>
            <div className="mt-3 grid gap-3 lg:grid-cols-3">
              {optimizeGoals.map((group) => (
                <article key={group.tier} className={cn("rounded-[1.8rem] border-[3px] border-white p-5", TONE.mint)}>
                  <p className="font-cute text-xs tracking-[0.2em] text-teal-500">{group.tier}</p>
                  <div className="mt-3 space-y-3">
                    {group.items.map((item) => (
                      <div key={item.label} className="rounded-2xl bg-white/80 px-3 py-3">
                        <p className="font-cute text-sm text-teal-700">{item.label}</p>
                        <p className="mt-1 text-sm leading-6 text-foreground/70">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-cute text-2xl text-amber-500">别处在用的做法</h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-foreground/65">只保留动作，不出现具体产品名。</p>
            <div className="mt-3 grid gap-3 lg:grid-cols-3">
              {optimizeRefs.map((group) => (
                <article key={group.group} className={cn("rounded-[1.8rem] border-[3px] border-white p-5", TONE.sun)}>
                  <h4 className="font-cute text-xl text-amber-500">{group.group}</h4>
                  <div className="mt-3 space-y-3">
                    {group.items.map((item) => (
                      <div key={item.play} className="rounded-2xl bg-white/80 px-3 py-3">
                        <p className="font-cute text-sm text-foreground/80">{item.play}</p>
                        <p className="mt-1 text-sm leading-6 text-foreground/60">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payouts" className="mt-6">
          <div className="mb-4 flex items-center gap-2">
            <Mascot kind="pudding" className="sanrio-bounce size-12" />
            <div>
              <h2 className="font-cute text-2xl text-amber-500">奖励发放一览</h2>
              <p className="mt-1 text-sm leading-6 text-foreground/65">
                按场次核对发了多少人次。页顶 {optimizeResult.awards} / {optimizeResult.uniqueWinners}{" "}
                是统一复盘口径；下表方便点开查每一场。
              </p>
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPhase("after")}
                className={cn(
                  "rounded-full px-4 py-2 font-cute text-sm",
                  phase === "after" ? "bg-rose-400 text-white" : "bg-white/80 text-rose-400",
                )}
              >
                策略后
              </button>
              <button
                type="button"
                onClick={() => setPhase("all")}
                className={cn(
                  "rounded-full px-4 py-2 font-cute text-sm",
                  phase === "all" ? "bg-rose-400 text-white" : "bg-white/80 text-rose-400",
                )}
              >
                含过渡场
              </button>
            </div>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜活动名、标签或日期"
              className="h-10 rounded-full border-white bg-white/90"
            />
          </div>
          <p className="mb-3 font-cute text-sm text-rose-400">
            当前 {rows.length} 场 · 发放 {tableAwards} 人次
          </p>
          <div className="overflow-hidden rounded-[1.8rem] border-[3px] border-white bg-white/85">
            <div className="hidden grid-cols-[1fr_8rem_5rem_5rem] gap-2 border-b border-rose-100 px-4 py-3 font-cute text-xs text-rose-400 sm:grid">
              <span>活动</span>
              <span>时间</span>
              <span>人次</span>
              <span>阶段</span>
            </div>
            {rows.length ? (
              rows.map((row) => (
                <div
                  key={`${row.name}-${row.period}`}
                  className="grid gap-1 border-b border-rose-50 px-4 py-3 last:border-0 sm:grid-cols-[1fr_8rem_5rem_5rem] sm:gap-2 sm:border-0"
                >
                  <div className="min-w-0">
                    <p className="font-cute leading-6 text-rose-500">{row.name}</p>
                    <p className="text-[11px] text-foreground/45">
                      {row.tag} · {row.period}
                      <span className="sm:hidden">
                        {" "}
                        · {row.after ? "策略后" : "过渡"}
                      </span>
                    </p>
                  </div>
                  <span className="hidden text-xs leading-6 text-foreground/60 sm:block">{row.period}</span>
                  <span className="font-num text-lg text-rose-500 sm:text-base">{row.awards} 人次</span>
                  <span className={cn("hidden text-xs leading-6 sm:block", row.after ? "text-teal-600" : "text-violet-400")}>
                    {row.after ? "策略后" : "过渡"}
                  </span>
                </div>
              ))
            ) : (
              <p className="px-4 py-8 text-center text-sm text-rose-400">没有匹配的场次</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

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
    </div>
  );
}

function MiniKpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.6rem] border-[3px] border-white bg-white/85 px-3 py-3 text-center">
      <p className="font-cute text-[11px] text-rose-400">{label}</p>
      <p className="font-num mt-1 text-xl text-violet-500 sm:text-2xl">{value}</p>
    </div>
  );
}
