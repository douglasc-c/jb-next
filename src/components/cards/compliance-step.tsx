import ButtonGlobal from '@/components/buttons/global'
import { useLayoutContext } from '@/context/layout-context'

import { useUploadContext } from '@/context/upload-context'
import DocumentUploader from './document-uploader'

export default function ComplianceStep({
  documentType,
  issuingBody,
  buttonLabel,
  onNext,
  onPrev,
  isFirstStep,
  onFileUpload,
  step,
  totalSteps,
}: {
  documentType: string
  issuingBody: string
  buttonLabel: string
  onNext: () => void
  onPrev: () => void
  isFirstStep: boolean
  isLastStep: boolean
  onFileUpload: (newFiles: File[]) => void
  step: number
  totalSteps: number
}) {
  const { texts } = useLayoutContext()
  const { files, addFiles } = useUploadContext()

  const handleUpload = (newFiles: File[]) => {
    addFiles(step, newFiles)
    onFileUpload(newFiles)
    console.log('Arquivos carregados:', newFiles)
  }

  return (
    <div className="flex flex-col p-10 bg-zinc-800 rounded-xl space-y-6">
      <h1 className="text-xl font-semibold">{texts.verifyYourIdentity}</h1>
      <section className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-sm uppercase text-zinc-500">
            {texts.documentType}
          </span>
          <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-sm text-zinc-400">
            {documentType}
          </p>
        </div>
        <div className="space-y-2">
          <span className="text-sm uppercase text-zinc-500">
            {texts.idOfTheIssuingBody}
          </span>
          <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-sm text-zinc-400">
            {issuingBody}
          </p>
        </div>
      </section>

      <DocumentUploader
        onUpload={handleUpload}
        attachLabel={texts.attach}
        dragHint={texts.orDragYourDocumentHere}
      />

      <div className="mt-4">
        {files[step]?.map((file, index) => (
          <p key={index} className="text-sm text-zinc-400">
            {file.name}
          </p>
        ))}
      </div>

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
              title: buttonLabel,
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
