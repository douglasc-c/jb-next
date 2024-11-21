'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

type IDataProps = {
  params: {
    title: string
    path: string
    icon: string
  }
}

export default function ButtonMenu({ params }: IDataProps) {
  const { title, path, icon } = params
  const pathname = usePathname()

  const isActive: boolean = pathname === path

  return (
    <ul className="flex">
      <a
        href={path}
        className={`w-full pl-12 py-5 justify-start items-center space-x-3 flex font-regular text-sm uppercase  text-zinc-300 ${
          isActive ? 'bg-zinc-800' : 'bg-tranparent'
        }`}
      >
        <div className="p-2  bg-zinc-600 rounded-lg">
          <Image
            src={`/images/svg/${icon}.svg`}
            alt="notifications"
            height={19}
            width={19}
          />
        </div>
        <span>{title}</span>
      </a>
    </ul>
  )
}
