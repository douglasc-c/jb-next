'use client'

import { Loading } from '@/components/loading/loading'
import { Audits } from '@/components/tables/audits'
import Search from '@/components/searchs/search'
import { api } from '@/lib/api'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Audit } from '@/types/audit'

export default function AuditsPage() {
  const t = useTranslations('TextLang')
  const [audits, setAudits] = useState<Audit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredAudits, setFilteredAudits] = useState<Audit[]>([])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const results = audits.filter(
      (audit) =>
        audit.id.toString().includes(query) ||
        new Date(audit.createdAt).toLocaleDateString('pt-BR').includes(query) ||
        audit.establishment?.companyName
          ?.toLowerCase()
          .includes(query.toLowerCase()),
    )
    setFilteredAudits(results)
  }

  const fetchAudits = async () => {
    try {
      const response = await api.get('/audits')
      const fetchedAudits = response.data.audits

      setAudits(fetchedAudits)
      setFilteredAudits(fetchedAudits)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || t('errorLoadingAudits'))
      } else {
        setError(t('unexpectedError'))
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAudits()
  }, [])

  const handleNewAudit = (newAudit: Audit) => {
    setAudits((prev) => [newAudit, ...prev])
    setFilteredAudits((prev) => [newAudit, ...prev])
  }

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
      <div className="grid md:grid-cols-3 grid-cols-2 items-center gap-4 w-full">
        <div className="col-span-3">
          <Search
            placeholder={t('searchAudits')}
            searchQuery={searchQuery}
            onSearch={handleSearch}
          />
        </div>
      </div>
      <section className="flex flex-col w-full">
        <Audits audits={filteredAudits} onNewAudit={handleNewAudit} />
      </section>
    </main>
  )
}
