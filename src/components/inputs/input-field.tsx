import Image from 'next/image'
import { useState } from 'react'

interface InputOption {
  value: string
  label: string
}

interface InputFieldProps {
  label: string
  value: string | number | File[] | null
  type?: 'text' | 'number' | 'password' | 'select' | 'file' | 'date' | undefined
  isEditing: boolean
  showPass?: boolean
  options?: InputOption[]
  onChange: (value: string | number | File[] | null) => void
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  type = 'text',
  isEditing,
  onChange,
  showPass = false,
  options,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      onChange(Array.from(files))
    }
  }

  return (
    <div className="flex flex-col">
      <label className="text-zinc-500 mb-1 text-sm">{label}</label>
      {isEditing ? (
        type === 'select' && options ? (
          <select
            value={
              typeof value === 'string' || typeof value === 'number'
                ? value
                : ''
            }
            onChange={(e) => onChange(e.target.value)}
            className="px-4 py-2 rounded-md bg-zinc-900 border border-zinc-500 font-light text-zinc-400 focus:outline-none"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === 'file' ? (
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="px-4 py-2 rounded-md bg-zinc-900 border border-zinc-500 font-light text-zinc-400 focus:outline-none"
          />
        ) : (
          <div className="px-4 py-2 flex justify-between rounded-md bg-zinc-900 border border-zinc-500 font-light text-zinc-400">
            <input
              type={showPassword ? 'text' : type}
              value={
                typeof value === 'string' || typeof value === 'number'
                  ? value
                  : ''
              }
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
        )
      ) : (
        <p className="px-4 py-2 rounded-md bg-zinc-900 text-xs text-zinc-400">
          {value && Array.isArray(value)
            ? `${value.length} file(s)`
            : value || '-'}
        </p>
      )}
    </div>
  )
}
