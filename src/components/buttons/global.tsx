'use client'

type IDataProps = {
  onClick?: () => void
  params: {
    title: React.ReactNode
    color: string
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
  const { title, color } = params

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`text-sm py-2 rounded-md w-full items-center justify-center ${color} ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      {title}
    </button>
  )
}
