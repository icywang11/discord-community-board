export type PlaybookTip = {
  title: string;
  body: string;
  tag: string;
  mascot: "berry" | "mint" | "grape" | "pudding";
  tone: "pink" | "mint" | "grape" | "sun";
};

export const playbookTips: PlaybookTip[] = [
  {
    title: "先做一键完成",
    tag: "人数差最大",
    mascot: "berry",
    tone: "pink",
    body: "四个社区对过一遍：投票、抽奖、名片、打卡、H5 这类低门槛，场均大约两千人；截图征集 / 创作大约五十人。日常促活优先「点一下就完成」，别一上来就布置作业。",
  },
  {
    title: "月度骨架先钉住",
    tag: "排期",
    mascot: "mint",
    tone: "mint",
    body: "抽奖周常、积分商城、名片更新、茶话会，是最稳的人数底座。把它们排成每月骨架，空档用话题讨论填，不要连续两周都上高成本征集。",
  },
  {
    title: "UGC 留给大节点",
    tag: "别拿来考大盘",
    mascot: "grape",
    tone: "grape",
    body: "内容征集十二场，场均只有八十人左右。创作适合沉淀素材、找核心作者，不适合当大盘人数指标。小节点改投票讨论，大版本再开投稿。",
  },
  {
    title: "刚需社交比求分享香",
    tag: "消息量",
    mascot: "pudding",
    tone: "sun",
    body: "换卡、集卡、名片打卡会自己把人拉进频道；「请发一篇攻略」常常冷场。能做成收集、站队、接力的，就别做成命题作文。",
  },
  {
    title: "同一套玩法要分轨",
    tag: "分区",
    mascot: "mint",
    tone: "mint",
    body: "日区更吃投票和轻点击，繁中更能撑留言和共创。奖励、题目、完成方式拆开写，比两区共用一份作业省事，也更准。",
  },
  {
    title: "召回别反复吃老本",
    tag: "边际递减",
    mascot: "berry",
    tone: "pink",
    body: "邮箱绑定、截图回传这类作业，第一次很亮，再做会明显变少。同一条链路最多用一两个版本节点，后面改端内完成或换奖励，不要连做三轮。",
  },
  {
    title: "浏览量要一起记",
    tag: "口径",
    mascot: "grape",
    tone: "grape",
    body: "一百八十九场里，超过一半缺浏览人数，参与率就没法横比。每场至少记下浏览、参与人数、互动；人数只看参与，别把曝光加进去。",
  },
  {
    title: "爆款做成模板再复用",
    tag: "效率",
    mascot: "pudding",
    tone: "sun",
    body: "节日礼包、身份点击、名片更新、H5 集卡，高峰月已经验证过。低谷月用周常托底，把爆款拆成可复制模块，比每次从零想主题更省运营时间。",
  },
];
