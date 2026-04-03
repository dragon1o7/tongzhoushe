import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const prisma = new PrismaClient({ 
  adapter: new PrismaLibSql({
    url: 'file:dev.db',
  })
})

async function main() {
  console.log('开始种子数据...')

  // 创建示例用户
  const users = await Promise.all([
    prisma.user.upsert({
      where: { phone: '13800138001' },
      update: {},
      create: {
        phone: '13800138001',
        name: '张三',
        email: 'zhangsan@example.com',
        bio: 'AI 爱好者，正在探索职业转型',
        avatar: null
      }
    }),
    prisma.user.upsert({
      where: { phone: '13800138002' },
      update: {},
      create: {
        phone: '13800138002',
        name: '李四',
        email: 'lisi@example.com',
        bio: '传统行业从业者，学习 AI 中',
        avatar: null
      }
    }),
    prisma.user.upsert({
      where: { phone: '13800138003' },
      update: {},
      create: {
        phone: '13800138003',
        name: '王五',
        email: 'wangwu@example.com',
        bio: '前后端工程师，现 AI 产品经理',
        avatar: null
      }
    })
  ])

  console.log('✓ 创建示例用户')

  // 创建示例板块
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { id: '1' },
      update: {},
      create: {
        id: '1',
        name: '💼 职业发展',
        description: '职业规划、转型经验、职场交流',
        icon: '💼'
      }
    }),
    prisma.category.upsert({
      where: { id: '2' },
      update: {},
      create: {
        id: '2',
        name: '📚 学习成长',
        description: '学习方法、资源分享、成长故事',
        icon: '📚'
      }
    }),
    prisma.category.upsert({
      where: { id: '3' },
      update: {},
      create: {
        id: '3',
        name: '💡 AI 应用',
        description: 'AI 工具、应用场景、实践经验',
        icon: '💡'
      }
    }),
    prisma.category.upsert({
      where: { id: '4' },
      update: {},
      create: {
        id: '4',
        name: '🎯 项目合作',
        description: '项目招募、团队协作、资源对接',
        icon: '🎯'
      }
    }),
    prisma.category.upsert({
      where: { id: '5' },
      update: {},
      create: {
        id: '5',
        name: '💬 灌水聊天',
        description: '日常交流、闲聊、灌水',
        icon: '💬'
      }
    }),
    prisma.category.upsert({
      where: { id: '6' },
      update: {},
      create: {
        id: '6',
        name: '📢 官方公告',
        description: '官方通知、活动公告、重要信息',
        icon: '📢'
      }
    })
  ])

  console.log('✓ 创建示例板块')

  // 创建示例帖子
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: '如何快速适应 AI 时代的工作方式？',
        content: '最近感觉 AI 发展太快了，有点跟不上节奏。每天都在学习新的工具和技能，但还是觉得力不从心。\n\n想请教一下各位大佬，你们是怎么保持学习节奏的？有什么好的学习方法或者资源推荐吗？',
        authorId: users[0].id,
        categoryId: '1',
        tags: 'AI,职业发展，学习',
        views: 2341,
        likes: 128
      }
    }),
    prisma.post.create({
      data: {
        title: '分享我的转型故事：从传统行业到 AI 创业',
        content: '我是一名有着 10 年经验的传统行业从业者，在过去的一年里，我完成了人生中的重要转型...',
        authorId: users[1].id,
        categoryId: '2',
        tags: '转型，创业',
        views: 1876,
        likes: 95
      }
    }),
    prisma.post.create({
      data: {
        title: '推荐几个超好用的 AI 工具',
        content: '最近发现了一些非常好用的 AI 工具，分享给大家。这些工具涵盖了写作、设计、编程等多个领域...',
        authorId: users[2].id,
        categoryId: '3',
        tags: 'AI 工具，效率',
        views: 1523,
        likes: 67
      }
    }),
    prisma.post.create({
      data: {
        title: '同舟社线下聚会报名开启！',
        content: '各位社友好！我们计划于 4 月 15 日在北京举办线下聚会，欢迎大家报名参加。活动内容包括经验分享、自由交流等...',
        authorId: users[0].id,
        categoryId: '6',
        tags: '活动，线下聚会',
        views: 1298,
        likes: 54
      }
    }),
    prisma.post.create({
      data: {
        title: '产品经理需要懂技术吗？',
        content: '这是一个经常被讨论的话题。作为从技术转型产品的过来人，我想分享一下我的看法...',
        authorId: users[2].id,
        categoryId: '1',
        tags: '产品经理，技术',
        views: 1156,
        likes: 48
      }
    }),
    prisma.post.create({
      data: {
        title: '35 岁 + 程序员的出路在哪里？',
        content: '今年 36 岁，明显感觉到年龄带来的压力。想听听大家的想法和规划...',
        authorId: users[1].id,
        categoryId: '1',
        tags: '35 岁，职业规划',
        views: 2103,
        likes: 87
      }
    }),
    prisma.post.create({
      data: {
        title: 'AI 写作工具横评：ChatGPT vs Claude vs 文心一言',
        content: '最近深度使用了几个主流的 AI 写作工具，从多个维度进行了对比测试...',
        authorId: users[0].id,
        categoryId: '3',
        tags: 'AI 写作，工具对比',
        views: 1845,
        likes: 72
      }
    }),
    prisma.post.create({
      data: {
        title: '寻找 AI 项目合作伙伴',
        content: '我有一个 AI 应用的想法，目前正在寻找技术合伙人。项目方向是...',
        authorId: users[1].id,
        categoryId: '4',
        tags: '项目合作，合伙人',
        views: 967,
        likes: 34
      }
    }),
    prisma.post.create({
      data: {
        title: '每天学习 AI 两小时，坚持一个月会有什么变化？',
        content: '我决定做一个实验：每天花两小时学习 AI，持续一个月。这是第一周的记录...',
        authorId: users[2].id,
        categoryId: '2',
        tags: '学习打卡，AI',
        views: 1432,
        likes: 61
      }
    }),
    prisma.post.create({
      data: {
        title: '周末闲聊：你最近在用哪些 AI 工具？',
        content: '来聊聊大家最近发现的好用的 AI 工具吧！我先来：...',
        authorId: users[0].id,
        categoryId: '5',
        tags: '闲聊，AI 工具',
        views: 876,
        likes: 29
      }
    })
  ])

  console.log('✓ 创建示例帖子')

  // 创建示例评论
  await prisma.comment.create({
    data: {
      content: '同感！我觉得最重要的是保持好奇心，不要害怕尝试新事物。',
      postId: posts[0].id,
      authorId: users[1].id
    }
  })

  await prisma.comment.create({
    data: {
      content: '推荐几个资源：1) Hugging Face 每日推送 2) AI 技术周报 3) 各类 AI 工具的官方文档',
      postId: posts[0].id,
      authorId: users[2].id
    }
  })

  console.log('✓ 创建示例评论')

  // 创建示例文章
  const articles = await Promise.all([
    prisma.article.create({
      data: {
        title: '从程序员到 AI 产品经理的转型之路',
        content: '我是一名有着 8 年经验的后端程序员，在过去的一年里，我完成了从技术岗到产品岗的转型...',
        category: '职业转型',
        views: 3421
      }
    }),
    prisma.article.create({
      data: {
        title: '35 岁 +，我在同舟社找到了新方向',
        content: '35 岁对于互联网人来说是一个敏感的年纪。面对年龄焦虑，我选择了主动出击...',
        category: '成长故事',
        views: 2876
      }
    }),
    prisma.article.create({
      data: {
        title: '传统行业从业者如何学习 AI？',
        content: '作为一名传统行业的从业者，我没有技术背景，但我相信 AI 是未来的趋势...',
        category: '学习指南',
        views: 2543
      }
    }),
    prisma.article.create({
      data: {
        title: 'AI 工具入门：从 0 到 1 的实践指南',
        content: '本文整理了最适合新手的 AI 工具清单，以及详细的使用教程...',
        category: '技术教程',
        views: 4102
      }
    }),
    prisma.article.create({
      data: {
        title: '如何用 AI 提升工作效率？10 个实用场景分享',
        content: '在日常工作中，我总结了 10 个最常用的人工智能应用场景...',
        category: '效率提升',
        views: 5234
      }
    })
  ])

  console.log('✓ 创建示例文章')

  console.log('种子数据完成！')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
