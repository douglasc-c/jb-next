'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type IDataProps = {
  params: {
    title: string
    path: string
    icon: string
    isMinimized?: boolean
    onClick?: () => void
  }
}

export default function ButtonMenu({ params }: IDataProps) {
  const { title, path, icon, isMinimized, onClick } = params
  const pathname = usePathname()
  const isActive: boolean = pathname === path

  const buttonContent = (
    <div
      className={`w-full gap-2 flex items-center rounded-2xl space-x-3 text-zinc-200 font-regular text-[0.70rem] uppercase transition-transform duration-200 cursor-pointer ${
        isActive
          ? 'bg-border'
          : 'bg-transparent hover:bg-gray hover:translate-2 hover:scale-105'
      } ${isMinimized ? 'justify-center py-2' : 'pl-8 py-2'}`}
    >
      <div className="p-2 bg-stone-300 shadow rounded-lg">
        <Image
          src={`/images/svg/${icon}.svg`}
          alt={title}
          height={16}
          width={16}
        />
      </div>

      <span
        className={`transition-all duration-300 ${isMinimized ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto'}`}
      >
        {title}
      </span>
    </div>
  )

  if (onClick) {
    return (
      <ul className={`flex ${isMinimized ? 'p-2' : ''}`}>
        <button onClick={onClick} className="w-full">
          {buttonContent}
        </button>
      </ul>
    )
  }

  return (
    <ul className={`flex ${isMinimized ? 'p-2' : ''}`}>
      <Link href={path} className="w-full">
        {buttonContent}
      </Link>
    </ul>
  )
}
