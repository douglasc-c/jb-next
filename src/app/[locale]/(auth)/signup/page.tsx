'use client'

import ButtonGlobal from '@/components/buttons/global'
import Input from '@/components/inputs/input'
import ModalCongratulations from '@/components/modals/congratulations'
import api from '@/lib/api'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'

export default function Signup() {
  const t = useTranslations('TextLang')

  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    nickname: '',
    phone: '',
    accountType: '',
    documentNumber: '',
    birthDate: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    if (!formData.accountType) {
      setError('Por favor, selecione um tipo de conta.')
      setLoading(false)
      return
    }

    const payload = {
      email: formData.email,
      username: formData.nickname,
      password: formData.password,
      firstName: formData.fullName.split(' ')[0] || '',
      lastName: formData.fullName.split(' ').slice(1).join(' ') || '',
      birthDate: formData.birthDate ? formData.birthDate : undefined,
      userType: formData.accountType,
      numberDocument: formData.documentNumber || undefined,
      phone: formData.phone || undefined,
    }

    console.log('Payload enviado:', payload)

    try {
      const response = await api.post('/users/register', payload)
      if (response.status === 201) {
        setIsModalOpen(true)
      } else {
        setError('Falha no cadastro')
        console.error('Falha no cadastro:', response.statusText)
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const zodErrors = error.response.data.errors as Array<{
            path: string[]
            message: string
          }>
          const formattedErrors = zodErrors
            .map((err) => `${err.path.join('.')} - ${err.message}`)
            .join('\n')
          setError(formattedErrors)
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error)
        } else {
          setError('Erro ao conectar ao servidor')
        }
      } else {
        setError('Erro ao conectar ao servidor')
      }
      console.error('Erro na requisição:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isModalOpen) {
      timer = setTimeout(() => {
        setIsModalOpen(false)
        router.push('/')
      }, 1500)
    }
    return () => clearTimeout(timer)
  }, [isModalOpen, router])

  return (
    <main className="h-screen flex">
      <ModalCongratulations
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <section className="hidden md:block w-1/3 relative">
        <div className="absolute inset-0 bg-render bg-cover bg-center">
          <div className="flex flex-col items-center justify-center h-full">
            <Image
              className="py-4"
              src="/images/svg/logo.svg"
              alt="WiseBot Logo"
              height={300}
              width={300}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-between md:w-2/3 w-full p-10 md:bg-zinc-200 bg-render md:bg-none bg-cover bg-center space-y-6">
        <div />
        <div className="w-full max-w-2xl space-y-6">
          <div className="w-full max-w-md space-y-1">
            <h2 className="text-4xl font-medium text-zinc-600">
              {t('signup')}
            </h2>
            <p className="text-zinc-500">{t('useYour4HandsSignupToAccess')}</p>
          </div>
          <div className="w-full max-w-2xl p-8 space-y-8 shadow-lg bg-slate-100 rounded-lg">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black"
              onSubmit={handleSubmit}
            >
              {/* Nome Completo */}
              <div className="space-y-2">
                <label htmlFor="fullName">{t('name')}</label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="rounded-md w-full"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email">{t('email')}</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="rounded-md w-full"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="nickname">{t('username')}</label>
                <Input
                  id="nickname"
                  name="nickname"
                  type="text"
                  required
                  className="rounded-md w-full"
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone">{t('phone')}</label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="rounded-md w-full"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="accountType">{t('userType')}</label>
                <select
                  id="accountType"
                  name="accountType"
                  required
                  className="rounded-md p-2 w-full border border-gray-700"
                  value={formData.accountType}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {t('userType')}
                  </option>
                  {/* Enviar 'INDIVIDUAL' ou 'BUSINESS' */}
                  <option value="INDIVIDUAL">{t('individual')}</option>
                  <option value="BUSINESS">{t('company')}</option>
                </select>
              </div>

              {/* Número do Documento */}
              <div className="space-y-2">
                <label htmlFor="documentNumber">{t('documentNumber')}</label>
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  type="text"
                  className="rounded-md w-full"
                  value={formData.documentNumber}
                  onChange={handleChange}
                />
              </div>

              {/* Data de Nascimento */}
              <div className="space-y-2">
                <label htmlFor="birthDate">{t('dateOfBith')}</label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  className="rounded-md w-full"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>

              {/* Senha */}
              <div className="space-y-2 md:col-start-2">
                <label htmlFor="password">{t('password')}</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="rounded-md w-full"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Mensagem de Erro */}
              {error && (
                <div className="md:col-span-2">
                  <p className="text-red-500 text-sm whitespace-pre-wrap">
                    {error}
                  </p>
                </div>
              )}

              <div className="md:col-span-2">
                <ButtonGlobal
                  type="submit"
                  disabled={loading}
                  params={{
                    title: loading ? (
                      <PulseLoader
                        color="#fff"
                        loading={loading}
                        size={6}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      t('signup')
                    ),
                    color: 'bg-primary',
                  }}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="flex text-sm font-light justify-between w-full">
          <div className="flex flex-row items-center text-primary space-x-2">
            <Image
              className="py-4"
              src="/images/svg/lock.svg"
              alt="WiseBot Logo"
              height={24}
              width={24}
            />
            <p>{t('yourInformationIsSafe')}</p>
          </div>
          <div className="flex flex-row items-center text-gray-400 space-x-2">
            <a href="#">{t('privacyCookPolicy')}</a>
            <span> | </span>
            <a href="#">{t('TermsOfService')}</a>
          </div>
        </div>
      </section>
    </main>
  )
}
