'use client'

import Image from 'next/image'
import Link from 'next/link'
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
      <Link
        href={path}
        className={`w-full pl-12 py-5 justify-start items-center space-x-3 text-primary flex font-regular text-sm uppercase ${
          isActive ? 'bg-zinc-200' : 'bg-tranparent'
        }`}
      >
        <div className="p-2 bg-stone-300 shadow rounded-lg">
          <Image
            src={`/images/svg/${icon}.svg`}
            alt="notifications"
            height={19}
            width={19}
          />
        </div>
        <span>{title}</span>
      </Link>
    </ul>
  )
}
