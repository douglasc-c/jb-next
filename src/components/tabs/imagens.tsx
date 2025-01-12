import React, { useState } from 'react'
import Image from 'next/image'

interface Image {
  imageUrl: string
}

interface ImageGalleryProps {
  images: string[] // Imagens são URLs de tipo string[]
  isEditing?: boolean
  onSelect?: (image: Image) => void // onSelect agora aceita um objeto do tipo Image
  isSelected: Image[] // isSelected é um array de objetos Image
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  isEditing = false,
  onSelect,
  isSelected,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const openImage = (image: string) => {
    setSelectedImage(image)
  }

  const closeImage = () => {
    setSelectedImage(null)
  }

  return (
    <div>
      <div className="flex flex-row max-w-40 max-h-40 space-x-4">
        {images?.map((img, index) => {
          const isImageSelected = isSelected.some(
            (selectedImg) => selectedImg.imageUrl === img,
          )

          return (
            <div key={index} className="relative w-full h-full">
              {isEditing && (
                <div className="flex justify-end -mb-4 -mr-1 z-50">
                  <button
                    className={`${
                      isImageSelected ? 'bg-primary' : 'bg-secondary'
                    } flex rounded-full h-6 w-6 items-center justify-center z-50 hover:bg-primary`}
                    onClick={() => onSelect?.({ imageUrl: img })} // Passando o objeto Image
                  >
                    <Image
                      src="/images/svg/trash.svg"
                      alt="Remove"
                      height={15}
                      width={15}
                    />
                  </button>
                </div>
              )}
              <Image
                src={`http://localhost:3335${img}`} // img já é uma URL
                alt={`Image ${index + 1}`}
                width={100}
                height={160}
                className="rounded-lg cursor-pointer"
                onClick={() => openImage(img)} // Passando a URL
              />
            </div>
          )
        })}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative">
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
            <Image
              src={`http://localhost:3335${selectedImage}`} // selectedImage já é uma URL
              alt="Selected Image"
              width={600}
              height={800}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
