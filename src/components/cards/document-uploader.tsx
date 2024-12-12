import React from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface DocumentUploaderProps {
  onUpload: (files: File[]) => void
  attachLabel: string
  dragHint: string
}

export default function DocumentUploader({
  onUpload,
  attachLabel,
  dragHint,
}: DocumentUploaderProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onUpload,
    multiple: false,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.pdf'],
    },
  })

  return (
    <section
      {...getRootProps()}
      className="flex flex-row justify-center items-center py-24 bg-zinc-700 rounded-xl space-y-3 border-dashed border-2 border-gray-500 space-x-10 cursor-pointer hover:bg-zinc-600 transition"
    >
      <input {...getInputProps()} />
      <Image
        src="/images/svg/document.svg"
        width={40}
        height={40}
        alt="Document"
      />
      <div className="flex flex-row space-x-1">
        <span className="text-2xl font-medium underline text-zinc-500">
          {attachLabel}
        </span>
        <span className="text-2xl font-light text-zinc-500">{dragHint}</span>
      </div>
    </section>
  )
}
