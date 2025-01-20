'use client'
import Image from 'next/image'
import React from 'react'
import ButtonMenu from '../buttons/menu'
import { useAuthContext } from '@/context/auth-context'

interface User {
  avatar: string
  birthDate: string
  complianceStatus: string
  email: string
  emailVerified: boolean
  firstName: string
  id: boolean
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
    dashboard: string
    constructionCircuit: string
    compliance: string
    myData: string
    myVentures: string
    support: string
    signOut: string
  }
  locale: string
}

const Sidebar: React.FC<SidebarProps> = ({ text, locale }) => {
  const { setAuthData } = useAuthContext()

  const handleSignOut = () => {
    setAuthData({ token: '', user: {} as User, mustChangePassword: false })
    document.cookie = 'auth-token=; Max-Age=0; path=/;'
    window.location.href = '/'
  }

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r-2 border-zinc-700 flex flex-col space-y-12">
      <div className="p-4 justify-center flex">
        <Image
          src={`/images/svg/logoGreen.svg`}
          alt="notifications"
          height={180}
          width={180}
        />
      </div>
      <nav className="space-y-2 flex-grow">
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
      <div className="mt-auto">
        <button
          onClick={handleSignOut}
          className={`w-full pl-10 py-5 justify-start items-center space-x-3 flex font-regular text-sm uppercase  text-zinc-300 `}
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
  )
}

export default Sidebar
