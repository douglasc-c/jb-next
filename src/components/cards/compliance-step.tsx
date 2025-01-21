import ButtonGlobal from '@/components/buttons/global'
import { useLayoutContext } from '@/context/layout-context'
import { useUploadContext } from '@/context/upload-context'
import DocumentUploader from './document-uploader'
import { useState } from 'react'

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
  onFileUpload: (newFiles: File[]) => void
  step: number
  totalSteps: number
  onFormDataUpdate: (formData: FormData) => void
}) {
  const { texts } = useLayoutContext()
  const { addFiles } = useUploadContext()
  const [formData, setFormData] = useState<FormData>({ documentType: 'CNH' })

  const handleUpload = (documentKey: string, newFiles: File[]) => {
    addFiles(documentKey, newFiles) // Adiciona arquivos ao tipo de documento correspondente
    console.log(`Arquivos carregados para ${documentKey}:`, newFiles)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedFormData: FormData = { documentType: e.target.value }
    setFormData(updatedFormData) // Atualiza o estado do formData
    onFormDataUpdate(updatedFormData) // Chama a função para passar o formData atualizado
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
    <div className="flex flex-col p-10 bg-zinc-800 rounded-xl space-y-6">
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
              className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-sm text-zinc-400 outline-none"
              required
            >
              <option value="RG">{'RG'}</option>
              <option value="CNH">{'CNH'}</option>
              <option value="PASSPORT">{'PASSPORT'}</option>
            </select>
          </div>
        </section>
      )}

      {/* Passos 2 a 4: Upload de Documentos */}
      {step > 0 && step <= documentSteps.length && (
        <DocumentUploader
          onUpload={handleUpload}
          attachLabel={texts.attach}
          dragHint={documentStepsText[step - 1]}
          documentKey={documentSteps[step - 1]} // Passando o documentKey aqui
        />
      )}

      {/* Exibição dos Arquivos Carregados */}
      {/* <div className="mt-4">
        {files[step]?.map((file, index) => (
          <p key={file.name} className="text-sm text-zinc-400">
            {file.name}
          </p>
        ))}
      </div> */}

      {/* Botões de Navegação */}
      <section className="flex flex-row justify-between items-center rounded-xl">
        <div className="border border-gray-500 rounded-md py-2 flex justify-center font-light text-sm w-1/3">
          <p>{texts.support}</p>
        </div>
        <div className="flex flex-row space-x-1 items-center justify-center w-1/3 text-primary">
          <p>{`${texts.step} ${step} ${texts.from} ${totalSteps}`}</p>
        </div>
        <div className="flex flex-row items-center justify-end gap-4 w-1/3">
          {!isFirstStep && (
            <button
              onClick={onPrev}
              className="uppercase text-zinc-500 font-medium hover:text-zinc-300"
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

      {/* Texto de Conformidade */}
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
