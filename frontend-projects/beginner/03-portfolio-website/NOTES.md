# 03 · Personal Portfolio — 知识点笔记

> 本文只写这题真正用到的知识，结论均来自官方文档，引用处附链接（见文末「参考资料」）。
> 标 **「建议」** 的是实践做法，不是规范强制；标 **「注意」** 的是容易踩的坑。
> 对应代码：[styles.css](styles.css) · [theme.js](theme.js) · [index.html](index.html) 等四页
> 上一题：[02 · Basic HTML Website](../02-basic-html-website/NOTES.md)

## 目录

1. [这题到底改了什么](#1-这题到底改了什么)
2. [盒模型与全局重置](#2-盒模型与全局重置)
3. [CSS 变量（设计令牌）](#3-css-变量设计令牌)
4. [排版系统](#4-排版系统)
5. [颜色与对比度](#5-颜色与对比度)
6. [深色模式](#6-深色模式)
7. [Flexbox 布局](#7-flexbox-布局)
8. [响应式与断点](#8-响应式与断点)
9. [焦点与交互状态](#9-焦点与交互状态)
10. [校验方法](#10-校验方法)
11. [本次踩过的坑](#11-本次踩过的坑)
12. [参考资料](#12-参考资料)

---

## 1. 这题到底改了什么

02 是四个纯 HTML 页面；03 在**结构不变**的前提下加了两个文件：

```text
03-portfolio-website/
├── index.html / projects.html / articles.html / contact.html   ← 只加了 class
├── styles.css    ← 新增：全部样式
├── theme.js      ← 新增：深色模式切换（bonus）
└── favicon.svg
```

官方要求是「结构与上一题一致，只做样式」。所以 HTML 里只多了 `class` 和少量包裹元素（`.home-grid`、`.contact-layout`），标签、层级、文案基本没动。

**建议**：加样式前先决定「哪些是结构、哪些是外观」。结构不动的最大好处是——样式改坏了，删掉 `styles.css` 就回到 02 的可用状态。

---

## 2. 盒模型与全局重置

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

**`box-sizing: border-box` 解决什么**：默认的 `content-box` 下，`width: 100%` + `padding` + `border` 会让元素**超出**容器 —— 表单输入框在 375px 下横向溢出的头号原因。

- `content-box`：宽度只算内容，padding/border 额外加。
- `border-box`：宽度包含 padding 和 border，`width: 100%` 就是真的 100%。

用 `*` 统一重置是最常见的做法（重置所有元素及其伪元素）。

**注意**：这是「工程惯例」，不是规范要求；HTML 规范只定义了 `box-sizing` 的行为，是否全局重置由你决定。

参考：[MDN `box-sizing`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing)

---

## 3. CSS 变量（设计令牌）

```css
:root {
  --color-bg: #f7f5f1;
  --color-accent: #0f766e;
  --space-2: 1rem;
  --radius: 0.5rem;
}
```

- 以 `--` 开头的自定义属性（custom property），用 `var(--name)` 读取。
- 定义在 `:root`（即 `<html>`）上，全站可继承。
- 换主题时只改变量，不改规则 —— 这是深色模式能「一行切换」的前提。

**为什么叫「设计令牌」**：颜色、间距、圆角、字号全部抽成变量后，规则里不再出现魔法数字，改设计只动一处。

```css
.panel {
  padding: var(--space-3);
  border-radius: var(--radius);
  background: var(--color-surface);
}
```

参考：[MDN 自定义属性 `--*`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/--*)

---

## 4. 排版系统

### 4.1 字体栈

```css
--font-sans: "DM Sans", system-ui, sans-serif;
--font-display: "Fraunces", Georgia, serif;
```

- 先写要用的 Web Font，再写系统字体兜底：字体没加载出来时不会掉到浏览器默认的 Times。
- `system-ui` 用操作系统界面字体，加载最快。

### 4.2 Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:…&display=swap" rel="stylesheet">
```

- `preconnect`：提前和字体域名建连，减少一次往返。
- `display=swap`：字体没到时先用兜底字体显示文字，避免「白屏等字体」（FOIT）。
- **注意**：这是第三方请求，离线或被墙时字体会回退 —— 所以字体栈里必须写兜底。

### 4.3 `clamp()` 做流式字号

```css
.hero h1 {
  font-size: clamp(2rem, 6vw, 2.75rem);
}
```

MDN 原文：

> The `clamp()` CSS function clamps a value within a range of values between a defined minimum bound and a maximum bound. The function takes three parameters: a minimum value, a preferred value, and a maximum allowed value.

- 中点 `6vw` 随视口缩放，但不会小于 `2rem`、大于 `2.75rem`。
- 好处：一个声明替代一组媒体查询断点。
- **注意**：`clamp()` 的值仍要满足可读性（别让正文跟着视口缩到 12px）。

### 4.4 行高与字距

- 正文 `line-height: 1.65`（无单位，跟字号成比例）。
- 大标题 `line-height: 1.15`、`letter-spacing: -0.03em` —— 大字号时默认间距会显得松散。
- 行宽用 `max-width: 36rem` 限制，避免一行太长影响阅读。

参考：[MDN `clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp) · [MDN `font-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-size)

---

## 5. 颜色与对比度

### 5.1 WCAG 1.4.3 的最低要求

- 正文（< 18pt 或 < 14pt 粗体）：对比度 **≥ 4.5:1**
- 大字（≥ 18pt，或 ≥ 14pt 粗体）：**≥ 3:1**

本项目的实测值（用 sRGB 相对亮度公式算的）：

| 组合 | 对比度 | 等级 |
| --- | --- | --- |
| 浅色正文 / 背景 | 15.32 | AAA |
| 浅色次要文字 / 背景 | 5.45 | AA |
| 浅色链接 / 背景 | 5.03 | AA |
| 浅色按钮文字 / 按钮底 | 5.47 | AA |
| 深色正文 / 背景 | 15.29 | AAA |
| 深色次要文字 / 背景 | 7.25 | AAA |
| 深色链接 / 背景 | 9.80 | AAA |
| 深色按钮文字 / 按钮底 | 7.77 | AAA |

计算方式（相对亮度 + 对比度公式）：

```js
L = 0.2126R + 0.7152G + 0.0722B   // R/G/B 需先做 sRGB 线性化
ratio = (L1 + 0.05) / (L2 + 0.05) // L1 为较亮者
```

**注意**：链接颜色单独算。青色（#0f766e）在米白底上只有 5.03:1 —— 刚过 AA，换浅一点就不合格了。

参考：[WCAG 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

### 5.2 颜色不要单独承载信息

深色/浅色两套主题里，强调色同时用于链接、按钮、焦点框 —— 但状态区别（当前页、必填）依然靠**文字与结构**（`aria-current`、`required`），不只靠颜色。

---

## 6. 深色模式

### 6.1 `prefers-color-scheme`

MDN 原文：

> The `prefers-color-scheme` CSS media feature is used to detect if a user has requested light or dark color themes. A user indicates their preference through an operating system setting (e.g., light or dark mode) or a user agent setting.

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { … }
}
```

- `:not([data-theme="light"])` 的作用：用户**手动选了浅色**时，不要被系统深色偏好覆盖。
- 顺序很重要：这条媒体查询必须能被后面的 `:root[data-theme="light"]` 覆盖（选择器特异性相同，靠书写顺序）。

### 6.2 手动切换：`data-theme`

```css
:root[data-theme="dark"] { --color-bg: #121615; … }
:root[data-theme="light"] { --color-bg: #f7f5f1; … }
```

JS 只改 `<html data-theme="…">`，颜色全部由 CSS 变量接管：

```js
root.setAttribute("data-theme", theme);
```

**建议**：不要把颜色写在 JS 里 —— 样式归 CSS，状态归 HTML 属性，逻辑归 JS。

### 6.3 记住选择

```js
localStorage.setItem("portfolio-theme", value);
```

- 读取时用 `try/catch`：隐私模式 / 禁用存储时 `localStorage` 会抛异常。
- 首次访问没有存储值时，回退到系统的 `prefers-color-scheme`。

### 6.4 `color-scheme`

```css
:root { color-scheme: light; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { color-scheme: dark; } }
:root[data-theme="dark"] { color-scheme: dark; }
```

- 告诉浏览器「这个页面支持哪种配色」，浏览器据此渲染**滚动条、表单控件、自动填充背景**等原生 UI。
- 不写的话：深色页面的滚动条和输入框仍按浅色渲染，视觉上会「漏白」。

### 6.5 闪烁（FOUC）

theme.js 用的是 `defer`，在 HTML 解析完之后才执行。对于「系统深色 + 用户手动选浅色」的人，第一帧可能是深色，脚本跑完才切成浅色，会闪一下。

**建议**：把「读 localStorage → 设置 data-theme」这段放进 `<head>` 里的**内联脚本**（阻塞渲染，跑完才画），主题切换逻辑再放外部文件。本项目没做这一步，属于可选优化。

---

## 7. Flexbox 布局

### 7.1 常用三件套

```css
.site-header {
  display: flex;
  flex-wrap: wrap;   /* 允许换行 */
  align-items: center;
  gap: 1rem;         /* 间距，不用再写 margin */
}
```

- `flex-wrap: wrap`：窄屏时子项自动换行，是响应式导航的基础。
- `gap`：一次搞定子项间距，比 `margin` 干净（也避免了首尾多余间距）。
- `margin-left: auto`：把某个子项推到最右，常用于「品牌在左、导航在右」。

### 7.2 ⚠️ `order` 会破坏 Tab 顺序

这是本题踩到的真实问题。原来的写法：

```css
.site-nav { order: 3; }
.theme-toggle { order: 2; }
```

视觉上按钮在第一行、导航在第二行；但 DOM 顺序是 `brand → nav → button`，键盘 Tab 顺序按 **DOM** 走，于是：

```text
焦点：Mo Yun(第1行) → Home/Projects/Articles/Contact(第2行) → 按钮(又跳回第1行)
```

`order` 只改变**布局顺序**，不改变 DOM 顺序，也不改变 Tab 顺序。

**修法**：删掉 `order`，让 DOM 顺序 = 视觉顺序（本项目最终方案）。如果一定要重排，就把元素在 HTML 里挪到对应位置。

对应 WCAG 2.4.3 *Focus Order*：焦点顺序需要保持意义和可操作性。

### 7.3 `min-width: 0` 防止 flex 子项撑破

```css
.contact-form-wrap {
  flex: 1;
  min-width: 0;
}
```

flex 子项默认 `min-width: auto`，内容（比如长输入框）会把容器撑得比预期宽。`min-width: 0` 允许它收缩。

参考：[MDN `order`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/order) · [MDN Flexbox 基本概念](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts) · [WCAG 2.4.3](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html)

---

## 8. 响应式与断点

### 8.1 Mobile-first

默认样式按窄屏写，只在更宽的屏幕上追加：

```css
/* 默认：单列、导航换行 */
.home-grid { display: flex; flex-direction: column; }

/* ≥ 48em ≈ 768px：两列 */
@media (min-width: 48em) {
  .home-grid { flex-direction: row; }
}
```

- 为什么 mobile-first：手机是主场景，窄屏基线最简单；桌面只是「加东西」。
- 断点用 `em` 而不是 `px`：跟着用户字号设置缩放，更友好。

本项目断点：

| 断点 | 效果 |
| --- | --- |
| 默认 | 单列；导航占满一行；按钮单独一行 |
| ≥ 48em（768px） | 导航横排靠右；About/Skills、详情/表单 两列 |
| ≥ 64em（1024px） | 页眉左右内边距对齐 68rem 内容区 |

### 8.2 怎么验

- **别只信截图**：headless Chrome 的 `--window-size` 有最小宽度 500px 的坑（见 02 笔记第 9.3 节），截出来的 375 可能是 500 的裁切。
- 可靠做法：用 CDP 的 `Emulation.setDeviceMetricsOverride` 真正改视口，再读 `document.documentElement.scrollWidth` 和每个元素的 `getBoundingClientRect().right`。
- 本项目在 375 / 768 / 1280 三档 × 四个页面共 12 组下测量，`scrollWidth` 全部等于视口宽度。

---

## 9. 焦点与交互状态

### 9.1 `:focus-visible`

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}
```

MDN 原文：

> The `:focus-visible` pseudo-class applies while an element matches the `:focus` pseudo-class and the UA determines via heuristics that the focus should be made evident on the element.

- 键盘导航时显示焦点框，鼠标点击时通常不显示 —— 兼顾可用性与视觉。
- **不要**直接 `outline: none` 去掉焦点框：那会让键盘用户完全失去位置感（对应 WCAG 2.4.7 *Focus Visible*）。
- 焦点指示的对比度要求 ≥ 3:1（WCAG 1.4.11 Non-text Contrast）。

### 9.2 按钮文字与可访问名称：Label in Name

这次踩的坑：切换按钮显示了「Light」，可访问名称却是「Dark mode」。

WCAG 2.5.3 *Label in Name*（A 级）要求：**可访问名称里要包含可见文字**。语音控制用户说「点击 Light」时，系统是按名称匹配的，对不上就点不中。

最终方案：可见文字固定 `Dark mode`，状态交给 `aria-pressed`：

```html
<button type="button" id="theme-toggle" aria-pressed="false">Dark mode</button>
```

```js
button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
```

验证方式不是看代码，而是读**无障碍树**：

```text
theme=light  name="Dark mode"  pressed=false
theme=dark   name="Dark mode"  pressed=true
```

### 9.3 减少动效

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

用户开启「减少动态效果」时，关掉平滑滚动。

### 9.4 触控目标大小

WCAG 2.2 的 2.5.8 *Target Size (Minimum)* 要求指针目标至少 24×24 CSS px。本项目导航链接靠 padding 撑到约 34px 高，过线但不大；移动端想更稳可以做到 44px。

---

## 10. 校验方法

### 10.1 HTML：W3C Nu

四个页面各跑一次（同 02）：

```bash
for f in *.html; do
  curl -sS -F "file=@$f;type=text/html" "https://validator.w3.org/nu/"
done
```

本项目结果：**4 页全部 0 error**。

### 10.2 CSS：W3C 校验器被挡了

`https://jigsaw.w3.org/css-validator/` 这次对脚本请求返回 403/429（Cloudflare 挑战）。替代方案：

```bash
npx csstree-validator styles.css
```

它基于 css-tree，按 CSS 规范检查**未知属性与非法值**，本项目 0 错误。

**注意**：不同校验器的规则集不完全一样，最稳的是最后用浏览器打开 jigsaw 网页版手工再跑一次。

### 10.3 渲染与交互验证

本项目用 CDP 做了三件事：

1. `Emulation.setDeviceMetricsOverride` 设 375/768/1280，量横向溢出；
2. `Input.dispatchKeyEvent` 发 Tab 键，读 `document.activeElement`，验证焦点顺序；
3. `Accessibility.getPartialAXTree` 读按钮的 role / name / pressed，验证可访问名称。

**建议**：凡是「无障碍」相关的验收，尽量读无障碍树，而不是读源码猜。

---

## 11. 本次踩过的坑

| 坑 | 现象 | 原因 | 修法 |
| --- | --- | --- | --- |
| `order` 重排导航 | 375px 下 Tab 先走完导航再跳回顶部按钮 | `order` 只改视觉顺序，不改 Tab 顺序 | 删掉 `order`，DOM 顺序 = 视觉顺序 |
| 按钮文案与名称不一致 | 可见「Light」，名称「Dark mode」 | 同时用了 `aria-label` 和动态 `textContent` | 文字固定，状态交给 `aria-pressed` |
| 深色页面漏白 | 滚动条、原生控件仍是浅色 | 没声明 `color-scheme` | 在 `:root` / `data-theme` 上声明 |
| 用 `!important` 压样式 | `.article-meta` 需要 `!important` 才能覆盖 `.card p` | 选择器特异性不够 | 提高特异性：`.card .article-meta` |
| CSS 校验器 403 | jigsaw 返回 Cloudflare 挑战 | 脚本请求被风控 | 换 csstree-validator 或手工网页校验 |
| 375 截图看着溢出 | 截图右侧文字被切 | headless 最小视口 500px | 用 CDP 真实模拟视口再量 |
| 表单在窄屏撑破 | 输入框跑出卡片 | `content-box` + `width: 100%` + padding | 全局 `border-box` |

---

## 12. 参考资料

### 布局
- MDN `box-sizing`：<https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing>
- MDN Flexbox 基本概念：<https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Basic_concepts>
- MDN `order`：<https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/order>
- MDN `gap`：<https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap>

### 变量与排版
- MDN 自定义属性：<https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/--*>
- MDN `clamp()`：<https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp>
- MDN `font-size`：<https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-size>

### 颜色与主题
- MDN `prefers-color-scheme`：<https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme>
- MDN `color-scheme`：<https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme>
- MDN `prefers-reduced-motion`：<https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion>

### 焦点与无障碍
- MDN `:focus-visible`：<https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible>
- WCAG 2.2：<https://www.w3.org/TR/WCAG22/>
- WCAG 1.4.3 Contrast (Minimum)：<https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>
- WCAG 1.4.11 Non-text Contrast：<https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html>
- WCAG 2.4.3 Focus Order：<https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html>
- WCAG 2.4.7 Focus Visible：<https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html>
- WCAG 2.5.3 Label in Name：<https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html>

### 校验
- W3C Nu Html Checker：<https://validator.w3.org/nu/>
- W3C CSS Validator：<https://jigsaw.w3.org/css-validator/>
