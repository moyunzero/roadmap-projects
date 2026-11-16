# 01 · Single-Page CV — 知识点笔记

> 标 **「建议」** 的是实践中的做法，不是规范强制；标 **「注意」** 的是容易踩的坑。
> 对应代码：[index.html](index.html) · [favicon.svg](favicon.svg)

## 目录

1. [文档骨架](#1-文档骨架)
2. [`<head>` 里的元数据](#2-head-里的元数据)
3. [Open Graph（OG）标签](#3-open-graphog标签)
4. [favicon](#4-favicon)
5. [语义化标签](#5-语义化标签)
6. [标题层级 h1–h6](#6-标题层级-h1h6)
7. [结构化信息：address / time / mailto / tel](#7-结构化信息address--time--mailto--tel)
8. [列表与链接](#8-列表与链接)
9. [校验与验证](#9-校验与验证)
10. [本次踩过的坑](#10-本次踩过的坑)
11. [参考资料](#11-参考资料)

---

## 1. 文档骨架

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>…</title>
</head>
<body>
  …
</body>
</html>
```

### `<!DOCTYPE html>`

- 作用：让浏览器用**标准模式（standards mode）**渲染，而不是 quirks mode。HTML 标准规定文档必须以 doctype 开头。
- 它不是 HTML 元素，没有闭合标签，写错一个字母（比如 `<!DOCTYPE html5>`）就会掉回怪异模式。
- 参考：[WHATWG HTML — The DOCTYPE](https://html.spec.whatwg.org/multipage/syntax.html#the-doctype)

### `<html lang="…">`

- `lang` 声明**文档内容使用的语言**（这里是 `en`）。
- 它影响：屏幕阅读器选哪种语音合成、浏览器是否提供翻译提示、断词/连字符、拼写检查。
- 无障碍角度对应 WCAG 3.1.1 *Language of Page*：页面主语言必须能被程序判定。
- 页面有多语言混排时，可以给局部元素单独加 `lang`。
- 参考：[MDN `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang) · [WCAG 3.1.1](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html)

### `<head>` 与 `<body>`

- `<head>` 放**文档级元数据**：字符集、标题、描述、图标、OG、样式表、脚本。
- `<body>` 放**用户可见内容**。
- 注意：`<head>` 里只能出现有限类型的元素（`title`、`meta`、`link`、`style`、`script`、`base` 等）。Google 的文档明确说，如果 `<head>` 里混进无效元素，它可能**忽略该元素之后的所有元素** —— 元数据写错位置，等于白写。
- 参考：[Google — Valid page metadata](https://developers.google.com/search/docs/crawling-indexing/valid-page-metadata)

---

## 2. `<head>` 里的元数据

### 2.1 `<meta charset="UTF-8">`

**是什么**：声明文档的字符编码。

**MDN 原文**：

> This attribute declares the document's character encoding. If the attribute is present, its value must be an ASCII case-insensitive match for the string `"utf-8"`, because UTF-8 is the only valid encoding for HTML5 documents. `<meta>` elements which declare a character encoding must be located entirely within the first 1024 bytes of the document.

要点：

- HTML5 里**唯一合法的值就是 `utf-8`**，写 `gbk`、`gb2312` 都不合规。
- 必须出现在文档**前 1024 字节内**，所以通常放在 `<head>` 第一行。
- 漏写会导致中文乱码（浏览器按本地编码猜）。

参考：[MDN `<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta)

### 2.2 `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

**是什么**：给浏览器一个「视口初始尺寸」的提示，来自 CSS Viewport 模块。

- `width=device-width`：视口宽度 = 设备宽度，而不是虚拟的 980px。
- `initial-scale=1.0`：初始缩放比例 1。
- 没有它，手机浏览器会按桌面宽度渲染再整体缩小，页面看起来像缩略图。
- 这题不写 CSS，但它决定了这一页在手机上是否**按设备宽度排版**，属于移动端基线配置。

参考：[MDN `meta name=viewport`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport)

### 2.3 `<title>`

**是什么**：文档标题，显示在浏览器标签页/标题栏。

**MDN 原文**：

> The `<title>` element defines the document's title that is shown in a browser's title bar or a page's tab.

#### 为什么它对 SEO 重要

MDN 在 "Page titles and SEO" 一节里说：

> In general, a longer, descriptive title performs better than short or generic titles. The content of the title is one of the components used by search engine algorithms to decide the order in which to list pages in search results.

同一节给出的具体建议：

- 不要用一两个词的标题（"Home"、"CV" 这种）。
- 搜索引擎通常只显示**前 55–60 个字符**，重要的词往前放。
- 不要堆关键词（"keyword blobs"），算法会因此降低排名。
- 站点内每个页面的 `title` 要**唯一**。

Google 的《影响标题链接》文档也是同一思路：简明、避免关键词堆砌、避免模板化重复、每个页面独一无二。

#### 为什么它对可访问性重要

MDN：

> A common navigation technique for users of assistive technology is to read the page title and infer the content the page contains.

读屏用户切换页面时先听到标题，所以标题应「先写页面用途，再写站点名」。对应 WCAG 2.4.2 *Page Titled*。

**对本页**：`Single Page CV` → `Mo Yun — Junior Frontend Developer`，把「谁 + 干什么」放进去了。

参考：[MDN `<title>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title) · [Google 标题链接](https://developers.google.com/search/docs/appearance/title-link)

### 2.4 `<meta name="description">`

**是什么**：页面内容的简短摘要，俗称 meta description。

**MDN 原文**：

> A short and accurate summary of the content of the page usually referred to as a "meta description". Search engines like Google use this metadata to adjust the appearance of a webpage in search results.

**有什么用**：

- 搜索结果里标题下面那两行灰字，通常就是它。
- 写得好 → 点击率高；写不好 → 搜索引擎可能自己从正文里摘一段。
- 它**不是**排名因素。Google 在官方博客里说：摘要的文本「有时」会取自 `description`，但「在确定网页排名时依然不会考虑 description meta 标记」。所以它的收益来自**点击率**，不是排名。

**建议**：一两个句子、说清这页有什么、不堆关键词、每页不同。

参考：[MDN `meta name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name)

### 2.5 `<meta name="author">`

**是什么**：文档作者名。MDN 定义只有一句：

> The document author's name.

- 不参与排名，也不显示在页面上，属于「元数据完整性」。
- 同类的还有 `publisher`、`creator` 等，来自 WHATWG MetaExtensions 列表（非标准，但常被使用）。

### 2.6 `<meta name="keywords">` — 了解即可，别依赖

**MDN 定义**：

> Words relevant to the page's content separated by commas.

规范里确实定义了这个名字，但**搜索引擎基本不用它**。Google 在 2009 年的官方博客里说得很直接：

> Google does not use the keywords meta tag in web ranking.

**结论**：这题不写 `keywords`。写了不报错、也不会有收益，反而容易误导自己以为做了 SEO。

参考：[Google 官方博客 — Google does not use the keywords meta tag](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag)

### 小结：本页 `<head>` 逐行对照

| 标签 | 类别 | 作用 | 是否题面要求 |
| --- | --- | --- | --- |
| `meta charset` | 编码 | 中文不乱码 | 隐含必需 |
| `meta viewport` | 移动端 | 按设备宽度渲染 | 隐含必需 |
| `title` | 标题 | 标签页 + 搜索标题 | 隐含必需 |
| `meta description` | SEO | 搜索摘要 | ✅ SEO 要求 |
| `meta author` | 元数据 | 作者署名 | ➖ 加分项 |
| `og:*` | 社交分享 | 分享卡片 | ✅ OG 要求 |
| `link rel="icon"` | 图标 | 标签页图标 | ✅ favicon 要求 |

---

## 3. Open Graph（OG）标签

### 3.1 是什么

**官方定义（ogp.me）**：

> The Open Graph protocol enables any web page to become a rich object in a social graph.

一句话：一套**写在 `<head>` 里、用 `<meta property="…">` 表达**的元数据协议，让社交平台知道「这个链接是什么、标题是什么、配哪张图」。

它不是 HTML 标准的一部分，而是 Facebook 发起、被广泛采用的独立协议（建立在 RDFa 思路之上）。

### 3.2 有什么用

当你把链接贴到支持 OG 的平台（Facebook、LinkedIn、Slack、Discord、微信/iMessage 的链接预览等），平台会抓取这些标签，渲染成一张**带标题、描述、缩略图的卡片**，而不是干巴巴一条 URL。

- 没有 OG：平台只能自己猜（抓 `<title>`、正文首段、页面第一张图），结果经常难看。
- 有 OG：标题、摘要、图片由你指定，分享效果可控。

**注意**：OG 服务的是「链接被分享出去时长什么样」，和「搜索结果里排第几」是两件不同的事，别把它当 SEO 手段。这题要求 OG，是因为简历会发到社交媒体上。

### 3.3 基本元数据：四个必需项

ogp.me 原文：

> The four required properties for every page are:
> - `og:title` - The title of your object as it should appear within the graph, e.g., "The Rock".
> - `og:type` - The type of your object, e.g., "video.movie". Depending on the type you specify, other properties may also be required.
> - `og:image` - An image URL which should represent your object within the graph.
> - `og:url` - The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".

写法是 `<meta property="og:xxx" content="…">`（注意是 **`property`**，不是 `name`）。

### 3.4 可选但有价值的属性

ogp.me 列出的可选属性（"generally recommended"）：

| 属性 | 作用 | 本页是否使用 |
| --- | --- | --- |
| `og:description` | "A one to two sentence description of your object." | ✅ |
| `og:site_name` | 对象所属站点名，如 "IMDb" | ✅ |
| `og:locale` | 语言，格式 `language_TERRITORY`，默认 `en_US` | ➖ |
| `og:determiner` | 标题前的冠词（a / an / the / 空） | ➖ |
| `og:audio` / `og:video` | 配套音视频 URL | ➖ |

### 3.5 结构化属性（以 og:image 为例）

ogp.me：

> `og:image:alt` - A description of what is in the image (not a caption). If the page specifies an og:image it should specify `og:image:alt`.

可选的 `og:image:*`：

- `og:image:url`（等同 `og:image`）
- `og:image:secure_url`（HTTPS 地址）
- `og:image:type`（MIME 类型）
- `og:image:width` / `og:image:height`（像素尺寸）
- `og:image:alt`（图片内容描述，无障碍与降级都用得上）

同一套规则也适用于 `og:video:*`；`og:audio:*` 只有前三项。

### 3.6 `og:type` 常用值

ogp.me 把类型分为纵向域（music / video）和无域（article / book / profile / website）：

- `website` — 普通网页。官方说明："Any non-marked up webpage should be treated as `og:type` website."
- `article` — 文章，可配 `article:published_time`、`article:author`、`article:tag` 等。
- `profile` — 人物主页，可配 `profile:first_name`、`profile:last_name`、`profile:username`、`profile:gender`。
- `book` — 书籍，可配 `book:author`、`book:isbn`、`book:release_date`。

本页是个人简历，用 `profile` 合理（严格说 `profile` 面向「人物在社交图谱中的主页」，简历页用 `website` 也行 —— 没有唯一正确答案）。

### 3.7 `og:url` / `og:image` 必须是完整 URL

ogp.me 的类型表里，URL 类型定义为：

> A sequence of Unicode characters that identify an Internet resource. — All valid URLs that utilize the `http://` or `https://` protocols.

也就是说这两个值必须是**带协议的绝对地址**（`https://…`），不能写相对路径 `/og.png`，更不能写 `example.com` 这种没有协议的字符串。

### 3.8 本题的实现与取舍

题面只有一句要求："Open Graph (OG) Tags: Add OG tags for better social media sharing." —— 它没有规定写哪几个属性。

本页实际写了：

```html
<meta property="og:title" content="Mo Yun — Junior Frontend Developer">
<meta property="og:description" content="Frontend developer CV: skills, education and work experience.">
<meta property="og:type" content="profile">
<meta property="og:site_name" content="Mo Yun — CV">
```

**为什么没写 `og:url` / `og:image`**：

- 这两项要求绝对 URL，而这页目前只是本地文件，没有可公开访问的地址。
- 填 `https://example.com/...` 会造出一个「看起来有、实际打不开」的假链接，分享时卡片反而更糟。
- 因此**有意省略**，等部署后再补。这一点要说清楚，因为按 ogp.me 的「四项必需」，严格实现是缺两项的 —— 是取舍，不是遗漏。

**部署后要补的**：

```html
<meta property="og:url" content="https://your-domain.com/cv/">
<meta property="og:image" content="https://your-domain.com/cv/og-cover.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Mo Yun 的简历页面预览">
```

（1200×630 是社交平台常用的横图比例，属业界惯例，不是协议强制。）

### 3.9 怎么验证 OG 写对没有

- Facebook 官方调试器：<https://developers.facebook.com/tools/debug/>（ogp.me 的 Implementations 一节列出）
- 其他平台各有预览工具，原理相同：抓取 `<head>` 里的 `og:*` 并按协议解析。
- 验证前提：页面必须能被公网抓取，本地 `file://` 抓不到。

---

## 4. favicon

### 4.1 是什么、怎么写

favicon = 浏览器标签页、书签栏、历史记录里显示的小图标。

标准写法：

```html
<link rel="icon" href="favicon.svg" type="image/svg+xml">
```

- `rel="icon"` 是 **link type**，告诉浏览器「这个链接是页面图标」。WHATWG HTML 标准为 `icon` 定义了专门的一节（"Link type: icon"）。
- `type` 是 MIME 类型提示，帮助浏览器快速判断能不能用。
- 标准并没有规定必须叫 `favicon.ico`，文件名和位置都随你；`favicon.ico` 只是历史惯例（老 IE 会去根目录盲找）。

### 4.2 为什么这题用 SVG

- 矢量格式，放大缩小都清晰，不用准备 16/32/48 多个尺寸。
- 纯文本，几十行就能写一个，适合放进版本库。
- 现代浏览器支持用 SVG 作 favicon（Chrome、Firefox 等）；如果要兼容很老的环境，可以再补一份 `.ico` / `.png`。
- 可选加 `sizes="any"`，表示「可缩放，任意尺寸」，常用于 SVG 图标。

本项目的图标：

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Mo Yun">
  <rect width="64" height="64" rx="12" fill="#0f766e"/>
  <text x="32" y="43" font-size="26" font-weight="600" fill="#ffffff" text-anchor="middle">MY</text>
</svg>
```

### 4.3 多格式、多尺寸的常规做法

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

- 浏览器按自己能识别的类型挑选，多个 `link rel="icon"` 是允许的。
- `apple-touch-icon` 用于 iOS 添加到主屏。
- 这部分属于「工程实践」，HTML 标准只定义了 `rel="icon"` 的语义，不规定你要准备几种格式。

参考：[WHATWG — Link type: icon](https://html.spec.whatwg.org/multipage/links.html#rel-icon) · [MDN `<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link)

---

## 5. 语义化标签

「语义化」= 用**含义正确**的标签，而不是全用 `<div>`。浏览器、搜索引擎、读屏软件都靠标签判断结构。

### 5.1 `<header>`

MDN：表示「引导性内容」，通常是一组介绍性或导航性元素。

- 可以包含：标题、logo、搜索框、作者名、导航。
- 一个页面可以有多个 `header`（每个 `article` / `section` 里也能有自己的 `header`）。

本页用途：装姓名（h1）、职位、联系方式（address）。

### 5.2 `<main>`

MDN：表示文档 `<body>` 的**主要内容**区域，内容是「与文档中心主题直接相关或扩展」的部分。

- 一个页面只应有一个**可见**的 `<main>`。
- 不要把它套在 `header` / `nav` / `footer` 里。
- 读屏用户可以直接跳到 `main`（跳过重复导航），所以它等同于「内容从这里开始」。

### 5.3 `<section>`

MDN：表示文档中一个**通用独立区块**，当没有更具体的语义元素可用时使用；**区块应当有标题**。

- 本页的 Skills / Education / Work Experience / Across the Internet 都是 `section`，每个都以 `h2` 开头。
- 如果只是「为了包一层样式」，用 `div` 更诚实 —— `section` 有语义，不该被当成 `div` 用。

### 5.4 `<article>`

MDN：表示文档/页面/应用/站点中一个**自包含**的组成单元，意图是「可独立分发或复用」（例如被聚合、被转发）。

- 判据：把这块内容单独拿出去，还说得通吗？
- 本页：一条教育经历、一段工作经历，都是自包含的，所以用 `article`。
- 多个 `article` 平铺（如博客列表）时，每个 `article` 应带自己的标题。

### 5.5 为什么不用 `div` 一把梭

`div` 和 `span` 没有任何语义，只是「容器」。用语义标签的好处：

| 受益方 | 收益 |
| --- | --- |
| 读屏软件 | 可生成大纲、可跳转 landmark（header/main/nav/footer） |
| 搜索引擎 | 更容易判断哪部分是正文、哪部分是导航 |
| 后续 CSS | 选择器更有意义，不用堆 class |
| 维护者 | 打开源码就知道每块是什么 |

参考：[MDN `header`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/header) · [`main`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main) · [`section`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section) · [`article`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article)

---

## 6. 标题层级 h1–h6

### 6.1 是什么

MDN：

> The `<h1>` to `<h6>` HTML elements represent six levels of section headings. `<h1>` is the highest section level and `<h6>` is the lowest.

- 它们是**结构**，不是字号工具。MDN 明确说："Do not use heading elements to resize text. Instead, use the CSS `font-size` property."
- 浏览器/读屏软件用标题层级自动生成文档大纲（table of contents）。

### 6.2 不要跳级

MDN 原文：

> Do not skip heading levels: always start from `<h1>`, followed by `<h2>` and so on.

反例（本次初版就是这个问题）：

```html
<h1>Mo Yun</h1>
<h3>Skills</h3>      <!-- 从 h1 直接跳到 h3 -->
```

后果：读屏用户听到「三级标题」时会以为漏掉了一整块内容；自动生成的大纲也会断掉。

### 6.3 一页一个 `<h1>`

MDN：

> A page should generally have a single `<h1>` element that describes the content of the page (similar to the document's `<title>` element).

规范允许出现多个 `h1`，但**不是最佳实践**；嵌套 `section` 里塞多个 `h1` 的旧写法，在新版标准里已不合规。

### 6.4 本页的层级

```text
h1 Mo Yun
├── h2 Skills
├── h2 Education
│   └── h3 Transport University
├── h2 Work Experience
│   └── h3 Junior Frontend Developer
└── h2 Across the Internet
```

---

## 7. 结构化信息：address / time / mailto / tel

### 7.1 `<address>`

MDN：

> The `<address>` element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.

关键约束（同样来自 MDN）：

- 应包含「联系方式所指的人/组织」的名字。
- **不应包含联系方式之外的内容**（比如发布日期，那属于 `<time>`）。
- 只能表示**最近的 `article` 或 `body` 祖先**的联系方式。

本页把它放在 `header` 里，表示整页（`body`）作者的联系方式，是合法用法。

### 7.2 `<time>` 与 `datetime`

MDN：`<time>` 表示一个具体时间点/时间段；可以带 `datetime` 属性，把人类可读文本翻译成**机器可读格式**（ISO 8601），便于搜索引擎和日历类功能使用。

```html
<p>Graduated <time datetime="2020">2020</time></p>
```

- 显示给用户的是 `2020`，机器读到的是 `2020`（ISO 8601 的合法写法）。
- 复杂写法如 `<time datetime="2024-03-01T09:00">3 月 1 日上午 9 点</time>`。
- 日期格式参考：[MDN Date and time formats](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Date_and_time_formats)

### 7.3 `mailto:` 与 `tel:`

```html
<a href="mailto:moyun@example.com">moyun@example.com</a>
<a href="tel:+861234567890">123-456-7890</a>
```

- `mailto:` 定义在 **RFC 6068**，`tel:` 定义在 **RFC 3966**，都是标准 URI scheme。
- `mailto:` 还支持参数：`?subject=…&body=…&cc=…`（参数值需要 URL 编码）。
- `tel:` 的号码建议用国际格式（`+86…`），去掉空格和括号。
- **注意**：`tel:` 在桌面上没有注册处理程序时通常没反应，这是环境问题，不是写法错误；在手机上会直接唤起拨号。

参考：[RFC 6068](https://www.rfc-editor.org/rfc/rfc6068) · [RFC 3966](https://www.rfc-editor.org/rfc/rfc3966)

---

## 8. 列表与链接

### 8.1 列表

- 技能、经历条目用 `<ul>` / `<li>`：读屏会播报「列表，6 项」，用户能感知数量与结构。
- 有顺序关系时用 `<ol>`（比如「步骤 1/2/3」）。
- 不要用连续的 `<p>` 或换行 `<br>` 假装列表。

### 8.2 链接文字要能独立表达用途

WCAG 2.4.4 *Link Purpose (In Context)*：链接的用途应当能从链接文字（或上下文）判断。

- ✅ `LinkedIn` / `GitHub` / `Twitter`
- ❌ 「点击这里」「更多」

本页社媒链接用 `ul` 列出，每一项文字本身就是目的，符合要求。

---

## 9. 校验与验证

### 9.1 W3C Nu Html Checker 是什么

<https://validator.w3.org/nu/>，官方名 Nu Html Checker，按 HTML 标准检查文档的**语法与结构**：元素是否允许出现在该位置、属性是否合法、嵌套是否正确。

本次结果：

> The document validates according to the specified schema(s).
> Used the schema for HTML + SVG + MathML + RDFa.

### 9.2 它**不**检查什么

这点很重要，别把「校验通过」当成「做完了」：

- ❌ 视觉效果（这题没 CSS，谈不上）
- ❌ 内容是否正确/合理
- ❌ SEO 效果、OG 是否会正确渲染
- ❌ 无障碍是否真的可用（校验器只能提示部分问题）
- ❌ 链接是否 404

### 9.3 怎么跑

命令行上传本地文件（无需部署）：

```bash
curl -F "file=@index.html;type=text/html" "https://validator.w3.org/nu/?out=json"
```

网页版：<https://validator.w3.org/nu/#textarea> 直接粘贴源码。

### 9.4 额外的自查手段

- 无样式渲染：这题本来就没 CSS，浏览器里直接看，结构层次是否还说得清。
- 键盘走查：Tab 能依次到所有链接，焦点可见。
- 大纲视图：Nu 校验器的 "outline" 功能可以看标题层级是否合理。

---

## 10. 本次踩过的坑

| 坑 | 现象 | 原因 | 修法 |
| --- | --- | --- | --- |
| 标题跳级 | `h1` 之后直接 `h3` | 把标题当字号用 | 全部降为 `h2`，职位并入 `header` |
| 写了内联样式 | `<h3 style="color: green">` | 想让它「好看一点」 | 全删；样式属于下一题 |
| 用颜色传达分类 | 绿色标题、蓝色学校名 | 视觉区分 | 语义结构本身就区分了，颜色不是必需 |
| SEO meta 缺失 | 只有 `title` | 只关注了页面内容 | 补 `description`、`author` |
| OG 缺失 | 一个都没有 | 不知道这是什么 | 补 `og:title/description/type/site_name` |
| favicon 缺失 | 标签页是默认图标 | 没意识到这也是要求 | 加 `favicon.svg` + `link rel="icon"` |
| 联系方式不可点 | 纯文本邮箱/电话 | 忘了 `mailto:`/`tel:` | 改成链接 |
| OG 填假域名 | `https://example.com/...` | 以为「填上就行」 | 没有真实地址就**不写**，部署后再补 |

补充一条无障碍常识：**不要只用颜色传达信息**（WCAG 1.4.1 *Use of Color*，<https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html>）。初版用绿色表示「标题」、蓝色表示「机构名」，一旦用户色觉异常或开强制高对比模式，这层含义就丢了。

---

## 11. 参考资料

### HTML / 语义化
- MDN `<meta>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta>
- MDN `<meta name>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name>
- MDN `<title>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title>
- MDN 标题元素 h1–h6：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements>
- MDN `<header>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/header>
- MDN `<main>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main>
- MDN `<section>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section>
- MDN `<article>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article>
- MDN `<address>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/address>
- MDN `<time>`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time>
- MDN `meta name=viewport`：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport>
- MDN `lang` 全局属性：<https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang>
- WHATWG HTML 标准：<https://html.spec.whatwg.org/multipage/>
- WHATWG — Link type: icon：<https://html.spec.whatwg.org/multipage/links.html#rel-icon>

### Open Graph
- 官方协议：<https://ogp.me/>
- Facebook 调试器：<https://developers.facebook.com/tools/debug/>

### SEO
- Google 标题链接：<https://developers.google.com/search/docs/appearance/title-link>
- Google 有效的页面元数据：<https://developers.google.com/search/docs/crawling-indexing/valid-page-metadata>
- Google 不使用 keywords 的官方说明（同篇也说明 description 不参与排名）：<https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag>

### 无障碍
- WCAG 2.2：<https://www.w3.org/TR/WCAG22/>
- WCAG 3.1.1 Language of Page：<https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html>
- WCAG 2.4.2 Page Titled：<https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html>
- WCAG 2.4.4 Link Purpose (In Context)：<https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html>
- WCAG 1.4.1 Use of Color：<https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html>

### 标准
- RFC 6068（mailto）：<https://www.rfc-editor.org/rfc/rfc6068>
- RFC 3966（tel）：<https://www.rfc-editor.org/rfc/rfc3966>

### 校验
- W3C Nu Html Checker：<https://validator.w3.org/nu/>
