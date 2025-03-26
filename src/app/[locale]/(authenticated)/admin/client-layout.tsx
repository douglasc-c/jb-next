'use client'

import Sidebar from '@/components/header/sidebar-admin'
import { useSidebar } from '@/context/sidebar-context'

interface ClientLayoutProps {
  children: React.ReactNode
  locale: string
}

export default function ClientLayout({ children, locale }: ClientLayoutProps) {
  const { isMinimized } = useSidebar()

  return (
    <>
      <Sidebar locale={locale} />
      <div
        className={`flex-grow overflow-y-auto bg-primary transition-all duration-300 ${
          isMinimized ? 'md:ml-16' : 'md:ml-64'
        }`}
      >
        {children}
      </div>
    </>
  )
}
