import React, { useEffect, useState } from 'react'
import api from '@/lib/api'
import { VentureTab } from '../tabs/venture'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import ImageGallery from '../tabs/imagens'
import DeleteModal from './delete'
import SelectWithToggle from '../tabs/stages'
import { usePathname } from 'next/navigation'
import ValuationForm from '../tabs/valuation'

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

interface Image {
  url: string
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
  startDate: string
  currentPhaseId: number
  currentTaskId: number
  createdAt: string
  updatedAt: string
  currentPhase?: CurrentPhase
  currentTask?: CurrentTask
  contractInterests: ContractInterest[]
  coverImageUrl: string
  images: Image[]
}

interface VentureDetailsProps {
  venture: Venture
  isOpen: boolean
  onClose: () => void
}

export const VentureDetails: React.FC<VentureDetailsProps> = ({
  venture,
  isOpen,
  onClose,
}) => {
  const { texts } = useLayoutAdminContext()
  const pathname = usePathname()
  const parts = pathname.split('/')
  const route = parts.slice(3).join('/')
  const [isEditing, setIsEditing] = useState(false)
  const [editableData, setEditableData] = useState<Venture>({ ...venture })
  const [changedData, setChangedData] = useState<Partial<Venture>>({})
  const [ventureImages, setVentureImages] = useState<Image[]>([])
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [newValuation, setNewValuation] = useState<number | string>('')
  const [mode, setMode] = useState<string>('consulting')
  const [valuationData, setValuationData] = useState(null)

  const [activeTab, setActiveTab] = useState<
    'overview' | 'images' | 'tasks' | 'valuation' | 'contract'
  >('overview')

  const handleInputChange = (
    field: string,
    value: string | number | boolean | File[] | null,
  ) => {
    setEditableData((prev) => {
      if (field in prev) {
        const key = field as keyof Venture

        if (field === 'images' && Array.isArray(value)) {
          const images = value.map((file) => ({
            url: URL.createObjectURL(file),
          }))
          setChangedData((prevState) => ({
            ...prevState,
            images,
          }))
        } else if (
          [
            'fundingAmount',
            'transferAmount',
            'squareMeterValue',
            'area',
            'floors',
          ].includes(field)
        ) {
          setChangedData((prevState) => ({
            ...prevState,
            [field]: value ? parseFloat(value as string) : 0,
          }))
        } else if (field === 'isAvailable') {
          setChangedData((prevState) => ({
            ...prevState,
            isAvailable: value === 'true',
          }))
        } else if (field === 'startDate' || field === 'completionDate') {
          const dateValue = value ? new Date(value as string) : null
          console.log(dateValue)
          setChangedData((prevState) => ({
            ...prevState,
            [field]: dateValue,
          }))
        } else {
          setChangedData((prevState) => ({
            ...prevState,
            [field]: value,
          }))
        }

        return { ...prev, [key]: value }
      } else {
        console.warn(`Field "${field}" is not a valid property of Venture.`)
        return prev
      }
    })
  }

  const handleSave = async () => {
    setIsEditing(false)

    try {
      let response

      if (activeTab === 'overview') {
        response = await handleOverviewUpdate()
      } else if (activeTab === 'images') {
        response = await handleImageOperations()

        if (response?.status === 200 || response?.status === 201) {
          setVentureImages((prevImages) =>
            prevImages.filter((image) => !selectedImages.includes(image.url)),
          )
        }
      } else if (activeTab === 'valuation') {
        response = await handleValuationUpdate()
      }

      if (response?.status === 200 || response?.status === 201) {
        console.log('Update successful:', response.data)
      } else {
        console.error('Failed to update data:', response)
      }
    } catch (error) {
      console.error('Error while updating:', error)
    } finally {
      resetState()
    }
  }

  const handleOverviewUpdate = async () => {
    if (Object.keys(changedData).length === 0) {
      console.log('Nenhuma alteração detectada.')
      return null
    }

    return api.put(`/admin/update/enterprise/${editableData.id}`, {
      ...changedData,
      forceUpdate: false,
    })
  }

  const handleImageOperations = async () => {
    if (uploadedFiles.length > 0) {
      const formData = new FormData()
      uploadedFiles.forEach((file) => formData.append('images', file))

      await api.put(`/admin/images-enterprise/${editableData.id}`, formData)
      console.log('Imagens enviadas com sucesso.')
    } else {
      console.log('Nenhuma imagem para upload.')
    }

    if (selectedImages.length > 0) {
      return api.delete(`/admin/delete/images-enterprise/${editableData.id}`, {
        data: { imageUrls: selectedImages },
      })
    } else {
      console.log('Nenhuma imagem para deletar.')
      return null
    }
  }

  const handleValuationUpdate = async () => {
    try {
      const numericValuation =
        typeof newValuation === 'string' ? Number(newValuation) : newValuation

      const response = await api.put(
        `admin/update/${editableData.id}/valuation`,
        {
          newValuation: numericValuation,
          mode,
        },
      )
      setValuationData(response.data.data)
      console.log('Resposta da API:', response.data)
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  const resetState = () => {
    setChangedData({})
    setSelectedImages([])
    setUploadedFiles([])
  }

  const handleCancel = () => {
    setEditableData({ ...venture })
    setIsEditing(false)
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/enterprise/${editableData.id}`)
    } catch (error) {
      console.error('Erro ao deletar:', error)
    } finally {
      closeModalDelete()
      setIsModalDeleteOpen(false)
      onClose()
    }
  }

  const closeModalDelete = () => {
    setIsModalDeleteOpen(false)
  }

  const handleAddImages = (newFiles: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const handleSelectImage = (selected: string[]) => {
    setSelectedImages(selected)
  }

  useEffect(() => {
    if (activeTab === 'images' && venture.id) {
      const fetchVentureImages = async () => {
        try {
          const response = await api.get(
            `/admin/enterprise/images/${venture.id}`,
          )

          setVentureImages(response.data.images)
        } catch (err) {
          console.log(err)
        }
      }

      fetchVentureImages()
    }
  }, [activeTab, venture.id])

  if (!isOpen) return null

  return (
    <div className="flex flex-col p-8 bg-zinc-700 rounded-xl h-auto justify-around w-full space-y-6">
      <div className="flex justify-between">
        <h3 className="text-lg md:text-2xl">{texts.ventureDetails}</h3>
        <button onClick={onClose} className="text-gray-500">
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

      <div className="flex border-b border-gray-600 justify-between">
        <div className="flex flex-row w-full gap-6 text-xs custom-scroll">
          <button
            className={`pb-2 ${activeTab === 'overview' ? 'border-b-2 border-primary text-sm' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            {texts.summary}
          </button>
          <button
            className={`pb-2 ${activeTab === 'images' ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            {texts.images}
          </button>
          {route !== 'interests' && (
            <button
              className={`pb-2 ${activeTab === 'tasks' ? 'border-b-2 border-primary' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              {texts.stage}
            </button>
          )}
          {route !== 'interests' && (
            <button
              className={`pb-2 ${activeTab === 'valuation' ? 'border-b-2 border-primary' : ''}`}
              onClick={() => setActiveTab('valuation')}
            >
              {texts.valuation}
            </button>
          )}
          <button
            className={`pb-2 ${activeTab === 'contract' ? 'border-b-2 border-primary' : ''}`}
            onClick={() => setActiveTab('contract')}
          >
            {texts.contract}
          </button>
          {route !== 'interests' && (
            <button
              className={`pb-2 hover:border-b-2  hover:border-red-600 hover:text-red-600`}
              onClick={() => setIsModalDeleteOpen(true)}
            >
              {texts.delete}
            </button>
          )}
        </div>
      </div>

      <div>
        {activeTab === 'overview' && (
          <VentureTab
            isEditing={isEditing}
            editableData={editableData}
            handleInputChange={handleInputChange}
          />
        )}
        {activeTab === 'images' && (
          <div>
            <ImageGallery
              images={ventureImages}
              isEditing={isEditing}
              onSelect={handleSelectImage}
              isSelected={selectedImages}
              addImages={handleAddImages}
            />
          </div>
        )}
        {activeTab === 'tasks' && (
          <SelectWithToggle
            ventureId={venture.id}
            phaseId={venture.currentPhaseId}
            taskId={venture.currentTaskId}
          />
        )}
        {activeTab === 'valuation' && (
          <ValuationForm
            newValuation={newValuation}
            setNewValuation={setNewValuation}
            mode={mode}
            setMode={setMode}
            handleValuationUpdate={handleValuationUpdate}
            valuationData={valuationData}
          />
        )}
      </div>

      {route !== 'interests' &&
        activeTab !== 'tasks' &&
        activeTab !== 'contract' &&
        activeTab !== 'valuation' && (
          <div className="flex justify-end mt-4 space-x-4">
            {isEditing && (
              <button
                onClick={handleCancel}
                className="bg-zinc-600 text-zinc-300 py-2 px-4 rounded-lg"
              >
                {texts.cancel}
              </button>
            )}
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="bg-primary text-zinc-200 py-2 px-4 rounded-lg w-full"
            >
              {isEditing ? texts.save : texts.edit}
            </button>
          </div>
        )}

      {isModalDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-6 rounded-lg w-3/4">
            <DeleteModal
              onClose={closeModalDelete}
              isOpen={isModalDeleteOpen}
              handleSubmit={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  )
}
