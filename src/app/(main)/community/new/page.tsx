'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createPost } from '@/actions/post'

const categories = [
  { id: '1', name: '💼 职业发展' },
  { id: '2', name: '📚 学习成长' },
  { id: '3', name: '💡 AI 应用' },
  { id: '4', name: '🎯 项目合作' },
  { id: '5', name: '💬 灌水聊天' },
  { id: '6', name: '📢 官方公告' },
]

export default function NewPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
    tags: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // TODO: 获取当前登录用户 ID
      const result = await createPost({
        title: formData.title,
        content: formData.content,
        authorId: 'dev-user-123', // 临时使用 mock 用户 ID
        categoryId: formData.categoryId || undefined,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      })
      
      if (result.success) {
        router.push('/community')
      } else {
        alert('发布失败：' + result.error)
      }
    } catch (error) {
      alert('发布失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>发布新帖子</CardTitle>
          <CardDescription>
            分享你的想法、经验或问题
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">标题</Label>
              <Input
                id="title"
                placeholder="请输入帖子标题"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">板块</Label>
              <select
                id="category"
                className="w-full px-3 py-2 border rounded-md bg-white"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              >
                <option value="">选择板块</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">标签（用逗号分隔）</Label>
              <Input
                id="tags"
                placeholder="例如：AI, 职业发展，转型"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">内容</Label>
              <Textarea
                id="content"
                placeholder="请输入帖子内容..."
                className="min-h-[300px]"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? '发布中...' : '发布帖子'}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => router.back()}
              >
                取消
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
