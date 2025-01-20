import Image from 'next/image'
import { useState } from 'react'

interface InputFieldProps {
  label: string
  value: string
  type?: string
  isEditing: boolean
  showPass?: boolean
  onChange: (value: string) => void
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  type,
  isEditing,
  onChange,
  showPass = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const formattedValue =
    type === 'date' && value
      ? new Date(value).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : value

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex flex-col text-sm">
      <label className="text-zinc-500 mb-1">{label}</label>
      {isEditing ? (
        <div className="px-4 py-2 flex justify-between rounded-md bg-zinc-900 border border-zinc-500 font-light text-zinc-400">
          <input
            type={showPassword ? 'text' : type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-zinc-900 font-light text-zinc-400 w-full focus:outline-none"
          />
          {showPass && (
            <Image
              src={
                showPassword
                  ? '/images/svg/eye.svg'
                  : '/images/svg/ocultEye.svg'
              }
              className="cursor-pointer ml-2"
              width={18}
              height={18}
              alt="Toggle Password Visibility"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      ) : (
        <p className="px-4 py-2 rounded-md bg-zinc-900 text-xs text-zinc-400">
          {formattedValue || '-'}
        </p>
      )}
    </div>
  )
}
