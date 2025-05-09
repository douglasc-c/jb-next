'use client'

type IDataProps = {
  onClick?: () => void
  params: {
    title: React.ReactNode
    color: string
    text?: string
    width?: string
    icon?: React.ReactNode
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
  const { title, color, width, icon } = params

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`text-sm p-2 rounded-md text-white w-full items-center hover:bg-amber-500 justify-center ${color} ${disabled ? 'cursor-not-allowed' : ''} ${width || ''} flex gap-2`}
    >
      {icon}
      {title}
    </button>
  )
}
