'use client'

import { Loading } from '@/components/loading/loading'
import { SummaryDataTable } from '@/components/tables/summary-data'
import { DetailsDataTable } from '@/components/tables/details-data'
import api from '@/lib/api'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Audit, PaginatedDetailsData } from '@/types/audit'

type TabType = 'summary' | 'details'

export default function AuditDetails() {
  const t = useTranslations('TextLang')
  const params = useParams()
  const [audit, setAudit] = useState<Audit | null>(null)
  const [detailsData, setDetailsData] = useState<PaginatedDetailsData | null>(
    null,
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSize, setCurrentPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('summary')

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const response = await api.get(`/audits/${params.id}`)
        setAudit(response.data.audit)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.message || 'Erro ao carregar auditoria')
        } else {
          setError('Erro inesperado ao conectar ao servidor.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchAudit()
  }, [params.id])

  useEffect(() => {
    const fetchDetails = async () => {
      setLoadingDetails(true)
      try {
        const response = await api.get(`/audits/${params.id}/details`, {
          params: {
            page: currentPage,
            limit: currentPageSize,
          },
        })

        // Mapeando a resposta da API para o formato esperado pelo componente
        const formattedData: PaginatedDetailsData = {
          data: response.data.detailsData,
          totalPages: response.data.pagination.totalPages,
          currentPage: response.data.pagination.page,
          totalItems: response.data.pagination.total,
          auditId: String(params.id),
          pageSize: response.data.pagination.limit,
        }

        setDetailsData(formattedData)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.message || 'Erro ao carregar detalhes')
        } else {
          setError('Erro inesperado ao conectar ao servidor.')
        }
      } finally {
        setLoadingDetails(false)
      }
    }

    if (params.id) {
      fetchDetails()
    }
  }, [params.id, currentPage, currentPageSize])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setCurrentPageSize(pageSize)
    setCurrentPage(1) // Volta para a primeira página quando mudar o tamanho
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  if (error || !audit) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error || 'Auditoria não encontrada'}</p>
      </div>
    )
  }

  return (
    <main className="m-4 md:ml-0 mt-0 bg-gray border border-border h-[calc(100vh-5rem)] flex flex-col items-start p-8 rounded-lg space-y-4 antialiased">
      <div className="w-full h-full flex flex-col">
        <h1 className="text-2xl font-medium text-zinc-200 mb-6">
          {t('auditDetails')} <span className="text-title">#{audit.id}</span>
        </h1>

        <div className="w-full h-full flex flex-col">
          <section className="flex border-b border-zinc-200 text-zinc-200 w-full mb-6">
            <div className="flex flex-row w-full gap-6 text-xs md:text-sm custom-scroll">
              <button
                className={`pb-2 ${activeTab === 'summary' ? 'rounded-t-lg p-2 bg-zinc-200 text-zinc-900' : ''}`}
                onClick={() => setActiveTab('summary')}
              >
                {t('summary')}
              </button>
              <button
                className={`pb-2 ${activeTab === 'details' ? 'rounded-t-lg p-2 bg-zinc-200 text-zinc-900' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                {t('details')}
              </button>
            </div>
          </section>

          <div className="flex-1 overflow-hidden">
            {activeTab === 'summary' && audit.summaryData && (
              <SummaryDataTable
                data={audit.summaryData}
                auditId={String(audit.id)}
              />
            )}

            {activeTab === 'details' &&
              (loadingDetails ? (
                <div className="flex justify-center items-center p-4">
                  <Loading loading={loadingDetails} width={100} />
                </div>
              ) : (
                <DetailsDataTable
                  data={
                    detailsData || {
                      data: [],
                      totalPages: 0,
                      currentPage: 1,
                      totalItems: 0,
                      auditId: String(audit.id),
                      pageSize: currentPageSize,
                    }
                  }
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                  currentPage={currentPage}
                  currentPageSize={currentPageSize}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}
