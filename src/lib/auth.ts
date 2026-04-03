import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phone: { label: '手机号', type: 'text' },
        password: { label: '密码', type: 'password' }
      },
      authorize: async (credentials) => {
        if (!credentials.phone || !credentials.password) {
          return null
        }

        // TODO: 实现真实的认证逻辑
        // 目前返回一个示例用户用于开发测试
        const user = await prisma.user.findFirst({
          where: {
            phone: credentials.phone as string
          }
        })

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.avatar
          }
        }

        // 开发模式：允许任意手机号登录（仅用于测试）
        if (process.env.NODE_ENV === 'development') {
          return {
            id: 'dev-user-' + credentials.phone,
            name: '测试用户',
            email: null,
            image: null
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    }
  }
})
