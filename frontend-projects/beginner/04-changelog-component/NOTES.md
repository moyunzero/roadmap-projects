# 04 · Changelog Component — 知识点笔记

> 本文只写这题真正用到的知识，结论尽量对照官方文档（见文末「参考资料」）。
> 标 **「建议」** 的是实践做法；标 **「注意」** 的是容易踩的坑。
> 对应代码：[index.html](index.html) · [style.css](style.css)
> 上一题：[03 · Personal Portfolio](../03-portfolio-website/NOTES.md)

## 目录

1. [这题到底练什么](#1-这题到底练什么)
2. [HTML 结构：可嵌入的组件](#2-html-结构可嵌入的组件)
3. [定位：relative + absolute](#3-定位relative--absolute)
4. [伪元素：::before / ::after](#4-伪元素before--after)
5. [两列时间线：Grid + 中线](#5-两列时间线grid--中线)
6. [中心对齐：left + translate(-50%)](#6-中心对齐left--translate-50)
7. [窄屏改布局](#7-窄屏改布局)
8. [焦点与可访问性](#8-焦点与可访问性)
9. [校验方法](#9-校验方法)
10. [本次踩过的坑](#10-本次踩过的坑)
11. [参考资料](#11-参考资料)

---

## 1. 这题到底练什么

官方目标：

> teach you about **positioning and layout** in CSS … a well-structured and **responsive** component that can be **easily integrated** into a website.

三件事：

| 关键词 | 在本项目里的落点 |
| --- | --- |
| positioning | 竖线、圆点用 `absolute` 钉在时间线上 |
| responsive | 宽屏「左日期 / 右文案」，窄屏「线靠左、日期在上」 |
| integrable | 样式挂在 `.changelog` 上，不把布局绑死在 `body` |

视觉上拆成三块：标题区 → 时间线列表 → 底部链接按钮。装饰（线、点）**不必写进 HTML**，用伪元素画。

---

## 2. HTML 结构：可嵌入的组件

```html
<section class="changelog" aria-labelledby="changelog-title">
  <header class="changelog_header">…</header>
  <ol class="changelog_list">
    <li class="changelog_item">
      <time class="changelog_date" datetime="2026-11-04">2026.11.04</time>
      <p class="changelog_text">…</p>
    </li>
  </ol>
  <p class="changelog_footer">
    <a class="changelog_button" href="#">Visit Complete Changelog</a>
  </p>
</section>
```

要点：

- **一个** `<ol>`：变更有先后顺序，适合有序列表；不要每条拆成独立的 `<ol>`。
- `<time datetime="…">`：机器可读日期用 `datetime`，展示文案可以另写。
- 底部跳转用 `<a>`，再用 CSS 做成按钮样 —— 跳转是链接的语义，不是 `<button>`。
- `aria-labelledby` 把整个 section 和标题关联起来，读屏能报出区域名。

**建议**：类名统一一种约定（本实现用 `changelog_xxx` 单下划线）。混用 `changelog__` 与 `changelog_` 时，CSS 对不上是常见低级错误。

参考：[MDN `<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time) · [MDN `<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ol)

---

## 3. 定位：relative + absolute

时间线的核心套路：

1. 父级设 `position: relative` → 成为定位参照。
2. 子级（或伪元素）设 `position: absolute` → 按父级的 padding 边算 `top` / `left`。

本项目里：

- `.changelog_list { position: relative }` → 竖线相对**整份列表**拉高。
- `.changelog_item { position: relative }` → 圆点相对**这一行**钉住。

没有 `relative` 父级时，`absolute` 会一路找到更外层的定位祖先（甚至是初始包含块），线/点就会「飞」到奇怪的位置。

参考：[MDN CSS position](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position)

---

## 4. 伪元素：::before / ::after

`::before` / `::after` 能在元素内容**前/后**各多出一个盒子，不必在 HTML 里加空 `<span>`。

对本题：

| 伪元素挂在哪 | 画什么 |
| --- | --- |
| `.changelog_list::before` | 整条竖线 |
| `.changelog_item::before` | 每条上的圆点 |

必须写 `content`（哪怕 `content: ""`），否则伪元素不生成。

**`::before` 和 `::after` 的区别**：主要是插入位置（内容前 vs 后）。一旦用了 `position: absolute` 脱离文档流，选哪个往往只是习惯；一个元素上要画**两个**装饰时，才「一个 before、一个 after」。

参考：[MDN `::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::before) · [MDN `::after`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::after)

---

## 5. 两列时间线：Grid + 中线

宽屏布局：

```css
.changelog_item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2.5rem; /* 中间留给竖线和圆点 */
}
```

- 左列：日期，`text-align: right`（朝中线靠）
- 右列：文案，`text-align: left`
- `column-gap`：别让字压到线上

竖线挂在列表上，用 `top` + `bottom` 同时钉住，高度跟着列表内容走，**不要写死 `height: 400px`**。

参考：[MDN CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout)

---

## 6. 中心对齐：left + translate(-50%)

宽屏把线和点都放在水平中线：

```css
left: 50%;
transform: translateX(-50%); /* 或圆点用 translate(-50%, -50%) */
```

含义：

1. `left: 50%`：元素的**左边缘**对准父级 50%。
2. `translateX(-50%)`：再往左挪自身宽度的一半 → **中心**才落在 50%。

圆点还要垂直对齐第一行文字，用 `top` 微调（本实现约 `1.2rem`），并加 `z-index: 1`，避免被竖线「切开」。

---

## 7. 窄屏改布局

`@media (max-width: 560px)` 时：

- 竖线 / 圆点：`left` 改到左侧同一锚点（如 `0.3rem`）
- 条目改成一列：`grid-template-columns: 1fr`，`padding-left` 给线留空
- 日期改 `text-align: left`，排在文案上方

组件自身用 `width: 100%` + `max-width: 40rem`，页面 `body` 只负责居中展示 —— 以后拷进别的网站时，带走 `.changelog` 相关规则即可。

参考：[MDN `@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media)

---

## 8. 焦点与可访问性

底部是唯一可聚焦控件（链接）：

```css
.changelog_button:focus-visible {
  outline: 2px solid #111;
  outline-offset: 3px;
}
```

- 用键盘 Tab 时要看得见焦点环；`:focus-visible` 比一律 `:focus` 更合适（鼠标点击可不强行出粗框）。
- DOM 顺序就是视觉顺序：标题 → 列表（不可聚焦）→ 链接，没有用 `order` / `row-reverse` 重排可聚焦控件。

参考：[MDN `:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible)

---

## 9. 校验方法

| 项 | 做法 | 本项目结果 |
| --- | --- | --- |
| HTML | [W3C Nu Validator](https://validator.w3.org/nu/) 上传 `index.html` | `messages: []` |
| CSS | [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)「直接输入」或上传 `style.css`，配置 CSS 3 + SVG | 恭喜通过 |
| 响应式 | DevTools 设备模式看 375 / 768 / 1280，确认无横向滚动 | 窄屏左侧时间线 |
| Console | 无脚本，不应有报错 | 通过 |

---

## 10. 本次踩过的坑

### 坑 1：窄屏竖线和圆点错位

错误写法：

```css
.changelog_list::before {
  left: 0.3rem;
  transform: none; /* 竖线：左边缘在 0.3rem */
}
.changelog_item::before {
  left: 0.3rem;
  /* 仍继承 translate(-50%, -50%) → 圆心在 0.3rem */
}
```

圆心和线的左边缘不是同一点，视觉上点偏左。

**修法**：两边都用「中心对准同一个 `left`」：

```css
.changelog_list::before {
  left: 0.3rem;
  transform: translateX(-50%);
}
/* 圆点保持 translate(-50%, -50%)，只改 left */
```

### 坑 2：把组件布局写在 body 上

`body { width: 100vw; height: 100vh; … }` 只适合演示页。组件要嵌入时，宽高、边框、时间线都应挂在 `.changelog`（及子类）上。

### 坑 3：HTML 结构一开始拆成多个 ol

每条变更一个 `<ol>` 语义不对，样式也难统一。应「一个列表、多个 `li`」。

---

## 11. 参考资料

- [MDN: position](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position)
- [MDN: ::before](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::before) / [::after](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::after)
- [MDN: transform](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform)
- [MDN: CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout)
- [MDN: @media](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media)
- [MDN: :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible)
- [MDN: `<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time)
- [W3C Nu HTML Checker](https://validator.w3.org/nu/)
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- 官方项目：<https://roadmap.sh/projects/changelog-component>
