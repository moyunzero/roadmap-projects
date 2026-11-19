# 04 · Changelog Component

| 字段 | 值 |
| --- | --- |
| 级别 | `beginner` |
| 主题 | HTML · Layout · CSS · Flexbox |
| 项目网址 | <https://roadmap.sh/projects/changelog-component> |
| 状态 | ⬜ 未开始 |

**原文题目**：Create a changelog component for a website using HTML and CSS

**题意**：用 HTML + CSS 做一个「更新日志（changelog）」组件。

## 目标

> The goal of this project is to teach you about positioning and layout in CSS. You will create a simple HTML structure and use CSS to style it into a visually appealing and responsive changelog component.

题面开头的定义也值得记一下：

> A changelog is a log or record of all notable changes made to a project or software. It is often used to keep users informed about the latest updates and improvements.

也就是说：**这题练的是定位与布局**，成品要像真实产品里的「更新日志」区块。

参考 mockup（官方，只作结构参考）：

![Changelog Component 参考图](https://assets.roadmap.sh/guest/changelog-component-1m86j.png)

官方还明确说了：

> Feel free to customize the design and layout of the component as you see fit. The focus should be on creating a well-structured and responsive component that can be easily integrated into a website.

所以：**设计自由，结构、响应式、可嵌入是硬指标**。

## 官方要求

这题**没有提交清单**（不像 01/02/03 那样列出 checklist），页面上只给了三条信息：

1. 用 HTML + CSS 制作一个 changelog 组件。
2. 组件要**结构良好、响应式**，能方便地嵌进任意网站。
3. 布局与设计可自由发挥，重点是练 CSS 定位与排版。

> ⚠️ 下面「验收」里的条目是**我们自己补的**，不是官方要求，别当成硬性标准。

## 提示

- 变更记录用 `<ol>`（有先后顺序）承载，每条一个 `<li>`；版本号和日期用 `<time datetime="2025-01-12">`。
- 时间线的竖线和圆点，两种常见做法：
  - `li { position: relative; padding-left: 2rem }` + `li::before` 画点、`li::after` 或容器 `border-left` 画线；
  - 或整列用 `border-left` + 每条用 `::before` 定位到线上。
- 这题的关键词是 **positioning**：`relative` 定位父级 + `absolute` 定位子元素，是 mockup 里「点对齐到日期行」的常规解法。
- 组件要能嵌入：宽度用 `%` / `max-width` 自适应，**不要**直接给 `body` 写死布局，也不要用只在本页成立的全局选择器。
- 文案建议直接用真实内容 —— 比如本项目 01→02→03 的版本记录，比 lorem ipsum 有说服力。
- 版本号、日期、条目三者的层级要稳定：日期/版本弱化（小字、次要色），变更条目为主体。
- 别忘 `box-sizing: border-box`；`padding-left` 留出的时间线空间要和线宽、点大小算在一起。
- 无 JS 需求的纯展示组件，别引入脚本。

## 实现

- 入口：`index.html`
- 样式：`styles.css`
- 技术：纯 HTML + CSS
- 运行方式：直接双击打开 / `npx serve .`

## 验收（自定，非官方）

- [ ] 至少 3 条变更记录，每条含版本号 / 日期 / 具体变更
- [ ] 时间线视觉（圆点 + 竖线）对齐稳定，不依赖固定高度
- [ ] 375 / 768 / 1280 三个宽度下都没有横向滚动条
- [ ] 组件塞进一个普通页面后仍然成立（不被页面级样式污染）
- [ ] 用键盘 Tab 时焦点顺序与视觉顺序一致（如果加了链接）
- [ ] HTML 过 W3C Nu，CSS 过 [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- [ ] 浏览器 console 无报错

## 笔记

- 
