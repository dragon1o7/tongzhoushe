import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getPosts } from '@/actions/post'
import { formatRelativeTime } from '@/lib/utils'
import { MessageSquare, Eye, Plus } from 'lucide-react'

// Mock 板块数据
const categories = [
  { id: 'all', name: '全部' },
  { id: '1', name: '💼 职业发展' },
  { id: '2', name: '📚 学习成长' },
  { id: '3', name: '💡 AI 应用' },
  { id: '4', name: '🎯 项目合作' },
  { id: '5', name: '💬 灌水聊天' },
  { id: '6', name: '📢 官方公告' },
]

export default async function CommunityPage() {
  // 获取帖子列表（使用 mock 数据）
  const mockPosts = [
    {
      id: '1',
      title: '如何快速适应 AI 时代的工作方式？',
      content: '最近感觉 AI 发展太快了，有点跟不上节奏...',
      author: { name: '张三', avatar: null },
      category: { name: '💼 职业发展' },
      tags: 'AI,职业发展',
      views: 2341,
      likes: 128,
      createdAt: new Date('2026-04-01T10:00:00Z'),
      _count: { comments: 45 }
    },
    {
      id: '2',
      title: '分享我的转型故事：从传统行业到 AI 创业',
      content: '我是一名有着 10 年经验的传统行业从业者...',
      author: { name: '李四', avatar: null },
      category: { name: '📚 学习成长' },
      tags: '转型，创业',
      views: 1876,
      likes: 95,
      createdAt: new Date('2026-03-30T15:30:00Z'),
      _count: { comments: 32 }
    },
    {
      id: '3',
      title: '推荐几个超好用的 AI 工具',
      content: '最近发现了一些非常好用的 AI 工具，分享给大家...',
      author: { name: '王五', avatar: null },
      category: { name: '💡 AI 应用' },
      tags: 'AI 工具，效率',
      views: 1523,
      likes: 67,
      createdAt: new Date('2026-03-28T09:15:00Z'),
      _count: { comments: 28 }
    },
  ]

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">社区广场</h1>
        <Link href="/community/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            发布帖子
          </Button>
        </Link>
      </div>

      {/* 板块筛选 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link 
            key={category.id}
            href={category.id === 'all' ? '/community' : `/community?category=${category.id}`}
          >
            <Badge 
              variant={category.id === 'all' ? 'default' : 'outline'}
              className="cursor-pointer hover:opacity-80"
            >
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>

      {/* 帖子列表 */}
      <div className="space-y-4">
        {mockPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <Link 
                  href={`/community/${post.id}`}
                  className="text-xl font-semibold hover:text-blue-600 flex-1"
                >
                  {post.title}
                </Link>
                <Badge variant="secondary">{post.category?.name || '未分类'}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-2 mb-4">{post.content}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-medium">{post.author?.name || '匿名'}</span>
                  <span>·</span>
                  <span>{formatRelativeTime(post.createdAt)}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {post._count?.comments || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views}
                  </span>
                </div>
              </div>
              
              {post.tags && (
                <div className="flex gap-2 mt-3">
                  {post.tags.split(',').map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 分页 */}
      <div className="flex justify-center gap-2">
        <Button variant="outline" disabled>上一页</Button>
        <Button variant="outline">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">下一页</Button>
      </div>
    </div>
  )
}
