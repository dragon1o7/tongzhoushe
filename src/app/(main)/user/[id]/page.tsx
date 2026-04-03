import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react'

// Mock 数据
const mockUser = {
  id: 'user1',
  name: '张三',
  avatar: null,
  bio: 'AI 爱好者，正在探索职业转型。前后端工程师出身，现专注于 AI 产品方向。',
  location: '北京',
  website: 'https://example.com',
  joinedAt: new Date('2025-06-15T10:00:00Z'),
  stats: {
    posts: 23,
    comments: 156,
    likes: 892
  },
  recentPosts: [
    { id: '1', title: '如何快速适应 AI 时代的工作方式？', replies: 45, createdAt: new Date('2026-04-01T10:00:00Z') },
    { id: '2', title: '分享几个好用的 AI 工具', replies: 32, createdAt: new Date('2026-03-28T14:30:00Z') },
    { id: '3', title: '产品经理需要懂技术吗？', replies: 28, createdAt: new Date('2026-03-20T09:15:00Z') },
  ]
}

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  const user = mockUser // 实际应从数据库获取
  
  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 个人资料卡片 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            {/* 头像 */}
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold">{user.name[0]}</span>
            </div>
            
            {/* 信息 */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-600 mt-2">{user.bio}</p>
                </div>
                <Button variant="outline">关注</Button>
              </div>
              
              {/* 详细信息 */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                {user.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {user.location}
                  </span>
                )}
                {user.website && (
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                    <LinkIcon className="w-4 h-4" />
                    个人网站
                  </a>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  加入于 {user.joinedAt.toLocaleDateString('zh-CN')}
                </span>
              </div>
            </div>
          </div>
          
          {/* 统计数据 */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold">{user.stats.posts}</div>
              <div className="text-sm text-gray-500">帖子</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{user.stats.comments}</div>
              <div className="text-sm text-gray-500">评论</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{user.stats.likes}</div>
              <div className="text-sm text-gray-500">获赞</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 最近帖子 */}
      <Card>
        <CardHeader>
          <CardTitle>最近发帖</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.recentPosts.map((post) => (
              <div key={post.id} className="flex items-start justify-between gap-4 pb-4 border-b last:border-0">
                <a href={`/community/${post.id}`} className="text-gray-900 hover:text-blue-600 flex-1">
                  {post.title}
                </a>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  <span>{post.replies} 回复</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Button variant="ghost" className="w-full">
              查看更多 →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
