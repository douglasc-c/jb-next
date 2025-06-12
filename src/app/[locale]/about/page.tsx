'use client'

import { useTranslations } from 'next-intl'
import { NavbarHome } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  const t = useTranslations('TextLang')

  return (
    <main className="min-h-screen bg-white">
      <NavbarHome />

      {/* Hero Section */}
      <section className="relative py-20 pt-36 bg-gradient-to-r from-blue-950 to-blue-900 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/carousel/carrossel-3.jpeg"
            alt="About Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-white/90">{t('about.description')}</p>
          </motion.div>
        </div>
      </section>

      {/* Missão e Visão Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 p-8 rounded-lg"
            >
              <h2 className="text-3xl font-bold mb-6 text-blue-900">
                {t('about.mission.title')}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('about.mission.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 p-8 rounded-lg"
            >
              <h2 className="text-3xl font-bold mb-6 text-blue-900">
                {t('about.vision.title')}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('about.vision.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clientes Section */}
      <section className="py-20 bg-gradient-to-t from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('about.clients.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.clients.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t
              .raw('about.clients.list')
              .map((client: string, index: number) => (
                <motion.div
                  key={client}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-blue-900">
                    {client}
                  </h3>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Certificações Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {t('public.certifications.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['qi', 'qo', 'qd'].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">
                  {t(`public.certifications.items.${cert}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`public.certifications.items.${cert}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t('contact.description')}
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            {t('contact.form.title')}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
