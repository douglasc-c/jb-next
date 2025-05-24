'use client'

import { useTranslations } from 'next-intl'
import { NavbarHome } from '@/components/header/navbar-home'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const t = useTranslations('TextLang.home.contact')
  const whatsappNumber = '5541999999999'
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <div className="min-h-screen">
      <NavbarHome />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Image
                src="/images/png/logo.png"
                alt="JB Logo"
                width={150}
                height={150}
                className="mb-6"
              />
              <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('description')}
              </p>
              <div className="flex space-x-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-title text-white p-3 rounded-full hover:bg-title/90 transition-colors"
                >
                  <Image
                    src="/images/svg/whatsapp.svg"
                    width={24}
                    height={24}
                    alt="WhatsApp"
                  />
                </a>
                <a
                  href="mailto:contato@jointbill.com.br"
                  className="bg-title text-white p-3 rounded-full hover:bg-title/90 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">{t('form.title')}</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-title"
                  ></textarea>
                </div>
                <Button className="w-full bg-title hover:bg-title/90 text-white">
                  {t('form.submit')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
