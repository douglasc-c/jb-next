'use client'

import Image from 'next/image'

interface HeaderProps {
  text: {
    welcome: string
  }
}

export default function Header({ text }: HeaderProps) {
  return (
    <div className="w-full z-50 flex justify-between items-center px-5 md:px-20 py-5 transition-all duration-300 bg-zinc-900">
      <div className="hidden md:flex flex-row space-x-1">
        <h1 className="text-zinc-600">{text.welcome}</h1>
        <h3 className="text-white font-semibold uppercase">Admin</h3>
      </div>
      <div className="hidden md:flex flex-row items-center space-x-4">
        <button className="p-2 border border-neutral-600 rounded-lg">
          <Image
            src={`/images/svg/notification.svg`}
            alt="notifications"
            height={18}
            width={18}
          />
        </button>
      </div>
    </div>
  )
}
