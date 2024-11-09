'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

interface LanguageSelectorProps {
  locale: string
  availableLocales: { code: string; flag: string; label: string }[]
}

export default function LanguageSelector({
  locale,
  availableLocales,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleSelect = (code: string) => {
    const parts = pathname.split('/')
    const route = parts.slice(2).join('/')
    const newPathname = `/${code}/${route}`

    router.push(newPathname)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 focus:outline-none duration-300 hover:scale-110"
        aria-label="Select Language"
      >
        <Image
          src={
            availableLocales.find((loc) => loc.code === locale)?.flag ||
            '/images/flags/en.png'
          }
          alt={`Current language: ${locale}`}
          width={28}
          height={28}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1">
            {availableLocales.map(({ code, flag, label }) => (
              <li key={code}>
                <button
                  onClick={() => handleSelect(code)}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-600 rounded-md"
                >
                  <Image
                    src={flag}
                    alt={label}
                    width={22}
                    height={22}
                    className="mr-2"
                  />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
