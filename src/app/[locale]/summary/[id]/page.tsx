'use client'

import { SummaryDataTable } from '@/components/tables/summary-data'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SummaryData } from '@/types/audit'
import api from '@/lib/api'
import { Loading } from '@/components/loading/loading'
import { useTranslations } from 'next-intl'
interface AuditData {
  id: string
  createdAt: string
  updatedAt: string
  establishment: {
    companyName: string
    cnpj: string
    tradeName: string
    responsible: string
  }
  summaryData: SummaryData[]
}

interface SummaryPageProps {
  params: {
    id: string
    locale: string
  }
}

export default function SummaryPage({ params }: SummaryPageProps) {
  const t = useTranslations('TextLang')
  const [data, setData] = useState<AuditData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/public/audits/${params.id}/summary`)

        setData(response.data.audit)
      } catch (error) {
        console.error('Error in SummaryPage:', error)
        setError('Erro ao carregar os dados')
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

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

  if (!data) {
    console.log('No data found, showing not found page')
    notFound()
  }

  return (
    <div className="bg-zinc-900">
      <div className="grid grid-cols-1 md:flex gap-6 bg-zinc-800 p-4 mx-6 mt-6 rounded-lg">
        <div>
          <h2 className="text-lg font-semibold flex flex-col text-zinc-200">
            <span className="text-sm font-regular text-zinc-200">
              {t('establishment')}:{' '}
            </span>
            {data.establishment.companyName}
          </h2>
        </div>
        <div>
          <h2 className="text-lg flex flex-col font-semibold text-zinc-200">
            <span className="text-sm font-regular text-zinc-200">
              {t('cnpj')}:
            </span>
            {data.establishment.cnpj}
          </h2>
        </div>
        <div>
          <h2 className="text-lg flex flex-col font-semibold text-zinc-200">
            <span className="text-sm font-regular text-zinc-200">
              {t('responsible')}:
            </span>
            {data.establishment.responsible}
          </h2>
        </div>
      </div>
      <SummaryDataTable data={data.summaryData} auditId={params.id} />
    </div>
  )
}
