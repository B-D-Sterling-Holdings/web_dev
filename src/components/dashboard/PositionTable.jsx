'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { formatCurrency, formatPercent } from '@/lib/dataTransformers'

export default function PositionTable({ positions, showCostBasis = false }) {
  const [sortKey, setSortKey] = useState('marketValue')
  const [sortAsc, setSortAsc] = useState(false)

  const handleSort = (key) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(false) }
  }

  const sorted = [...positions].sort((a, b) => {
    const aVal = a[sortKey] ?? 0
    const bVal = b[sortKey] ?? 0
    return sortAsc ? aVal - bVal : bVal - aVal
  })

  const SortIcon = ({ column }) => {
    if (sortKey !== column) return <ChevronDown className="w-3 h-3 text-gray-300" />
    return sortAsc
      ? <ChevronUp className="w-3 h-3 text-emerald-500" />
      : <ChevronDown className="w-3 h-3 text-emerald-500" />
  }

  const totalValue = positions.reduce((sum, p) => sum + p.marketValue, 0)

  const columns = [
    { key: 'ticker', label: 'Ticker', align: 'left' },
    { key: 'sector', label: 'Sector', align: 'left' },
    { key: 'shares', label: 'Shares', align: 'right' },
    ...(showCostBasis ? [{ key: 'avgCost', label: 'Avg Cost', align: 'right' }] : []),
    { key: 'currentPrice', label: 'Price', align: 'right' },
    { key: 'marketValue', label: 'Mkt Value', align: 'right' },
    { key: 'weight', label: 'Weight', align: 'right' },
    { key: 'pnl', label: 'P&L', align: 'right' },
    { key: 'pnlPct', label: 'P&L %', align: 'right' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide cursor-pointer hover:text-gray-700 transition-colors ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <SortIcon column={col.key} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((pos, i) => {
              const pnl = (pos.currentPrice - pos.avgCost) * pos.shares
              const pnlPct = (pos.currentPrice - pos.avgCost) / pos.avgCost
              const weight = pos.marketValue / totalValue
              const pnlColor = pnl >= 0 ? 'text-emerald-600' : 'text-red-600'

              return (
                <tr
                  key={pos.ticker + i}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-3 font-semibold text-gray-900">{pos.ticker}</td>
                  <td className="px-4 py-3 text-gray-600">{pos.sector}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{pos.shares.toLocaleString()}</td>
                  {showCostBasis && (
                    <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(pos.avgCost, 2)}</td>
                  )}
                  <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(pos.currentPrice, 2)}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(pos.marketValue)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{formatPercent(weight)}</td>
                  <td className={`px-4 py-3 text-right font-medium ${pnlColor}`}>{formatCurrency(pnl)}</td>
                  <td className={`px-4 py-3 text-right font-medium ${pnlColor}`}>{formatPercent(pnlPct)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
