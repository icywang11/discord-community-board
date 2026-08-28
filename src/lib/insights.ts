import type { Activity, Community } from "@/lib/types";
import { avgRate, formatPercent, groupBy, monthlySeries, sum } from "@/lib/catalog";

export type Insight = {
  title: string;
  body: string;
  tone: "good" | "warn" | "idea";
};

function isLowBarrier(item: Activity): boolean {
  return /投票|Giveaway|抽奖|茶话会|点击|按钮|福利|登录|身份|名片|H5|促充/.test(
    `${item.name}${item.type}`,
  );
}

function isHighBarrier(item: Activity): boolean {
  return /截图|摄影|UGC|征集|创作|穿搭|建造|通关|投稿|共创/.test(
    `${item.name}${item.type}`,
  );
}

export function buildInsights(community: Community): Insight[] {
  const acts = community.activities;
  if (!acts.length) return [];
  const insights: Insight[] = [];
  const low = acts.filter(isLowBarrier);
  const high = acts.filter(isHighBarrier);
  const lowAvg = low.length ? sum(low, "participants") / low.length : 0;
  const highAvg = high.length ? sum(high, "participants") / high.length : 0;

  if (low.length && high.length && lowAvg > highAvg * 1.4) {
    insights.push({
      tone: "good",
      title: "低门槛互动更稳",
      body: `投票、抽奖、一键点击、茶话会这类活动，场均参与约 ${Math.round(lowAvg)} 人；截图 / 征集 / 创作类场均约 ${Math.round(highAvg)} 人。大盘促活请优先复用「一键完成」链路，高门槛玩法留给核心创作者。`,
    });
  }

  const types = groupBy(acts, "type", "participants");
  if (types[0]) {
    insights.push({
      tone: "good",
      title: `${types[0].name} 是人数引擎`,
      body: `${types[0].name} 贡献了最多参与人次（${types[0].count} 场）。排期上可以把它做成月度骨架，再用话题讨论和预热填补空档，避免连续两周都上高产出成本的征集。`,
    });
  }

  const rateTypes = [...groupBy(acts, "type", "count")].sort((a, b) => b.rate - a.rate);
  const bestRate = rateTypes.find((row) => row.rate > 0 && row.count >= 2);
  if (bestRate) {
    insights.push({
      tone: "idea",
      title: `${bestRate.name} 参与率更漂亮`,
      body: `同样看参与率，${bestRate.name} 平均约 ${formatPercent(bestRate.rate)}。人数不顶时，用这类形式「把看到的人变成参与的人」，比单纯加曝光更划算。`,
    });
  }

  const regionMix = groupBy(acts, "region", "participants").filter((row) => row.name !== "综合");
  if (regionMix.length >= 2) {
    const [lead, other] = regionMix;
    insights.push({
      tone: "idea",
      title: "分区主题要对齐生活场景",
      body: `${lead.name} 参与人数高于 ${other.name}。同一套玩法请拆成两个题目：投票更适合点击型分区，文字分享更适合讨论型分区；时事、连假、天气类话题能明显拉高对应分区。`,
    });
  }

  const hasJpTw = acts.some((item) => item.jp || item.tw);
  if (hasJpTw) {
    const jp = sum(acts, "jp");
    const tw = sum(acts, "tw");
    const bigger = jp >= tw ? "日区" : "繁中";
    const smaller = jp >= tw ? "繁中" : "日区";
    insights.push({
      tone: "idea",
      title: `${bigger} 更吃轻交互`,
      body: `日区累计 ${jp} 人、繁中累计 ${tw} 人。日区对投票 / NPC 回应 / 文字冒险更买账，对照片分享偏冷；${smaller} 更能撑起留言和共创。奖励可以分轨，不必两区同一份作业。`,
    });
  }

  const monthly = monthlySeries(acts);
  if (monthly.length >= 3) {
    const peak = [...monthly].sort((a, b) => b.participants - a.participants)[0];
    const dip = [...monthly].sort((a, b) => a.participants - b.participants)[0];
    insights.push({
      tone: "warn",
      title: "把爆款节点做成可复用模板",
      body: `参与高峰在 ${peak.month.slice(5)} 月，低谷在 ${dip.month.slice(5)} 月。高峰玩法（节日礼包、周常抽奖、H5、身份组点击）应沉淀成标准模板，低谷月用周常托底，而不是用高门槛征集硬拉。`,
    });
  }

  const missing = acts.filter((item) => item.visits <= 0 && !item.extra?.dau).length;
  if (missing / acts.length > 0.35) {
    insights.push({
      tone: "warn",
      title: "先把曝光口径补齐",
      body: `有 ${missing} 场缺少浏览量，参与率只能在有曝光的场次上比较。建议每场至少记「浏览人数 + 参与人数 + 参与人次」，否则 Top 活动很容易被人数绝对值带偏。`,
    });
  }

  const rate = avgRate(acts);
  insights.push({
    tone: "idea",
    title: "下阶段可以这样改",
    body:
      rate > 0.05
        ? `当前整体参与率约 ${formatPercent(rate)}，已经有稳定转化。下一步把「即时到账」「连续 3 天小任务」「投票后留一句理由」做成默认模块，让爆款可复制而不是靠单次灵感。`
        : `整体参与率仍偏低。优先砍掉「端内截图 + 社区发帖 + 组队」的三段作业，改成频道内一键完成；创作类保留，但明确它服务的是内容资产，不拿来考核大盘人数。`,
  });

  return insights.slice(0, 6);
}
