'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface CreatePostInput {
  title: string
  content: string
  authorId: string
  categoryId?: string
  tags?: string[]
}

export async function createPost(data: CreatePostInput) {
  try {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: data.authorId,
        categoryId: data.categoryId,
        tags: data.tags?.join(',')
      }
    })
    
    revalidatePath('/community')
    return { success: true, data: post }
  } catch (error) {
    console.error('创建帖子失败:', error)
    return { success: false, error: '创建帖子失败' }
  }
}

export async function getPosts(options?: {
  categoryId?: string
  limit?: number
  skip?: number
}) {
  try {
    const posts = await prisma.post.findMany({
      where: options?.categoryId ? {
        categoryId: options.categoryId
      } : undefined,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: options?.limit || 20,
      skip: options?.skip || 0
    })
    
    return { success: true, data: posts }
  } catch (error) {
    console.error('获取帖子列表失败:', error)
    return { success: false, error: '获取帖子列表失败' }
  }
}

export async function getPostById(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            bio: true
          }
        },
        category: true,
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })
    
    if (!post) {
      return { success: false, error: '帖子不存在' }
    }
    
    // 增加浏览量
    await prisma.post.update({
      where: { id },
      data: {
        views: {
          increment: 1
        }
      }
    })
    
    return { success: true, data: post }
  } catch (error) {
    console.error('获取帖子详情失败:', error)
    return { success: false, error: '获取帖子详情失败' }
  }
}

export async function incrementLike(id: string) {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        likes: {
          increment: 1
        }
      }
    })
    
    return { success: true, data: post }
  } catch (error) {
    console.error('点赞失败:', error)
    return { success: false, error: '点赞失败' }
  }
}
