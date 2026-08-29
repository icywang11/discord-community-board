export type OptimizeFact = {
  title: string;
  body: string;
};

export type OptimizeMove = {
  title: string;
  items: string[];
};

export type OptimizeGoal = {
  tier: string;
  items: { label: string; body: string }[];
};

export type OptimizeRef = {
  group: string;
  items: { play: string; note: string }[];
};

export type RewardRound = {
  name: string;
  period: string;
  awards: number;
  after: boolean;
  tag: string;
};

export const optimizeCommunity = "C" as const;

/** Published recap after the late-July design change. */
export const optimizeResult = {
  since: "7 月下旬",
  awards: 58,
  uniqueWinners: 38,
  repeatBefore: 0.5794,
  repeatAfter: 0.3448,
  pointDrop: 23.46,
  relativeDrop: 0.4049,
};

export const optimizeBefore = {
  months: "6–7 月",
  events: 13,
  awards: 107,
  uniqueWinners: 45,
  twoPlusShare: 0.6222,
  twoPlusCount: 28,
  avgAprMay: 33,
  avgJunJul: 23,
  visitors: "2,000–2,400",
};

export const optimizeFacts: OptimizeFact[] = [
  {
    title: "中奖重合偏高",
    body: `${optimizeBefore.months}共 ${optimizeBefore.events} 场，累计发放 ${optimizeBefore.awards} 份，实际 ${optimizeBefore.uniqueWinners} 人拿到。其中 ${optimizeBefore.twoPlusCount} 人（${(optimizeBefore.twoPlusShare * 100).toFixed(2)}%）中奖不少于 2 次。每 10 个中过奖的人里，超过 6 个是熟面孔。`,
  },
  {
    title: "场均从 33 掉到 23",
    body: `4–5 月场均约 ${optimizeBefore.avgAprMay} 人，相对稳在 30+；6–7 月场均约 ${optimizeBefore.avgJunJul} 人，波动到 10–44。降门槛（能打字就不强制配图）没有把人数拉稳。`,
  },
  {
    title: "浏览在掉，人还在",
    body: `6 月中旬版本合并是浏览量和参与人数的下滑拐点。国际服周访客仍在 ${optimizeBefore.visitors}，没有崩盘。人没走，是活动不够想点。`,
  },
  {
    title: "负向循环",
    body: "参与人少 → 中奖可选池变窄 → 中奖人固化 → 新用户更不想来。要先把池子做大，再谈转化。",
  },
];

export const optimizeMoves: OptimizeMove[] = [
  {
    title: "从降门槛转向增强吸引力",
    items: [
      "结合版本主题、当下热点设计活动，不要只做「点一下就结束」。",
      "加入 UGC 和互动向活动：猜题、投票、表情包、穿搭，让频道里有东西可看。",
    ],
  },
  {
    title: "给长期未中奖的人专场",
    items: [
      "每个赛季一场：上一赛季没中过奖的人，下一赛季有一次低门槛破冰局。",
      "专场占比大约 5%，避免整月都抬门槛。",
    ],
  },
  {
    title: "奖励跟主题走",
    items: [
      "场景主题配对应代币，角色主题配对应代币，赛季主题配加速类道具。",
      "通用代币只做兜底，不要每场都发同一套。",
    ],
  },
];

export const optimizeMix = [
  { grade: "S", share: "5%", form: "UGC 创作", note: "每赛季一场，给自由发挥" },
  { grade: "A", share: "26%", form: "热点产出 + 拉新打卡", note: "趣味和产出一起要" },
  { grade: "B", share: "68%", form: "低门槛分享 + 未中奖专场", note: "专场约 5%，托住人数" },
];

export const optimizeGoals: OptimizeGoal[] = [
  {
    tier: "基础目标",
    items: [
      { label: "单场平均人数", body: "从 15–23 人回到稳定 30+ 人/场，对齐合并前。" },
      { label: "人数稳定性", body: "连续 4 周以上，维持在 ±5 人区间波动。" },
      { label: "中奖固化", body: "名单重合度下降，更多新人 ID 出现在中奖结果里。" },
    ],
  },
  {
    tier: "进阶目标",
    items: [
      {
        label: "参与率",
        body: "30+ 站稳后再往 50+ 走。用端内导流帮忙，绑定后到社区领奖。",
      },
      { label: "产出质量", body: "有效投稿量和内容质量一起抬，不只看人次。" },
    ],
  },
  {
    tier: "终极目标",
    items: [
      {
        label: "进门就能感到热",
        body: "活动帖热度上升。新用户进 Discord 能直观感到社区还活着。",
      },
      {
        label: "内容可二次用",
        body: "进阶活动产出的优质内容，既丰富社区，也可拿到官方社媒再发一遍。",
      },
      {
        label: "基数够了再细调",
        body: "参与基数扩大后，各维度统计才更有参考价值。",
      },
    ],
  },
];

export const optimizeRefs: OptimizeRef[] = [
  {
    group: "海外社区",
    items: [
      { play: "点赞即可抽奖", note: "主路径尽量轻，另开一条鼓励图文分享。" },
      { play: "借热点做内容", note: "大赛事、新外观节点，请玩家晒搭配、设计、截图。" },
      { play: "低门槛讲看法", note: "互动类话题，让玩家说一句自己的见解就够。" },
    ],
  },
  {
    group: "社媒频道",
    items: [
      { play: "找搭子专区", note: "单独开交友、组队发帖分区，刚需自己会来。" },
      { play: "创作者福利", note: "激励玩家投稿和二次分享，而不是只转发公告。" },
      { play: "公告同步转载", note: "官网更新当天，社区用同一口径再讲一遍。" },
    ],
  },
  {
    group: "同类产品",
    items: [
      { play: "做完任务领装扮", note: "低动作、即时到账，适合做周常底座。" },
      { play: "创作者福利场", note: "给爱产出的人专属激励，沉淀可转载素材。" },
      { play: "官方口吻同步", note: "用官方账号语气同步游戏公告，减少二手信息差。" },
      { play: "充值返点场", note: "大节点才用，不拿来撑日常人数。" },
    ],
  },
];

/** Per-round awards for lookup. Names are fuzzed; no user IDs or token names. */
export const rewardRounds: RewardRound[] = [
  { name: "每周小话题 · 性格测试", period: "7.27", awards: 5, after: true, tag: "周常" },
  { name: "新赛季预热 · 找线索", period: "7.23–7.26", awards: 10, after: false, tag: "预热" },
  { name: "7 月优质地图推荐", period: "7.20–7.30", awards: 10, after: false, tag: "地图" },
  { name: "角色穿搭挑战", period: "7.24–7.30", awards: 10, after: false, tag: "穿搭" },
  { name: "每周小话题 · 水果王", period: "8.3", awards: 5, after: true, tag: "周常" },
  { name: "副玩法通关分享", period: "7.24–7.30", awards: 10, after: false, tag: "副玩法" },
  { name: "新赛季颜值站队", period: "7.30–8.2", awards: 8, after: true, tag: "投票" },
  { name: "新赛季排名争霸", period: "7.30–8.9", awards: 10, after: true, tag: "冲分" },
  { name: "上赛季未中奖专场", period: "8.5–8.9", awards: 4, after: true, tag: "破冰" },
  { name: "每周小话题 · 新街道", period: "8.10", awards: 5, after: true, tag: "周常" },
  { name: "整活创作大赏", period: "8.3–8.10", awards: 15, after: true, tag: "UGC" },
  { name: "每周小话题 · 钓鱼", period: "8.17", awards: 5, after: true, tag: "周常" },
  { name: "主题关卡打卡", period: "8.7–8.20", awards: 8, after: true, tag: "打卡" },
  { name: "每周小话题 · 种植", period: "8.24", awards: 5, after: true, tag: "周常" },
  { name: "射击玩法战绩晒图", period: "8.21–8.25", awards: 8, after: true, tag: "晒图" },
];
