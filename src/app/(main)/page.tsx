import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, BookOpen, Users, Calendar } from 'lucide-react'

// Mock 数据 - 后续替换为真实数据
const hotTopics = [
  { id: '1', title: '如何快速适应 AI 时代的工作方式？', replies: 128, views: 2341 },
  { id: '2', title: '分享我的转型故事：从传统行业到 AI 创业', replies: 95, views: 1876 },
  { id: '3', title: '同舟社线下聚会报名开启！', replies: 67, views: 1523 },
  { id: '4', title: '推荐几个超好用的 AI 工具', replies: 54, views: 1298 },
]

const stories = [
  { id: '1', title: '从程序员到 AI 产品经理的转型之路', author: '张三', date: '2026-03-28' },
  { id: '2', title: '35 岁+，我在同舟社找到了新方向', author: '李四', date: '2026-03-25' },
  { id: '3', title: '传统行业从业者如何学习 AI？', author: '王五', date: '2026-03-20' },
]

const events = [
  { id: '1', title: 'AI 应用开发工作坊', date: '2026-04-10', location: '线上' },
  { id: '2', title: '同舟社北京线下聚会', date: '2026-04-15', location: '北京·中关村' },
  { id: '3', title: '职业发展咨询日', date: '2026-04-20', location: '线上' },
]

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* 公告区域 */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            社区公告
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            欢迎加入同舟社！这是一个专注于 AI 时代职业转型与成长的社区。
            在这里，你可以交流经验、分享知识、结识志同道合的朋友。
          </p>
          <div className="mt-4 flex gap-4">
            <Link href="/community">
              <Button>去社区广场</Button>
            </Link>
            <Link href="/academy">
              <Button variant="outline">探索 AI 学院</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 热门话题 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              热门话题
            </CardTitle>
            <CardDescription>
              社区正在讨论的内容
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hotTopics.map((topic) => (
                <div key={topic.id} className="flex items-start justify-between gap-4">
                  <Link 
                    href={`/community/${topic.id}`}
                    className="text-gray-900 hover:text-blue-600 flex-1"
                  >
                    {topic.title}
                  </Link>
                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    <span>{topic.replies} 回复</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/community">
                <Button variant="ghost" className="w-full">
                  查看更多 →
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 转型故事精选 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              转型故事精选
            </CardTitle>
            <CardDescription>
              听听他们的成长经历
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stories.map((story) => (
                <div key={story.id}>
                  <Link 
                    href={`/academy/${story.id}`}
                    className="text-gray-900 hover:text-blue-600 font-medium"
                  >
                    {story.title}
                  </Link>
                  <div className="text-sm text-gray-500 mt-1">
                    {story.author} · {story.date}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/academy">
                <Button variant="ghost" className="w-full">
                  查看更多 →
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 近期活动 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            近期活动
          </CardTitle>
          <CardDescription>
            不要错过这些精彩活动
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-900">{event.title}</h3>
                <div className="mt-2 text-sm text-gray-500">
                  <div>📅 {event.date}</div>
                  <div>📍 {event.location}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 快速入口 */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h3 className="font-semibold text-lg mb-2">加入社区</h3>
            <p className="text-gray-600 mb-4">与志同道合的朋友一起成长</p>
            <Link href="/register">
              <Button>立即注册</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <MessageSquare className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <h3 className="font-semibold text-lg mb-2">参与讨论</h3>
            <p className="text-gray-600 mb-4">分享你的经验和见解</p>
            <Link href="/community/new">
              <Button variant="outline">发布帖子</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <BookOpen className="w-12 h-12 mx-auto text-purple-500 mb-4" />
            <h3 className="font-semibold text-lg mb-2">学习成长</h3>
            <p className="text-gray-600 mb-4">探索 AI 相关知识</p>
            <Link href="/academy">
              <Button variant="outline">进入 AI 学院</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
