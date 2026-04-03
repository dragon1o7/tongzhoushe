# 同舟社社群网站 - 部署指南

## 环境变量配置

### 开发环境 (.env)

```bash
# 数据库连接
DATABASE_URL="file:./dev.db"

# NextAuth 配置
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# 生产环境切换为 PostgreSQL
# DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

### 生产环境 (.env.production)

```bash
# 数据库连接 (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/dbname?connection_limit=1"

# NextAuth 配置
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="production-secret-key"

# 其他配置
NODE_ENV="production"
```

生成 NEXTAUTH_SECRET：
```bash
openssl rand -base64 32
```

---

## Vercel 部署步骤

### 1. 准备工作

- 安装 Vercel CLI: `npm i -g vercel`
- 登录 Vercel: `vercel login`

### 2. 连接 Git 仓库

```bash
# 初始化 Git (如果还没有)
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub/GitLab
git remote add origin <your-repo-url>
git push -u origin main
```

### 3. 部署到 Vercel

```bash
# 登录 Vercel
vercel login

# 导入项目
vercel import

# 或者直接从 Git 部署
vercel --prod
```

### 4. 配置环境变量

在 Vercel 控制台添加以下环境变量：
- `DATABASE_URL` - PostgreSQL 连接字符串
- `NEXTAUTH_URL` - 生产环境 URL
- `NEXTAUTH_SECRET` - 认证密钥

### 5. 数据库迁移

```bash
# 首次部署后运行迁移
vercel env pull .env.production.local
npx prisma migrate deploy
```

---

## 数据库迁移命令

### 开发环境

```bash
# 创建新迁移
npx prisma migrate dev --name <migration_name>

# 重置数据库 (开发环境)
npx prisma migrate reset

# 生成 Prisma Client
npx prisma generate

# 打开数据库管理界面
npx prisma studio
```

### 生产环境

```bash
# 应用所有待处理迁移
npx prisma migrate deploy

# 生成 Prisma Client
npx prisma generate
```

---

## 生产环境注意事项

### 1. 数据库

- **开发环境**: SQLite (简单，无需额外配置)
- **生产环境**: PostgreSQL (推荐 Vercel Postgres、Neon、Supabase)

推荐数据库服务：
- [Vercel Postgres](https://vercel.com/postgres)
- [Neon](https://neon.tech) (Serverless PostgreSQL)
- [Supabase](https://supabase.com)

### 2. 认证安全

- 确保 `NEXTAUTH_SECRET` 是强随机字符串
- 生产环境启用 HTTPS
- 考虑添加第三方登录 (微信、GitHub)

### 3. 性能优化

```bash
# 构建优化
npm run build

# 启用增量静态再生成 (ISR)
# 在页面中添加: export const revalidate = 3600
```

### 4. 监控与日志

- 使用 Vercel Analytics
- 配置错误监控 (Sentry)
- 数据库查询日志

### 5. 备份策略

- 定期备份数据库
- 使用 Vercel 的自动备份功能
- 保留迁移历史

---

## 本地开发快速启动

```bash
# 1. 安装依赖
npm install

# 2. 设置环境变量
cp .env.example .env

# 3. 初始化数据库
npx prisma migrate dev
npx prisma db seed

# 4. 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

---

## 常见问题

### Q: 部署后出现数据库连接错误？
A: 确保 `DATABASE_URL` 配置正确，生产环境使用 PostgreSQL。

### Q: 认证不工作？
A: 检查 `NEXTAUTH_URL` 是否与实际域名一致，`NEXTAUTH_SECRET` 是否设置。

### Q: 如何重置数据库？
A: 开发环境：`npx prisma migrate reset`，生产环境谨慎操作。

### Q: 如何添加新用户？
A: 可以通过注册页面，或直接在数据库中添加。

---

## 后续优化建议

1. **CDN 加速**: 使用 Vercel Edge Network
2. **图片优化**: 使用 Next.js Image 组件
3. **SEO 优化**: 添加 meta 标签、sitemap
4. **PWA 支持**: 添加 manifest 和服务 worker
5. **性能监控**: 集成 Web Vitals

---

## 技术支持

- Prisma 文档：https://www.prisma.io/docs
- Next.js 文档：https://nextjs.org/docs
- NextAuth 文档：https://next-auth.js.org
