'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import ButtonMenu from '../buttons/menu'
import { useAuthContext } from '@/context/auth-context'
import ButtonAvatar from '../buttons/avatar'

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
  text: {
    welcome: string
    dashboard: string
    users: string
    compliance: string
    ventures: string
    interests: string
    stages: string
    support: string
    signOut: string
    constructionCircuit: string
    myData: string
    myVentures: string
  }
  locale: string
}

const Sidebar: React.FC<SidebarProps> = ({ text, locale }) => {
  const { setAuthData, authData } = useAuthContext()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSignOut = () => {
    setAuthData({ token: '', user: {} as User, mustChangePassword: false })
    document.cookie = 'auth-token=; Max-Age=0; path=/;'
    window.location.href = '/'
  }

  return (
    <>
      <div className="w-full z-50 flex justify-between items-center px-9 md:px-20 md:py-5 py-9 transition-all duration-300 bg-zinc-300">
        <div className="flex flex-row md:ml-64 space-x-1">
          <h1 className="text-zinc-600">{text.welcome}</h1>
          <h3 className=" font-semibold uppercase">
            {authData?.user?.username}
          </h3>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <button className="p-2 border border-neutral-600 rounded-lg hidden">
            <Image
              src={`/images/svg/notification.svg`}
              alt="notifications"
              height={18}
              width={18}
            />
          </button>
          <div className="">
            <ButtonAvatar params={{ path: `/mydata` }} />
          </div>
          <button
            className="p-2 border z-50 border-neutral-600 bg-zinc-300 rounded-lg md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Image
              src={`/images/svg/menu.svg`}
              alt="notifications"
              height={18}
              width={18}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-300 border-r-2 border-zinc-400 z-50 flex flex-col justify-between transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
      >
        <div className="grid gap-16">
          <div className="p-4 justify-center flex">
            <Image
              src={`/images/svg/logo.svg`}
              alt="notifications"
              height={180}
              width={180}
            />
          </div>

          <nav className="grid grid-rows-1">
            <ButtonMenu
              params={{
                title: text.dashboard,
                path: `/${locale}/dashboard`,
                icon: 'home',
              }}
            />
            <ButtonMenu
              params={{
                title: text.constructionCircuit,
                path: `/${locale}/constructioncircuit`,
                icon: 'arrowDiagonalGreen',
              }}
            />
            <ButtonMenu
              params={{
                title: text.compliance,
                path: `/${locale}/compliance`,
                icon: 'shock',
              }}
            />
            <ButtonMenu
              params={{
                title: text.myData,
                path: `/${locale}/mydata`,
                icon: 'cash',
              }}
            />
            <ButtonMenu
              params={{
                title: text.myVentures,
                path: `/${locale}/myventures`,
                icon: 'clock',
              }}
            />
            <ButtonMenu
              params={{
                title: text.support,
                path: `/${locale}/support`,
                icon: 'support',
              }}
            />
          </nav>
        </div>
        <div className="p-2">
          <button
            onClick={handleSignOut}
            className="w-full pl-10 py-5 items-center space-x-3 flex font-regular text-sm uppercase"
          >
            <div className="p-2 rounded-lg">
              <Image
                src={`/images/svg/signout.svg`}
                alt="notifications"
                height={19}
                width={19}
              />
            </div>
            <span>{text.signOut}</span>
          </button>
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
