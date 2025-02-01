import { useState } from 'react'
import ButtonGlobal from '@/components/buttons/global'
import { useLayoutContext } from '@/context/layout-context'
import { useUploadContext } from '@/context/upload-context'
import DocumentUploader from './document-uploader'
import Link from 'next/link'
import Image from 'next/image'

interface FormData {
  documentType: string
}

export default function ComplianceStep({
  buttonLabel,
  onNext,
  onPrev,
  isFirstStep,
  isLastStep,
  step,
  totalSteps,
  onFormDataUpdate,
}: {
  buttonLabel: string
  onNext: () => void
  onPrev: () => void
  isFirstStep: boolean
  isLastStep: boolean
  step: number
  totalSteps: number
  onFormDataUpdate: (formData: FormData) => void
  onFileUpload?: (newFiles: File[]) => void
}) {
  const { texts } = useLayoutContext()
  const { addFiles } = useUploadContext()
  const [formData, setFormData] = useState<FormData>({ documentType: 'CNH' })
  const [uploadedImages, setUploadedImages] = useState<{
    [key: string]: string
  }>({})

  const handleUpload = (documentKey: string, newFiles: File[]) => {
    if (newFiles.length > 0) {
      const fileUrl = URL.createObjectURL(newFiles[0]) // Cria um preview da imagem
      setUploadedImages((prev) => ({
        ...prev,
        [documentKey]: fileUrl, // Salva a imagem correspondente ao step
      }))
    }
    addFiles(documentKey, newFiles)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedFormData: FormData = { documentType: e.target.value }
    setFormData(updatedFormData)
    onFormDataUpdate(updatedFormData)
  }

  const documentStepsText = [
    texts.documentFront,
    texts.documentBack,
    texts.proofOfAddress,
    texts.incomeTaxProof,
  ]

  const documentSteps = [
    'documentFront',
    'documentBack',
    'proofOfAddress',
    'incomeTaxProof',
  ]

  return (
    <div className="flex flex-col p-10 bg-zinc-200 rounded-xl space-y-6">
      <h1 className="text-xl font-semibold">{texts.verifyYourIdentity}</h1>

      {step === 1 && (
        <section className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-sm uppercase text-zinc-500">
              {texts.documentType}
            </label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleFormChange}
              className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-300 font-light text-sm text-zinc-400 outline-none"
              required
            >
              <option value="RG">RG</option>
              <option value="CNH">CNH</option>
              <option value="PASSPORT">PASSPORT</option>
            </select>
          </div>
        </section>
      )}

      {step > 0 && step <= documentSteps.length && (
        <div className="flex flex-col items-center space-y-4">
          {uploadedImages[documentSteps[step - 1]] ? (
            // Se a imagem foi enviada, exibir a prévia
            <Image
              src={uploadedImages[documentSteps[step - 1]]}
              width={150}
              height={150}
              alt="Uploaded Document"
              className="rounded-md"
            />
          ) : (
            // Caso contrário, exibir o componente de upload
            <DocumentUploader
              onUpload={handleUpload}
              attachLabel={texts.attach}
              dragHint={documentStepsText[step - 1]}
              documentKey={documentSteps[step - 1]}
            />
          )}
        </div>
      )}

      <section className="flex flex-row justify-between items-center rounded-xl">
        <Link
          className="border border-gray-500 rounded-md py-2 md:flex hidden justify-center font-light text-sm md:w-1/3"
          href={'/support'}
        >
          <p>{texts.support}</p>
        </Link>
        <div className="flex flex-row space-x-1 items-center justify-center text-sm md:w-1/3 text-primary">
          <p>{`${texts.step} ${step} ${texts.from} ${totalSteps}`}</p>
        </div>
        <div className="flex flex-row items-center justify-end gap-4 md:w-1/3">
          {!isFirstStep && (
            <button
              onClick={onPrev}
              className="uppercase text-zinc-500 font-medium hover:text-zinc-300 text-sm"
            >
              {texts.previo}
            </button>
          )}
          <ButtonGlobal
            type="button"
            params={{
              title: isLastStep ? texts.finish : buttonLabel,
              color: 'bg-primary',
            }}
            onClick={onNext}
          />
        </div>
      </section>

      <div className="flex w-full font-light text-xs">
        <p>
          {texts.at4HandsRealEstateInvestmentsWeNeedTo}{' '}
          <span className="text-primary font-medium underline">
            {texts.lgptLaws}
          </span>
        </p>
      </div>
    </div>
  )
}
