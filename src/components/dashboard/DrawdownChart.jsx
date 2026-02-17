'use client'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

export default function DrawdownChart({ labels, drawdownData }) {
  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Drawdown',
        data: drawdownData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.12)',
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3,
        tension: 0.2,
        fill: true,
      },
    ],
  }), [labels, drawdownData])

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { family: 'Plus Jakarta Sans', size: 12 },
        bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => `Drawdown: ${(ctx.parsed.y * 100).toFixed(2)}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { family: 'Plus Jakarta Sans', size: 10 },
          color: '#9ca3af',
          maxTicksLimit: 10,
        },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.04)' },
        ticks: {
          font: { family: 'Plus Jakarta Sans', size: 10 },
          color: '#9ca3af',
          callback: (v) => (v * 100).toFixed(0) + '%',
        },
        max: 0,
      },
    },
  }), [])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Drawdown</h3>
      <div className="h-[240px]">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
