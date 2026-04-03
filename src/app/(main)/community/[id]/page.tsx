import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatRelativeTime } from '@/lib/utils'
import { MessageSquare, Eye, Heart, ArrowLeft } from 'lucide-react'

// Mock 数据
const mockPost = {
  id: '1',
  title: '如何快速适应 AI 时代的工作方式？',
  content: `最近感觉 AI 发展太快了，有点跟不上节奏。每天都在学习新的工具和技能，但还是觉得力不从心。

想请教一下各位大佬，你们是怎么保持学习节奏的？有什么好的学习方法或者资源推荐吗？

我个人的一些做法：
1. 每天早上花 30 分钟阅读 AI 相关的新闻和文章
2. 每周至少实践一个新的 AI 工具
3. 参加线上/线下的技术分享活动

但是感觉还是不够系统，希望能得到大家的建议！`,
  author: { 
    id: 'user1',
    name: '张三', 
    avatar: null,
    bio: 'AI 爱好者，正在探索职业转型'
  },
  category: { id: '1', name: '💼 职业发展' },
  tags: 'AI,职业发展，学习',
  views: 2342,
  likes: 128,
  createdAt: new Date('2026-04-01T10:00:00Z'),
  comments: [
    {
      id: 'c1',
      content: '同感！我觉得最重要的是保持好奇心，不要害怕尝试新事物。',
      author: { name: '李四', avatar: null },
      createdAt: new Date('2026-04-01T11:30:00Z')
    },
    {
      id: 'c2',
      content: '推荐几个资源：1) Hugging Face 每日推送 2) AI 技术周报 3) 各类 AI 工具的官方文档',
      author: { name: '王五', avatar: null },
      createdAt: new Date('2026-04-01T14:20:00Z')
    },
  ]
}

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const post = mockPost // 实际应从数据库获取
  
  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 返回按钮 */}
      <Link href="/community">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          返回社区广场
        </Button>
      </Link>

      {/* 帖子内容 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge>{post.category?.name || '未分类'}</Badge>
          </div>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium">{post.author?.name?.[0] || 'A'}</span>
              </div>
              <div>
                <div className="font-medium">{post.author?.name || '匿名'}</div>
                <div className="text-xs text-gray-400">{formatRelativeTime(post.createdAt)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {post.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {post.comments?.length || 0}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          {post.tags && (
            <div className="flex gap-2 mt-6 pt-6 border-t">
              {post.tags.split(',').map((tag, index) => (
                <Badge key={index} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 评论区 */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">评论 ({post.comments?.length || 0})</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 发表评论 */}
          <div className="border-b pb-6">
            <textarea
              className="w-full px-3 py-2 border rounded-md min-h-[100px]"
              placeholder="写下你的评论..."
            />
            <div className="mt-2 flex justify-end">
              <Button>发表评论</Button>
            </div>
          </div>
          
          {/* 评论列表 */}
          {post.comments?.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium">{comment.author?.name?.[0] || 'A'}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{comment.author?.name || '匿名'}</span>
                  <span className="text-sm text-gray-400">{formatRelativeTime(comment.createdAt)}</span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
