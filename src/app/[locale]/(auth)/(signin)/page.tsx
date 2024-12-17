'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import Input from '@/components/inputs/input'
import { useAuthContext } from '@/context/auth-context'
// import { useDispatch } from 'react-redux'
// import { setToken } from '@/redux/auth-slice'
import { useRouter } from 'next/navigation'
// import { AppDispatch } from '@/redux/store'
// import api from '@/lib/api'
import ButtonGlobal from '@/components/buttons/global'

export default function SignIn() {
  const { textSignIn, locale } = useAuthContext()

  // const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
    console.log(router.push(`${locale}/dashboard`))

    if (!locale) {
      setError('Erro: Locale não definido.')
      console.error('Locale está undefined')
      setLoading(false)
      return
    }

    try {
      router.push(`${locale}/dashboard`)
      // const response = await api.post('/sessions', formData)
      // if (response.status === 200) {
      //   const data = response.data
      //   if (data.token) {
      //     const maxAge = 60 * 60
      //     document.cookie = `auth-token=${data.token}; Max-Age=${maxAge}; path=/; SameSite=Strict`
      //     dispatch(setToken(data.token))
      //     router.push(`${locale}/dashboard`)
      //   } else {
      //     setError('Token não encontrado na resposta')
      //     console.error('Token não encontrado na resposta')
      //   }
      // } else {
      //   setError('Falha no login')
      //   console.error('Falha no login:', response.statusText)
      // }
    } catch (error) {
      setError('Erro ao conectar ao servidor')
      console.error('Erro na requisição:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="h-screen flex">
      <section className="hidden md:block w-1/3 relative">
        <div className="absolute inset-0 bg-render bg-cover bg-center">
          <div className="flex flex-col items-center mt-20">
            <Image
              className="py-4"
              src="/images/svg/logoBlack.svg"
              alt="WiseBot Logo"
              height={300}
              width={300}
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-between md:w-2/3 w-full p-10 bg-stone-950 space-y-6">
        <div />
        <div className="w-full max-w-md space-y-6">
          <div className="w-full max-w-md space-y-1">
            <h2 className="text-4xl font-medium">{textSignIn.enter}</h2>
            <p className="text-gray-400">
              {textSignIn.useYour4HandsLoginToAccess}
            </p>
          </div>
          <div className="w-full max-w-md p-8 space-y-8 shadow-lg bg-slate-100 rounded-lg">
            <form className="space-y-6 text-black" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <span>{textSignIn.email}</span>
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
                <span>{textSignIn.password}</span>
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

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="">
                    {textSignIn.forgotYourPassword}
                  </a>
                </div>
                <div className="flex items-center" />
              </div>

              <div className="text-white">
                <ButtonGlobal
                  type="submit"
                  disabled={loading}
                  params={{
                    title: loading ? textSignIn.signIn : textSignIn.signIn,
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
            <p>{textSignIn.yourInformationIsSafe}</p>
          </div>
          <div className="flex flex-row items-center text-gray-400 space-x-2">
            <a href="#">{textSignIn.privacyCookPolicy}</a>
            <span> | </span>
            <a href="#">{textSignIn.TermsOfService}</a>
          </div>
        </div>
      </section>
    </main>
  )
}
