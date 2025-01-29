'use client'

import { useAuthContext } from '@/context/auth-context'
import api from '@/lib/api'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { PulseLoader } from 'react-spinners'

interface TokenModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TokenModal({ isOpen, onClose }: TokenModalProps) {
  const [token, setToken] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const { authData } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      inputsRef.current[0]?.focus()
    } else {
      setToken(['', '', '', ''])
      setError('')

      inputsRef.current = []
    }
  }, [isOpen])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newToken = [...token]
    newToken[index] = value
    setToken(newToken)

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus()
    }

    if (newToken.every((digit) => digit !== '')) {
      handleSubmit(newToken.join(''))
    }
  }

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace' && !token[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasteData = event.clipboardData.getData('Text').trim()
    const digits = pasteData.split('').filter((char) => /\d/.test(char))

    if (digits.length === 4) {
      setToken(digits)
      handleSubmit(digits.join(''))
    }
  }

  const handleSubmit = async (enteredToken: string) => {
    setLoading(true)
    setError('')

    try {
      const response = await api.post(
        '/users/validate-email',
        { emailCode: enteredToken },
        {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        },
      )

      if (response.status === 200) {
        alert('Email verificado com sucesso!')
        onClose()
        router.push('/dashboard')
      } else {
        setError('Token inválido. Por favor, tente novamente.')
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data.error === 'string'
        ) {
          setError(error.response.data.error)
        } else {
          setError('Erro inesperado ao conectar ao servidor.')
        }
      } else {
        setError('Erro inesperado ao conectar ao servidor.')
      }
      console.error('Erro na verificação do token:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      aria-modal="true"
      role="dialog"
      aria-labelledby="token-modal-title"
      aria-describedby="token-modal-description"
    >
      {/* Caixa do Modal */}
      <div className="relative w-11/12 max-w-md p-6 bg-white rounded-lg shadow-lg">
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Fechar Modal"
        >
          ✕
        </button>
        <div className="flex flex-col items-center">
          <h2 id="token-modal-title" className="mt-4 text-2xl font-semibold">
            Insira o Token
          </h2>
          <p
            id="token-modal-description"
            className="mt-2 text-gray-600 text-center"
          >
            Por favor, insira os 4 dígitos do token enviado para o seu e-mail.
          </p>

          <div className="flex space-x-4 mt-6">
            {token.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                ref={(el) => {
                  inputsRef.current[index] = el
                }}
                className="w-12 h-14 text-center text-primary border-2 rounded-lg border-gray-300 focus:border-blue-500 text-xl"
                aria-label={`Dígito ${index + 1}`}
              />
            ))}
          </div>

          {error && (
            <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
          )}

          {loading && (
            <div className="mt-4">
              <PulseLoader color="#000" loading={loading} size={10} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
