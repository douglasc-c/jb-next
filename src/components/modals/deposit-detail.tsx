'use client'

import { useLayoutAdminContext } from '@/context/layout-admin-context'
import api from '@/lib/api'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

interface DepositUser {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface Deposit {
  id: number
  userId: number
  codeDeposit: string
  amount: number
  status: string
  proofUrl: string
  adminComment: string | null
  approvedAt: string | null
  balanceUpdatedAt: string | null
  createdAt: string
  updatedAt: string
  user: DepositUser
}

interface DepositDetailsProps {
  deposit: Deposit
  isOpen: boolean
  onClose: () => void
}

export const DepositDetails: React.FC<DepositDetailsProps> = ({
  deposit,
  isOpen,
  onClose,
}) => {
  const { texts } = useLayoutAdminContext()
  const pathname = usePathname()

  // Estado local para exibir mensagens
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (!isOpen) return null

  // Função para aprovar ou rejeitar o depósito
  const handleApproveOrReject = async (status: 'APPROVED' | 'REJECTED') => {
    try {
      const response = await api.post('/admin/deposit/approve-or-reject', {
        depositId: deposit.id,
        status,
        adminComment: '',
      })
      if (response.status === 200) {
        setSuccess(
          status === 'APPROVED'
            ? 'Depósito aprovado com sucesso.'
            : 'Depósito rejeitado com sucesso.',
        )
      } else {
        setError('Falha ao atualizar o status do depósito.')
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
    }
  }

  return (
    <div className="flex flex-col p-8 bg-zinc-300 rounded-xl h-auto justify-around w-full space-y-6">
      <div className="flex justify-between">
        <h3 className="text-lg md:text-2xl">
          {texts?.depositDetails || 'Detalhes do Depósito'}
        </h3>
        <button onClick={onClose} className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="border-b border-gray-600 pb-4 space-y-4">
        <p>
          <strong>{texts?.codeDeposit || 'Código Depósito'}:</strong>{' '}
          {deposit.codeDeposit}
        </p>
        <p>
          <strong>{texts?.user || 'Usuário'}:</strong> {deposit.user.firstName}{' '}
          {deposit.user.lastName}
        </p>
        <p>
          <strong>{texts?.amount || 'Valor'}:</strong> U$ {deposit.amount}
        </p>
        <p>
          <strong>{texts.status || 'Status'}:</strong> {deposit.status}
        </p>
        <p>
          <strong>{texts?.proofUrl || 'URL da Prova'}:</strong>{' '}
          <a
            href={deposit.proofUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            {deposit.proofUrl}
          </a>
        </p>
        <p>
          <strong>{texts?.createdAt || 'Criado em'}:</strong>{' '}
          {new Date(deposit.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>{texts?.updatedAt || 'Atualizado em'}:</strong>{' '}
          {new Date(deposit.updatedAt).toLocaleString()}
        </p>
      </div>

      {success && <p className="text-green-600 text-sm">{success}</p>}
      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

      {(deposit.status === 'PENDING' || deposit.status === 'WAITING_PROOF') && (
        <div className="flex justify-end mt-4 space-x-4">
          <button
            onClick={() => handleApproveOrReject('APPROVED')}
            className="bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            Aprovar
          </button>
          <button
            onClick={() => handleApproveOrReject('REJECTED')}
            className="bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            Rejeitar
          </button>
        </div>
      )}
    </div>
  )
}
