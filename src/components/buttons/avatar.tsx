'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type IDataProps = {
  params: {
    path: string
  }
}

export default function ButtonAvatar({ params }: IDataProps) {
  const { path } = params

  const router = useRouter()

  const handleClick = () => {
    router.push(path)
  }

  return (
    <button onClick={handleClick} className="flex items-center bg-transparent">
      <Image
        src="/images/svg/avatar.svg"
        width={45}
        height={45}
        alt="Settings"
      />
    </button>
  )
}
