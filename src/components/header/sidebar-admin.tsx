'use client'
import Image from 'next/image'
import React from 'react'
import ButtonMenu from '../buttons/menu'

interface SidebarProps {
  text: {
    dashboard: string
    users: string
    compliance: string
    ventures: string
    interests: string
    stages: string
    support: string
    signOut: string
  }
  locale: string
}
const Sidebar: React.FC<SidebarProps> = ({ text, locale }) => {
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
        {/* <ButtonMenu
          params={{
            title: text.dashboard,
            path: `/${locale}/admin/dashboard`,
            icon: 'home',
          }}
        /> */}
        <ButtonMenu
          params={{
            title: text.users,
            path: `/${locale}/admin/users`,
            icon: 'users',
          }}
        />

        {/* <ButtonMenu
          params={{
            title: text.compliance,
            path: `/${locale}/admin/compliance`,
            icon: 'cash',
          }}
        /> */}
        <ButtonMenu
          params={{
            title: text.interests,
            path: `/${locale}/admin/interests`,
            icon: 'interests',
          }}
        />
        <ButtonMenu
          params={{
            title: text.ventures,
            path: `/${locale}/admin/ventures`,
            icon: 'shock',
          }}
        />
        {/* <ButtonMenu
          params={{
            title: text.stages,
            path: `/${locale}/admin/stages`,
            icon: 'clock',
          }}
        /> */}
        <ButtonMenu
          params={{
            title: text.support,
            path: `/${locale}/admin/support`,
            icon: 'support',
          }}
        />
      </nav>
      <div className="mt-auto">
        <a
          href={`/`}
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
        </a>
      </div>
    </div>
  )
}

export default Sidebar
