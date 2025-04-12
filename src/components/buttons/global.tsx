'use client'

type IDataProps = {
  onClick?: () => void
  params: {
    title: React.ReactNode
    color: string
    text?: string
    width?: string
  }
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function ButtonGlobal({
  onClick,
  params,
  type = 'button',
  disabled = false,
}: IDataProps) {
  const { title, color, width } = params

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`text-sm p-2 rounded-md text-white w-full items-center hover:text-primary justify-center ${color} ${disabled ? 'cursor-not-allowed' : ''} ${width || ''}`}
    >
      {title}
    </button>
  )
}
