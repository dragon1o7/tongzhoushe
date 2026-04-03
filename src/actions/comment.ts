'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface CreateCommentInput {
  content: string
  postId: string
  authorId: string
}

export async function createComment(data: CreateCommentInput) {
  try {
    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        postId: data.postId,
        authorId: data.authorId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })
    
    revalidatePath(`/community/${data.postId}`)
    return { success: true, data: comment }
  } catch (error) {
    console.error('创建评论失败:', error)
    return { success: false, error: '创建评论失败' }
  }
}

export async function deleteComment(id: string, postId: string) {
  try {
    await prisma.comment.delete({
      where: { id }
    })
    
    revalidatePath(`/community/${postId}`)
    return { success: true }
  } catch (error) {
    console.error('删除评论失败:', error)
    return { success: false, error: '删除评论失败' }
  }
}
