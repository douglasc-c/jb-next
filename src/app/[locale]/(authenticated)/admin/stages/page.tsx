'use client'

// import { useLayoutAdminContext } from '@/context/layout-admin-context'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { Loading } from '@/components/loading/loading'
import Image from 'next/image'

interface Task {
  taskName: string
  phaseId: number
  id: number
  status: string
  createdAt: string
  updatedAt: string
}

interface Phase {
  id: number
  phaseName: string
  order: string
  description: string
  createdAt: string
  updatedAt: string
  tasks: Task[]
}

export default function Stages() {
  // const { texts } = useLayoutAdminContext()
  const [loading, setLoading] = useState(true)
  // const [isModalOpen, setIsModalOpen] = useState(false)
  const [phases, setPhases] = useState<Phase[]>([])

  useEffect(() => {
    const fetchPhases = async () => {
      try {
        const response = await api.get('/admin/phases')
        const fetchedPhases: Phase[] = response.data.phases
        setPhases(fetchedPhases)
        console.log(response.data.phases)
      } catch (err) {
        console.error('Erro ao buscar fases:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPhases()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-800">
        <Loading loading={loading} width={300} />
      </div>
    )
  }

  return (
    <main className="bg-zinc-800 h-[calc(91vh)] flex flex-col items-start p-6 space-y-4">
      <h1 className="text-2xl font-bold text-white">Fases do Empreendimento</h1>
      <section className="grid grid-cols-3 gap-4 w-full">
        {phases.map((phase) => (
          <div
            key={phase.id}
            className="p-4 bg-zinc-700 rounded-md shadow space-y-2"
          >
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-white">
                {phase.phaseName}
              </h2>
              <button>
                <Image
                  src="/images/svg/pencil.svg"
                  width={18}
                  height={18}
                  alt="Editar"
                />
              </button>
            </div>
            <p className="text-gray-400">{phase.description}</p>
            <ul className="space-y-1">
              {phase.tasks.map((task) => (
                <li
                  key={task.id}
                  className="text-gray-300 flex justify-between"
                >
                  <span>{task.taskName}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  )
}
