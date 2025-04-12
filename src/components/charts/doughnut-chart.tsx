'use client'

import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DoughnutChartProps {
  data: {
    labels: string[]
    values: number[]
  }
}

export function DoughnutChart({ data }: DoughnutChartProps) {
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

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 9,
          },
          padding: 8,
          generateLabels: (chart) => {
            const datasets = chart.data.datasets
            const labels = chart.data.labels as string[]
            return labels.map((label, i) => {
              const backgroundColor = Array.isArray(datasets[0].backgroundColor)
                ? datasets[0].backgroundColor[i]
                : datasets[0].backgroundColor
              const borderColor = Array.isArray(datasets[0].borderColor)
                ? datasets[0].borderColor[i]
                : datasets[0].borderColor
              return {
                text: label,
                fillStyle: backgroundColor as string,
                strokeStyle: borderColor as string,
                lineWidth: 1,
                hidden: false,
                index: i,
                fontColor: '#e2e8f0',
              }
            })
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || ''
            const value = context.raw as number
            const total = (context.dataset.data as number[]).reduce(
              (a, b) => a + b,
              0,
            )
            const percentage = ((value / total) * 100).toFixed(2)
            return `${label}: ${value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })} (${percentage}%)`
          },
        },
      },
    },
    cutout: '70%',
  }

  return (
    <div className="h-[220px] w-full">
      <Doughnut data={chartData} options={options} />
    </div>
  )
}
