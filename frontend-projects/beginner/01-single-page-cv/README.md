# 01 · Single-Page CV

| 字段 | 值 |
| --- | --- |
| 级别 | `beginner` |
| 主题 | HTML · Semantic HTML · Layout · SEO |
| 官方题面 | [roadmap.sh/projects/single-page-cv](https://roadmap.sh/projects/single-page-cv) |
| 状态 | ⬜ 未开始 |

**原文题目**：Create a single-page HTML CV to showcase your career history

**题意**：做一个单页 HTML 简历，展示职业经历。

## 目标

> The goal of this project is to teach you how to create a structured, single-page CV using only HTML. You will focus on laying out your education, skills, and career history in a clean, semantic manner. Styling will be addressed in a later project.

只用 HTML 做出结构清晰的单页 CV，重点是把教育经历、技能、工作经历排得干净、语义化。**样式留到后面的项目再做**，这一题不写 CSS。

成品大致长这样（官方参考图）：

![Single-Page HTML CV 参考图](https://assets.roadmap.sh/guest/resume-template-zyl70.png)

## 要求

官方给出的四条硬性要求：

1. **Semantic HTML（语义化）**：用恰当的 HTML 标签组织简历结构，而不是一堆 `div`。
2. **SEO Meta Tags**：`<head>` 里补上必要的 SEO 元信息。
3. **Open Graph (OG) Tags**：加 OG 标签，便于在社交媒体上分享时正确显示卡片。
4. **Favicon**：给页面加网站图标，并在 `<head>` 中引入。

内容上是一页式布局，需要包含三块：**教育经历（education）**、**技能（skills）**、**工作经历（career history）**。

## 提交清单（官方）

- [ ] HTML 结构语义正确
- [ ] 单页布局，含 education / skills / career history 三部分
- [ ] `<head>` 中有 SEO meta 标签
- [ ] `<head>` 中有 OG 标签
- [ ] `<head>` 中链接了 favicon

## 提示

- 只用 HTML：不写 `style`、不引 CSS 文件，题目明确说样式后面再处理。
- 简历各块用 `<section>` + `<h2>` 起标题；单条经历用 `<article>`；日期用 `<time datetime="...">`；技能列表用 `<ul>` / `<li>`。
- SEO 至少给到 `<title>`、`<meta name="description">`、`<meta name="viewport">`、`<meta name="author">`、`<meta name="keywords">`。
- OG 常用：`og:title`、`og:description`、`og:type`、`og:url`、`og:image`；社交平台还认 `twitter:card` 一类。
- favicon 放同目录（如 `favicon.ico`），用 `<link rel="icon" href="favicon.ico" type="image/x-icon">` 引入。
- 这份 HTML 是下一题「Basic HTML Website」「Personal Portfolio」的起点，命名和层级尽量规整。

## 实现

- 入口：`index.html`
- 图标：`favicon.svg`（`<link rel="icon">` 引入）
- 技术：纯 HTML
- 运行方式：直接双击打开 / `npx serve .`

## 验收

- [x] 官方提交清单五项全部勾选
- [x] 页面里没有任何内联 / 外链 CSS
- [x] 浏览器 console 无报错，favicon 正常显示
- [x] 用 [W3C Validator](https://validator.w3.org/) 校验无错误
- [x] 读屏 / 无样式状态下内容层次仍可理解

## 笔记

- W3C Nu Validator：**0 错误**（2026-11-16 校验通过）
- 未写 `og:url` / `og:image`：协议要求绝对地址，等有部署域名再补；`og:title` / `og:description` / `og:type` / `og:site_name` 已满足题面的 OG 要求
- 行内 `style` 已全部移除，颜色留到 Personal Portfolio 那题再用
