'use client'

import { Contract } from '@/components/cards/contract'
import { useLayoutContext } from '@/context/layout-context'
import api from '@/lib/api'
import { useEffect, useState } from 'react'

export default function ConstructionCircuit() {
  const { textConstructionCircuit } = useLayoutContext()
  const [enterprises, setEnterprises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchConstructionCircuit = async () => {
      try {
        const response = await api.get('/users/enterprise/available')
        const fetchedEnterprises = response.data

        setEnterprises(fetchedEnterprises)
      } catch (err) {
        console.error('Erro ao buscar dados do circuito contrutivo:', err)
        setError('Erro ao carregar os dados. Tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchConstructionCircuit()
  }, [])

  if (loading) {
    return (
      <div className="bg-zinc-800 h-[calc(90vh)] flex flex-col items-start p-6 pr-36">
        <span>Carregando...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <span>{error}</span>
      </div>
    )
  }

  return (
    <main className="bg-zinc-800 h-[calc(90vh)] flex flex-col p-6 pr-36">
      <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3 overflow-y-auto max-h-md relative">
        <h1 className="uppercase font-medium">
          {textConstructionCircuit.constructionCircuit}
        </h1>
        {enterprises.map((item, index) => (
          <Contract key={index} data={item} />
        ))}
      </div>
    </main>
  )
}
