'use client'
import { useEnterpriseContext } from '@/context/enterprise-context'
import { useEffect, useState } from 'react'

export default function AdminDataFetcher() {
  const { enterprises, fetchEnterprises } = useEnterpriseContext()
  const [hasFetched, setHasFetched] = useState(false)

  useEffect(() => {
    // Se já temos dados no contexto, ou se já buscamos antes, não chama de novo
    if (!hasFetched && enterprises.length === 0) {
      fetchEnterprises()
      setHasFetched(true)
    }
  }, [hasFetched, enterprises, fetchEnterprises])

  return null
}
