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
        className={`w-full pl-12 ml-5 py-2  gap-2  my-4 flex items-center rounded-2xl space-x-3 text-textPrimary font-regular text-[0.70rem] uppercase transition-transform duration-200 cursor-pointer ${
          isActive
            ? 'bg-border'
            : 'bg-transparent hover:bg-gray hover:translate-x-2 hover:scale-95'
        }`}
      >
        <div className="p-2 bg-stone-300 shadow rounded-lg">
          <Image
            src={`/images/svg/${icon}.svg`}
            alt={title}
            height={14}
            width={14}
          />
        </div>
        <span>{title}</span>
      </Link>
    </ul>
  )
}
