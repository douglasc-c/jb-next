'use client'

import { Contract } from '@/components/cards/contract'
import { Loading } from '@/components/loading/loading'
import { useLayoutContext } from '@/context/layout-context'
import api from '@/lib/api'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ConstructionCircuit() {
  const { texts } = useLayoutContext()
  const [enterprises, setEnterprises] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConstructionCircuit = async () => {
      try {
        const response = await api.get('/users/enterprise/available')
        const fetchedEnterprises = response.data

        setEnterprises(fetchedEnterprises)
      } catch (err) {
        console.error('Erro ao buscar dados do circuito contrutivo:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchConstructionCircuit()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-800">
        <Loading loading={loading} width={300} />
      </div>
    )
  }
  if (enterprises.length === 0) {
    return (
      <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col p-6 ">
        <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3 overflow-y-auto max-h-md relative">
          <h1 className="uppercase font-medium">{texts.constructionCircuit}</h1>
          <div className="text-center items-center flex flex-col space-y-4">
            <Image
              src="/images/svg/warning-grey.svg"
              alt="arrow icon"
              height={100}
              width={100}
            />
            <span className="text-lg">{texts.noNewDevelopmentsAvailable}</span>
          </div>
        </div>
      </main>
    )
  }
  return (
    <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col p-6 ">
      <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3 overflow-y-auto max-h-md relative">
        <h1 className="uppercase font-medium">{texts.constructionCircuit}</h1>
        {enterprises.map((item, index) => (
          <Contract key={index} data={item} />
        ))}
      </div>
    </main>
  )
}
