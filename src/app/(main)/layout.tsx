import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary">
            同舟社
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/community" className="text-gray-600 hover:text-gray-900">
              社区广场
            </Link>
            <Link href="/academy" className="text-gray-600 hover:text-gray-900">
              AI 学院
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">登录</Button>
            </Link>
            <Link href="/register">
              <Button>注册</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-500">
          <p>© 2026 同舟社 - 社区平台</p>
        </div>
      </footer>
    </div>
  )
}
