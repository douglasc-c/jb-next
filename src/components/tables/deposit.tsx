'use client'

import { useLayoutAdminContext } from '@/context/admin-context'
import { useState } from 'react'
import { DepositDetails } from '../modals/deposit-detail'
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

interface MyDepositsProps {
  data: Deposit[]
}

export function DepositsTable({ data }: MyDepositsProps) {
  const { texts } = useLayoutAdminContext()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null)

  const openModal = (row: Deposit) => {
    setSelectedDeposit(row)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDeposit(null)
  }

  const translateStatus = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Pendente'
      case 'WAITING_PROOF':
        return 'Aguardando comprovante'
      case 'APPROVED':
        return 'Aprovado'
      default:
        return status
    }
  }

  return (
    <section className="h-auto w-full p-4">
      <div className="overflow-auto">
        <table className="table-auto w-full border-collapse text-sm">
          <thead className="uppercase border-b border-zinc-500">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-xs">
                {texts.codeDeposit || 'Código Depósito'}
              </th>
              <th className="px-4 py-2 text-left font-medium text-xs">
                {texts.user || 'Usuário'}
              </th>
              <th className="px-4 py-2 text-center font-medium text-xs">
                {texts.value || 'Valor'}
              </th>
              <th className="px-4 py-2 text-center font-medium text-xs">
                {texts.status || 'Status'}
              </th>
              <th className="px-4 py-2 text-center font-medium text-xs">
                {texts.actions || 'Ações'}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={`${index !== data.length - 1 ? 'border-b border-zinc-400' : ''}`}
              >
                <td className="px-4 py-2 text-xs">{row.codeDeposit}</td>
                <td className="px-4 py-2 text-xs">
                  {row.user.firstName} {row.user.lastName}
                </td>
                <td className="px-4 py-2 text-center text-xs">
                  {row.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </td>
                <td className="px-4 py-2 text-center text-xs">
                  <span className="border border-primary  text-primary px-2 py-1 rounded-xl inline-block text-center w-[65%]">
                    {translateStatus(row.status)}
                  </span>
                </td>
                <td className="px-4 py-2 text-center text-xs">
                  <button
                    className="border rounded-full text-primary border-primary py-1 px-4 bg-transparent"
                    onClick={() => openModal(row)}
                  >
                    {texts.seeMore || 'Ver mais'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedDeposit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full md:w-2/3">
            <DepositDetails
              isOpen={isModalOpen}
              onClose={closeModal}
              deposit={selectedDeposit}
            />
          </div>
        </div>
      )}
    </section>
  )
}
