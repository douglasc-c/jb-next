import { useAuthContext } from '@/context/auth-context'
import { useLayoutContext } from '@/context/layout-context'
import api from '@/lib/api'
import Image from 'next/image'
import { useState } from 'react'
import { Loading } from '../loading/loading'
import { PulseLoader } from 'react-spinners'
import axios from 'axios'

interface CurrentPhase {
  id: number
  phaseName: string
  description: string
  order: number
  createdAt: string
  updatedAt: string
}

interface CurrentTask {
  id: number
  taskName: string
  description: string
  phaseId: number
  createdAt: string
  updatedAt: string
}

interface ContractInterest {
  interestId: string
  userId: number
  enterpriseId: number
  status: string
  createdAt: string
}

interface ImageItem {
  imageUrl: string
}

interface Venture {
  id: number
  name: string
  corporateName: string
  description: string
  status: string
  isAvailable: boolean
  investmentType: string
  constructionType: string
  fundingAmount: number
  transferAmount: number
  postalCode: string
  address: string
  city: string
  squareMeterValue: number
  area: number
  progress: number
  floors: number
  completionDate: string
  clientSigningUrl: string
  contractStatus: string
  clientSigningUrlExpire: string
  startDate: string
  currentPhaseId: number
  currentTaskId: number
  createdAt: string
  updatedAt: string
  currentPhase?: CurrentPhase
  currentTask?: CurrentTask
  interestStatus?: string
  contractInterests: ContractInterest[]
  coverImageUrl: string
  images: ImageItem[]
}

interface ContractProps {
  data: Venture
  onClick: () => void
}

export function DetailsVentures({ data, onClick }: ContractProps) {
  const { texts } = useLayoutContext()
  const { authData } = useAuthContext()
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false)
  const [loading] = useState(true)
  const [error, setError] = useState('')
  const [loadingButton, setLoadingButton] = useState(false)
  const [loadingSignature, setLoadingSignature] = useState(false)

  const stages: Record<number, string> = {
    1: texts.topography,
    2: texts.masonry,
    3: texts.inspections,
    4: texts.thermalInsulationOfTheWalls,
    5: texts.roofInsulation,
    6: texts.doors,
  }

  const stageDescription = stages[data.currentPhaseId] || 'Etapa desconhecida'

  const hasPendingContractInterest =
    Array.isArray(data.contractInterests) &&
    data.contractInterests.some(
      (interest) =>
        interest.status === 'PENDING' && interest.userId === authData?.user.id,
    )

  const hasApprovedContract =
    Array.isArray(data.contractInterests) &&
    data.contractInterests.some((interest) => interest.status === 'APPROVED')

  const handleClickInterest = async (id: number) => {
    try {
      const response = await api.post(`/users/interest-enterprise`, {
        enterpriseId: id,
      })

      if (response?.status === 200 || response?.status === 201) {
        console.log('Update successful', response.data)
      } else {
        console.error('Failed to update data', response)
      }
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
      onClick()
    }
  }

  const signalContract = async () => {
    setLoadingSignature(true)
    try {
      const response = await api.post(`/users/update/signature`, {
        enterpriseId: data.id,
      })

      if (response.status === 200) {
        window.open(
          response.data.newUserSigningUrl,
          '_blank',
          'noopener,noreferrer',
        )
      } else {
        console.log(response.data.message || 'Erro ao abrir o contrato')
      }
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
      setLoadingSignature(false)
    }
  }

  const viewContract = async () => {
    setLoadingButton(true)
    try {
      const response = await api.get(`/users/contracts/view/TYPE1`)

      if (response.status === 200 && response.data.pdfUrl) {
        setPdfUrl(response.data.pdfUrl)
        setIsPdfModalOpen(true)
      } else {
        console.log(response.data.message || 'Erro ao abrir o contrato')
      }
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
      setLoadingButton(false)
    }
  }

  return (
    <div className="flex flex-col p-10 bg-zinc-200 rounded-xl h-auto justify-around w-full space-y-6">
      <div className="flex justify-between">
        <h2 className="uppercase font-medium">
          {data.name} - {data.city} {data.area}M²
        </h2>
        <button onClick={onClick} className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <section className=" w-full h-64 relative">
        {data.coverImageUrl ? (
          <Image
            src={`${data.coverImageUrl}`}
            alt={`Image`}
            fill
            className="absolute inset-0 rounded-lg"
          />
        ) : (
          <div className="absolute inset-0 bg-base-home bg-cover bg-center rounded-lg" />
        )}
      </section>
      <section className="flex flex-row text-xs space-x-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 gap-x-40 w-2/3">
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.typeOfConstruction}</p>
            <span className="font-light">{data.constructionType}</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.city}</p>
            <span className="font-light">{data.city}</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.contributionAmount}</p>
            <span className="font-light">U$ {data.fundingAmount}</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.valueM2}</p>
            <span className="font-light">U$ {data.squareMeterValue}</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.amountPassed}</p>
            <span className="font-light">U$ {data.transferAmount}</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.footage}</p>
            <span className="font-light">{data.area}m²</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.postalCode}</p>
            <span className="font-light">{data.postalCode}</span>
          </div>
          <div className="w-full flex space-x-3">
            <p className="font-medium uppercase">{texts.floors}</p>
            <span className="font-light">{data.floors}</span>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 w-1/3">
          <div className="w-full flex flex-col items-center">
            <p className="font-medium text-center text-sm md:text-base uppercase">
              {texts.provisionalCompletion}
            </p>
            <span className="font-light text-sm md:text-base text-center">
              {new Date(data.completionDate).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </span>
          </div>
          {/* <div className="w-full flex flex-row space-x-1 justify-center uppercase">
            <p className="font-light">{texts.status}:</p>
            <span className="font-light">{data.status}</span>
          </div> */}
          <div className="flex flex-col gap-4">
            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
            <button
              onClick={signalContract}
              className={`border rounded-full text-center border-primary text-primary py-3 bg-transparent ${data.clientSigningUrl ? '' : 'hidden'}`}
            >
              {loadingSignature ? (
                <PulseLoader
                  color="#A47659"
                  loading={loadingSignature}
                  size={6}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                texts.signalContract
              )}
            </button>
            <button
              onClick={viewContract}
              className={`border rounded-full text-center border-primary text-primary py-3 bg-transparent`}
            >
              {loadingButton ? (
                <PulseLoader
                  color="#A47659"
                  loading={loadingButton}
                  size={6}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                texts.seeContract
              )}
            </button>
            {!hasPendingContractInterest && !hasApprovedContract && (
              <button
                onClick={() => handleClickInterest(data.id)}
                className={`border rounded-full text-center border-primary text-primary py-3 bg-transparent`}
              >
                {texts.takeAnInterest}
              </button>
            )}
          </div>
        </div>
      </section>

      {hasApprovedContract && (
        <section className="flex flex-col gap-4 w-full">
          <div className="flex justify-between">
            <h2 className="font-medium text-sm uppercase">
              {texts.constructionStatus}
            </h2>
            <p className="font-light text-sm uppercase">{data.progress}%</p>
          </div>
          <div className="w-full h-2 bg-zinc-900 relative rounded">
            <div
              className="h-2 bg-gray-400 rounded"
              style={{ width: `${data.progress}%` }}
            />
          </div>
          <div className="flex justify-end">
            <p className="font-light text-sm uppercase">
              {texts.stage} {data.currentTaskId} - {stageDescription}
            </p>
          </div>
        </section>
      )}

      {isPdfModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full h-[80vh]">
            <button
              className="absolute top-4 right-4 text-black"
              onClick={() => setIsPdfModalOpen(false)}
            >
              Fechar
            </button>
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                frameBorder="0"
                style={{
                  overflow: 'auto',
                }}
              ></iframe>
            ) : (
              <Loading loading={loading} width={300} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
