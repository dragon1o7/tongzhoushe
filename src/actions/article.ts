'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getArticles(options?: {
  category?: string
  limit?: number
  skip?: number
}) {
  try {
    const articles = await prisma.article.findMany({
      where: options?.category ? {
        category: options.category
      } : undefined,
      orderBy: {
        publishedAt: 'desc'
      },
      take: options?.limit || 20,
      skip: options?.skip || 0
    })
    
    return { success: true, data: articles }
  } catch (error) {
    console.error('获取文章列表失败:', error)
    return { success: false, error: '获取文章列表失败' }
  }
}

export async function getArticleById(id: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { id }
    })
    
    if (!article) {
      return { success: false, error: '文章不存在' }
    }
    
    // 增加浏览量
    await prisma.article.update({
      where: { id },
      data: {
        views: {
          increment: 1
        }
      }
    })
    
    return { success: true, data: article }
  } catch (error) {
    console.error('获取文章详情失败:', error)
    return { success: false, error: '获取文章详情失败' }
  }
}

export async function createArticle(data: {
  title: string
  content: string
  category: string
}) {
  try {
    const article = await prisma.article.create({
      data
    })
    
    revalidatePath('/academy')
    return { success: true, data: article }
  } catch (error) {
    console.error('创建文章失败:', error)
    return { success: false, error: '创建文章失败' }
  }
}
