'use client'

import { useLayoutContext } from '@/context/layout-context'
import Image from 'next/image'
import { useState } from 'react'

export default function MyData() {
  const { textMyData } = useLayoutContext()
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const data = {
    name: 'Joao',
    lastName: 'Anastacio',
    email: 'joao@gmail.com',
    documentNumber: '123.1234.123-12',
    dateOfBith: '01/01/1993',
    country: 'Brasil',
    address: 'Rua Joao Nastacio',
    city: 'Curitiba',
    password: '123456',
    confirmPassword: '123456',
  }

  return (
    <main className="bg-zinc-800 h-[calc(90vh)] flex flex-col p-6 pr-36">
      <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3">
        <h1 className="uppercase font-medium">{textMyData.myData}</h1>
        <div className="flex flex-col p-10 bg-zinc-800 rounded-xl space-y-10">
          <div className="flex flex-row">
            <section className="flex justify-center items-start w-1/5">
              <Image
                src="/images/svg/avatar.svg"
                width={110}
                height={110}
                alt="Avatar"
              />
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center mt-20 mr-12 -ml-8">
                <Image
                  src="/images/svg/pencil.svg"
                  width={18}
                  height={18}
                  alt="Pencil"
                />
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4 w-4/5">
              <div className="space-y-2">
                <span className="text-xs uppercase text-zinc-500">
                  {textMyData.name}
                </span>
                <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-xs text-zinc-400">
                  {data.name}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase text-zinc-500">
                  {textMyData.lastName}
                </span>
                <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-xs text-zinc-400">
                  {data.lastName}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase text-zinc-500">
                  {textMyData.email}
                </span>
                <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-xs text-zinc-400">
                  {data.email}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase text-zinc-500">
                  {textMyData.documentNumber}
                </span>
                <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-xs text-zinc-400">
                  {data.documentNumber}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase text-zinc-500">
                  {textMyData.dateOfBith}
                </span>
                <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-xs text-zinc-400">
                  {data.dateOfBith}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase text-zinc-500">
                  {textMyData.country}
                </span>
                <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-xs text-zinc-400">
                  {data.country}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase text-zinc-500">
                  {textMyData.address}
                </span>
                <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-xs text-zinc-400">
                  {data.address}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase text-zinc-500">
                  {textMyData.city}
                </span>
                <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-xs text-zinc-400">
                  {data.city}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase text-zinc-500">
                  {textMyData.password}
                </span>
                <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-xs justify-between text-zinc-400">
                  {showPassword ? data.password : '••••••••'}
                  <Image
                    src={
                      showPassword
                        ? '/images/svg/eye.svg'
                        : '/images/svg/ocultEye.svg'
                    }
                    className="cursor-pointer"
                    width={18}
                    height={18}
                    alt="Toggle Password Visibility"
                    onClick={togglePasswordVisibility}
                  />
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase text-zinc-500">
                  {textMyData.confirmPassword}
                </span>
                <p className="border border-gray-500 rounded-md px-4 py-2 flex w-full bg-zinc-700 font-light text-xs justify-between text-zinc-400">
                  {showPassword ? data.confirmPassword : '••••••••'}
                  <Image
                    src={
                      showPassword
                        ? '/images/svg/eye.svg'
                        : '/images/svg/ocultEye.svg'
                    }
                    className="cursor-pointer"
                    width={18}
                    height={18}
                    alt="Toggle Confirm Password Visibility"
                    onClick={togglePasswordVisibility}
                  />
                </p>
              </div>
            </section>
          </div>
          <span className="border-[0.5px] border-zinc-500" />
          <div className="flex flex-row space-x-2 justify-center">
            <Image
              src="/images/svg/warning.svg"
              width={20}
              height={20}
              alt="Pencil"
            />
            <div className="flex flex-col text-center text-zinc-400">
              <p className="flex w-full font-light text-xs text-center">
                {textMyData.at4HandsRealEstateInvestments}
              </p>
              <div className="flex w-full font-light text-xs text-center space-x-1">
                <p>{textMyData.tochangeInformationPleaseContactOur}</p>
                <span className="text-primary font-medium underline">
                  {textMyData.technicalSupport}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
