import React from 'react'
import Image from 'next/image'

interface ImageItem {
  imageUrl: string
}

interface ImageGalleryProps {
  images: ImageItem[]
  isEditing?: boolean
  onSelect?: (image: ImageItem) => void
  isSelected: ImageItem[] // Passa as imagens selecionadas
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  isEditing = false,
  onSelect,
  isSelected,
}) => {
  return (
    <div className="flex flex-row max-w-40 max-h-40 space-x-4">
      {images?.map((img, index) => {
        const isImageSelected = isSelected.some(
          (selectedImg) => selectedImg === img,
        )

        return (
          <div key={index} className="relative w-full h-full">
            {isEditing && (
              <div className="flex justify-end -mb-4 -mr-1 z-50">
                <button
                  className={`${
                    isImageSelected ? 'bg-primary' : 'bg-secondary'
                  } flex rounded-full h-6 w-6 items-center justify-center z-50 hover:bg-primary`}
                  onClick={() => onSelect?.(img)}
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
              src={`http://localhost:3335${img}`}
              alt={`Image ${index + 1}`}
              width={160}
              height={160}
              className="rounded-lg"
            />
          </div>
        )
      })}
    </div>
  )
}

export default ImageGallery
