import React, { FC } from 'react'
import ButtonGlobal from '@/components/buttons/global'
import { useLayoutAdminContext } from '@/context/layout-admin-context'

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
  const { texts } = useLayoutAdminContext()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto p-4">
      <div className="bg-zinc-700 p-6 rounded-lg shadow-lg ">
        <h2 className="text-white text-center text-2xl mb-4">
          {texts.areYouSureYouWantToDeleteIt}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mt-4 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-600 text-white py-2 px-4 rounded-lg w-[90%]"
            >
              {texts.cancel}
            </button>
            <ButtonGlobal
              type="submit"
              params={{
                title: texts.delete,
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
