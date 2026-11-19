# roadmap.sh 项目练习

专门用来**动手完成** [roadmap.sh](https://roadmap.sh) 官方项目的仓库。按 **track（路线）** 分一级目录，一条路线一个目录，互不混放。

## 目录结构

```text
roadmap-projects/
└── frontend-projects/          # https://roadmap.sh/frontend/projects
    ├── README.md               # 项目清单 + 进度勾选
    ├── beginner/               # 20 个
    ├── intermediate/           # 9 个
    └── advanced/               # 1 个
```

后续加新路线时平行新增即可，例如 `backend-projects/`、`devops-projects/`、`react-projects/`。

## 命名约定

| 层级 | 规则 | 例子 |
| --- | --- | --- |
| 一级 | `<track>-projects`，track 取 roadmap.sh 的 URL 段 | `frontend-projects` |
| 二级 | `beginner` / `intermediate` / `advanced` | `beginner` |
| 三级 | `NN-<官方 slug>`，NN 为站点列表顺序 | `01-single-page-cv` |

单个项目内部建议长这样：

```text
01-single-page-cv/
├── README.md      # 题目、要求、验收、笔记（已生成模板）
└── index.html     # 自己的实现，文件随意
```

> **硬性要求**：每个项目的 README 必须写明官方项目网址，例如
> `https://roadmap.sh/projects/single-page-cv`。roadmap.sh 提交解决方案时要求 README 里含项目网址。

## 新增一条路线

```bash
mkdir -p backend-projects/{beginner,intermediate,advanced}
# 然后照着 frontend-projects/README.md 的格式建清单
```

## 提交到 roadmap.sh

提交时只能填**仓库根地址**，不能填子目录：

```text
✅ https://github.com/moyunzero/roadmap-projects
❌ https://github.com/moyunzero/roadmap-projects/tree/main/frontend-projects/beginner/02-basic-html-website
```

`URL must point to a public GitHub repository` 这个报错，通常就是填了子目录 / 文件链接。roadmap.sh 会再检查本 README 里是否含对应项目网址，所以下表要保持更新。

| 项目 | 目录 | 官方项目网址 |
| --- | --- | --- |
| 01 · Single-Page CV | [beginner/01-single-page-cv](frontend-projects/beginner/01-single-page-cv/) | <https://roadmap.sh/projects/single-page-cv> |
| 02 · Basic HTML Website | [beginner/02-basic-html-website](frontend-projects/beginner/02-basic-html-website/) | <https://roadmap.sh/projects/basic-html-website> |
| 03 · Personal Portfolio | [beginner/03-portfolio-website](frontend-projects/beginner/03-portfolio-website/) | <https://roadmap.sh/projects/portfolio-website> |

## 进度

| Track | 项目数 | 完成 | 状态 |
| --- | --- | --- | --- |
| [frontend-projects](frontend-projects/) | 30 | 3 | 🚀 进行中 |
