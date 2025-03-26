'use client'

import { useAuthContext } from '@/context/auth-context'
import { useSidebar } from '@/context/sidebar-context'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'
import ButtonMenu from '../buttons/menu'

interface User {
  avatar: string
  birthDate: string
  complianceStatus: string
  email: string
  emailVerified: boolean
  firstName: string
  id: number
  isActive: boolean
  isApproved: boolean
  lastName: string
  mustChangePassword: boolean
  numberDocument: string
  phone: string
  role: string
  username: string
}

interface SidebarProps {
  locale: string
}

const Sidebar: React.FC<SidebarProps> = ({ locale }) => {
  const { setAuthData, authData } = useAuthContext()
  const { isMinimized, setIsMinimized } = useSidebar()
  const t = useTranslations('TextLang')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSignOut = () => {
    setAuthData({ token: '', user: {} as User })
    document.cookie = 'auth-token=; Max-Age=0; path=/;'
    window.location.href = '/'
  }

  return (
    <>
      <div
        className={`w-full z-50 flex justify-between items-center px-9 md:px-20 transition-all duration-300 bg-primary ${isMinimized ? 'md:ml-16' : 'md:ml-64'}`}
      >
        <div className="flex flex-row mt-5 space-x-1">
          <h1 className="text-textPrimary">{t('welcome')}</h1>
          <h3 className="font-semibold uppercase text-title">
            {authData?.user?.firstName}
          </h3>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <button className="p-2 border border-neutral-600 rounded-lg hidden">
            <Image
              src="/images/svg/notification.svg"
              alt="notifications"
              height={18}
              width={18}
            />
          </button>
          <button
            className="p-2 border z-50 border-neutral-600 rounded-lg md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Image
              src="/images/svg/menu.svg"
              alt="menu"
              height={18}
              width={18}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen bg-primary z-50 flex flex-col justify-between transform transition-all duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block ${isMinimized ? 'w-16' : 'w-64'}`}
      >
        <div className="grid gap-16">
          <div
            className="p-4 items-center justify-center flex cursor-pointer"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <Image
              src="/images/svg/logo.svg"
              alt="logo"
              height={isMinimized ? 40 : 180}
              width={isMinimized ? 40 : 180}
            />
          </div>

          <nav className="grid grid-rows-1">
            <ButtonMenu
              params={{
                title: t('users'),
                path: `/${locale}/admin/users`,
                icon: 'users',
                isMinimized,
              }}
            />
          </nav>
        </div>
        <div className="p-2">
          <ButtonMenu
            params={{
              title: t('signOut'),
              path: '#',
              icon: 'signout',
              isMinimized,
              onClick: handleSignOut,
            }}
          />
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
