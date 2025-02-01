'use client'

import { VentureCard } from '@/components/cards/venture'
import { Loading } from '@/components/loading/loading'
import { useLayoutContext } from '@/context/layout-context'
import api from '@/lib/api'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ConstructionCircuit() {
  const { texts } = useLayoutContext()
  const [enterprises, setEnterprises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchConstructionCircuit = async () => {
      try {
        const response = await api.get('/users/enterprise/available')
        const fetchedEnterprises = response.data

        setEnterprises(fetchedEnterprises)
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
        setLoading(false)
      }
    }

    fetchConstructionCircuit()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-200">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-200">
        <p>{error}</p>
      </div>
    )
  }

  if (enterprises.length === 0) {
    return (
      <main className="bg-zinc-200 h-[calc(91vh)] flex flex-col p-6 ">
        <div className="flex flex-col p-4 bg-zinc-300 rounded-xl space-y-3 overflow-y-auto max-h-md relative">
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
    <main className="bg-zinc-200 h-[calc(91vh)] flex flex-col p-6 ">
      <div className="p-4 bg-zinc-300 shadow space-y-4 rounded-xl">
        <h1 className="uppercase font-medium">{texts.constructionCircuit}</h1>
        <div className="grid md:grid-cols-2 gap-4 overflow-y-auto max-h-md  relative">
          {enterprises.map((item, index) => (
            <VentureCard key={index} data={item} />
          ))}
        </div>
      </div>
    </main>
  )
}
