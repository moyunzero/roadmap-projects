# 02 · Basic HTML Website — 知识点笔记

> 本文只写这题真正用到的知识，结论均来自官方文档，引用处附链接（见文末「参考资料」）。
> 标 **「建议」** 的是实践做法，不是规范强制；标 **「注意」** 的是容易踩的坑。
> 对应代码：[index.html](index.html) · [projects.html](projects.html) · [articles.html](articles.html) · [contact.html](contact.html)

## 目录

1. [从单页到多页](#1-从单页到多页)
2. [链接与路径](#2-链接与路径)
3. [页面骨架：header / nav / main / footer](#3-页面骨架header--nav--main--footer)
4. [导航的可访问性](#4-导航的可访问性)
5. [多页面的 SEO](#5-多页面的-seo)
6. [表单](#6-表单)
7. [表单可访问性](#7-表单可访问性)
8. [favicon 与复用策略](#8-favicon-与复用策略)
9. [多页面的校验方式](#9-多页面的校验方式)
10. [本次踩过的坑](#10-本次踩过的坑)
11. [参考资料](#11-参考资料)

---

## 1. 从单页到多页

01 是一个 HTML 文件，02 是四个：

```
02-basic-html-website/
├── index.html      首页
├── projects.html   项目
├── articles.html   文章
├── contact.html    联系
└── favicon.svg
```

- 每个 `.html` 都是一个**独立文档**，有自己的 `<head>`、`<body>`、`<title>`。
- 浏览器每次跳转都是**加载一个新文档**，页面之间不共享内存、不共享变量 —— 这是静态多页面站点的本质。
- 因此「四个页面都有导航」意味着导航代码在四个文件里**各存一份**。改一个链接要改四处，改完还得四页都对。

**建议**：这正是模板引擎、SSG、组件化存在的理由。先手写一遍重复代码，才知道后面那些工具在替你省什么。

**注意**：`index.html` 是默认入口，访问目录时服务器会自动返回它；文件名不要写成 `Index.html`（大小写敏感的环境下会 404）。

---

## 2. 链接与路径

### 2.1 基本写法

```html
<a href="./projects.html">Projects</a>
```

MDN 对超链接的说明：链接由 `<a>` 元素 + `href` 属性构成，`href` 是目标地址（Hypertext Reference）。

### 2.2 绝对路径 vs 相对路径

| 写法 | 含义 | 例 |
| --- | --- | --- |
| `https://example.com/a.html` | 绝对 URL（带协议和域名） | 外站链接 |
| `/projects.html` | 根相对：从**站点根目录**开始 | 部署在域名根下时 |
| `./projects.html` | 当前目录 | 同目录页面互链 |
| `projects.html` | 当前目录（同上，省略 `./`） | 同目录页面互链 |
| `../index.html` | 上一级目录 | 子目录页面回到上级 |

**为什么本站用 `./`**：

- 本地用 `file://` 打开时，`/projects.html` 会指向**磁盘根目录**，直接 404。
- 相对路径在 `file://`、`http://localhost`、GitHub Pages 子路径下都成立。
- **注意**：部署到 GitHub Pages / 任何 Linux 服务器后，路径**区分大小写**。`Projects.html` 和 `projects.html` 是两个文件，本地 macOS（默认不区分大小写）测不出来，上线就 404。

参考：[MDN — Creating links](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links)

### 2.3 导航里的当前页

当前页链接加了 `aria-current="page"`（见第 4 节），视觉上没区别，但读屏会播报「当前页」。

---

## 3. 页面骨架：header / nav / main / footer

四页统一成同一套结构：

```html
<header>
  <a href="./index.html"><img src="favicon.svg" width="32" height="32" alt=""> Mo Yun</a>
  <nav aria-label="Main">
    <ul>
      <li><a href="./index.html" aria-current="page">Home</a></li>
      <li><a href="./projects.html">Projects</a></li>
      <li><a href="./articles.html">Articles</a></li>
      <li><a href="./contact.html">Contact</a></li>
    </ul>
  </nav>
</header>

<main>…页面内容…</main>

<footer>…版权、联系方式…</footer>
```

### 3.1 `<nav>`

**MDN 原文**：

> The `<nav>` HTML element represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents. Common examples of navigation sections are menus, tables of contents, and indexes.

两个容易过头的点（同样来自 MDN）：

> It's not necessary for all links to be contained in a `<nav>` element. `<nav>` is intended only for a major block of navigation links; typically the `<footer>` element often has a list of links that don't need to be in a `<nav>` element.

- **不是所有链接都要塞进 `nav`**。页脚里那堆链接就不必。
- 一个文档**可以有多个 `nav`**（比如全站导航 + 页内目录），这时要各自给名字区分：

> A document may have several `<nav>` elements, for example, one for site navigation and one for intra-page navigation. `aria-labelledby` can be used in such case to promote accessibility.

本页只有一个导航，所以用了更简单的 `aria-label="Main"`。

### 3.2 `<header>` / `<footer>`

- `<header>`：引导性内容（站点名、logo、导航）。
- `<footer>`：页脚，放版权、联系方式等「附属信息」。
- 两者都可以出现在 `article` / `section` 内部，表示「这一块的头部/尾部」，不一定是整页的。

### 3.3 `<main>`

- 每页**一个**可见的 `main`，承载该页独有的内容。
- 全站重复的导航、页脚**不要**放进 `main` —— 那会污染「这页的正文是什么」。

### 3.4 为什么 logo 用 `alt=""`

```html
<a href="./index.html">
  <img src="favicon.svg" width="32" height="32" alt="">
  Mo Yun
</a>
```

- 图片是**装饰性**的，链接文字「Mo Yun」已经说明了目标。
- 如果写 `alt="Moyun resume"`，读屏会念成「Moyun resume，Mo Yun，链接」—— 同一件事说两遍。
- 装饰图用空 `alt` 是标准做法；有信息量的图才需要描述。

---

## 4. 导航的可访问性

### 4.1 `aria-label="Main"`

- `<nav>` 本身有隐式角色 `navigation`，但没有名字。
- 多个导航区时，`aria-label` 给每个区一个可播报的名字，读屏的「地标列表」里就能区分「Main 导航」「Footer 导航」。
- **注意**：`aria-label` 是**可访问名称**，不是提示文字；它不会显示在页面上，也不该用来写长说明。

### 4.2 `aria-current="page"`

WAI-ARIA 定义：`aria-current` 用来标记「当前项」，`page` 表示「当前页」。

```html
<a href="./projects.html" aria-current="page">Projects</a>
```

- 只给**当前页**那个链接加，其他页不加。
- 视觉上没有变化（没 CSS 也看不出），但读屏会播报「当前页」，用户知道自己在哪。
- 常见误用：每个链接都加上，等于告诉用户「处处都是当前页」。

### 4.3 导航的链接文字

- 四个链接文字是 `Home` / `Projects` / `Articles` / `Contact`，脱离上下文也能看懂。
- 不要用「这里」「点击」这类文字（WCAG 2.4.4）。

### 4.4 Tab 顺序

- 不用 `tabindex` 时，Tab 顺序 = DOM 顺序，和视觉顺序一致，这是最省事的正确做法。
- 如果用了 CSS 改变视觉顺序（比如 `flex-direction: row-reverse`），DOM 顺序和视觉顺序会错位 —— 这是 03 加样式时要留意的坑。

参考：[WAI-ARIA 1.2 — aria-current](https://www.w3.org/TR/wai-aria-1.2/#aria-current)

---

## 5. 多页面的 SEO

### 5.1 每页一套独立的 title / description

| 页面 | `<title>` | description 主题 |
| --- | --- | --- |
| `index.html` | Mo Yun — Junior Frontend Developer | 个人简介 |
| `projects.html` | Projects — Mo Yun | 项目列表 |
| `articles.html` | Articles — Mo Yun | 笔记列表 |
| `contact.html` | Contact — Mo Yun | 联系方式与表单 |

- 复制上一页的 `<head>` 再改，是最快的做法，但**最容易漏改** `title` 和 `description`。
- 检查方法：`grep -h "<title>" *.html`，四行必须互不相同。
- 这也违反了 01 里记的 MDN 结论：标题要唯一，不要模板化重复。

**注意**：`title` 的「页面名 — 站点名」顺序，是按读屏体验排的（先说这页是什么，再说属于哪个站），不是按视觉习惯。

### 5.2 OG 标签也随页面走

每页的 `og:title` / `og:description` 应与该页 `title` / `description` 对齐，`og:type` 用 `website`。

---

## 6. 表单

### 6.1 `<form>` 是什么

MDN：

> The `<form>` HTML element represents a document section containing interactive controls for submitting information.

```html
<form action="#" method="post">
  …
</form>
```

- `action`：MDN 写的是「The URL that processes the form submission.」—— 处理提交的地址。
- `method`：提交方式，`get` 把数据拼在 URL 后，`post` 放在请求体里。
- 本题**没有后端**，`action="#"` 只是占位；等有后端或接第三方表单服务再改。

### 6.2 `<label>`：必须和控件关联

MDN：

> The `<label>` HTML element represents a caption for an item in a user interface.

关联方式有两种：

```html
<!-- 显式：for 指向控件的 id -->
<label for="name">Name</label>
<input type="text" id="name" name="name">

<!-- 隐式：把控件包进 label -->
<label>Name <input type="text" name="name"></label>
```

MDN 明确推荐显式关联：

> Generally, we recommend using explicit association with the `for` attribute, to ensure compatibility with external tools and assistive technologies.

关联之后得到什么（MDN 原文）：

> The label text is not only visually associated with its corresponding text input; it is programmatically associated with it too. This means that, for example, a screen reader will read out the label when the user is focused on the form input…

> When a user clicks or touches/taps a label, the browser passes the focus to its associated input…

- 读屏能念出「Name，编辑框」。
- 点文字也能聚焦输入框（触屏上等于扩大点击区域）。

**注意**：`for` 的值必须是**页内唯一**的 `id`；重复 `id` 会让关联指错。

### 6.3 输入类型

```html
<input type="text" id="name" name="name" autocomplete="name" required>
<input type="email" id="email" name="email" autocomplete="email" required>
<input type="text" id="subject" name="subject">
<textarea id="message" name="message" rows="6" required></textarea>
```

- `type="email"`：浏览器会做格式校验（不要求联网），手机弹出带 `@` 的键盘。
- `required`：不填不能提交，浏览器给出原生提示。
- `autocomplete="name" / "email"`：告诉浏览器这是哪类字段，便于自动填充；移动端键盘和密码管理器也依赖它。
- `name`：提交时的字段名，后端靠它取数据；没有 `name` 的控件不会提交。
- `textarea` 用 `rows` 控制初始高度，`cols` 不写时默认 20 列 —— 在 375px 下刚好放得下。

### 6.4 `<button type="submit">`

```html
<button type="submit">Send message</button>
```

- `type="submit"` 是 `<button>` 在表单里的**默认值**，但显式写出来更清楚。
- 如果误写成 `type="button"`，点了不会提交，也不报错 —— 一个很安静的 bug。

### 6.5 原生校验

- 浏览器对 `required`、`type="email"`、`minlength` 等做**约束校验（constraint validation）**，不通过就不提交。
- 这层校验**不能替代服务端校验**（用户可以绕过），但能省掉大量低级错误。
- 本题不要求真的提交，所以没有 `novalidate`，让原生提示照常工作。

---

## 7. 表单可访问性

### 7.1 不要用 placeholder 当 label

- `placeholder` 只是提示，输入时**会消失**，而且对比度通常很低。
- 没有 label 的输入框，读屏只能念出「编辑框」，用户不知道要填什么。
- 对应 WCAG 3.3.2 *Labels or Instructions*：需要用户输入的地方必须提供标签或说明。

### 7.2 `required` 的可感知性

- 原生 `required` 会让浏览器在提交时提示，同时读屏能读出「必填」。
- 如果视觉上额外标记（比如 `*`），要配上文字说明「* 为必填」，不能只靠符号。

### 7.3 表单的语义分组（本题未用）

字段多的表单可以用 `<fieldset>` + `<legend>` 分组：

```html
<fieldset>
  <legend>Contact details</legend>
  …
</fieldset>
```

本题只有四个字段，直接平铺即可；字段一多就该分组。

---

## 8. favicon 与复用策略

- 每个页面都要 `<link rel="icon" href="favicon.svg" type="image/svg+xml">`，漏一页那页就没图标。
- 本题直接复用了 01 的 `favicon.svg`（内容完全一样）。
- 多页面站点里，图标、导航这类「全站资产」天生需要复用；纯 HTML 没有 `include`，只能复制。这也是 03 之后会碰到的真实痛点。

---

## 9. 多页面的校验方式

### 9.1 每页单独校验

W3C Nu 校验器一次只处理一个文档，四个文件要跑四次：

```bash
for f in *.html; do
  curl -sS -F "file=@$f;type=text/html" "https://validator.w3.org/nu/" -o "/tmp/vnu-$f.html"
done
```

结果（2026-11-18）：

> 四页均返回 `The document validates according to the specified schema(s).` —— 0 error。

**注意**：校验器不会检查相对链接是否指向真实文件，也不会检查导航是否四页都有。这两项得自己验。

### 9.2 链接检查

```bash
grep -oh 'href="\./[^"]*"' *.html | sort -u | sed 's/href="//;s/"//' \
  | while read -r l; do [ -f "$l" ] && echo "OK $l" || echo "MISS $l"; done
```

### 9.3 375px 自查的正确姿势

**踩过的坑**：用 headless Chrome 直接 `--window-size=375,900` 截图，看到文字被右侧截断，像是横向溢出。实际不是 —— headless Chrome 的**最小视口是 500px**，截图只是把 500px 的排版裁到 375px。

可靠的测法：把 `body` 宽度约束到 375px，再读 `scrollWidth`：

```html
<body style="width: 375px; margin: 0;">
<!-- 末尾加脚本输出 document.body.scrollWidth -->
```

四页的 `body.scrollWidth` 都是 375，说明内容没有撑破 375px。

---

## 10. 本次踩过的坑

| 坑 | 现象 | 原因 | 修法 |
| --- | --- | --- | --- |
| `<head>` 出现在 `<body>` 里 | 导航写进了第二个 head，页面结构非法 | 把 header 区域误当成 `<head>` | 改成 `<header>` 元素 |
| viewport 写坏 | `content="width=<device-width>, initial-scale=1.0"` | 把文档里的占位符 `<device-width>` 原样抄进代码 | 去掉尖括号：`width=device-width` |
| 导航只在首页有 | 其他三页没有链接 | 先写了首页，没复制 | 四页统一 header + nav |
| 漏了 contact 表单 | 联系页只有一行文字 | 漏读题面的第四条要求 | 补 `<form>` + label + input |
| logo 的 alt 写成人名 | 读屏重复播报 | 装饰图给了描述性 alt | 装饰图 `alt=""` |
| 复制 head 忘改 title | 四页标题相同 | 复制粘贴 | 每页 `title` / `description` 唯一 |
| 用绝对路径互链 | 推到 GitHub Pages 后 404 | `/projects.html` 指向站点根 | 改用 `./projects.html` |
| 依赖 placeholder | 填字后提示消失，读屏无标签 | 把占位符当标签 | 用 `<label for>` 显式关联 |

补充：**没有 CSS 时导航是竖排带圆点的列表**，这不是 bug。`nav > ul > li` 的默认样式就是纵向列表，横向导航条是 03 加 CSS 之后的事。

---

## 11. 参考资料

### 结构 / 导航
- MDN `<nav>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav>
- MDN `<header>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/header>
- MDN `<footer>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer>
- MDN `<main>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main>
- MDN `<head>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head>

### 链接与路径
- MDN — Creating links（绝对/相对路径）：<https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links>
- MDN `<a>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a>

### 表单
- MDN `<form>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form>
- MDN `<label>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label>
- MDN `<input>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input>
- MDN `<textarea>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea>
- MDN `<button>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button>
- MDN `required`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/required>
- MDN `autocomplete`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete>

### 无障碍
- WAI-ARIA 1.2 `aria-current`：<https://www.w3.org/TR/wai-aria-1.2/#aria-current>
- WCAG 2.2：<https://www.w3.org/TR/WCAG22/>
- WCAG 3.3.2 Labels or Instructions：<https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html>
- WCAG 2.4.4 Link Purpose (In Context)：<https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html>

### 校验
- W3C Nu Html Checker：<https://validator.w3.org/nu/>
