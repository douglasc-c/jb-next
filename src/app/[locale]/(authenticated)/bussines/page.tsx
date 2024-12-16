'use client'

import { useLayoutContext } from '@/context/layout-context'
// import Image from 'next/image'

export default function Bussines() {
  const { textMyData } = useLayoutContext()

  // const data = {
  //   name: 'Joao',
  //   lastName: 'Anastacio',
  //   email: 'joao@gmail.com',
  //   documentNumber: '123.1234.123-12',
  //   dateOfBith: '01/01/1993',
  //   country: 'Brasil',
  //   address: 'Rua Joao Nastacio',
  //   city: 'Curitiba',
  //   password: '123456',
  //   confirmPassword: '123456',
  // }

  return (
    <main className="bg-zinc-800 h-[calc(90vh)] flex flex-col p-6 pr-36">
      <div className="flex flex-col p-4 bg-zinc-700 rounded-xl space-y-3">
        <h1 className="uppercase font-medium">{textMyData.myData}</h1>
        <div className="flex flex-col p-10 bg-zinc-800 rounded-xl space-y-10">
          
        </div>
      </div>
    </main>
  )
}
