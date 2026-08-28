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

export const optimizeCommunity = "C" as const;

export const optimizeFacts: OptimizeFact[] = [
  {
    title: "中奖重合偏高",
    body: "6–7 月共 13 场，62.22% 的中奖人中奖次数不低于 2 次。名单转来转去，新面孔进不来。",
  },
  {
    title: "浏览在掉，人还在",
    body: "全球同频为活动浏览量和参与人数明显下滑拐点，但社区访容量未出现大规模流失。人没走，是活动不够想点。",
  },
  {
    title: "奖励不新鲜",
    body: "同一套奖池连开，玩家很快知道「还是那些东西」。缺少主题变化，参与意愿会被磨掉。",
  },
  {
    title: "负向循环",
    body: "参与人少 → 中奖用户可选池变窄 → 中奖人固化 → 新用户参与动力更低。要先把池子做大，再谈转化。",
  },
];

export const optimizeMoves: OptimizeMove[] = [
  {
    title: "从降门槛转向增强吸引力",
    items: [
      "结合版本主题、当下热点设计活动，不要只做「点一下就结束」。",
      "加入 UGC 和互动向活动，让频道里有东西可看、可跟。",
    ],
  },
  {
    title: "给长期未中奖的人专场",
    items: [
      "单独开一场破冰局，让很少中奖的人先动起来。",
      "防止中奖名单固化，新 ID 要能出现在开奖结果里。",
    ],
  },
  {
    title: "奖励跟主题走",
    items: [
      "场景主题配对应代币，角色主题配对应代币。",
      "通用代币只做兜底，不要每场都发同一套。",
    ],
  },
];

export const optimizeGoals: OptimizeGoal[] = [
  {
    tier: "基础目标",
    items: [
      { label: "单场平均人数", body: "提升 20–30%，回到全球同频前的水平。" },
      { label: "人数稳定性", body: "连续 4 周以上，维持在 ±5 人区间波动。" },
      { label: "中奖固化", body: "名单重合度下降，更多新人 ID 出现在中奖结果里。" },
    ],
  },
  {
    tier: "进阶目标",
    items: [
      {
        label: "参与率",
        body: "用端内导流帮忙抬人数，例如在端内完成绑定后再到社区领奖。",
      },
      { label: "产出质量", body: "有效投稿量和内容质量一起抬，不只看人次。" },
    ],
  },
  {
    tier: "终极目标",
    items: [
      {
        label: "进门就能感到热",
        body: "活动帖热度上升。新用户进 Discord 能直观感到社区还活着，留存才跟得上。",
      },
      {
        label: "内容可二次用",
        body: "进阶活动产出的优质内容，既丰富社区，也可拿到官方社媒再发一遍。",
      },
      {
        label: "基数够了再细调",
        body: "参与基数扩大后，各维度统计才更有参考价值，后面才能精细化调优。",
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
