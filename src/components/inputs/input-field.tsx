'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface InputOption {
  value: string
  label: string
}

interface InputFieldProps {
  label: string
  value: string | number | File[] | null
  type?: 'text' | 'number' | 'password' | 'select' | 'file' | 'date'
  isEditing: boolean
  showPass?: boolean
  options?: InputOption[]
  formatCurrency?: boolean
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
  formatCurrency = false,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const [displayValue, setDisplayValue] = useState<string>('')

  useEffect(() => {
    if (
      formatCurrency &&
      (typeof value === 'number' ||
        (typeof value === 'string' && value.trim() !== ''))
    ) {
      const num = Number(value)
      if (!isNaN(num)) {
        setDisplayValue(
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }).format(num),
        )
        return
      }
    }
    setDisplayValue(value !== null ? String(value) : '')
  }, [value, formatCurrency])

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    const numericString = input.replace(/[^0-9.]/g, '')
    if (numericString === '') {
      setDisplayValue('')
      onChange('')
      return
    }
    const numericValue = parseFloat(numericString)
    if (!isNaN(numericValue)) {
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(numericValue)
      setDisplayValue(formatted)
      onChange(numericValue)
    } else {
      setDisplayValue('')
      onChange('')
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      onChange(Array.from(files))
    }
  }

  function isValidDate(dateString: string): boolean {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    if (!isoDateRegex.test(dateString)) {
      return false
    }
    const parsedDate = Date.parse(dateString)
    return !isNaN(parsedDate)
  }

  if (isEditing && type === 'number' && formatCurrency) {
    return (
      <div className="flex flex-col">
        <label className="text-zinc-500 mb-1 text-sm">{label}</label>
        <input
          type="text"
          value={displayValue}
          onChange={handleCurrencyChange}
          className="px-4 py-2 rounded-md bg-zinc-300 shadow border border-zinc-500 font-light focus:outline-none"
        />
      </div>
    )
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
            className="px-4 py-2 rounded-md bg-zinc-300 shadow border border-zinc-500 font-light focus:outline-none"
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
            className="px-4 py-2 rounded-md bg-zinc-300 shadow border border-zinc-500 font-light focus:outline-none"
          />
        ) : (
          <div className="px-4 py-2 flex justify-between rounded-md bg-zinc-300 border shadow border-zinc-500 font-light">
            <input
              type={showPassword ? 'text' : type}
              value={value !== null ? String(value) : ''}
              onChange={(e) => onChange(e.target.value)}
              className="bg-zinc-300 font-light w-full focus:outline-none"
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
        <p className="px-4 py-2 rounded-md bg-zinc-300 shadow text-xs border border-zinc-500 text-zinc-600">
          {value && Array.isArray(value)
            ? `${value.length} file(s)`
            : typeof value === 'string' && isValidDate(value)
              ? new Date(value).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : (typeof value === 'number' ||
                    (typeof value === 'string' &&
                      value.trim() !== '' &&
                      !isNaN(Number(value)))) &&
                  formatCurrency
                ? new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                  }).format(Number(value))
                : value || '-'}
        </p>
      )}
    </div>
  )
}

export default InputField
