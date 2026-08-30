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
  grape: "bg-white",
  pink: "bg-white",
  mint: "bg-white",
  sun: "bg-white",
  sky: "bg-white",
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
    <div>
      <p className="kicker">Page 05 · Optimization</p>
      <h1 className="mt-3">
        <BounceText as="span" text="社区数据优化" className="block text-4xl sm:text-6xl" />
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/70">
        <CommunityName label={`社区 ${optimizeCommunity}`} /> 这一盘按时间看：4–8 月先卡在哪，7 月下旬改玩法，然后对照发放结果。奖励只写人次，不写具体代币和名单。
      </p>

      <Tabs defaultValue="result" className="mt-8">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-full bg-white p-1">
          <TabsTrigger value="result" className="flex-none rounded-full px-4 py-2 data-active:bg-foreground data-active:text-background">
            落地结果
          </TabsTrigger>
          <TabsTrigger value="before" className="flex-none rounded-full px-4 py-2 data-active:bg-foreground data-active:text-background">
            调优前
          </TabsTrigger>
          <TabsTrigger value="plan" className="flex-none rounded-full px-4 py-2 data-active:bg-foreground data-active:text-background">
            优化方案
          </TabsTrigger>
          <TabsTrigger value="payouts" className="flex-none rounded-full px-4 py-2 data-active:bg-foreground data-active:text-background">
            发放明细
          </TabsTrigger>
        </TabsList>

        <TabsContent value="result" className="mt-6">
          <section className={cn("card-editorial p-5 sm:p-7", TONE.sky)}>
            <div className="flex items-start gap-3">
              <Mascot kind="grape" className="size-16 shrink-0" />
              <div>
                <p className="font-cute text-xs tracking-[0.2em] text-muted-foreground">策略落地后</p>
                <h2 className="mt-1 font-cute text-2xl text-foreground sm:text-3xl">中奖重复率压下来了</h2>
                <p className="mt-2 text-sm leading-7 text-foreground/70">
                  {optimizeResult.since}针对获奖玩家重复度高，落地了活动设计调优。统计到现在：累计发放{" "}
                  {optimizeResult.awards} 人次，去重 {optimizeResult.uniqueWinners} 人。
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <div className="rounded-lg bg-[#f7f6f2] px-4 py-4 text-center">
                <p className="font-cute text-xs text-muted-foreground">调优前重复率</p>
                <p className="mt-1 font-num text-3xl text-foreground sm:text-4xl">
                  <CountUp value={optimizeResult.repeatBefore * 100} decimals={2} suffix="%" />
                </p>
              </div>
              <div className="rounded-lg bg-[#f7f6f2] px-4 py-4 text-center">
                <p className="font-cute text-xs text-muted-foreground">调优后重复率</p>
                <p className="mt-1 font-num text-3xl text-foreground sm:text-4xl">
                  <CountUp value={optimizeResult.repeatAfter * 100} decimals={2} suffix="%" />
                </p>
              </div>
              <div className="rounded-lg bg-[#f7f6f2] px-4 py-4 text-center">
                <p className="font-cute text-xs text-muted-foreground">下降</p>
                <p className="mt-1 font-num text-3xl text-foreground sm:text-4xl">
                  <CountUp value={optimizeResult.pointDrop} decimals={2} suffix="pt" />
                </p>
              </div>
              <div className="rounded-lg bg-[#f7f6f2] px-4 py-4 text-center">
                <p className="font-cute text-xs text-muted-foreground">相对降幅</p>
                <p className="mt-1 font-num text-3xl text-foreground sm:text-4xl">
                  −<CountUp value={optimizeResult.relativeDrop * 100} decimals={2} suffix="%" />
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-[#f7f6f2] px-4 py-4">
                <p className="font-cute text-xs text-muted-foreground">发放人次</p>
                <p className="font-num mt-1 text-4xl text-foreground">
                  <CountUp value={optimizeResult.awards} />
                </p>
                <p className="mt-1 text-xs text-foreground/50">策略生效后累计</p>
              </div>
              <div className="rounded-lg bg-[#f7f6f2] px-4 py-4">
                <p className="font-cute text-xs text-muted-foreground">不同获奖用户</p>
                <p className="font-num mt-1 text-4xl text-foreground">
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
            <Mascot kind="grape" className="size-12" />
            <h2 className="font-cute text-2xl text-foreground">4–8 月先卡在哪</h2>
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
                className={cn("card-editorial p-5", TONE.grape)}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <h3 className="font-cute text-xl text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-foreground/75">{item.body}</p>
              </article>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plan" className="mt-6">
          <div className="mb-4 flex items-center gap-2">
            <Mascot kind="berry" className="size-12" />
            <h2 className="font-cute text-2xl text-foreground">活动怎么改、奖励怎么配</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {optimizeMoves.map((item, index) => (
              <article
                key={item.title}
                className={cn("card-editorial p-5", TONE.pink)}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <h3 className="font-cute text-xl text-foreground">{item.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground/75">
                  {item.items.map((line) => (
                    <li key={line} className="rounded-lg bg-[#f7f6f2] px-3 py-2">
                      {line}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {optimizeMix.map((item) => (
              <article key={item.grade} className={cn("card-editorial p-5", TONE.sun)}>
                <p className="font-cute text-xs text-foreground">建议占比</p>
                <p className="font-num mt-1 text-3xl text-foreground">{item.share}</p>
                <p className="mt-1 font-cute text-lg text-foreground">
                  {item.grade} · {item.form}
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground/65">{item.note}</p>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="font-cute text-2xl text-foreground">先盯这些目标</h3>
            <div className="mt-3 grid gap-3 lg:grid-cols-3">
              {optimizeGoals.map((group) => (
                <article key={group.tier} className={cn("card-editorial p-5", TONE.mint)}>
                  <p className="font-cute text-xs tracking-[0.2em] text-muted-foreground">{group.tier}</p>
                  <div className="mt-3 space-y-3">
                    {group.items.map((item) => (
                      <div key={item.label} className="rounded-lg bg-[#f7f6f2] px-3 py-3">
                        <p className="font-cute text-sm text-foreground">{item.label}</p>
                        <p className="mt-1 text-sm leading-6 text-foreground/70">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-cute text-2xl text-foreground">别处在用的做法</h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-foreground/65">只保留动作，不出现具体产品名。</p>
            <div className="mt-3 grid gap-3 lg:grid-cols-3">
              {optimizeRefs.map((group) => (
                <article key={group.group} className={cn("card-editorial p-5", TONE.sun)}>
                  <h4 className="font-cute text-xl text-foreground">{group.group}</h4>
                  <div className="mt-3 space-y-3">
                    {group.items.map((item) => (
                      <div key={item.play} className="rounded-lg bg-[#f7f6f2] px-3 py-3">
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
            <Mascot kind="pudding" className="size-12" />
            <div>
              <h2 className="font-cute text-2xl text-foreground">奖励发放一览</h2>
              <p className="mt-1 text-sm leading-6 text-foreground/65">
                下表按场次核对发了多少。环比用同一口径：重复率 =（发放人次 − 去重人数）÷ 发放人次。
              </p>
            </div>
          </div>
          <div className="card-editorial mb-5 p-4 sm:p-5">
            <p className="font-cute text-xs tracking-[0.2em] text-muted-foreground">中奖重复率环比</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-[#f7f6f2] px-3 py-3 text-center">
                <p className="font-cute text-[11px] text-muted-foreground">调优前</p>
                <p className="font-num mt-1 text-2xl text-foreground sm:text-3xl">
                  {(optimizeResult.repeatBefore * 100).toFixed(2)}%
                </p>
                <p className="mt-1 text-[11px] leading-5 text-foreground/50">
                  {optimizeBefore.awards} 份 / {optimizeBefore.uniqueWinners} 人
                </p>
              </div>
              <div className="rounded-lg bg-[#f7f6f2] px-3 py-3 text-center">
                <p className="font-cute text-[11px] text-muted-foreground">调优后</p>
                <p className="font-num mt-1 text-2xl text-foreground sm:text-3xl">
                  {(optimizeResult.repeatAfter * 100).toFixed(2)}%
                </p>
                <p className="mt-1 text-[11px] leading-5 text-foreground/50">
                  {optimizeResult.awards} 人次 / {optimizeResult.uniqueWinners} 人
                </p>
              </div>
              <div className="rounded-lg bg-[#f7f6f2] px-3 py-3 text-center">
                <p className="font-cute text-[11px] text-muted-foreground">环比</p>
                <p className="font-num mt-1 text-2xl text-foreground sm:text-3xl">−{optimizeResult.pointDrop}pt</p>
                <p className="mt-1 text-[11px] leading-5 text-foreground/50">
                  相对 −{(optimizeResult.relativeDrop * 100).toFixed(2)}%
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-6 text-foreground/60">
              {optimizeResult.since}策略生效后，发放人次里的重复比例从超过一半降到三分之一出头。名单换血，新面孔才进得来。
            </p>
          </div>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPhase("after")}
                className={cn(
                  "rounded-full px-4 py-2 font-cute text-sm",
                  phase === "after" ? "bg-foreground text-background" : "bg-white text-muted-foreground",
                )}
              >
                策略后
              </button>
              <button
                type="button"
                onClick={() => setPhase("all")}
                className={cn(
                  "rounded-full px-4 py-2 font-cute text-sm",
                  phase === "all" ? "bg-foreground text-background" : "bg-white text-muted-foreground",
                )}
              >
                含过渡场
              </button>
            </div>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜活动名、标签或日期"
              className="h-10 border-border bg-white"
            />
          </div>
          <p className="mb-3 font-cute text-sm text-muted-foreground">
            当前 {rows.length} 场 · 发放 {tableAwards} 人次
          </p>
          <div className="overflow-hidden card-editorial bg-white/85">
            <div className="hidden grid-cols-[1fr_8rem_5rem_5rem] gap-2 border-b border-border px-4 py-3 font-display text-xs text-muted-foreground sm:grid">
              <span>活动</span>
              <span>时间</span>
              <span>人次</span>
              <span>阶段</span>
            </div>
            {rows.length ? (
              rows.map((row) => (
                <div
                  key={`${row.name}-${row.period}`}
                  className="grid gap-1 border-b border-border px-4 py-3 last:border-0 sm:grid-cols-[1fr_8rem_5rem_5rem] sm:gap-2 sm:border-0"
                >
                  <div className="min-w-0">
                    <p className="font-cute leading-6 text-foreground">{row.name}</p>
                    <p className="text-[11px] text-foreground/45">
                      {row.tag} · {row.period}
                      <span className="sm:hidden">
                        {" "}
                        · {row.after ? "策略后" : "过渡"}
                      </span>
                    </p>
                  </div>
                  <span className="hidden text-xs leading-6 text-foreground/60 sm:block">{row.period}</span>
                  <span className="font-num text-lg text-foreground sm:text-base">{row.awards} 人次</span>
                  <span className={cn("hidden text-xs leading-6 sm:block", row.after ? "text-foreground" : "text-muted-foreground")}>
                    {row.after ? "策略后" : "过渡"}
                  </span>
                </div>
              ))
            ) : (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">没有匹配的场次</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/communities/c"
          className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "h-11 px-6")}
        >
          查看<CommunityName label="社区 C" className="mx-1" />明细
        </Link>
        <Link href="/tips" className={cn(buttonVariants({ size: "lg" }), "h-11 px-6")}>
          回到运营提示
        </Link>
      </div>
    </div>
  );
}

function MiniKpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-editorial px-3 py-3 text-center">
      <p className="kicker">{label}</p>
      <p className="font-num mt-1 text-xl sm:text-2xl">{value}</p>
    </div>
  );
}
