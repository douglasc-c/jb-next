'use client'

import ButtonGlobal from '@/components/buttons/global'
import Input from '@/components/inputs/input'
import TokenModal from '@/components/modals/modal-code-email'
import { useAuthContext } from '@/context/auth-context'
import api from '@/lib/api'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { PulseLoader } from 'react-spinners'

export default function SignIn() {
  const { setAuthData } = useAuthContext()
  const t = useTranslations('TextLang')

  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    try {
      const response = await api.post('/sessions', formData)

      if (response.status === 200) {
        const { token, user } = response.data
        if (token && user) {
          setAuthData({ token, user })
          document.cookie = `auth-token=${token}; Max-Age=${
            60 * 60
          }; path=/; SameSite=Strict`

          const roleRoutes: { [key: string]: string } = {
            ADMIN: '/admin/users',
            USER: '/establishments',
          }

          switch (user.role) {
            case 'ADMIN':
            case 'USER':
              router.push(roleRoutes[user.role])
              break
            default:
              setError('Role de usuário desconhecido.')
              console.error('Role de usuário desconhecido:', user.role)
              break
          }
        } else {
          setError('Token não encontrado na resposta.')
          console.error('Token não encontrado na resposta.')
        }
      } else {
        setError('Falha no login.')
        console.error('Falha no login:', response.statusText)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data.error === 'string'
        ) {
          setError(error.response.data.error)
        } else {
          setError(error.response?.data.message)
        }
      } else {
        setError('Erro inesperado ao conectar ao servidor.')
      }
      console.error('Erro na requisição:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="h-screen flex bg-primary">
      <TokenModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
      />

      <section className="hidden md:block w-1/3 relative ">
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

      <section className="flex flex-col items-center justify-between md:w-2/3 w-full p-10 md:bg-primary bg-render md:bg-none bg-cover bg-center space-y-6">
        <div />
        <div className="w-full max-w-md space-y-6 ">
          <div className="w-full max-w-md space-y-1">
            <h2 className="text-4xl font-medium text-zinc-200">{t('enter')}</h2>
          </div>
          <div className="w-full max-w-md p-8 space-y-8 shadow-lg bg-zinc-200 border border-border  rounded-lg">
            <form className="space-y-6 text-zinc-800" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <span>{t('email')}</span>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <span>{t('password')}</span>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="rounded-md"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              <section className="forgot flex justify-between">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a href="#" className="">
                      {t('forgotYourPassword')}
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between"></div>
              </section>

              <div>
                <ButtonGlobal
                  type="submit"
                  disabled={loading}
                  params={{
                    title: loading ? (
                      <PulseLoader
                        color="#3f3f3f"
                        loading={loading}
                        size={6}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      t('signIn')
                    ),
                    color: 'bg-gray',
                  }}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="flex text-sm font-light justify-between w-full">
          <div className="flex flex-row items-center text-zinc-200 space-x-2">
            <Image
              className="py-4"
              src="/images/svg/lock.svg"
              alt="WiseBot Logo"
              height={24}
              width={24}
            />
            <p>{t('yourInformationIsSafe')}</p>
          </div>
          <div className="flex flex-row items-center text-zinc-200 space-x-2">
            <a href="#">{t('privacyCookPolicy')}</a>
            <span> | </span>
            <a href="#">{t('TermsOfService')}</a>
          </div>
        </div>
      </section>
    </main>
  )
}
