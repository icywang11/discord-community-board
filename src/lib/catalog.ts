import catalogJson from "@/data/communities.json";
import type { Activity, Catalog, Community } from "@/lib/types";

export const catalog = catalogJson as Catalog;

export function getCommunity(id: string): Community | undefined {
  return catalog.communities.find((item) => item.id === id);
}

export function monthLabel(month: string): string {
  const match = month.match(/^(\d{4})-(\d{2})$/);
  if (!match) return month || "未标注";
  return `${Number(match[2])}月`;
}

export function formatNumber(value: number, digits = 1): string {
  if (!Number.isFinite(value) || value === 0) return "0";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 100_000_000) return `${sign}${(abs / 100_000_000).toFixed(digits)}亿`;
  if (abs >= 10_000) return `${sign}${(abs / 10_000).toFixed(digits)}万`;
  if (abs >= 1000) return `${sign}${Math.round(abs).toLocaleString("zh-CN")}`;
  return `${sign}${abs % 1 === 0 ? abs : abs.toFixed(digits)}`;
}

export function formatPercent(value: number, digits = 1): string {
  if (!Number.isFinite(value) || value <= 0) return "—";
  return `${(value * 100).toFixed(digits)}%`;
}

export function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "zh-CN"));
}

export function sum(activities: Activity[], key: keyof Activity): number {
  return activities.reduce((acc, item) => acc + Number(item[key] || 0), 0);
}

export function avgRate(activities: Activity[]): number {
  const withRate = activities.filter((item) => item.rate > 0 && item.visits > 0);
  if (withRate.length) {
    const visits = sum(withRate, "visits");
    const people = sum(withRate, "participants");
    return visits ? people / visits : 0;
  }
  const withDau = activities.filter((item) => item.extra?.dau && item.participants);
  if (withDau.length) {
    const dau = withDau.reduce((acc, item) => acc + item.extra.dau, 0);
    const people = sum(withDau, "participants");
    return dau ? people / dau : 0;
  }
  return 0;
}

export function groupBy<T extends string>(
  activities: Activity[],
  key: keyof Activity,
  metric: "participants" | "engagement" | "visits" | "count" = "participants",
) {
  const map = new Map<string, { name: string; value: number; count: number; rateSum: number; rateN: number }>();
  for (const item of activities) {
    const name = String(item[key] || "未标注");
    const row = map.get(name) ?? { name, value: 0, count: 0, rateSum: 0, rateN: 0 };
    row.count += 1;
    row.value += metric === "count" ? 1 : Number(item[metric] || 0);
    if (item.rate > 0) {
      row.rateSum += item.rate;
      row.rateN += 1;
    }
    map.set(name, row);
  }
  return [...map.values()]
    .map((row) => ({ ...row, rate: row.rateN ? row.rateSum / row.rateN : 0 }))
    .sort((a, b) => b.value - a.value);
}

export function monthlySeries(activities: Activity[]) {
  const map = new Map<
    string,
    { month: string; count: number; participants: number; engagement: number; visits: number }
  >();
  for (const item of activities) {
    const key = item.month || "未标注";
    const row = map.get(key) ?? {
      month: key,
      count: 0,
      participants: 0,
      engagement: 0,
      visits: 0,
    };
    row.count += 1;
    row.participants += item.participants;
    row.engagement += item.engagement;
    row.visits += item.visits;
    map.set(key, row);
  }
  return [...map.values()].sort((a, b) => a.month.localeCompare(b.month));
}

export function topActivities(activities: Activity[], limit = 3): Activity[] {
  const rates = activities.map((item) => item.rate).filter((n) => n > 0);
  const people = activities.map((item) => item.participants);
  const maxRate = Math.max(...rates, 0.0001);
  const maxPeople = Math.max(...people, 1);
  return [...activities]
    .map((item) => {
      const rateScore = item.rate > 0 ? item.rate / maxRate : 0;
      const peopleScore = item.participants / maxPeople;
      const score =
        item.rate > 0 ? rateScore * 0.55 + peopleScore * 0.45 : peopleScore;
      return { item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((row) => row.item);
}

export function allActivities(): Activity[] {
  return catalog.communities.flatMap((item) => item.activities);
}
