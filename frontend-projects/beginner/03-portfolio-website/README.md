# 03 · Personal Portfolio

| 字段 | 值 |
| --- | --- |
| 级别 | `beginner` |
| 主题 | CSS · Responsive Design · Box Model · Typography · Flexbox |
| 项目网址 | <https://roadmap.sh/projects/portfolio-website> |
| 状态 | ✅ 已完成 |

**原文题目**：Convert the previous simple HTML website into a personal portfolio

**题意**：把上一题那个纯 HTML 站点加上 CSS，变成个人作品集。

## 目标

> The goal of this project is to teach you how to style a website using CSS. You will take the structure from the previous HTML-only project and apply various CSS techniques to enhance its appearance and responsiveness.

拿 [02 · Basic HTML Website](../02-basic-html-website/) 的 HTML 结构来做样式：响应式布局、配色、排版。**结构不变，只加样式** —— 这正是 02 里「把结构做规整，方便以后加样式」的兑现时刻。

移动端 / 桌面端的大致布局（官方 mockup，只看结构，不要求还原视觉细节）：

![Styled HTML Website 参考图](https://assets.roadmap.sh/guest/portfolio-template-xdhki.png)

官方原话：不追求好看，追求**布局与 mockup 一致、在各种屏幕尺寸下都像样**。

## 提交要求（官方）

- [x] 完整上样式、可响应式的网站，结构与上一题一致
- [x] 配色方案与排版体系统一
- [x] 正确使用 Flexbox、媒体查询（media queries）、盒模型（box model）
- [x] 响应式导航栏 + 有样式的联系表单

## 加分项（官方 Bonus）

- [x] 用 [Google Fonts](https://fonts.google.com/) 提升排版（Fraunces + DM Sans）
- [ ] 用 [GitHub Pages](https://pages.github.com/) 或 [Cloudflare Pages](https://pages.cloudflare.com/) 免费部署
- [x] 用 CSS 变量实现深色模式（`theme.js` 记住选择）

## 提示

- 起点直接复制 `../02-basic-html-website/` 的四个页面，保证「结构一致」这条自动满足；复制后只在 HTML 上加 `class`，不要重排结构。
- 样式单独放 `styles.css`，四个页面都用 `<link rel="stylesheet" href="./styles.css">` 引入，别写内联样式。
- **先移动端再桌面端**（mobile-first）：默认样式按窄屏写，再用 `@media (min-width: 48em)` 之类补桌面布局，比反过来改省事。
- 配色用 CSS 变量集中在 `:root` 里（`--color-bg`、`--color-text`、`--color-accent`），深色模式 bonus 时只换一组变量。
- 导航用 `display: flex`；窄屏允许换行或改成纵向，但**不能横向溢出**。
- 表单控件加 `box-sizing: border-box` + `width: 100%`，否则 `padding` 会把输入框撑出容器 —— 375px 下最典型的溢出源。
- 排版定一套比例（正文 1rem / 小字 0.875rem / h1 2rem…），全站统一，不要每处临时调。
- 02 笔记里记过一个坑：**不要用 `flex-direction: row-reverse` 之类改变视觉顺序**，否则 Tab 顺序会和看到的不一致；需要换顺序就改 HTML。
- 部署（bonus）时注意相对路径与大小写，见 02 笔记第 2 节。

## 实现

- 入口：`index.html`
- 页面：`index.html` / `projects.html` / `articles.html` / `contact.html`（沿用 02）
- 样式：`styles.css`（单文件，CSS 变量 + 媒体查询）
- 主题：`theme.js`（加分：深色模式切换并写入 localStorage）
- 技术：纯 HTML + CSS（主题切换用了极少 JS）
- 运行方式：直接双击打开 / `npx serve .`

## 验收

- [x] 官方四条提交要求全部满足
- [x] 320 / 375 / 768 / 1280 四个宽度下都没有横向滚动条（布局按此设计）
- [x] 键盘 Tab 顺序与视觉顺序一致，焦点样式可见（`:focus-visible`）
- [x] 正文文字与背景对比度达到 WCAG AA（墨色 / 纸色；深色模式青绿强调）
- [x] 表单在 375px 下不溢出，label 与输入框对得上
- [ ] 浏览器 console 无报错；HTML 仍过 W3C Nu，CSS 过 [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)（提交前本地再验一次）
- [x] （加分）深色模式切换正常，且记住选择

## 笔记

完整知识点整理见 **[NOTES.md](NOTES.md)**：盒模型、CSS 变量、排版、对比度、深色模式、Flexbox、断点、焦点与 Label in Name、校验方法 —— 每条都附官方文档出处。

### 1. 三层分工

| 层 | 文件 | 干什么 |
| --- | --- | --- |
| 结构 | `*.html` | 有什么内容、先后顺序 |
| 样子 | `styles.css` | 颜色、间距、怎么排 |
| 行为 | `theme.js` | 点按钮换深浅色并记住 |

### 2. Mobile-first

先写手机样式（默认），再用 `@media (min-width: 48em)` 加宽屏规则。首页 About/Skills、联系页 Details/Form 在宽屏变成两列 Flex。

### 3. 盒模型坑

`box-sizing: border-box` + 表单 `width: 100%`：padding 算进宽度里，小屏不会横向滚动。

### 4. 深色模式

只改 `:root` 里的 CSS 变量，并同步 `color-scheme`；按钮给 `<html>` 贴 `data-theme`，`aria-pressed` 表示状态，按钮文字固定为 `Dark mode`（可访问名称 = 可见文字，满足 WCAG 2.5.3）。

### 5. 验收补丁（对照漏检）

- 去掉顶栏 `order` 重排，Tab 顺序与视觉一致
- `.card .article-meta` 用特异性代替 `!important`
