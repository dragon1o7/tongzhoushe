import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatRelativeTime } from '@/lib/utils'
import { ArrowLeft, Eye } from 'lucide-react'

// Mock 数据
const mockArticle = {
  id: '1',
  title: '从程序员到 AI 产品经理的转型之路',
  category: '职业转型',
  views: 3421,
  publishedAt: new Date('2026-03-28T10:00:00Z'),
  content: `## 前言

我是一名有着 8 年经验的后端程序员，在过去的一年里，我完成了从技术岗到产品岗的转型。这个过程充满了挑战，但也收获满满。在这篇文章中，我想分享一下我的心路历程和经验总结。

## 为什么要转型？

做了 8 年开发，技术能力已经比较扎实，但我逐渐发现自己对"做什么"比"怎么做"更感兴趣。我希望能够更直接地影响产品方向，而不仅仅是实现功能。

## 转型准备

### 1. 知识储备

- 系统学习了产品设计方法论
- 研究了 AI 产品的特点和设计原则
- 阅读了大量产品相关的书籍和文章

### 2. 实践机会

- 在现有团队中主动承担更多产品相关的工作
- 参与需求讨论和方案设计
- 尝试写 PRD 和原型

### 3. 人脉拓展

- 参加产品相关的线下活动
- 向身边的产品经理朋友请教
- 加入产品社区

## 转型过程

### 第一步：内部转岗

我首先尝试在现有公司内部寻找转岗机会。这样可以降低风险，同时也能够利用已有的技术背景。

### 第二步：系统学习

报名了产品经理培训课程，系统学习产品知识。

### 第三步：实战演练

在实际工作中不断练习，从一个小功能开始，逐步负责更大的模块。

## 经验总结

### 优势

- 技术背景让我能更好地理解技术可行性
- 与开发团队沟通更顺畅
- 对 AI 技术的理解更深入

### 挑战

- 思维方式的转变（从 how 到 what/why）
- 需要学习新的技能（用户研究、数据分析等）
- 初期会有自我怀疑

## 给想转型的同学的建议

1. **不要急于求成**：转型是一个过程，需要时间和耐心
2. **发挥既有优势**：你的技术背景是宝贵的财富
3. **多实践**：理论知识很重要，但实战经验更关键
4. **保持学习**：AI 领域发展很快，需要持续学习

## 结语

转型不易，但值得。希望我的经历能给你一些启发。如果你有任何问题，欢迎在社区留言交流！`,
  author: {
    name: '张三',
    bio: '前后端工程师，现 AI 产品经理'
  }
}

export default async function ArticleDetailPage({ params }: { params: { id: string } }) {
  const article = mockArticle // 实际应从数据库获取
  
  if (!article) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 返回按钮 */}
      <Link href="/academy">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          返回 AI 学院
        </Button>
      </Link>

      {/* 文章内容 */}
      <Card>
        <CardContent className="pt-6">
          {/* 头部信息 */}
          <div className="mb-8 pb-8 border-b">
            <div className="flex items-center gap-2 mb-4">
              <Badge>{article.category}</Badge>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div>
                <span className="font-medium">{article.author?.name || '匿名'}</span>
                {article.author?.bio && (
                  <span className="ml-2 text-gray-400">· {article.author.bio}</span>
                )}
              </div>
              <span>·</span>
              <span>{formatRelativeTime(article.publishedAt)}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.views}
              </span>
            </div>
          </div>

          {/* 正文 */}
          <div className="prose max-w-none">
            {article.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                )
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                )
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <li key={index} className="ml-6 text-gray-700 leading-relaxed">
                    {paragraph.replace('- ', '')}
                  </li>
                )
              }
              if (paragraph.match(/^\d+\./)) {
                return (
                  <li key={index} className="ml-6 text-gray-700 leading-relaxed list-decimal">
                    {paragraph.replace(/^\d+\.\s*/, '')}
                  </li>
                )
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                )
              }
              return null
            })}
          </div>
        </CardContent>
      </Card>

      {/* 推荐阅读 */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">推荐阅读</h3>
          <div className="space-y-3">
            {[
              { id: '2', title: '35 岁 +，我在同舟社找到了新方向' },
              { id: '3', title: '传统行业从业者如何学习 AI？' },
              { id: '4', title: 'AI 工具入门：从 0 到 1 的实践指南' },
            ].map((item) => (
              <Link 
                key={item.id}
                href={`/academy/${item.id}`}
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-blue-600 hover:underline">{item.title}</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
