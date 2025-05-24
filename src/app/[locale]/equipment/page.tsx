'use client'

import { useTranslations } from 'next-intl'
import { NavbarHome } from '@/components/header/navbar-home'
import Image from 'next/image'

export default function EquipmentPage() {
  const t = useTranslations('TextLang.equipment')

  return (
    <div className="min-h-screen">
      <NavbarHome />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['equipment1', 'equipment2', 'equipment3'].map((equipment) => (
              <div
                key={equipment}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="relative h-48 mb-4">
                  <Image
                    src={`/images/png/${equipment}.jpeg`}
                    alt={t(`${equipment}.title`)}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  {t(`${equipment}.title`)}
                </h2>
                <p className="text-gray-600">{t(`${equipment}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
