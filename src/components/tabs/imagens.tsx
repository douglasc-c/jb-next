import React, { useState } from 'react'
import Image from 'next/image'

interface ImageItem {
  url: string
}

interface ImageGalleryProps {
  images: ImageItem[]
  isEditing?: boolean
  onSelect?: (image: string[]) => void
  isSelected: string[]
  addImages: (newFiles: File[]) => void
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  isEditing = false,
  onSelect,
  isSelected,
  addImages,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const openImage = (image: ImageItem) => {
    setSelectedImage(image.url)
  }

  const closeImage = () => {
    setSelectedImage(null)
  }

  const handleSelectImage = (image: string) => {
    const isImageSelected = isSelected.includes(image)

    if (isImageSelected) {
      const updatedSelection = isSelected.filter((img) => img !== image)
      onSelect?.(updatedSelection)
    } else {
      const updatedSelection = [...isSelected, image]
      onSelect?.(updatedSelection)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      addImages(fileArray)
    }
  }

  return (
    <div>
      <div className="flex flex-row max-w-40 max-h-40 space-x-4">
        {images?.length === 0 ? (
          <p className="text-red-500">Não há imagens disponíveis.</p>
        ) : (
          images?.map((img, index) => {
            const isImageSelected = isSelected.includes(img.url)

            return (
              <div key={index} className="relative w-full h-full">
                {isEditing && (
                  <div className="flex justify-end -mb-4 -mr-1 z-50">
                    <button
                      className={`${
                        isImageSelected ? 'bg-primary' : 'bg-secondary'
                      } flex rounded-full h-6 w-6 items-center justify-center z-50 hover:bg-primary`}
                      onClick={() => handleSelectImage(img.url)}
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
                <div className="relative w-24 h-24">
                  <Image
                    src={`http://localhost:3335${img.url}`}
                    alt={`Image ${index + 1}`}
                    fill
                    className="rounded-lg cursor-pointer"
                    onClick={() => openImage(img)}
                  />
                </div>
              </div>
            )
          })
        )}

        {isEditing && (
          <div className="flex bg-zinc-600 rounded-lg p-7 items-center justify-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v14M5 12h14"
                />
              </svg>
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
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
            <Image
              src={`http://localhost:3335${selectedImage}`}
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
