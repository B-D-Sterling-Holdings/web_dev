'use client'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function MetricCard({ label, value, subtitle, trend, delay = 0 }) {
  const trendIcon = trend === 'up'
    ? <TrendingUp className="w-4 h-4 text-emerald-500" />
    : trend === 'down'
      ? <TrendingDown className="w-4 h-4 text-red-500" />
      : <Minus className="w-4 h-4 text-gray-400" />

  const trendColor = trend === 'up'
    ? 'text-emerald-600 bg-emerald-50'
    : trend === 'down'
      ? 'text-red-600 bg-red-50'
      : 'text-gray-500 bg-gray-50'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
    >
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-medium ${trendColor} mb-1`}>
            {trendIcon}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </motion.div>
  )
}
