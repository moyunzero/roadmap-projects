# 05 · Testimonial Cards

| 字段 | 值 |
| --- | --- |
| 级别 | `beginner` |
| 主题 | HTML · Layout · CSS · Positioning · Flexbox |
| 项目网址 | <https://roadmap.sh/projects/testimonial-cards> |
| 状态 | ✅ 已完成 |

**原文题目**：Create testimonial cards for a website using HTML and CSS

**题意**：用 HTML + CSS 做一组「用户评价（testimonial）」卡片。

## 目标

> The goal of this project is to teach you about positioning and layout in CSS. Below is a rough mockup showing some testimonial cards. Each card is designed to help you understand different layout and positioning techniques.

题面开头的定义：

> Testimonials are quotes or statements from satisfied customers or users, often used on websites to build credibility and trust.

也就是说：**这题练的还是定位与布局**，而且官方强调每张卡片布局**不一样** —— 不是复制三张同款卡，而是用几种结构练 Flex / 定位。

参考 mockup（官方原图已存为本目录的 [mockup.png](mockup.png)）：

![Testimonial Cards 参考图：四种不同布局的评价卡片](mockup.png)

从图里能拆出 **四种卡片形态**（本实现均已落地）：

| 形态 | 大致结构 | 布局要点 |
| --- | --- | --- |
| 气泡卡 | 深色圆角气泡 + 底部小三角尖；尖下方是头像 + 姓名/职位 | `::after` + 透明 border 拼尖角；信息区在气泡**外面** |
| 描边卡 | 白底描边卡片；上半评价，下半头像 + 姓名/职位 | 经典「正文 + 页脚」；页脚 Flex 横排 |
| 图文并排 | 左大图（圆角），右深色信息卡（星级 + 姓名 + 职位 + 评价） | Flex 横排；图外包层与右栏同高 |
| 轮播样式 | 宽卡：居中评价；头像行（中间放大）+ 左右箭头 + 底部姓名 | 静态一帧即可，不必真轮播 |

> 原图地址：<https://assets.roadmap.sh/guest/testimonials-min-3j2j4.png>

官方还说了：

> Feel free to use any content and images you like for the testimonials.

所以：**文案和头像可自选**；重点是多种布局，不是抄死像素。

## 官方要求

这题**没有提交清单**（和 04 一样），页面上主要是这些信息：

1. 用 HTML + CSS 做一组 testimonial 卡片。
2. 目标是练 CSS **positioning and layout**；mockup 里每张卡对应不同布局手法。
3. 内容与图片可自定。

> ⚠️ 下面「验收」里的条目是**我们自己补的**，不是官方要求，别当成硬性标准。

## 提示

- 先做 **至少 3 种**不同结构的卡（本实现四种都做了；轮播先静态）。
- 每张卡至少包含：评价原文、姓名、职位/身份、头像。图文并排那张还有星级。
- 气泡尖角：`position: absolute` 伪元素 + 透明 border 拼三角形。
- 图文同高：不要指望直接 `stretch` `<img>`（替换元素有固有比例）；外包一层再让图绝对定位铺满 + `object-fit: cover`。
- 整页用 `.gallery` Grid 摆卡：宽屏前两张并排，后两张通栏。
- 类名统一用 `-`（如 `card-border-quote`），别混 `__`。
- 轮播箭头用 `<button>` + `aria-label` + `:focus-visible`；真切换 JS 可选。
- 旁有姓名时头像可用 `alt=""`，避免读屏重复。

## 实现

- 入口：`index.html`
- 样式：`style.css`
- 技术：纯 HTML + CSS（轮播为静态帧，无 JS）
- 运行方式：直接双击打开 / `npx serve .`

## 验收（自定，非官方）

- [x] 至少 3 种**结构不同**的评价卡（本实现 4 种）
- [x] 每张卡含：评价、姓名、身份、头像（图文并排含星级）
- [x] 375 / 768 / 1280 下可单列或并排，无依赖写死整页高度
- [x] 气泡尖角、圆形头像、描边/深色卡层次清晰
- [x] 轮播箭头可聚焦，`:focus-visible` 可见；Tab 顺序与视觉一致
- [x] HTML 过 W3C Nu：**0 error**（仅有 section/article 缺标题的 info 提示）；CSS 语法校验通过（csstree；Jigsaw 站点对自动化有 Cloudflare 拦截时可浏览器手测）
- [x] 浏览器 console 无报错（无 JS）

## 笔记

**完整零基础讲解见 [NOTES.md](NOTES.md)**（必读）：从「评价卡是什么」讲到四种布局、伪元素尖角、Flex、为什么 img 拉不齐、画廊 Grid、踩坑三段式、读完自检题。README 这里只留速查，细节以 NOTES 为准。

### 速查

| 点 | 一句话 |
| --- | --- |
| 目标 | 多种**不同结构**的卡，练定位与布局 |
| 尖角 | 气泡 `relative` + `::after` 宽高 0 + 透明 border 拼三角 |
| 同高 | 不要直接 stretch `img`；外包层 stretch，图绝对定位铺满 + `object-fit: cover` |
| 整页 | `.gallery` Grid：宽屏两列，图文/轮播 `grid-column: 1 / -1` |
| 类名 | 统一单 `-`，别混 `__` |
