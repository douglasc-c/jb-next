'use client'

import { MyContracts } from '@/components/tables/my-contracts'
import { useLayoutContext } from '@/context/layout-context'
import api from '@/lib/api'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function MyVentures() {
  const { texts } = useLayoutContext()
  const [userRecentEnterprises, setUserRecentEnterprises] = useState([])

  useEffect(() => {
    const fetchMyVenture = async () => {
      try {
        const response = await api.get('/users/my-enterprise')

        console.log(response)

        const fetchedUserRecentEnterprises = response.data
        setUserRecentEnterprises(fetchedUserRecentEnterprises)
      } finally {
        // setLoading(false)
      }
    }

    fetchMyVenture()
  }, [])

  return (
    <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col p-6 ">
      <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3 overflow-y-auto max-h-md relative">
        <h1 className="uppercase font-medium">{texts.myVentures}</h1>
        <section className="flex w-full rounded-xl bg-zinc-800 space-x-6 overflow-auto">
          {userRecentEnterprises.length > 0 ? (
            <MyContracts data={userRecentEnterprises} />
          ) : (
            <div className="p-4 bg-zinc-700 rounded-xl space-y-3 overflow-y-auto max-h-md relative w-full">
              <div className="text-center items-center flex flex-col space-y-4">
                <Image
                  src="/images/svg/warning-grey.svg"
                  alt="arrow icon"
                  height={90}
                  width={90}
                />
                <span className="text-lg">{texts.youHaveNoBusiness}</span>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
