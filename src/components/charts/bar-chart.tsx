'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  data: {
    labels: string[]
    values: number[]
  }
}

export function BarChart({ data }: BarChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Valor por Ano',
        data: data.values,
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw as number
            return value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: '#e2e8f0',
          callback: (value) => {
            return value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#e2e8f0',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  }

  return (
    <div className="h-[220px] w-full">
      <Bar data={chartData} options={options} />
    </div>
  )
}
