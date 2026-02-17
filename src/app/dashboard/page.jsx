'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Shield, Loader2, AlertCircle, Wifi } from 'lucide-react'
import Login from '@/components/login'
import DashboardTabs from '@/components/dashboard/DashboardTabs'
import SummaryTab from '@/components/dashboard/SummaryTab'
import LotsTab from '@/components/dashboard/LotsTab'
import RiskTab from '@/components/dashboard/RiskTab'
import FactorsTab from '@/components/dashboard/FactorsTab'
import SuggestionsTab from '@/components/dashboard/SuggestionsTab'
import useDashboardData from '@/hooks/useDashboardData'
import { filterByRange } from '@/lib/dataTransformers'

const DATE_RANGES = ['1M', '3M', '6M', '1Y', 'YTD']

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 h-24">
            <div className="h-3 w-20 bg-gray-100 rounded mb-3" />
            <div className="h-6 w-28 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 h-[360px]">
        <div className="h-3 w-32 bg-gray-100 rounded mb-4" />
        <div className="h-full bg-gray-50 rounded-xl" />
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 h-[300px]">
        <div className="h-full bg-gray-50 rounded-xl" />
      </div>
    </div>
  )
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
        <AlertCircle className="w-7 h-7 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load data</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">{message}</p>
      <button
        onClick={onRetry}
        className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('summary')
  const [dateRange, setDateRange] = useState('1Y')
  const [refreshing, setRefreshing] = useState(false)

  const {
    positions,
    lots,
    portfolioReturns,
    benchmarkReturns,
    tickerReturns,
    dateLabels,
    loading,
    error,
    source,
    refresh,
  } = useDashboardData()

  // Filter data by selected date range
  const filtered = useMemo(() => {
    if (!portfolioReturns || !benchmarkReturns || !dateLabels) return null

    const fPortfolio = filterByRange(portfolioReturns, dateRange)
    const fBenchmark = filterByRange(benchmarkReturns, dateRange)
    const fDates = filterByRange(dateLabels, dateRange)

    let fTicker = null
    if (tickerReturns) {
      fTicker = {}
      for (const [ticker, returns] of Object.entries(tickerReturns)) {
        fTicker[ticker] = filterByRange(returns, dateRange)
      }
    }

    return {
      portfolioReturns: fPortfolio,
      benchmarkReturns: fBenchmark,
      dateLabels: fDates,
      tickerReturns: fTicker,
    }
  }, [portfolioReturns, benchmarkReturns, tickerReturns, dateLabels, dateRange])

  const handleRefresh = async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-[#fafafa] text-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md px-6"
        >
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Risk Dashboard</h1>
                <p className="text-xs text-gray-500">B.D. Sterling Holdings</p>
              </div>
            </div>
            <Login onSuccess={() => setLoggedIn(true)} />
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-30 bg-[#fafafa]/80 backdrop-blur-md border-b border-gray-100"
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left: Title + Tabs */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 leading-tight">Risk Dashboard</h1>
                  <p className="text-xs text-gray-400">B.D. Sterling Holdings</p>
                </div>
              </div>
              <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Right: Source badge + Date Range + Refresh */}
            <div className="flex items-center gap-3">
              {source && (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                  source === 'ib'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  <Wifi className="w-3 h-3" />
                  {source === 'ib' ? 'Live' : 'Mock'}
                </span>
              )}
              <div className="bg-gray-100 p-1 rounded-xl inline-flex gap-0.5">
                {DATE_RANGES.map((range) => (
                  <button
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      dateRange === range
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all duration-200 disabled:opacity-50"
                title="Refresh data"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={handleRefresh} />
        ) : filtered && positions ? (
          <AnimatePresence mode="wait">
            {activeTab === 'summary' && (
              <SummaryTab
                key="summary"
                positions={positions}
                portfolioReturns={filtered.portfolioReturns}
                benchmarkReturns={filtered.benchmarkReturns}
                dateLabels={filtered.dateLabels}
              />
            )}
            {activeTab === 'lots' && (
              <LotsTab
                key="lots"
                lots={lots}
              />
            )}
            {activeTab === 'risk' && (
              <RiskTab
                key="risk"
                portfolioReturns={filtered.portfolioReturns}
                benchmarkReturns={filtered.benchmarkReturns}
                tickerReturns={filtered.tickerReturns}
                dateLabels={filtered.dateLabels}
              />
            )}
            {activeTab === 'factors' && (
              <FactorsTab
                key="factors"
                positions={positions}
              />
            )}
            {activeTab === 'suggestions' && (
              <SuggestionsTab
                key="suggestions"
                positions={positions}
                portfolioReturns={filtered.portfolioReturns}
                benchmarkReturns={filtered.benchmarkReturns}
                tickerReturns={filtered.tickerReturns}
              />
            )}
          </AnimatePresence>
        ) : null}
      </div>
    </main>
  )
}
