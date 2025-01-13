import React, { useEffect, useState } from 'react'
import api from '@/lib/api'
import { VentureTab } from '../tabs/venture'
import { useLayoutAdminContext } from '@/context/layout-admin-context'
import ImageGallery from '../tabs/imagens'
import DeleteModal from './delete'

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
  const [activeTab, setActiveTab] = useState<
    'overview' | 'images' | 'tasks' | 'valuation'
  >('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editableData, setEditableData] = useState<Venture>({ ...venture })
  const [changedData, setChangedData] = useState<Partial<Venture>>({})
  const [ventureImages, setVentureImages] = useState<string[]>([])
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)

  const fieldTypes: Record<string, 'string' | 'number' | 'boolean' | 'date'> = {
    name: 'string',
    corporateName: 'string',
    description: 'string',
    status: 'string',
    isAvailable: 'boolean',
    investmentType: 'string',
    constructionType: 'string',
    fundingAmount: 'number',
    transferAmount: 'number',
    postalCode: 'string',
    address: 'string',
    city: 'string',
    squareMeterValue: 'number',
    area: 'number',
    progress: 'number',
    floors: 'number',
    currentPhaseId: 'number',
    currentTaskId: 'number',
    startDate: 'date',
    completionDate: 'date',
  }

  const handleInputChange = (
    field: string,
    value: string | number | boolean,
  ) => {
    const expectedType = fieldTypes[field]

    let convertedValue: string | number | boolean | Date = value

    if (expectedType) {
      switch (expectedType) {
        case 'number':
          convertedValue = Number(value)
          if (isNaN(convertedValue)) {
            console.warn(
              `Field "${field}" expects a number, but received "${value}".`,
            )
            return
          }
          break
        case 'boolean':
          convertedValue = value === 'true' || value === true
          break
        case 'date':
          convertedValue = new Date(value as string)
          if (isNaN((convertedValue as Date).getTime())) {
            console.warn(
              `Field "${field}" expects a valid date, but received "${value}".`,
            )
            return
          }
          break
        case 'string':
        default:
          convertedValue = String(value)
      }
    } else {
      console.warn(`Field "${field}" is not defined in fieldTypes.`)
    }

    setEditableData((prev) => {
      if (field in prev) {
        const key = field as keyof Venture

        if (prev[key] === convertedValue) {
          return prev
        }

        setChangedData((prevChanged) => ({
          ...prevChanged,
          [key]: convertedValue,
        }))

        return { ...prev, [key]: convertedValue }
      } else {
        console.warn(`Field "${field}" is not a valid property of Venture.`)
        return prev
      }
    })
  }

  const handleSelectImage = (selected: string[]) => {
    setSelectedImages(selected)
  }

  const handleSave = async () => {
    setIsEditing(false)

    try {
      let response

      if (activeTab === 'overview') {
        response = await handleOverviewUpdate()
      } else if (activeTab === 'images') {
        response = await handleImageOperations()
      } else if (activeTab === 'tasks') {
        response = await handleProgessUpdate()
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

  const handleProgessUpdate = async () => {
    return api.put('admin/update-progress-task', {
      // enterpriseId,
      // phaseId,
      // taskId,
      // isCompleted,
    })
  }

  const handleValuationUpdate = async () => {
    return api.put(`admin/update/${editableData.id}/valuation`, {
      newValuation: 150000,
      mode: 'confirmed',
    })
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
        <h3 className="text-2xl">{texts.ventureDetails}</h3>
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
        <div className="space-x-4">
          <button
            className={`pb-2 ${activeTab === 'overview' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            {texts.summary}
          </button>
          <button
            className={`pb-2 ${activeTab === 'images' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            {texts.images}
          </button>
          <button
            className={`pb-2 ${activeTab === 'tasks' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            {texts.stage}
          </button>
          <button
            className={`pb-2 ${activeTab === 'valuation' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('valuation')}
          >
            {texts.valuation}
          </button>
        </div>
        <div>
          {/* {activeTab === 'overview' && ( */}
          <button
            className="bg-red-600 px-4 rounded-md text-sm"
            onClick={() => setIsModalDeleteOpen(true)}
          >
            {texts.delete}
          </button>
          {/* )} */}
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
          <div>
            <div>
              <h4>{editableData.currentPhase?.phaseName}</h4>
              <p>{editableData.currentPhase?.description}</p>
              <h4>{editableData.currentTask?.taskName}</h4>
              <p>{editableData.currentTask?.description}</p>
            </div>
          </div>
        )}
        {activeTab === 'valuation' && (
          <div>
            <div>
              <h4>{editableData.currentPhase?.phaseName}</h4>
              <p>{editableData.currentPhase?.description}</p>
              <h4>{editableData.currentTask?.taskName}</h4>
              <p>{editableData.currentTask?.description}</p>
            </div>
          </div>
        )}
      </div>

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
