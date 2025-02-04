'use client'

import ButtonGlobal from '@/components/buttons/global'
import { Loading } from '@/components/loading/loading'
import GenerateDeposit from '@/components/modals/generate-deposit'
import { useLayoutContext } from '@/context/layout-context'
import api from '@/lib/api'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface FormData {
  amount: number
}

export default function Wallet() {
  const { texts } = useLayoutContext()
  const [loading, setLoading] = useState(true)
  const [allDeposits, setAllDeposits] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loadingButton, setLoadingButton] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    amount: 0,
  })

  const handleInputChange = (
    field: string,
    value: string | number | boolean | File[] | null,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setLoadingButton(true)
    e.preventDefault()
    try {
      const response = await api.post('/admin/register', formData)

      if (response.status === 201) {
        const newDeposit = response.data.message

        setSuccess(newDeposit)
      } else {
        setError(response.data.message || 'Erro ao adicionar usuário')
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
      setLoadingButton(false)
      closeModal()
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setError('')
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  useEffect(() => {
    setLoading(true)
    const fetchWallet = async () => {
      try {
        const response = await api.get('/users/getalldeposit')

        const fetchedAllDeposits = response.data
        setAllDeposits(fetchedAllDeposits)
      } finally {
        setLoading(false)
      }
    }

    fetchWallet()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-200">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  return (
    <main className="bg-zinc-200 h-[calc(91vh)] flex flex-col p-6 ">
      <div className="flex flex-col p-4 bg-zinc-300 rounded-xl space-y-3 overflow-y-auto max-h-md relative">
        <div className="flex md:flex-row justify-between items-center">
          <div className="col-span-2 md:col-span-1 flex justify-center items-center">
            <h1 className="uppercase font-medium">{texts.myDeposits}</h1>
          </div>
          <div className="col-span-2 md:col-span-1 flex justify-center items-center">
            <ButtonGlobal
              type="button"
              params={{
                title: texts.generateDeposit,
                color: 'bg-primary',
              }}
              onClick={openModal}
            />
          </div>
        </div>
        <section className="flex w-full rounded-xl bg-zinc-200 space-x-6 overflow-auto">
          {allDeposits.length > 0 ? (
            <>1</>
          ) : (
            <div className="p-4 bg-zinc-300 rounded-xl space-y-3 overflow-y-auto max-h-md relative w-full">
              <div className="text-center items-center flex flex-col space-y-4">
                <Image
                  src="/images/svg/warning-grey.svg"
                  alt="arrow icon"
                  height={90}
                  width={90}
                />
                <span className="text-lg">{texts.youHaveNoDepositos}</span>
              </div>
            </div>
          )}
        </section>
      </div>
      {isModalOpen && (
        <GenerateDeposit
          isOpen={isModalOpen}
          formData={formData}
          error={error}
          success={success}
          loading={loadingButton}
          handleChange={handleInputChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </main>
  )
}
