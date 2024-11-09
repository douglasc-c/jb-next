'use client'

import React from 'react'

interface InputProps {
  id: string
  name: string
  type: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  id,
  name,
  type,
  placeholder,
  autoComplete = '',
  required = false,
  className = '',
  value = '',
  onChange = () => {},
}: InputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      className={`w-full px-3 py-2 border border-gray-700 placeholder-gray-500 bg-transparent text-gray-500 focus:outline-none focus:z-10 sm:text-sm ${className}`}
      value={value}
      onChange={onChange}
    />
  )
}
