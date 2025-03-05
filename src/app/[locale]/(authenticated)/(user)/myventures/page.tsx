'use client'

import { Loading } from '@/components/loading/loading'
import { MyVenturesTable } from '@/components/tables/my-ventures'
import api from '@/lib/api'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function MyVentures() {
  const t = useTranslations('TextLang')
  const [userRecentEnterprises, setUserRecentEnterprises] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const fetchMyVenture = async () => {
      try {
        const response = await api.get('/users/my-enterprise')
        const fetchedUserRecentEnterprises = response.data
        setUserRecentEnterprises(fetchedUserRecentEnterprises)
      } finally {
        setLoading(false)
      }
    }

    fetchMyVenture()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-200">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  return (
    <main className="bg-zinc-200 h-[calc(91vh)] flex flex-col p-6">
      <div className="flex flex-col p-4 bg-zinc-300 rounded-xl space-y-3 overflow-y-auto max-h-md relative">
        <h1 className="uppercase font-medium">{t('myVentures')}</h1>
        <section className="flex w-full rounded-xl bg-zinc-200 space-x-6 overflow-auto">
          {userRecentEnterprises.length > 0 ? (
            <MyVenturesTable data={userRecentEnterprises} />
          ) : (
            <div className="p-4 bg-zinc-300 rounded-xl space-y-3 overflow-y-auto max-h-md relative w-full">
              <div className="text-center items-center flex flex-col space-y-4">
                <Image
                  src="/images/svg/warning-grey.svg"
                  alt="arrow icon"
                  height={90}
                  width={90}
                />
                <span className="text-lg">{t('youHaveNoBusiness')}</span>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
