'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MotionDiv, MotionH1, MotionP } from '@/components/ui/motion'
import { NavbarHome } from '@/components/header/navbar-home'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('TextLang.home')
  const whatsappNumber = '5541998227111'
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

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
      <section className="bg-card bg-cover bg-center py-32 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 to-zinc-950/65 z-0"></div>
        
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <MotionH1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-title"
            >
              {t('hero.title')}
            </MotionH1>
            <MotionP
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl mb-8 text-zinc-200"
            >
              {t('hero.subtitle')}
            </MotionP>
          </div>
        </MotionDiv>
      </section>

      {/* Problems Section */}
      <section id="problems" className="py-20 bg-zinc-200">
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('problems.title')}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: t('problems.fraudes.title'),
                items: [
                  t('problems.fraudes.items.0'),
                  t('problems.fraudes.items.1'),
                  t('problems.fraudes.items.2')
                ],
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto mb-4 text-[#e79204]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                ),
              },
              {
                title: t('problems.erros.title'),
                items: [
                  t('problems.erros.items.0'),
                  t('problems.erros.items.1'),
                  t('problems.erros.items.2')
                ],
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto mb-4 text-[#e79204]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: t('problems.duvidas.title'),
                items: [
                  t('problems.duvidas.items.0'),
                  t('problems.duvidas.items.1')
                ],
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto mb-4 text-[#e79204]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: t('problems.problemas.title'),
                items: [
                  t('problems.problemas.items.0'),
                  t('problems.problemas.items.1'),
                  t('problems.problemas.items.2')
                ],
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto mb-4 text-[#e79204]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ),
              },
            ].map((group, index) => (
              <MotionDiv
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                {group.icon}
                <h3 className="text-xl font-semibold mb-4">
                  {group.title}
                </h3>
                <ul className="text-gray-600 space-y-2">
                  {Array.isArray(group.items) ? group.items.map((item: string) => (
                    <li
                      key={item}
                      className="hover:text-[#e79204] transition-colors"
                    >
                      {item}
                    </li>
                  )) : (
                    <li className="hover:text-[#e79204] transition-colors">
                      {group.items}
                    </li>
                  )}
                </ul>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-zinc-800">
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h2 className="text-lg font-bold text-title uppercase">
                {t('about.title')}
              </h2>
              <h2 className="text-3xl font-bold mb-8 text-zinc-50">
                {t('about.subtitle')}
              </h2>
              <p className="text-zinc-200 text-lg mb-6">
                {t('about.description')}
              </p>
              <div className="grid grid-cols-2 gap-8 mt-8">
                <MotionDiv
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-title">+15</div>
                  <div className=" text-zinc-200 uppercase">{t('about.stats.adquirentes')}</div>
                </MotionDiv>
                <MotionDiv
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-title">+6</div>
                  <div className=" text-zinc-200 uppercase">{t('about.stats.bandeiras')}</div>
                </MotionDiv>
              </div>
            </div>
            <MotionDiv
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/bg/card.png"
                alt="Controle de vendas em cartão"
                className="object-cover w-full h-full"
                width={1000}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent"></div>
            </MotionDiv>
          </div>
        </MotionDiv>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-zinc-200">
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-lg font-bold text-title uppercase">
                {t('benefits.title')}
              </h2>
              <h2 className="text-3xl font-bold mb-6">
                {t('benefits.subtitle')}
              </h2>
              <p className="text-lg mb-6">
                {t('benefits.description')}
              </p>
              <MotionDiv
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[276px] rounded-lg overflow-hidden shadow-2xl mt-8"
              >
                <Image
                  src="/images/bg/table-graph.jpeg"
                  alt="Benefícios da conciliação de cartões"
                  className="object-cover w-full h-full"
                  width={1000}
                  height={1000}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent"></div>
              </MotionDiv>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: t('benefits.items.economia.title'),
                  description: t('benefits.items.economia.description'),
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto mb-4 text-[#e79204]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                },
                {
                  title: t('benefits.items.controle.title'),
                  description: t('benefits.items.controle.description'),
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto mb-4 text-[#e79204]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                },
                {
                  title: t('benefits.items.integracao.title'),
                  description: t('benefits.items.integracao.description'),
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto mb-4 text-[#e79204]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  ),
                },
                {
                  title: t('benefits.items.atendimento.title'),
                  description: t('benefits.items.atendimento.description'),
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto mb-4 text-[#e79204]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  ),
                },
              ].map((benefit, index) => (
                <MotionDiv
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  {benefit.icon}
                  <h3 className="text-xl font-semibold mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </MotionDiv>
              ))}
            </div>
          </div>
        </MotionDiv>
      </section>

      {/* Passo a Passo Section */}
      <section id="steps" className="py-20 bg-zinc-800">
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <h2 className="text-lg font-bold text-center text-title uppercase">
            {t('steps.title')}
          </h2>
          <h3 className="text-3xl font-semibold mb-8 text-zinc-50 text-center">
            {t('steps.subtitle')}
          </h3>
          <p className="text-center text-zinc-200 mb-12 max-w-3xl mx-auto">
            {t('steps.description')}
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: t('steps.items.levantamento.title'),
                description: t('steps.items.levantamento.description'),
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto mb-4 text-[#e79204]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                ),
              },
              {
                title: t('steps.items.validacao.title'),
                description: t('steps.items.validacao.description'),
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto mb-4 text-[#e79204]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: t('steps.items.recebimentos.title'),
                description: t('steps.items.recebimentos.description'),
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto mb-4 text-[#e79204]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                ),
              },
              {
                title: t('steps.items.treinamento.title'),
                description: t('steps.items.treinamento.description'),
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto mb-4 text-[#e79204]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                ),
              },
            ].map((step, index) => (
              <MotionDiv
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-[#e79204] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#e79204] transform -translate-y-1/2" />
                )}
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </section>

      {/* Como Funciona Section */}
      <section id="solution" className="py-20 bg-zinc-200">
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="text-left">
              <h2 className="text-lg font-bold text-title uppercase">
                {t('solution.title')}
              </h2>
              <h3 className="text-3xl font-semibold mb-8">{t('solution.subtitle')}</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('solution.description')}
              </p>
            </div>
            <MotionDiv
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[300px] rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/bg/work-graph.jpeg"
                alt="Nossa solução"
                className="object-cover w-full h-full"
                width={1000}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent"></div>
            </MotionDiv>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: t('solution.features.conferencia.title'),
                description: t('solution.features.conferencia.description'),
              },
              {
                title: t('solution.features.sistema.title'),
                description: t('solution.features.sistema.description'),
              },
              {
                title: t('solution.features.analise.title'),
                description: t('solution.features.analise.description'),
              },
              {
                title: t('solution.features.integracao.title'),
                description: t('solution.features.integracao.description'),
              },
              {
                title: t('solution.features.visualizacao.title'),
                description: t('solution.features.visualizacao.description'),
              },
              {
                title: t('solution.features.suporte.title'),
                description: t('solution.features.suporte.description'),
              },
              {
                title: t('solution.features.consultoria.title'),
                description: t('solution.features.consultoria.description'),
              },
              {
                title: t('solution.features.seguranca.title'),
                description: t('solution.features.seguranca.description'),
              },
            ].map((feature, index) => (
              <MotionDiv
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-left p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-zinc-800 to-zinc-900 text-white relative overflow-hidden">
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-3xl font-bold mb-8 text-title">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            {t('cta.description')}
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="secondary"
              size="lg"
              className="hover:scale-105 transition-transform"
            >
              {t('cta.button')}
            </Button>
          </a>
        </MotionDiv>

        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 -top-48 -right-48 bg-white rounded-full mix-blend-overlay animate-blob"></div>
          <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-white rounded-full mix-blend-overlay animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-zinc-200">
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Logo e Texto */}
            <div className="space-y-6">
              <Image
                src="/images/svg/logoBlack.svg"
                alt="Auditax Logo"
                width={350}
                height={80}
                className="mb-6"
              />
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('contact.description')}
              </p>
            </div>

            {/* Contatos */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-8">
                {t('contact.title')}
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: t('contact.whatsapp.title'),
                    value: t('contact.whatsapp.value'),
                    link: whatsappUrl,
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-[#e79204]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
                      </svg>
                    ),
                  },
                  {
                    title: t('contact.email.title'),
                    value: t('contact.email.value'),
                    link: 'mailto:contato@auditax.tech',
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-[#e79204]"
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
                    className="flex items-center space-x-4 hover:transform hover:scale-105 transition-all"
                  >
                    {contact.icon}
                    <a
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="text-xl font-semibold">
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
