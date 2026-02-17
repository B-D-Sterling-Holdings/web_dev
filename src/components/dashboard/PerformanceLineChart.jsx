'use client'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function PerformanceLineChart({ labels, portfolioData, benchmarkData }) {
  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Portfolio',
        data: portfolioData,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.3,
        fill: true,
      },
      {
        label: 'S&P 500',
        data: benchmarkData,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.3,
        borderDash: [5, 3],
        fill: false,
      },
    ],
  }), [labels, portfolioData, benchmarkData])

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          font: { family: 'Plus Jakarta Sans', size: 12 },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { family: 'Plus Jakarta Sans', size: 12 },
        bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${(ctx.parsed.y * 100).toFixed(2)}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { family: 'Plus Jakarta Sans', size: 10 },
          color: '#9ca3af',
          maxTicksLimit: 12,
        },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.04)' },
        ticks: {
          font: { family: 'Plus Jakarta Sans', size: 10 },
          color: '#9ca3af',
          callback: (v) => (v * 100).toFixed(0) + '%',
        },
      },
    },
  }), [])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Cumulative Returns</h3>
      <div className="h-[320px]">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
