'use client'
import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

export default function FactorBarChart({ factors }) {
  const labels = Object.keys(factors)
  const values = Object.values(factors)

  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Factor Exposure',
        data: values,
        backgroundColor: values.map(v =>
          v >= 0 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)'
        ),
        borderColor: values.map(v =>
          v >= 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'
        ),
        borderWidth: 1,
        borderRadius: 6,
        barPercentage: 0.6,
      },
    ],
  }), [labels, values])

  const options = useMemo(() => ({
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { family: 'Plus Jakarta Sans', size: 12 },
        bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => `Exposure: ${ctx.parsed.x.toFixed(3)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(0,0,0,0.04)' },
        ticks: {
          font: { family: 'Plus Jakarta Sans', size: 10 },
          color: '#9ca3af',
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          font: { family: 'Plus Jakarta Sans', size: 12, weight: '500' },
          color: '#374151',
        },
      },
    },
  }), [])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Factor Exposures</h3>
      <div className="h-[240px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}
