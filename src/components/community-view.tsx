"use client";

import { useMemo, useState } from "react";
import { ParticipantsTrend, TypeBars, WeeklyChart } from "@/components/charts-panel";
import { InsightsPanel } from "@/components/insights-panel";
import { Mascot } from "@/components/mascot";
import { TopThree } from "@/components/top-three";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  avgRate,
  formatNumber,
  formatPercent,
  monthLabel,
  sum,
  topActivities,
  unique,
} from "@/lib/catalog";
import { buildInsights } from "@/lib/insights";
import type { Activity, Community } from "@/lib/types";

export function CommunityView({ community }: { community: Community }) {
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [region, setRegion] = useState<string>("all");
  const [picked, setPicked] = useState<Activity | null>(null);

  const months = unique(community.activities.map((item) => item.month));
  const types = unique(community.activities.map((item) => item.type));
  const regions = unique(community.activities.map((item) => item.region));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return community.activities.filter((item) => {
      if (month !== "all" && item.month !== month) return false;
      if (type !== "all" && item.type !== type) return false;
      if (region !== "all" && item.region !== region) return false;
      if (!q) return true;
      return `${item.name} ${item.note} ${item.type}`.toLowerCase().includes(q);
    });
  }, [community.activities, month, type, region, query]);

  const insights = useMemo(() => buildInsights({ ...community, activities: filtered.length ? filtered : community.activities }), [community, filtered]);
  const top = topActivities(filtered.length ? filtered : community.activities, 3);
  const kpis = [
    { label: "活动场次", value: String(filtered.length), hint: "当前筛选" },
    { label: "参与人次", value: formatNumber(sum(filtered, "participants")), hint: "去重人数加总" },
    { label: "互动量", value: formatNumber(sum(filtered, "engagement")), hint: "评论 / 点击 / 投稿" },
    { label: "参与率", value: formatPercent(avgRate(filtered)), hint: "参与 ÷ 浏览" },
  ];

  return (
    <div data-accent={community.accent} className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-[2rem] border-2 border-white bg-white/80 p-5 shadow-[0_12px_40px_rgba(255,122,162,0.12)] sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Mascot kind={community.mascot} className="size-28 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs tracking-[0.28em] text-rose-400">{community.kana}</p>
            <h1 className="mt-1 font-display text-4xl text-rose-500">{community.label}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/70">{community.blurb}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="rounded-full bg-rose-100 text-rose-600">{community.period}</Badge>
              <Badge variant="secondary" className="rounded-full">
                {community.activities.length} 场活动
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((item) => (
          <div key={item.label} className="rounded-3xl border-2 border-white bg-white/80 px-4 py-4">
            <p className="text-xs text-rose-400">{item.label}</p>
            <p className="mt-1 font-display text-2xl text-rose-500">{item.value}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{item.hint}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-3xl border-2 border-white bg-white/70 p-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜活动、类型、复盘关键词…"
          className="rounded-full bg-white"
        />
        <FilterRow label="月份" value={month} onChange={setMonth} options={months} render={monthLabel} />
        <FilterRow label="类型" value={type} onChange={setType} options={types} />
        {regions.length > 1 ? (
          <FilterRow label="分区" value={region} onChange={setRegion} options={regions} />
        ) : null}
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="rounded-full bg-white/80">
          <TabsTrigger value="overview" className="rounded-full">
            总览
          </TabsTrigger>
          <TabsTrigger value="dims" className="rounded-full">
            维度
          </TabsTrigger>
          <TabsTrigger value="table" className="rounded-full">
            明细
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="flex flex-col gap-5 pt-4">
          <div>
            <h2 className="font-display text-2xl text-rose-500">综合表现 Top 3</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              综合参与率和参与人次打分。人数很大但没人点进去的，会排到转化更好的场次后面。
            </p>
          </div>
          <TopThree activities={top} />
          <div>
            <h2 className="font-display text-2xl text-rose-500">可以这样改</h2>
            <p className="mt-1 mb-3 text-sm text-muted-foreground">根据当前筛选里的结构自动归纳，给排期和玩法复用当备忘。</p>
            <InsightsPanel insights={insights} />
          </div>
        </TabsContent>
        <TabsContent value="dims" className="grid gap-4 pt-4 lg:grid-cols-2">
          <Panel title="月度参与" subtitle="把节点爆款做成可复用模板">
            <ParticipantsTrend activities={filtered} />
          </Panel>
          <Panel title="活动类型" subtitle="看哪一类真正在贡献人数">
            <TypeBars activities={filtered} />
          </Panel>
          {community.weekly.length ? (
            <div className="lg:col-span-2">
              <Panel title="社区周脉搏" subtitle="人数、消息、访客（有记录的周）">
                <WeeklyChart weekly={community.weekly} />
              </Panel>
            </div>
          ) : null}
        </TabsContent>
        <TabsContent value="table" className="pt-4">
          <div className="overflow-hidden rounded-3xl border-2 border-white bg-white/80">
            {filtered.length === 0 ? (
              <div className="p-10 text-center text-sm text-rose-400">没有符合筛选的活动，点一下「全部」再看看。</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>月份</TableHead>
                    <TableHead>活动</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead className="text-right">参与</TableHead>
                    <TableHead className="text-right">互动</TableHead>
                    <TableHead className="text-right">参与率</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((item) => (
                    <TableRow key={item.id} className="cursor-pointer" onClick={() => setPicked(item)}>
                      <TableCell>{monthLabel(item.month)}</TableCell>
                      <TableCell>
                        <div className="max-w-64 truncate font-medium">{item.name}</div>
                        <div className="text-[11px] text-muted-foreground">{item.period || "—"}</div>
                      </TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        {formatNumber(item.participants)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        {formatNumber(item.engagement)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">{formatPercent(item.rate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          {picked ? (
            <div className="mt-4 rounded-3xl border-2 border-rose-100 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-rose-400">活动复盘</p>
                  <h3 className="mt-1 font-display text-xl text-rose-500">{picked.name}</h3>
                </div>
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => setPicked(null)}>
                  收起
                </Button>
              </div>
              <p className="mt-3 text-sm leading-7 text-foreground/80">
                {picked.note || "这场没有留下文字小结，只保留了数字。"}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-xs text-muted-foreground">点击一行，可以看当场小结。</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border-2 border-white bg-white/80 p-4">
      <h3 className="font-display text-lg text-rose-500">{title}</h3>
      <p className="mb-2 text-xs text-muted-foreground">{subtitle}</p>
      {children}
    </section>
  );
}

function FilterRow({
  label,
  value,
  onChange,
  options,
  render,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  options: string[];
  render?: (value: string) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="w-10 text-xs text-muted-foreground">{label}</span>
      <Button size="xs" variant={value === "all" ? "default" : "outline"} className="rounded-full" onClick={() => onChange("all")}>
        全部
      </Button>
      {options.map((option) => (
        <Button
          key={option}
          size="xs"
          variant={value === option ? "default" : "outline"}
          className="rounded-full"
          onClick={() => onChange(option)}
        >
          {render ? render(option) : option}
        </Button>
      ))}
    </div>
  );
}
