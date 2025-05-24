'use client'

import { Button } from '@/components/ui/button'
import { NavbarHome } from '@/components/header/navbar-home'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const MotionDiv = motion.div

export default function HomePage() {
  const t = useTranslations('TextLang.home')
  const whatsappNumber = '5541999999999'
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  const backgrounds = [
    '/images/carousel/carrossel-1.jpeg',
    '/images/carousel/carrossel-2.jpeg',
    '/images/carousel/carrossel-3.jpeg',
    '/images/carousel/carrossel-4.jpeg',
    '/images/carousel/carrossel-5.jpeg',
    '/images/carousel/carrossel-6.jpeg',
  ]

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgrounds.length)
    }, 5000) // Muda a cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      <NavbarHome />

      {/* WhatsApp Fixed Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-title text-white rounded-full shadow-lg hover:bg-green-500 transition-all hover:scale-110"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="55"
          height="55"
          viewBox="0 0 24 24"
          fill="#ffffff"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
        </svg>
      </a>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            <MotionDiv
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={backgrounds[currentImage]}
                alt="Hero Background"
                fill
                className="object-cover"
                priority
              />
            </MotionDiv>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {t('hero.title')}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  {t('hero.subtitle')}
                </p>
                <Button
                  size="lg"
                  className="bg-title hover:bg-title/90 text-lg px-8"
                >
                  {t('hero.cta')}
                </Button>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '15+', text: t('about.stats.adquirentes') },
              { number: '6+', text: t('about.stats.bandeiras') },
              { number: '100%', text: 'Satisfação' },
              { number: '24/7', text: 'Suporte' },
            ].map((stat, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-title mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.text}</div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('services.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t('services.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['service1', 'service2', 'service3'].map((service, index) => (
              <MotionDiv
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-title/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-title"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {t(`services.${service}.title`)}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t(`services.${service}.description`)}
                </p>
                <Button variant="outline" className="w-full">
                  Saiba mais
                </Button>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <Image
                  src="/images/png/about-2.png"
                  alt="About Us"
                  width={600}
                  height={400}
                  className="rounded-lg w-full"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-title/10 rounded-lg hidden md:block"></div>
              </div>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">{t('about.title')}</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {t('about.description')}
              </p>
              <Button
                size="lg"
                className="bg-title hover:bg-title/90 text-white"
              >
                Conheça nossa história
              </Button>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-title">
        <div className="container mx-auto px-4 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <Button variant="secondary" size="lg" className="text-lg px-8">
              {t('cta.button')}
            </Button>
          </MotionDiv>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-100">
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Image
                src="/images/png/logo.png"
                alt="JB Logo"
                width={150}
                height={150}
                className="mb-6"
              />
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('contact.description')}
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
              <h2 className="text-2xl font-bold mb-6">{t('contact.title')}</h2>
              <div className="space-y-6">
                {[
                  {
                    title: t('contact.whatsapp.title'),
                    value: t('contact.whatsapp.value'),
                    link: whatsappUrl,
                    icon: (
                      <Image
                        src="/images/svg/whatsappBlue.svg"
                        width={24}
                        height={24}
                        alt="WhatsApp"
                      />
                    ),
                  },
                  {
                    title: t('contact.email.title'),
                    value: t('contact.email.value'),
                    link: 'mailto:contato@jointbill.com.br',
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-title"
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
                    ),
                  },
                ].map((contact, index) => (
                  <MotionDiv
                    key={contact.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    {contact.icon}
                    <a
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="text-lg font-semibold">
                        {contact.title}
                      </div>
                      <div className="text-gray-600 group-hover:text-gray-800">
                        {contact.value}
                      </div>
                    </a>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </div>
        </MotionDiv>
      </section>
    </div>
  )
}
