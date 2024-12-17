'use client'

import { useLayoutContext } from '@/context/layout-context'

interface ContractProps {
  data: {
    status?: string
    company?: string
    name?: string
    document: string
    initialDate: string
    address: string
    typeOfConstruction: string
    contributionAmount: string
    amountPassed: string
    postalCode: string
    city: string
    valueM2: string
    footage: string
    floors: string
    data: string
    provisionalCompletion: string
    progressStatus: string
    constructionStatus: number
    stage: number
  }
  onClick: () => void
}

export function DetailContract({ data, onClick }: ContractProps) {
  const { textDetailContract } = useLayoutContext()

  const stages: Record<number, string> = {
    1: textDetailContract.topography,
    2: textDetailContract.masonry,
    3: textDetailContract.inspections,
    4: textDetailContract.thermalInsulationOfTheWalls,
    5: textDetailContract.roofInsulation,
    6: textDetailContract.doors,
  }

  const stageDescription = stages[data.stage] || 'Etapa desconhecida'

  return (
    <div className="flex flex-col p-10 bg-zinc-800 rounded-xl h-auto justify-around w-full space-y-6">
      <div className="flex justify-between">
        <h2 className="uppercase font-medium">
          {data.name} - {data.city} {data.footage}M²
        </h2>
        <button onClick={onClick}>
          <h2 className="uppercase">x</h2>
        </button>
      </div>
      <section className="hidden md:block w-full h-64 relative">
        <div className="absolute inset-0 bg-base-home bg-cover bg-center rounded-lg" />
      </section>
      <section className="flex flex-row text-xs space-x-4 pt-4 text-zinc-300">
        <div className="grid grid-cols-2 items-center gap-6 gap-x-40 w-2/3">
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">
              {textDetailContract.typeOfConstruction}
            </p>
            <span className="font-light">{data.typeOfConstruction}</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{textDetailContract.city}</p>
            <span className="font-light">{data.city}</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">
              {textDetailContract.contributionAmount}
            </p>
            <span className="font-light">U$ {data.contributionAmount}</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">
              {textDetailContract.valueM2}
            </p>
            <span className="font-light">U$ {data.valueM2}</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">
              {textDetailContract.amountPassed}
            </p>
            <span className="font-light">U$ {data.amountPassed}</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">
              {textDetailContract.footage}
            </p>
            <span className="font-light">{data.footage}m²</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">
              {textDetailContract.postalCode}
            </p>
            <span className="font-light">{data.postalCode}</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{textDetailContract.floors}</p>
            <span className="font-light">{data.floors}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-1/3">
          <div className="w-full flex flex-col items-center space-x-3">
            <p className="font-medium text-base uppercase">
              {textDetailContract.provisionalCompletion}
            </p>
            <span className="font-light text-base">
              {data.provisionalCompletion}
            </span>
          </div>
          <div className="w-full flex flex-row space-x-1 justify-center uppercase">
            <p className="font-light">{textDetailContract.status}:</p>
            <span className="font-light">{data.progressStatus}</span>
          </div>
          <button
            onClick={onClick}
            className={`border rounded-full text-center border-primary text-primary py-3 bg-transparent`}
          >
            {textDetailContract.seeContract}
          </button>
        </div>
      </section>
      <section className="flex flex-col gap-4 w-full">
        <div className="flex justify-between">
          <h2 className="font-medium text-sm uppercase">
            {textDetailContract.constructionStatus}
          </h2>
          <p className="font-light text-sm uppercase">
            {data.constructionStatus}%
          </p>
        </div>
        <div className="w-full h-2 bg-zinc-900 relative rounded">
          <div
            className="h-2 bg-gray-400 rounded"
            style={{ width: `${data.constructionStatus}%` }}
          />
        </div>
        <div className="flex justify-end">
          <p className="font-light text-sm uppercase">
            {textDetailContract.stage} {data.stage} - {stageDescription}
          </p>
        </div>
      </section>
    </div>
  )
}
