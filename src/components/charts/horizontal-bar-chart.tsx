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

interface HorizontalBarChartProps {
  data: {
    labels: string[]
    values: number[]
  }
}

export function HorizontalBarChart({ data }: HorizontalBarChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(199, 199, 199, 0.8)',
          'rgba(83, 102, 255, 0.8)',
          'rgba(40, 167, 69, 0.8)',
          'rgba(220, 53, 69, 0.8)',
          'rgba(23, 162, 184, 0.8)',
          'rgba(255, 193, 7, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(40, 167, 69, 1)',
          'rgba(220, 53, 69, 1)',
          'rgba(23, 162, 184, 1)',
          'rgba(255, 193, 7, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#e2e8f0',
          callback: (value) => {
            return value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#e2e8f0',
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
