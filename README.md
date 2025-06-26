# 闲鱼选品助手

一款专业的闲鱼商品管理工具，帮助您高效采集、分析和管理闲鱼平台商品信息。

## 功能特性

- 商品分类管理
- 价格利润分析
- 数据可视化展示
- 多平台价格对比
- 商品素材管理

## 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router

## 部署指南

### 1. 本地构建

```bash
# 安装依赖
pnpm install

# 构建生产版本
pnpm build
```

构建完成后，静态文件将生成在 `dist/static` 目录下。

### 2. 托管服务部署

#### Vercel 部署

1. 注册 Vercel 账号 (https://vercel.com)
2. 点击 "New Project" 导入项目
3. 选择 "Import Git Repository" 或直接拖拽 dist/static 文件夹
4. 点击 "Deploy" 完成部署

#### Netlify 部署

1. 注册 Netlify 账号 (https://www.netlify.com)
2. 拖拽 dist/static 文件夹到部署区域
3. 等待自动完成部署

#### GitHub Pages 部署

1. 在GitHub创建新仓库
2. 上传项目代码
3. 进入仓库 Settings > Pages
4. 选择分支和 dist/static 目录
5. 保存设置等待部署完成

### 3. 自定义域名（可选）

1. 在托管平台配置域名设置
2. 添加DNS解析记录
3. 等待SSL证书自动生成

## 开发指南

```bash
# 启动开发服务器
pnpm dev

# 访问开发环境
http://localhost:3000
```

## 注意事项

1. 本地存储数据不会同步到不同设备
2. 生产环境建议使用数据库存储数据
3. 如需持久化存储，请考虑接入后端服务

## 联系信息

如有问题请联系开发者
