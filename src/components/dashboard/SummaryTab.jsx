'use client'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import MetricCard from './MetricCard'
import PositionTable from './PositionTable'
import PerformanceLineChart from './PerformanceLineChart'
import SectorPieChart from './SectorPieChart'
import { formatCurrency, formatPercent, generateDateLabels, returnsToCumulative, aggregateBySector } from '@/lib/dataTransformers'

export default function SummaryTab({ positions, portfolioReturns, benchmarkReturns, dateLabels }) {
  const totalValue = useMemo(() => positions.reduce((sum, p) => sum + p.marketValue, 0), [positions])
  const totalCost = useMemo(() => positions.reduce((sum, p) => sum + p.avgCost * p.shares, 0), [positions])
  const totalPnL = totalValue - totalCost
  const totalPnLPct = totalCost > 0 ? totalPnL / totalCost : 0

  const cumPortfolio = useMemo(() => returnsToCumulative(portfolioReturns), [portfolioReturns])
  const cumBenchmark = useMemo(() => returnsToCumulative(benchmarkReturns), [benchmarkReturns])

  const labels = useMemo(() => {
    if (dateLabels && dateLabels.length > 0) return dateLabels
    return generateDateLabels(cumPortfolio.length)
  }, [dateLabels, cumPortfolio.length])

  // Convert from growth (1.0-based) to return-based (0-based) for chart
  const portfolioChartData = cumPortfolio.map(v => v - 1)
  const benchmarkChartData = cumBenchmark.map(v => v - 1)

  const sectorData = useMemo(() => aggregateBySector(positions), [positions])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="NAV"
          value={formatCurrency(totalValue)}
          subtitle={`${positions.length} positions`}
          delay={0}
        />
        <MetricCard
          label="Total P&L"
          value={formatCurrency(totalPnL)}
          subtitle={formatPercent(totalPnLPct)}
          trend={totalPnL >= 0 ? 'up' : 'down'}
          delay={0.05}
        />
        <MetricCard
          label="YTD Return"
          value={formatPercent(portfolioChartData[portfolioChartData.length - 1] || 0)}
          trend={portfolioChartData[portfolioChartData.length - 1] >= 0 ? 'up' : 'down'}
          delay={0.1}
        />
        <MetricCard
          label="Benchmark"
          value={formatPercent(benchmarkChartData[benchmarkChartData.length - 1] || 0)}
          subtitle="S&P 500"
          trend={benchmarkChartData[benchmarkChartData.length - 1] >= 0 ? 'up' : 'down'}
          delay={0.15}
        />
      </div>

      {/* Performance Chart */}
      <PerformanceLineChart
        labels={labels}
        portfolioData={portfolioChartData}
        benchmarkData={benchmarkChartData}
      />

      {/* Holdings Table + Sector Pie */}
      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        <PositionTable positions={positions} showCostBasis />
        <SectorPieChart sectorData={sectorData} />
      </div>
    </motion.div>
  )
}
