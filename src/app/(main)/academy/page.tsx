import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Eye } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'

// Mock 数据
const articles = [
  {
    id: '1',
    title: '从程序员到 AI 产品经理的转型之路',
    category: '职业转型',
    views: 3421,
    publishedAt: new Date('2026-03-28T10:00:00Z'),
    excerpt: '我是一名有着 8 年经验的后端程序员，在过去的一年里，我完成了从技术岗到产品岗的转型...'
  },
  {
    id: '2',
    title: '35 岁 +，我在同舟社找到了新方向',
    category: '成长故事',
    views: 2876,
    publishedAt: new Date('2026-03-25T14:30:00Z'),
    excerpt: '35 岁对于互联网人来说是一个敏感的年纪。面对年龄焦虑，我选择了主动出击...'
  },
  {
    id: '3',
    title: '传统行业从业者如何学习 AI？',
    category: '学习指南',
    views: 2543,
    publishedAt: new Date('2026-03-20T09:15:00Z'),
    excerpt: '作为一名传统行业的从业者，我没有技术背景，但我相信 AI 是未来的趋势...'
  },
  {
    id: '4',
    title: 'AI 工具入门：从 0 到 1 的实践指南',
    category: '技术教程',
    views: 4102,
    publishedAt: new Date('2026-03-15T16:45:00Z'),
    excerpt: '本文整理了最适合新手的 AI 工具清单，以及详细的使用教程...'
  },
  {
    id: '5',
    title: '如何用 AI 提升工作效率？10 个实用场景分享',
    category: '效率提升',
    views: 5234,
    publishedAt: new Date('2026-03-10T11:20:00Z'),
    excerpt: '在日常工作中，我总结了 10 个最常用的人工智能应用场景...'
  },
]

const categories = ['全部', '职业转型', '成长故事', '学习指南', '技术教程', '效率提升']

export default function AcademyPage() {
  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div>
        <h1 className="text-3xl font-bold">AI 学院</h1>
        <p className="text-gray-600 mt-2">
          探索 AI 相关知识，分享转型经验，共同成长
        </p>
      </div>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge 
            key={category}
            variant={category === '全部' ? 'default' : 'outline'}
            className="cursor-pointer hover:opacity-80"
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* 文章列表 */}
      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{article.category}</Badge>
              </div>
              <Link href={`/academy/${article.id}`}>
                <CardTitle className="hover:text-blue-600 cursor-pointer line-clamp-2">
                  {article.title}
                </CardTitle>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{formatRelativeTime(article.publishedAt)}</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {article.views}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 分页 */}
      <div className="flex justify-center gap-2">
        <Button variant="outline" disabled>上一页</Button>
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">下一页</Button>
      </div>
    </div>
  )
}

// 简单的 Button 组件（临时使用）
function Button({ children, variant = 'default', className = '', ...props }: any) {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors'
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  }
  
  return (
    <button className={`${baseStyles} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>
      {children}
    </button>
  )
}
