import ButtonGlobal from '@/components/buttons/global'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

interface DeleteModalProps {
  isOpen: boolean
  handleSubmit: () => void
  onClose: () => void
}

const DeleteModal: FC<DeleteModalProps> = ({
  isOpen,
  handleSubmit,
  onClose,
}) => {
  const t = useTranslations('TextLang')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto p-4">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg ">
        <h2 className="text-center text-2xl mb-4 text-textPrimary">
          {t('areYouSureYouWantToDeleteIt')}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mt-4 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-600 text-white py-2 text-sm px-4 rounded-lg w-[90%]"
            >
              {t('cancel')}
            </button>
            <ButtonGlobal
              type="submit"
              params={{
                title: t('delete'),
                color: 'bg-red-600',
              }}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default DeleteModal
