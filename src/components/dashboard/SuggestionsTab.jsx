'use client'
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, TrendingDown, Layers, BarChart3, CheckCircle2, XCircle } from 'lucide-react'
import { computeAllMetrics } from '@/lib/riskCalculations'
import { returnsToCumulative, aggregateBySector, formatPercent, formatRatio } from '@/lib/dataTransformers'

function AlertCard({ icon: Icon, severity, title, description, metric, delay = 0 }) {
  const styles = {
    critical: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-500', badge: 'bg-red-100 text-red-700' },
    warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-500', badge: 'bg-amber-100 text-amber-700' },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-500', badge: 'bg-blue-100 text-blue-700' },
    ok: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-500', badge: 'bg-emerald-100 text-emerald-700' },
  }

  const s = styles[severity] || styles.info

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`${s.bg} ${s.border} border rounded-2xl p-4 flex gap-4`}
    >
      <div className={`shrink-0 mt-0.5 ${s.icon}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
          {metric && <span className={`${s.badge} text-xs font-medium px-2 py-0.5 rounded-md shrink-0`}>{metric}</span>}
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </motion.div>
  )
}

export default function SuggestionsTab({ positions, portfolioReturns, benchmarkReturns, tickerReturns }) {
  const cumReturns = useMemo(() => returnsToCumulative(portfolioReturns), [portfolioReturns])
  const metrics = useMemo(
    () => computeAllMetrics(portfolioReturns, benchmarkReturns, cumReturns),
    [portfolioReturns, benchmarkReturns, cumReturns]
  )
  const sectorData = useMemo(() => aggregateBySector(positions), [positions])
  const totalValue = positions.reduce((sum, p) => sum + p.marketValue, 0)

  const alerts = useMemo(() => {
    const items = []

    // Concentration checks
    const sortedByValue = [...positions].sort((a, b) => b.marketValue - a.marketValue)
    const top1Weight = sortedByValue[0]?.marketValue / totalValue || 0
    const top5Weight = sortedByValue.slice(0, 5).reduce((s, p) => s + p.marketValue, 0) / totalValue

    if (top1Weight > 0.25) {
      items.push({
        icon: AlertTriangle, severity: 'critical',
        title: `${sortedByValue[0].ticker} is over 25% of portfolio`,
        description: `Consider trimming position. Single-stock concentration of ${formatPercent(top1Weight)} introduces significant idiosyncratic risk.`,
        metric: formatPercent(top1Weight),
      })
    }

    if (top5Weight > 0.7) {
      items.push({
        icon: Layers, severity: 'warning',
        title: 'Top 5 holdings exceed 70%',
        description: `The 5 largest positions (${sortedByValue.slice(0, 5).map(p => p.ticker).join(', ')}) make up ${formatPercent(top5Weight)} of the portfolio. Consider diversifying.`,
        metric: formatPercent(top5Weight),
      })
    }

    // Sector concentration
    for (const [sector, data] of Object.entries(sectorData)) {
      if (data.weight > 0.35) {
        items.push({
          icon: BarChart3, severity: 'warning',
          title: `High ${sector} sector exposure`,
          description: `${sector} is ${formatPercent(data.weight)} of the portfolio. Sector-specific shocks could significantly impact returns.`,
          metric: formatPercent(data.weight),
        })
      }
    }

    // Risk metric checks
    if (metrics.var95 > 0.02) {
      items.push({
        icon: TrendingDown, severity: 'warning',
        title: 'Elevated daily VaR',
        description: `95% VaR of ${formatPercent(metrics.var95)} means the portfolio could lose more than this on 1 in 20 trading days.`,
        metric: formatPercent(metrics.var95),
      })
    }

    if (metrics.maxDrawdown > 0.20) {
      items.push({
        icon: TrendingDown, severity: 'critical',
        title: 'Deep maximum drawdown',
        description: `Max drawdown of ${formatPercent(metrics.maxDrawdown)} from peak. Consider implementing stop-loss or hedging strategies.`,
        metric: formatPercent(metrics.maxDrawdown),
      })
    }

    if (metrics.beta > 1.3) {
      items.push({
        icon: AlertTriangle, severity: 'warning',
        title: 'High market beta',
        description: `Portfolio beta of ${formatRatio(metrics.beta)} means significantly higher sensitivity to market moves. Consider adding low-beta positions.`,
        metric: formatRatio(metrics.beta),
      })
    }

    if (metrics.sharpe < 0.5 && portfolioReturns.length > 60) {
      items.push({
        icon: AlertTriangle, severity: 'warning',
        title: 'Low risk-adjusted returns',
        description: `Sharpe ratio of ${formatRatio(metrics.sharpe)} suggests insufficient compensation for risk taken. Review position sizing and strategy.`,
        metric: formatRatio(metrics.sharpe),
      })
    }

    // Correlation check across tickers
    if (tickerReturns) {
      const tickers = Object.keys(tickerReturns)
      for (let i = 0; i < tickers.length; i++) {
        for (let j = i + 1; j < tickers.length; j++) {
          const r1 = tickerReturns[tickers[i]]
          const r2 = tickerReturns[tickers[j]]
          if (r1 && r2 && r1.length === r2.length) {
            const n = r1.length
            const m1 = r1.reduce((s, v) => s + v, 0) / n
            const m2 = r2.reduce((s, v) => s + v, 0) / n
            let cov = 0, v1 = 0, v2 = 0
            for (let k = 0; k < n; k++) {
              cov += (r1[k] - m1) * (r2[k] - m2)
              v1 += (r1[k] - m1) ** 2
              v2 += (r2[k] - m2) ** 2
            }
            const corr = v1 > 0 && v2 > 0 ? cov / Math.sqrt(v1 * v2) : 0
            if (corr > 0.85) {
              items.push({
                icon: Layers, severity: 'info',
                title: `${tickers[i]} and ${tickers[j]} are highly correlated`,
                description: `Correlation of ${corr.toFixed(2)} means these positions provide limited diversification benefit. Consider replacing one.`,
                metric: corr.toFixed(2),
              })
            }
          }
        }
      }
    }

    // Positive signals
    if (metrics.sharpe >= 1.5) {
      items.push({
        icon: CheckCircle2, severity: 'ok',
        title: 'Strong risk-adjusted performance',
        description: `Sharpe ratio of ${formatRatio(metrics.sharpe)} indicates excellent risk-adjusted returns.`,
        metric: formatRatio(metrics.sharpe),
      })
    }

    if (metrics.alpha > 0.03) {
      items.push({
        icon: CheckCircle2, severity: 'ok',
        title: 'Positive alpha generation',
        description: `CAPM alpha of ${formatPercent(metrics.alpha)} shows the portfolio is generating excess returns over its benchmark.`,
        metric: formatPercent(metrics.alpha),
      })
    }

    if (items.filter(i => i.severity === 'critical' || i.severity === 'warning').length === 0) {
      items.push({
        icon: CheckCircle2, severity: 'ok',
        title: 'No critical alerts',
        description: 'All risk metrics are within acceptable ranges. Portfolio appears well-balanced.',
      })
    }

    return items
  }, [positions, metrics, sectorData, totalValue, tickerReturns, portfolioReturns])

  const criticalCount = alerts.filter(a => a.severity === 'critical').length
  const warningCount = alerts.filter(a => a.severity === 'warning').length
  const okCount = alerts.filter(a => a.severity === 'ok').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-2xl font-bold text-red-600">{criticalCount}</span>
          </div>
          <p className="text-xs text-gray-500">Critical</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-2xl font-bold text-amber-600">{warningCount}</span>
          </div>
          <p className="text-xs text-gray-500">Warnings</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-2xl font-bold text-emerald-600">{okCount}</span>
          </div>
          <p className="text-xs text-gray-500">Healthy</p>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <AlertCard key={i} {...alert} delay={i * 0.05} />
        ))}
      </div>
    </motion.div>
  )
}
