'use client'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import MetricCard from './MetricCard'
import FactorBarChart from './FactorBarChart'
import SectorPieChart from './SectorPieChart'
import { formatPercent, formatRatio, aggregateBySector } from '@/lib/dataTransformers'
import { estimateFactorExposures } from '@/lib/riskCalculations'
import { SECTOR_COLORS } from '@/lib/constants'

export default function FactorsTab({ positions }) {
  const factors = useMemo(() => estimateFactorExposures(positions), [positions])
  const sectorData = useMemo(() => aggregateBySector(positions), [positions])
  const totalValue = positions.reduce((sum, p) => sum + p.marketValue, 0)

  // Concentration metrics
  const sortedByValue = [...positions].sort((a, b) => b.marketValue - a.marketValue)
  const top5Weight = sortedByValue.slice(0, 5).reduce((sum, p) => sum + p.marketValue, 0) / totalValue
  const hhi = positions.reduce((sum, p) => sum + (p.marketValue / totalValue) ** 2, 0)
  const effectiveN = hhi > 0 ? 1 / hhi : 0

  // Sector concentration
  const sectorWeights = Object.values(sectorData).map(s => s.weight)
  const maxSectorWeight = Math.max(...sectorWeights)
  const maxSector = Object.entries(sectorData).find(([, s]) => s.weight === maxSectorWeight)?.[0] || ''

  // Sector attribution table data
  const sectorTable = Object.entries(sectorData).map(([sector, data]) => ({
    sector,
    weight: data.weight,
    value: data.value,
    tickers: data.tickers.join(', '),
    color: SECTOR_COLORS[sector] || '#94a3b8',
  })).sort((a, b) => b.weight - a.weight)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Concentration Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Top 5 Concentration"
          value={formatPercent(top5Weight)}
          subtitle={sortedByValue.slice(0, 5).map(p => p.ticker).join(', ')}
          trend={top5Weight > 0.6 ? 'down' : 'up'}
          delay={0}
        />
        <MetricCard
          label="Effective # Positions"
          value={formatRatio(effectiveN, 1)}
          subtitle={`of ${positions.length} holdings`}
          delay={0.05}
        />
        <MetricCard
          label="Largest Sector"
          value={maxSector}
          subtitle={formatPercent(maxSectorWeight)}
          trend={maxSectorWeight > 0.35 ? 'down' : 'neutral'}
          delay={0.1}
        />
        <MetricCard
          label="HHI"
          value={formatRatio(hhi, 4)}
          subtitle={hhi > 0.15 ? 'Concentrated' : 'Diversified'}
          trend={hhi > 0.15 ? 'down' : 'up'}
          delay={0.15}
        />
      </div>

      {/* Factor Exposures + Sector Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        <FactorBarChart factors={factors} />
        <SectorPieChart sectorData={sectorData} />
      </div>

      {/* Sector Attribution Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Sector Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Sector</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">Weight</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">Value</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Holdings</th>
              </tr>
            </thead>
            <tbody>
              {sectorTable.map((row, i) => (
                <tr key={row.sector} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: row.color }} />
                      <span className="font-medium text-gray-900">{row.sector}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${row.weight * 100}%`, backgroundColor: row.color }} />
                      </div>
                      <span className="text-gray-700 font-medium">{formatPercent(row.weight)}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right text-gray-700">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(row.value)}
                  </td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{row.tickers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
