# Discord社区活动数据看板

四个社区的活动效果对照网站。创建人 **Icy Wang**。社区以 **A / B / C / D** 呈现，不出现真实社区名。

## 页面

1. **封面** `/`：总览数字
2. **Discord社区详情** `/communities`：四个社区入口
3. **代表做法** `/cases`：带环比对照的案例
4. **运营小提示** `/tips`：共通打法备忘
5. **社区详情** `/communities/a` … `/d`
   - 参与人数、互动、参与率
   - 月份 / 类型 / 分区筛选
   - 综合表现 Top 3
   - 月度趋势、类型结构、明细表

## 线上预览

GitHub Pages：https://icywang11.github.io/discord-community-board/

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开提示的本地地址（默认 `http://127.0.0.1:43126`）。

## 数据

活动数字来自内部表格，已写入 `src/data/communities.json`。更新数据时只改这份 JSON，不要把带真实社区名的原始文件放进仓库。
