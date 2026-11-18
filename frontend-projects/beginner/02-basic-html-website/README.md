# 02 · Basic HTML Website

| 字段 | 值 |
| --- | --- |
| 级别 | `beginner` |
| 主题 | HTML · Layout · Semantic HTML |
| 项目网址 | <https://roadmap.sh/projects/basic-html-website> |
| 状态 | ⬜ 未开始 |

**原文题目**：Create simple HTML only website with multiple pages

**题意**：用纯 HTML 做一个多页面网站，只搭结构，不做样式。

## 目标

> The goal of this project is to teach you how to structure a website using HTML i.e. different sections of a website like header, footer, navigation, main content, sidebars etc. Do not style the website, only focus on the structure. Styling will be done in separate projects.

学会用 HTML 组织一个「真正的网站」：header、footer、导航、主内容区、侧栏各就各位。**只做结构，不做样式** —— 样式是后面几个项目的事。

官方给的目标清单：

- 学会在一个网站上创建多个页面
- 用 HTML 做语义化结构
- 结构要组织成「以后能轻松加样式」的样子
- 给网站加上 SEO meta 标签

结构大致长这样（官方 mockup，参考布局，不要求还原视觉）：

![Basic HTML Website 参考图](https://assets.roadmap.sh/guest/portfolio-design-83lku.png)

## 要求

1. **四个页面**：Homepage、Projects、Articles、Contact。
2. **导航栏**：所有页面都要有，并且链接到全部页面。
3. **不写样式**：不写 `style`、不引 CSS，只做 HTML 结构。
4. **SEO meta**：页面 `<head>` 里加 meta 标签。
5. **联系页要有表单**：包含 name、email、message 等字段。

## 提交清单（官方）

- [ ] 语义正确的 HTML 结构
- [ ] 多个页面，且带导航栏
- [ ] 每个页面的 `<head>` 里都有 SEO meta 标签
- [ ] Contact 页有表单，含 name、email、message 等字段

## 提示

- 文件命名建议 `index.html` / `projects.html` / `articles.html` / `contact.html`，彼此用**相对路径**互链（`./projects.html`），别写 `file:///Users/...` 这种绝对路径。
- 导航用 `<nav>` + `<ul>` + `<li>` + `<a>`；放在每个页面 `header` 里。四个页面之间是平级关系，不要把 nav 塞进 `main`。
- 每页结构建议一致：`header`（站点名 + nav）→ `main`（页面内容）→ `footer`（版权 / 联系方式）。
- 四个页面共用同一套导航，改一处要同步改四处 —— 这是纯 HTML 多页面的固有成本，先手写一遍才能体会模板引擎/组件化的价值。
- 表单用 `<form>` + `<label for="...">` + `<input>` / `<textarea>`，注意 label 和输入框的 `id` 要对应；`action` / `method` 先写占位，本题不要求真的提交。
- 这题的产物是下一题 **03 · Personal Portfolio** 的起点，HTML 结构越规整，03 改起来越省事。

## 实现

- 入口：`index.html`
- 页面：`index.html` / `projects.html` / `articles.html` / `contact.html`
- 技术：纯 HTML
- 运行方式：直接双击打开 / `npx serve .`

## 验收

- [ ] 官方提交清单四项全部勾选
- [ ] 从任意页面都能一键跳到其余三个页面
- [ ] 页面里没有任何内联 / 外链 CSS
- [ ] 表单不依赖 JS 也能填写，且 label 可点击聚焦输入框
- [ ] 每个页面都过一遍 [W3C Validator](https://validator.w3.org/nu/)，0 error
- [ ] 窄屏 375px 下没有横向滚动条

## 笔记

- 
