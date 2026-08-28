export type CaseCompare = {
  label: string;
  before: string;
  beforeHint?: string;
  after: string;
  afterHint?: string;
  delta: string;
};

export type CaseStudy = {
  id: string;
  community: "A" | "B" | "C" | "D";
  mascot: "berry" | "mint" | "grape" | "pudding";
  tone: "pink" | "mint" | "grape" | "sun";
  practice: string;
  activity: string;
  href: string;
  headline: string;
  headlineNote: string;
  compare: CaseCompare[];
  takeaway: string;
};

export const caseHighlights = [
  { id: "d-ugc-track", value: "19倍", label: "UGC 转化效率", tone: "sun" as const },
  { id: "a-vote-comment", value: "4.35倍", label: "茶话会参与率", tone: "pink" as const },
  { id: "d-exposure", value: "4.2倍", label: "里程碑曝光", tone: "grape" as const },
  { id: "b-quiz", value: "+108%", label: "Quiz Bot 打卡", tone: "mint" as const },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "d-ugc-track",
    community: "D",
    mascot: "pudding",
    tone: "sun",
    practice: "双轨降低 UGC 门槛",
    activity: "端午祈福 vs 阵营对决",
    href: "/communities/d",
    headline: "19倍",
    headlineNote: "轻度参与做成深度创作的转化效率",
    compare: [
      {
        label: "转化率",
        before: "1.4%",
        beforeHint: "阵营投票 → UGC",
        after: "22.8%",
        afterHint: "端午发言 → UGC",
        delta: "约 19 倍",
      },
      {
        label: "阵营对决",
        before: "1,883 人",
        beforeHint: "一键投票",
        after: "26 人",
        afterHint: "交成片作业",
        delta: "漏斗断崖",
      },
      {
        label: "端午祈福",
        before: "79 人",
        beforeHint: "先留一句",
        after: "18 人",
        afterHint: "再可选晒图",
        delta: "转化站住",
      },
    ],
    takeaway:
      "投票能破冰，第二步别直接要成片。先留一句、再可选晒图，转化才会从 1.4% 跳到 22.8%。",
  },
  {
    id: "a-vote-comment",
    community: "A",
    mascot: "berry",
    tone: "pink",
    practice: "投票 + 轻评论",
    activity: "茶话会 · 黄金周预热",
    href: "/communities/a",
    headline: "4.35倍",
    headlineNote: "参与率较前期同规模茶话会",
    compare: [
      {
        label: "参与率",
        before: "4.10 那场",
        beforeHint: "纯文字留言",
        after: "黄金周这场",
        afterHint: "投票 + 轻评论",
        delta: "4.35 倍",
      },
      {
        label: "黄金周票数",
        before: "写一段才算",
        beforeHint: "同规模茶话会",
        after: "95 票",
        afterHint: "另有 12 条轻评",
        delta: "点一下就完成",
      },
      {
        label: "日区人数",
        before: "26 人",
        beforeHint: "茶话会 #35",
        after: "34 人",
        afterHint: "茶话会 #36",
        delta: "+30.8%",
      },
    ],
    takeaway:
      "日区把投票做成主路径后，#35 到 #36 从 26 人拉到 34 人。同样的茶话会，点一下比写一段稳得多。",
  },
  {
    id: "d-exposure",
    community: "D",
    mascot: "pudding",
    tone: "sun",
    practice: "分层解锁 + 每日话题",
    activity: "主城里程碑预热",
    href: "/communities/d",
    headline: "4.2倍",
    headlineNote: "活动频道曝光 vs 同类 14 天周期",
    compare: [
      {
        label: "曝光",
        before: "4,131 人",
        beforeHint: "同类 14 天",
        after: "17,234 人",
        afterHint: "主城里程碑",
        delta: "4.2 倍",
      },
      {
        label: "次日消息",
        before: "198 条",
        beforeHint: "首日",
        after: "552 条",
        afterHint: "次日爆发",
        delta: "+178.8%",
      },
      {
        label: "中期节奏",
        before: "做完即冷",
        beforeHint: "单峰衰减",
        after: "388 条",
        afterHint: "第四日回升",
        delta: "双峰",
      },
    ],
    takeaway:
      "Gate 分层解锁配每日剧情话题，曝光能到同类活动的 4.2 倍。次日消息 +178.8%，第四日还能再抬一波，不是发完预热就结束。",
  },
  {
    id: "b-quiz",
    community: "B",
    mascot: "mint",
    tone: "mint",
    practice: "Quiz Bot 打卡",
    activity: "主机预言家",
    href: "/communities/b",
    headline: "+108.4%",
    headlineNote: "频道打卡人数 vs 7 月同类型打卡",
    compare: [
      {
        label: "频道打卡",
        before: "143 人",
        beforeHint: "7 月骑乘打卡",
        after: "298 人",
        afterHint: "晒分打卡",
        delta: "+108.4%",
      },
      {
        label: "答题人数",
        before: "请发一张图",
        beforeHint: "截图作业",
        after: "2,154 人",
        afterHint: "Bot 立刻出分",
        delta: "可铺量",
      },
      {
        label: "参与率",
        before: "0.5%",
        beforeHint: "骑乘打卡",
        after: "6.62%",
        afterHint: "Quiz 这场",
        delta: "可复开",
      },
    ],
    takeaway: "考核、打分、立刻出结果，比「请发一张图」更能把人留在频道里。",
  },
  {
    id: "d-bot",
    community: "D",
    mascot: "pudding",
    tone: "sun",
    practice: "Bot 交互闯关",
    activity: "版本解谜 + 官方情报匣",
    href: "/communities/d",
    headline: "1,153次",
    headlineNote: "情报匣 Bot 交互；解谜另有 3,948 条消息",
    compare: [
      {
        label: "解谜消息",
        before: "253 条",
        beforeHint: "同月话题讨论",
        after: "3,948 条",
        afterHint: "Bot 八道机关",
        delta: "约 15.6 倍",
      },
      {
        label: "情报匣",
        before: "纯浏览预热",
        beforeHint: "看完就算",
        after: "1,153 次",
        afterHint: "成功 501 次",
        delta: "可闯关",
      },
      {
        label: "解谜反应",
        before: "488 人参与",
        beforeHint: "交流线索",
        after: "925",
        afterHint: "本月单场消息最高",
        delta: "可复盘进度",
      },
    ],
    takeaway:
      "Bot 把版更预热做成闯关：解谜单场 3,948 条消息、925 反应；情报匣再用文字 + Emoji 谜题拿到 1,153 次交互、6,150 曝光。发一篇预热帖只能看浏览，闯关能记下谁解出来了。",
  },
  {
    id: "d-milestone",
    community: "D",
    mascot: "pudding",
    tone: "sun",
    practice: "召回加里程碑",
    activity: "邮箱绑定三轮",
    href: "/communities/d",
    headline: "+95.7%",
    headlineNote: "加里程碑后回传人数 vs 上一轮",
    compare: [
      {
        label: "第一轮",
        before: "新玩法",
        beforeHint: "截图回传",
        after: "3,480 人",
        afterHint: "雪原那场",
        delta: "峰值",
      },
      {
        label: "连做两轮",
        before: "546 人",
        beforeHint: "第二轮",
        after: "169 人",
        afterHint: "第三轮",
        delta: "明显递减",
      },
      {
        label: "加里程碑",
        before: "169 人",
        beforeHint: "原作业再发",
        after: "321 人",
        afterHint: "加上奖池",
        delta: "+95.73%",
      },
    ],
    takeaway:
      "同一套截图回传连做会掉。第三轮加上里程碑奖池，才把 169 拉回 321，不是把原作业再发一遍。",
  },
  {
    id: "d-collect",
    community: "D",
    mascot: "pudding",
    tone: "sun",
    practice: "换卡刚需社交",
    activity: "集结令 → H5 集换卡",
    href: "/communities/d",
    headline: "+74.7%",
    headlineNote: "H5 集换卡反应数 vs 集结令同期",
    compare: [
      {
        label: "反应数",
        before: "集结令同期",
        beforeHint: "求卡频道",
        after: "H5 集换卡",
        afterHint: "跨端导流",
        delta: "+74.73%",
      },
      {
        label: "消息",
        before: "集结令",
        beforeHint: "11,712 条",
        after: "6,243 条",
        afterHint: "H5 这场",
        delta: "环比 +33.2%",
      },
      {
        label: "人数",
        before: "1,196 人次",
        beforeHint: "集结令",
        after: "919 人",
        afterHint: "H5 集换卡",
        delta: "刚需自己来",
      },
    ],
    takeaway:
      "玩家本来就要换卡，频道只是把交易摊开。反应数环比能到 +74.73%，比求投稿硬得多。",
  },
  {
    id: "c-welfare",
    community: "C",
    mascot: "grape",
    tone: "grape",
    practice: "福利截图透传",
    activity: "福利前瞻 / 全球同频惊喜",
    href: "/communities/c",
    headline: "2.4倍",
    headlineNote: "福利透传场均人数 vs 内容征集",
    compare: [
      {
        label: "场均人数",
        before: "26 人",
        beforeHint: "内容征集",
        after: "63 人",
        afterHint: "福利透传",
        delta: "2.4 倍",
      },
      {
        label: "代表场",
        before: "穿搭 / 地图投稿",
        beforeHint: "要创作",
        after: "122 人",
        afterHint: "福利前瞻",
        delta: "峰值",
      },
      {
        label: "社区互动",
        before: "征集创作",
        beforeHint: "高成本",
        after: "场均 68 人",
        afterHint: "找搭子",
        delta: "也稳",
      },
    ],
    takeaway: "C 盘里，把端内福利截图丢进频道，比征集创作更能抬人数。投稿留给整活节点。",
  },
];
