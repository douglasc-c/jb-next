'use client'

import { Loading } from '@/components/loading/loading'
import { Audits } from '@/components/tables/audits'
import api from '@/lib/api'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Audit } from '@/types/audit'

export default function AuditsPage() {
  const t = useTranslations('TextLang')
  const [audits, setAudits] = useState<Audit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const response = await api.get('/audits')
        setAudits(response.data.audits)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data.message || 'Erro ao carregar auditorias',
          )
        } else {
          setError('Erro inesperado ao conectar ao servidor.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchAudits()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <main className="m-4 md:ml-0 mt-0 bg-gray border border-border h-[calc(100vh-5rem)] flex flex-col items-start md:p-10 p-4 rounded-lg space-y-4 antialiased">
      <div className="w-full">
        <h1 className="text-2xl font-medium text-zinc-200 mb-6">
          {t('audits')}
        </h1>
        <Audits audits={audits} />
      </div>
    </main>
  )
}
