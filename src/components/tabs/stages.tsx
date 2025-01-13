import React, { useState, useEffect } from 'react'
import api from '@/lib/api'
import { useLayoutAdminContext } from '@/context/layout-admin-context'

interface Task {
  id: number
  taskName: string
  description: string
}

interface Phase {
  id: number
  phaseName: string
  description: string
  tasks: Task[]
}

interface SelectWithToggleProps {
  phaseId: number
  taskId: number
  ventureId: number
}

const SelectWithToggle: React.FC<SelectWithToggleProps> = ({
  phaseId,
  taskId,
  ventureId,
}) => {
  const { texts } = useLayoutAdminContext()
  const [phases, setPhases] = useState<Phase[]>([])
  const [selectedPhase, setSelectedPhase] = useState<number>(phaseId)
  const [selectedTask, setSelectedTask] = useState<number | undefined>(taskId)

  const [isToggled, setIsToggled] = useState<boolean>(false)

  useEffect(() => {
    const fetchPhases = async () => {
      try {
        const response = await api.get('/admin/phases')
        setPhases(response.data.phases)
      } catch (error) {
        console.error('Error fetching phases:', error)
      }
    }

    fetchPhases()
  }, [])

  const handlePhaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const phaseId = parseInt(e.target.value, 10)
    setSelectedPhase(phaseId)
    setSelectedTask(undefined)
    setIsToggled(false)
  }

  const handleTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const taskId = parseInt(e.target.value, 10)
    setSelectedTask(taskId)
    setIsToggled(false)
  }

  const toggleSwitch = async () => {
    const newToggleState = !isToggled
    setIsToggled(newToggleState)

    if (selectedPhase && selectedTask) {
      try {
        const response = await api.post('/admin/update-progress-task', {
          enterpriseId: ventureId,
          phaseId: selectedPhase,
          taskId: selectedTask,
          isCompleted: newToggleState,
        })

        console.log('Task progress updated successfully.', response)
      } catch (error) {
        console.error('Error updating task progress:', error)
      }
    } else {
      console.error('Phase and task must be selected to update progress.')
    }
  }

  const selectedPhaseTasks =
    phases.find((phase) => phase.id === selectedPhase)?.tasks || []

  return (
    <div className="space-y-4">
      <div>
        <select
          id="phase-select"
          value={selectedPhase}
          onChange={handlePhaseChange}
          className="px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-500"
        >
          <option value="">{texts.selectAStage}</option>
          {phases.map((phase) => (
            <option key={phase.id} value={phase.id}>
              {phase.phaseName} - {phase.description}
            </option>
          ))}
        </select>
      </div>

      {selectedPhase && (
        <div>
          <select
            id="task-select"
            value={selectedTask}
            onChange={handleTaskChange}
            className="px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-500"
          >
            <option value="">{texts.selectATaks}</option>
            {selectedPhaseTasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.taskName} - {task.description}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedTask && (
        <div className="flex items-center space-x-4">
          <span className="font-semibold">{texts.completPhase}</span>
          <button
            onClick={toggleSwitch}
            className={`w-12 h-6 rounded-full focus:outline-none ${
              isToggled ? 'bg-primary' : 'bg-secondary'
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full transition-transform ${
                isToggled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      )}
    </div>
  )
}

export default SelectWithToggle
