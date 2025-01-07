'use client'

// import { MyContracts } from '@/components/tables/my-contracts'
import { useLayoutContext } from '@/context/layout-context'

export default function MyVentures() {
  const { textMyVentures } = useLayoutContext()

  return (
    <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col p-6 pr-36">
      <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3 overflow-y-auto max-h-md relative">
        <h1 className="uppercase font-medium">{textMyVentures.myVentures}</h1>
        <section className="flex w-full rounded-xl bg-zinc-800 space-x-6 overflow-auto">
          {/* <MyContracts data={data} /> */}
        </section>
      </div>
    </main>
  )
}
