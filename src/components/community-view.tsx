"use client";

import { useMemo, useState } from "react";
import { ParticipantsTrend, TypeBars, WeeklyChart } from "@/components/charts-panel";
import { InsightsPanel } from "@/components/insights-panel";
import { CommunityDWeek } from "@/components/community-d-week";
import { CommunityName } from "@/components/community-name";
import { CommunitySize } from "@/components/community-size";
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
  const [tab, setTab] = useState("overview");

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
  const narrowed = month !== "all" || type !== "all" || region !== "all" || Boolean(query.trim());
  const showDWeek =
    community.id === "d" &&
    (month === "all" || month === "2026-08") &&
    type === "all" &&
    region === "all" &&
    !query.trim();
  const kpis = [
    { label: "活动场次", value: String(filtered.length), hint: "当前筛选" },
    { label: "参与人数", value: formatNumber(sum(filtered, "participants")), hint: "各场参与人数合计，场次间未再去重" },
    { label: "参与人次", value: formatNumber(sum(filtered, "engagement")), hint: "有记录时用参与人次 / 互动" },
    { label: "参与率", value: formatPercent(avgRate(filtered)), hint: "参与人数 ÷ 浏览人数" },
  ];

  return (
    <div data-accent={community.accent} className="flex flex-col gap-6">
      <section className="card-editorial p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Mascot kind={community.mascot} className="size-20 shrink-0 sm:size-24" />
          <div className="min-w-0">
            <p className="kicker">{community.kana}</p>
            <h1 className="mt-2 text-4xl sm:text-5xl">
              <CommunityName label={community.label} />
            </h1>
            <CommunitySize size={community.size} className="mt-3" />
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{community.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="rounded-full bg-foreground text-background">{community.period}</Badge>
              <Badge variant="secondary" className="rounded-full">
                {community.activities.length} 场活动
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {community.activities.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white px-6 py-16 text-center">
          <p className="font-display text-2xl text-muted-foreground">还没有参与人数可统计</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-foreground/70">
            这份社区缺按「参与人数」口径的原始表，所以不展示人数，避免把浏览量、曝光或外部传播量算进来。
          </p>
        </div>
      ) : (
        <>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((item) => (
          <div key={item.label} className="card-editorial px-4 py-4">
            <p className="kicker">{item.label}</p>
            <p className="mt-2 font-num text-2xl">{item.value}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{item.hint}</p>
          </div>
        ))}
      </div>

      <div className="card-editorial flex flex-col gap-3 p-4">
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

      {showDWeek ? <CommunityDWeek /> : null}
      {narrowed ? (
        <FilteredList
          activities={filtered}
          picked={picked}
          onPick={setPicked}
        />
      ) : null}

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="h-10 rounded-full bg-white px-1">
          <TabsTrigger value="overview" className="rounded-full px-4">
            总览
          </TabsTrigger>
          <TabsTrigger value="dims" className="rounded-full px-4">
            维度
          </TabsTrigger>
          <TabsTrigger value="table" className="rounded-full px-4">
            明细
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="flex flex-col gap-5 pt-4">
          <div>
            <h2 className="font-display text-2xl">综合表现 Top 3</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              按每场「参与人数」为主、参与率为辅打分。没有人数记录的场次不参与排名。
            </p>
          </div>
          <TopThree activities={top} />
          <div>
            <h2 className="font-display text-2xl">可以这样改</h2>
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
          <div className="card-editorial overflow-hidden">
            {filtered.length === 0 ? (
              <div className="p-10 text-center text-sm text-muted-foreground">没有符合筛选的活动，点一下「全部」再看看。</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>月份</TableHead>
                    <TableHead>活动</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead className="text-right">参与人数</TableHead>
                    <TableHead className="text-right">参与人次</TableHead>
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
            <div className="card-editorial mt-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="kicker">活动复盘</p>
                  <h3 className="mt-2 font-display text-xl">{picked.name}</h3>
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
        </>
      )}
    </div>
  );
}

function FilteredList({
  activities,
  picked,
  onPick,
}: {
  activities: Activity[];
  picked: Activity | null;
  onPick: (item: Activity | null) => void;
}) {
  if (!activities.length) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-white px-6 py-10 text-center text-sm text-muted-foreground">
        没有符合筛选的活动，点一下「全部」再看看。
      </div>
    );
  }
  return (
    <section className="card-editorial p-5 sm:p-6">
      <p className="kicker">当前筛选 · {activities.length} 场</p>
      <h2 className="mt-2 font-display text-2xl">这几场活动</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {activities.map((item) => {
          const open = picked?.id === item.id;
          return (
            <article
              key={item.id}
              className="cursor-pointer rounded-lg bg-[#f7f6f2] px-4 py-3"
              onClick={() => onPick(open ? null : item)}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-medium leading-6">{item.name}</h3>
                <p className="shrink-0 font-num text-lg">{formatNumber(item.participants)}</p>
              </div>
              <p className="mt-1 text-[11px] text-foreground/45">
                {item.type} · {item.period || monthLabel(item.month)}
              </p>
              {open ? (
                <p className="mt-2 text-sm leading-6 text-foreground/70">
                  {item.note || "这场没有留下文字小结，只保留了数字。"}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
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
    <section className="card-editorial p-4">
      <h3 className="font-display text-lg">{title}</h3>
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
