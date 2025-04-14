import React from 'react'
import { BarLoader } from 'react-spinners'

interface LoadingProps {
  loading: boolean
  color?: string
  width?: number
}

export const Loading: React.FC<LoadingProps> = ({
  loading,
  color = '#e79204',
  width = 100,
}) => {
  if (!loading) return null

  return (
    <div className="flex items-center justify-center h-full w-full">
      <BarLoader
        color={color}
        loading={loading}
        width={width}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
