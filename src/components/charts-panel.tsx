"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatNumber, monthLabel } from "@/lib/catalog";
import type { Activity, WeeklyPulse } from "@/lib/types";
import { groupBy, monthlySeries } from "@/lib/catalog";

const PASTEL = ["#ff7aa2", "#5ec8b8", "#a78bfa", "#f5b942", "#7eb6ff", "#ff9e80"];

function Empty({ text }: { text: string }) {
  return (
    <div className="grid h-48 place-items-center text-sm text-rose-400/80">{text}</div>
  );
}

export function ParticipantsTrend({ activities }: { activities: Activity[] }) {
  const data = monthlySeries(activities).map((row) => ({
    ...row,
    label: monthLabel(row.month),
  }));
  if (!data.length) return <Empty text="还没有月度数据哦" />;
  const config = {
    participants: { label: "参与人数", color: "#ff7aa2" },
    count: { label: "场次", color: "#5ec8b8" },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={config} className="aspect-auto h-60 w-full">
      <AreaChart data={data} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} stroke="#ffd6e7" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} width={44} tickFormatter={(v) => formatNumber(Number(v))} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex w-40 justify-between gap-4">
                  <span>{name === "participants" ? "参与人数" : "场次"}</span>
                  <span className="font-mono">{formatNumber(Number(value))}</span>
                </div>
              )}
            />
          }
        />
        <Area dataKey="participants" type="monotone" fill="#ffd6e7" stroke="#ff7aa2" strokeWidth={2} />
      </AreaChart>
    </ChartContainer>
  );
}

export function TypeBars({ activities }: { activities: Activity[] }) {
  const data = groupBy(activities, "type").slice(0, 7);
  if (!data.length) return <Empty text="还没有类型数据哦" />;
  const config = { value: { label: "参与", color: "#5ec8b8" } } satisfies ChartConfig;
  return (
    <ChartContainer config={config} className="aspect-auto h-60 w-full">
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 12 }}>
        <CartesianGrid horizontal={false} stroke="#d7f3ee" />
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" width={88} tickLine={false} axisLine={false} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) => <span className="font-mono">{formatNumber(Number(value))}</span>}
            />
          }
        />
        <Bar dataKey="value" radius={10}>
          {data.map((entry, i) => (
            <Cell key={entry.name} fill={PASTEL[i % PASTEL.length]} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

export function WeeklyChart({ weekly }: { weekly: WeeklyPulse[] }) {
  const data = weekly.map((row) => ({
    ...row,
    label: row.period.replace(/20\d{2}-/, ""),
  }));
  if (!data.length) return <Empty text="这个社区还没有周活曲线" />;
  const config = {
    messages: { label: "周消息", color: "#a78bfa" },
    visitors: { label: "周访客", color: "#f5b942" },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={config} className="aspect-auto h-60 w-full">
      <AreaChart data={data} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} stroke="#eadfff" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} interval={2} />
        <YAxis tickLine={false} axisLine={false} width={44} tickFormatter={(v) => formatNumber(Number(v))} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area dataKey="messages" type="monotone" stroke="#a78bfa" fill="#eadfff" strokeWidth={2} />
        <Area dataKey="visitors" type="monotone" stroke="#f5b942" fill="#ffe9b8" strokeWidth={2} />
      </AreaChart>
    </ChartContainer>
  );
}
