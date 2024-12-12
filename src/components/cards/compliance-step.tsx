import ButtonGlobal from '@/components/buttons/global'
import { useLayoutContext } from '@/context/layout-context'
import Image from 'next/image'

export default function ComplianceStep({
  documentType,
  issuingBody,
  buttonLabel,
  onNext,
  onPrev,
  isFirstStep,
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
  step: number
  totalSteps: number
}) {
  const { textCompliance } = useLayoutContext()

  return (
    <div className="flex flex-col p-10 bg-zinc-800 rounded-xl space-y-10">
      <h1 className="text-xl font-semibold">
        {textCompliance.verifyYourIdentity}
      </h1>
      <section className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-sm uppercase text-zinc-500">
            {textCompliance.documentType}
          </span>
          <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-sm text-zinc-400">
            {documentType}
          </p>
        </div>
        <div className="space-y-2">
          <span className="text-sm uppercase text-zinc-500">
            {textCompliance.idOfTheIssuingBody}
          </span>
          <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-sm text-zinc-400">
            {issuingBody}
          </p>
        </div>
      </section>

      <section className="flex flex-row justify-center items-center py-24 bg-zinc-700 rounded-xl space-y-3 border-dashed border-2 border-gray-500 space-x-10">
        <Image
          src="/images/svg/document.svg"
          width={40}
          height={40}
          alt="Document"
        />
        <div className="flex flex-row space-x-1">
          <span className="text-2xl font-medium underline text-zinc-500">
            {textCompliance.attach}
          </span>
          <span className="text-2xl font-light text-zinc-500">
            {textCompliance.orDragYourDocumentHere}
          </span>
        </div>
      </section>

      <section className="flex flex-row justify-between items-center rounded-xl">
        <div className="border border-gray-500 rounded-md py-2 flex justify-center font-light text-sm w-1/3">
          <p>{textCompliance.support}</p>
        </div>
        <div className="flex flex-row space-x-1 items-center justify-center w-1/3 text-primary">
          <p>{`${textCompliance.step} ${step} ${textCompliance.from} ${totalSteps}`}</p>
        </div>
        <div className="flex flex-row items-center justify-end gap-4 w-1/3">
          {!isFirstStep && (
            <button
              onClick={onPrev}
              className="uppercase text-zinc-500 font-medium hover:text-zinc-300"
            >
              {textCompliance.previo}
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
          {textCompliance.at4HandsRealEstateInvestmentsWeNeedTo}{' '}
          <span className="text-primary font-medium underline">
            {textCompliance.lgptLaws}
          </span>
        </p>
      </div>
    </div>
  )
}
