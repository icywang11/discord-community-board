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

const PASTEL = ["#1a1a1a", "#6f6b64", "#a39e94", "#c8c3b8", "#8a8680", "#4a4742"];

function Empty({ text }: { text: string }) {
  return (
    <div className="grid h-48 place-items-center text-sm text-muted-foreground">{text}</div>
  );
}

export function ParticipantsTrend({ activities }: { activities: Activity[] }) {
  const data = monthlySeries(activities).map((row) => ({
    ...row,
    label: monthLabel(row.month),
  }));
  if (!data.length) return <Empty text="还没有月度数据哦" />;
  const config = {
        participants: { label: "参与人数", color: "#1a1a1a" },
        count: { label: "场次", color: "#8a8680" },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={config} className="aspect-auto h-60 w-full">
      <AreaChart data={data} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} stroke="#e6e2d9" />
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
        <Area dataKey="participants" type="monotone" fill="#eceae4" stroke="#1a1a1a" strokeWidth={1.6} />
      </AreaChart>
    </ChartContainer>
  );
}

export function TypeBars({ activities }: { activities: Activity[] }) {
  const data = groupBy(activities, "type").slice(0, 7);
  if (!data.length) return <Empty text="还没有类型数据哦" />;
  const config = { value: { label: "参与", color: "#1a1a1a" } } satisfies ChartConfig;
  return (
    <ChartContainer config={config} className="aspect-auto h-60 w-full">
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 12 }}>
        <CartesianGrid horizontal={false} stroke="#e6e2d9" />
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
    messages: { label: "周消息", color: "#1a1a1a" },
    visitors: { label: "周访客", color: "#8a8680" },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={config} className="aspect-auto h-60 w-full">
      <AreaChart data={data} margin={{ left: 8, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} stroke="#e6e2d9" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} interval={2} />
        <YAxis tickLine={false} axisLine={false} width={44} tickFormatter={(v) => formatNumber(Number(v))} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area dataKey="messages" type="monotone" stroke="#1a1a1a" fill="#eceae4" strokeWidth={1.6} />
        <Area dataKey="visitors" type="monotone" stroke="#8a8680" fill="#f3f2ee" strokeWidth={1.6} />
      </AreaChart>
    </ChartContainer>
  );
}
