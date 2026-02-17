'use client'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import MetricCard from './MetricCard'
import DrawdownChart from './DrawdownChart'
import CorrelationHeatmap from './CorrelationHeatmap'
import { formatPercent, formatRatio, generateDateLabels, returnsToCumulative, drawdownSeries } from '@/lib/dataTransformers'
import { computeAllMetrics, correlationMatrix } from '@/lib/riskCalculations'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

function ReturnHistogram({ returns }) {
  const bins = useMemo(() => {
    if (!returns || returns.length === 0) return { labels: [], counts: [] }
    const min = Math.min(...returns)
    const max = Math.max(...returns)
    const numBins = 30
    const binWidth = (max - min) / numBins
    const labels = []
    const counts = Array(numBins).fill(0)
    for (let i = 0; i < numBins; i++) {
      labels.push(((min + (i + 0.5) * binWidth) * 100).toFixed(1) + '%')
    }
    for (const r of returns) {
      const idx = Math.min(Math.floor((r - min) / binWidth), numBins - 1)
      counts[idx]++
    }
    return { labels, counts }
  }, [returns])

  const data = {
    labels: bins.labels,
    datasets: [{
      label: 'Frequency',
      data: bins.counts,
      backgroundColor: 'rgba(99, 102, 241, 0.6)',
      borderColor: 'rgb(99, 102, 241)',
      borderWidth: 1,
      borderRadius: 2,
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { family: 'Plus Jakarta Sans', size: 12 },
        bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Plus Jakarta Sans', size: 9 }, color: '#9ca3af', maxTicksLimit: 8 },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.04)' },
        ticks: { font: { family: 'Plus Jakarta Sans', size: 10 }, color: '#9ca3af' },
      },
    },
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Return Distribution</h3>
      <div className="h-[240px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default function RiskTab({ portfolioReturns, benchmarkReturns, tickerReturns, dateLabels }) {
  const cumReturns = useMemo(() => returnsToCumulative(portfolioReturns), [portfolioReturns])
  const ddSeries = useMemo(() => drawdownSeries(cumReturns), [cumReturns])

  const metrics = useMemo(
    () => computeAllMetrics(portfolioReturns, benchmarkReturns, cumReturns),
    [portfolioReturns, benchmarkReturns, cumReturns]
  )

  const corrMatrix = useMemo(
    () => tickerReturns ? correlationMatrix(tickerReturns) : null,
    [tickerReturns]
  )

  const labels = useMemo(() => {
    if (dateLabels && dateLabels.length > 0) return dateLabels
    return generateDateLabels(ddSeries.length)
  }, [dateLabels, ddSeries.length])

  const sharpeQuality = metrics.sharpe >= 1.5 ? 'up' : metrics.sharpe >= 0.5 ? 'neutral' : 'down'
  const betaTrend = metrics.beta <= 1.0 ? 'up' : 'down'
  const alphaTrend = metrics.alpha > 0 ? 'up' : 'down'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Risk Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <MetricCard label="Sharpe Ratio" value={formatRatio(metrics.sharpe)} trend={sharpeQuality} subtitle="Risk-adjusted return" delay={0} />
        <MetricCard label="Sortino Ratio" value={formatRatio(metrics.sortino)} trend={metrics.sortino >= 1.5 ? 'up' : 'neutral'} subtitle="Downside-adjusted" delay={0.03} />
        <MetricCard label="Beta" value={formatRatio(metrics.beta)} trend={betaTrend} subtitle="Market sensitivity" delay={0.06} />
        <MetricCard label="Jensen's Alpha" value={formatPercent(metrics.jensensAlpha)} trend={alphaTrend} subtitle="Rp − [Rf + β(Rm−Rf)]" delay={0.09} />
        <MetricCard label="VaR (95%)" value={formatPercent(metrics.var95)} trend="down" subtitle="Daily value at risk" delay={0.12} />
        <MetricCard label="VaR (99%)" value={formatPercent(metrics.var99)} trend="down" subtitle="Tail risk" delay={0.15} />
        <MetricCard label="Max Drawdown" value={formatPercent(metrics.maxDrawdown)} trend="down" subtitle="Peak-to-trough" delay={0.18} />
        <MetricCard label="Treynor Ratio" value={formatRatio(metrics.treynor)} trend={metrics.treynor > 0 ? 'up' : 'down'} subtitle="Return per unit β" delay={0.21} />
        <MetricCard label="Info Ratio" value={formatRatio(metrics.informationRatio)} trend={metrics.informationRatio > 0 ? 'up' : 'down'} subtitle="Active return / TE" delay={0.24} />
        <MetricCard label="Annual Return" value={formatPercent(metrics.annualReturn)} trend={metrics.annualReturn > 0 ? 'up' : 'down'} delay={0.27} />
        <MetricCard label="Annual Vol" value={formatPercent(metrics.annualVol)} subtitle="Annualized σ" delay={0.30} />
        <MetricCard label="VaR Parametric" value={formatPercent(metrics.varParametric95)} trend="down" subtitle="95% normal dist" delay={0.33} />
      </div>

      {/* Drawdown + Histogram */}
      <div className="grid lg:grid-cols-2 gap-6">
        <DrawdownChart labels={labels} drawdownData={ddSeries} />
        <ReturnHistogram returns={portfolioReturns} />
      </div>

      {/* Correlation Matrix */}
      {corrMatrix && (
        <CorrelationHeatmap tickers={corrMatrix.tickers} matrix={corrMatrix.matrix} />
      )}
    </motion.div>
  )
}
