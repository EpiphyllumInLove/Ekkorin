# Ekkorin Gallery - 画师作品展示网站

基于 Astro 构建的静态画廊网站，适合部署在 Cloudflare Pages。

## ✨ 功能

- 🖼️ 响应式网格画廊，自动适配不同尺寸图片
- 📄 作品详情页，展示原图
- 💬 自动获取B站动态内容（客户端渲染）
- 📝 支持本地 MD 文件作为详情补充
- 🌙 暗色主题
- 📱 移动端适配

## 📁 项目结构

```
ekkorin-gallery/
├── public/
│   ├── images/        ← 放作品图片 (jpg/png/webp)
│   ├── md/            ← 放作品笔记 (按作品id命名，如 001.md)
│   └── favicon.svg
├── src/
│   ├── data/
│   │   └── works.ts   ← ★ 作品数据配置（核心文件）
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro       ← 首页
│   │   └── work/[id].astro   ← 详情页
│   └── styles/
├── functions/
│   └── api/bilibili/[id].ts  ← B站API代理（CF Functions）
└── package.json
```

## 🚀 快速开始

### 1. 添加作品

编辑 `src/data/works.ts`，按照格式添加作品：

```ts
{
  id: '001',
  title: '作品标题',
  image: '/images/001.jpg',
  bilibili: '732456789012345678',     // 可选，B站动态ID
  hasMd: true,                         // 可选，是否有本地MD文件
}
```

### 2. 放置资源

- 图片放在 `public/images/` 目录（命名与 `image` 字段一致）
- MD 文件放在 `public/md/` 目录（命名 `{id}.md`）

### 3. 本地预览

```bash
npm install
npm run dev
```

### 4. 部署到 Cloudflare Pages

1. 将项目推送到 GitHub
2. 在 Cloudflare Dashboard 创建 Pages 项目
3. 连接 GitHub 仓库
4. 构建设置：
   - 构建命令: `npm run build`
   - 构建输出目录: `dist`
   - 环境变量: `NODE_VERSION=18`
5. 部署完成！

### 5. 部署到 GitHub Pages（备选）

```bash
# 修改 astro.config.mjs 中 site 为你的 GitHub Pages 地址
# 注意：B站动态的 API 功能仅在 CF Pages 上可用
npm run build
# 将 dist/ 目录部署到 GitHub Pages
```

## ⚙️ 自定义

- **主题色**: 修改 `src/layouts/Layout.astro` 中的 `--accent` 变量
- **标题/描述**: 编辑首页的 `<Layout>` 组件参数

## 📝 注意

- B站动态功能需要部署在 Cloudflare Pages 上（使用 Functions）
- 图片建议使用 JPG/WebP 格式，优化加载速度
- 如果图片尺寸数据未在 works.ts 中指定，构建时会自动读取
