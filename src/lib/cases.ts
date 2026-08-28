export type CaseCompare = {
  label: string;
  before: string;
  after: string;
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

export const caseStudies: CaseStudy[] = [
  {
    id: "a-vote-comment",
    community: "A",
    mascot: "berry",
    tone: "pink",
    practice: "投票 + 评论双轨",
    activity: "茶话会 · 黄金周预热",
    href: "/communities/a",
    headline: "4.35倍",
    headlineNote: "参与率较前期同规模茶话会",
    compare: [
      { label: "交互", before: "纯文字留言", after: "投票 + 轻评论", delta: "门槛下降" },
      { label: "参与率", before: "4.10 茶话会", after: "黄金周这场", delta: "+4.35倍" },
      { label: "日区人数", before: "26 人", after: "34 人", delta: "+30.8%" },
    ],
    takeaway: "日区把投票做成主路径后，人数从 26 拉到 34。同样的茶话会，点一下比写一段稳得多。",
  },
  {
    id: "b-one-click",
    community: "B",
    mascot: "mint",
    tone: "mint",
    practice: "一键点身份",
    activity: "节点庆典预热",
    href: "/communities/b",
    headline: "×1.57",
    headlineNote: "人数对比同类型轻点击（愚人节）",
    compare: [
      { label: "参与人数", before: "愚人节轻点击", after: "2,093 人", delta: "+1.57倍" },
      { label: "参与率", before: "同形态对照", after: "这场预热", delta: "+2.54%" },
      { label: "周常抽奖", before: "上月人次 9,593", after: "本月 +45%", delta: "+45%" },
    ],
    takeaway: "「点一下拿身份组」比还要猜、还要截图更能铺量。周常抽奖也是同一逻辑：低动作、可复开。",
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
      { label: "活动参与", before: "骑乘打卡", after: "2,154 人答题", delta: "铺量" },
      { label: "频道打卡", before: "7 月同类型", after: "298 人晒分", delta: "+108.4%" },
      { label: "参与率", before: "—", after: "6.62%", delta: "可复用" },
    ],
    takeaway: "考核、打分、立刻出结果，比「请发一张图」更能把人留在频道里。",
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
      { label: "场均人数", before: "内容征集 26 人", after: "福利透传 63 人", delta: "×2.4" },
      { label: "代表场", before: "穿搭 / 地图投稿", after: "福利前瞻 122 人", delta: "峰值" },
      { label: "社区互动", before: "—", after: "场均 68 人", delta: "找搭子也稳" },
    ],
    takeaway: "C 盘里，把端内福利截图丢进频道，比征集创作更能抬人数。投稿留给整活节点。",
  },
  {
    id: "d-card",
    community: "D",
    mascot: "pudding",
    tone: "sun",
    practice: "名片定期更新",
    activity: "主城名片 → 新版本名片",
    href: "/communities/d",
    headline: "+21.2%",
    headlineNote: "名片使用次数对比上一期",
    compare: [
      { label: "使用人数", before: "2,590 人", after: "2,897 人", delta: "+11.9%" },
      { label: "使用次数", before: "4,071 次", after: "4,936 次", delta: "+21.2%" },
      { label: "下一轮名片", before: "集卡期同期", after: "新版本一期 2,652 人", delta: "+13.72%" },
    ],
    takeaway: "名片每版本换一次背景，就是现成的打卡骨架。二期相对一期同期人数 +20.83%。",
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
      { label: "集结令人次", before: "上期", after: "1,196", delta: "环比 +6.98%" },
      { label: "集结令消息", before: "上期", after: "11,712 条", delta: "环比 +11.19%" },
      { label: "H5 集换卡", before: "集结令同期", after: "919 人 / 6,243 消息", delta: "消息 +33.2%" },
    ],
    takeaway: "玩家本来就要换卡，频道只是把交易摊开。反应数环比能到 +74.73%，比求投稿硬得多。",
  },
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
      { label: "阵营对决", before: "1,883 人投票", after: "26 人 UGC", delta: "转化 1.4%" },
      { label: "端午祈福", before: "79 人发言", after: "18 人 UGC", delta: "转化 22.8%" },
      { label: "效率", before: "一键投票→交作业", after: "文字赛道 + 截图赛道", delta: "约 19 倍" },
    ],
    takeaway: "投票能破冰，但第二步别直接要成片。先留一句、再可选晒图，转化才会从 1.4% 跳到 22.8%。",
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
      { label: "第一轮", before: "—", after: "3,480 人", delta: "新玩法" },
      { label: "第二 / 三轮", before: "546 人", after: "169 人", delta: "明显递减" },
      { label: "加里程碑", before: "169 人", after: "321 人", delta: "+95.73%" },
    ],
    takeaway: "同一套截图回传连做会掉。第三轮加上里程碑奖池，才把 169 拉回 321，不是把原作业再发一遍。",
  },
];
