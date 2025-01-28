// src/components/modals/ModalCongratulations.tsx
'use client'

import Image from 'next/image'

interface ModalCongratulationsProps {
  isOpen: boolean
  onClose: () => void
}

export default function ModalCongratulations({
  isOpen,
  onClose,
}: ModalCongratulationsProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[350px] h-[350px] flex items-center justify-center rounded-lg shadow-lg overflow-hidden">
        <Image
          src="/images/bg/newbg.png"
          alt="Parabéns!"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0"
        />

        <div className="relative z-10 flex flex-col items-center text-white p-4 text-center">
          <p className="text-lg font-semibold">🎉 Parabéns! 🎉</p>
          <p className="text-sm">Seu cadastro foi realizado com sucesso!</p>

          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Fechar
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 text-white text-lg font-bold hover:text-gray-300"
          aria-label="Fechar Modal"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
