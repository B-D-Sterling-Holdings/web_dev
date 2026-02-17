'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'
import MetricCard from './MetricCard'
import { formatCurrency, formatPercent } from '@/lib/dataTransformers'

export default function LotsTab({ lots }) {
  const [sortKey, setSortKey] = useState('unrealizedPnL')
  const [sortAsc, setSortAsc] = useState(false)

  const enrichedLots = lots.map(lot => {
    const unrealizedPnL = (lot.currentPrice - lot.costBasis) * lot.shares
    const unrealizedPnLPct = (lot.currentPrice - lot.costBasis) / lot.costBasis
    const marketValue = lot.currentPrice * lot.shares
    const costTotal = lot.costBasis * lot.shares
    return { ...lot, unrealizedPnL, unrealizedPnLPct, marketValue, costTotal }
  })

  const totalUnrealized = enrichedLots.reduce((sum, l) => sum + l.unrealizedPnL, 0)
  const totalCost = enrichedLots.reduce((sum, l) => sum + l.costTotal, 0)
  const totalValue = enrichedLots.reduce((sum, l) => sum + l.marketValue, 0)
  const longTermGains = enrichedLots.filter(l => l.term === 'Long').reduce((sum, l) => sum + Math.max(0, l.unrealizedPnL), 0)
  const shortTermGains = enrichedLots.filter(l => l.term === 'Short').reduce((sum, l) => sum + Math.max(0, l.unrealizedPnL), 0)
  const unrealizedLosses = enrichedLots.reduce((sum, l) => sum + Math.min(0, l.unrealizedPnL), 0)

  const handleSort = (key) => {
    if (sortKey === key) setSortAsc(!sortAsc)
    else { setSortKey(key); setSortAsc(false) }
  }

  const sorted = [...enrichedLots].sort((a, b) => {
    const aVal = a[sortKey] ?? ''
    const bVal = b[sortKey] ?? ''
    if (typeof aVal === 'string') return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    return sortAsc ? aVal - bVal : bVal - aVal
  })

  const SortIcon = ({ column }) => {
    if (sortKey !== column) return <ChevronDown className="w-3 h-3 text-gray-300" />
    return sortAsc ? <ChevronUp className="w-3 h-3 text-emerald-500" /> : <ChevronDown className="w-3 h-3 text-emerald-500" />
  }

  const columns = [
    { key: 'ticker', label: 'Ticker', align: 'left' },
    { key: 'shares', label: 'Shares', align: 'right' },
    { key: 'costBasis', label: 'Cost Basis', align: 'right' },
    { key: 'currentPrice', label: 'Price', align: 'right' },
    { key: 'costTotal', label: 'Total Cost', align: 'right' },
    { key: 'marketValue', label: 'Mkt Value', align: 'right' },
    { key: 'unrealizedPnL', label: 'Unrealized P&L', align: 'right' },
    { key: 'unrealizedPnLPct', label: 'P&L %', align: 'right' },
    { key: 'datePurchased', label: 'Purchased', align: 'left' },
    { key: 'term', label: 'Term', align: 'center' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total Unrealized P&L"
          value={formatCurrency(totalUnrealized)}
          subtitle={formatPercent(totalCost > 0 ? totalUnrealized / totalCost : 0)}
          trend={totalUnrealized >= 0 ? 'up' : 'down'}
          delay={0}
        />
        <MetricCard
          label="Long-Term Gains"
          value={formatCurrency(longTermGains)}
          subtitle="Held >1 year"
          trend="up"
          delay={0.05}
        />
        <MetricCard
          label="Short-Term Gains"
          value={formatCurrency(shortTermGains)}
          subtitle="Held <1 year"
          trend="up"
          delay={0.1}
        />
        <MetricCard
          label="Unrealized Losses"
          value={formatCurrency(unrealizedLosses)}
          subtitle={`${enrichedLots.filter(l => l.unrealizedPnL < 0).length} lots`}
          trend="down"
          delay={0.15}
        />
      </div>

      {/* Tax Lot Table */}
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
                    className={`px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wide cursor-pointer hover:text-gray-700 transition-colors ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
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
              {sorted.map((lot, i) => {
                const pnlColor = lot.unrealizedPnL >= 0 ? 'text-emerald-600' : 'text-red-600'
                return (
                  <tr key={`${lot.ticker}-${lot.datePurchased}-${i}`} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-900">{lot.ticker}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{lot.shares.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(lot.costBasis, 2)}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(lot.currentPrice, 2)}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{formatCurrency(lot.costTotal)}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(lot.marketValue)}</td>
                    <td className={`px-4 py-3 text-right font-medium ${pnlColor}`}>{formatCurrency(lot.unrealizedPnL)}</td>
                    <td className={`px-4 py-3 text-right font-medium ${pnlColor}`}>{formatPercent(lot.unrealizedPnLPct)}</td>
                    <td className="px-4 py-3 text-gray-600">{lot.datePurchased}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${lot.term === 'Long' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {lot.term}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
