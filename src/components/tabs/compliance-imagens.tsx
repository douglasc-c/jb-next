import React, { useState } from 'react'
import Image from 'next/image'

interface CompleanceImageProps {
  images: string[]
}

const CompleanceImage: React.FC<CompleanceImageProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const openImage = (image: string) => {
    setSelectedImage(image)
  }

  const closeImage = () => {
    setSelectedImage(null)
  }
  const isAllNull = images.every((image) => image === null)

  return (
    <div>
      <div className="flex flex-row space-x-4">
        {isAllNull ? (
          <p className="text-red-500">
            Nenhuma das imagens de compliance foi enviada.
          </p>
        ) : (
          images?.map((img, index) => (
            <div key={index} className="relative w-16 h-24">
              <Image
                src={`https://pictures-compliance.fra1.digitaloceanspaces.com${img}`}
                alt={`Image ${index + 1}`}
                fill
                className="rounded-lg cursor-pointer"
                onClick={() => openImage(img)}
              />
            </div>
          ))
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 p-4 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative max-w-[30rem] max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeImage}
              className="absolute top-2 right-2 bg-black hover:bg-black bg-opacity-45 rounded-md text-primary text-2xl font-bold"
            >
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
            <div className="flex justify-center items-center">
              <Image
                src={`https://pictures-compliance.fra1.digitaloceanspaces.com${selectedImage}`}
                alt="Selected Image"
                width={600}
                height={800}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompleanceImage
