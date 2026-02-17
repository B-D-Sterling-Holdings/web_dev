'use client'
import { useState, useEffect, useCallback } from 'react'
import { pricesToReturns, computeWeights, portfolioReturns as computePortfolioReturns } from '@/lib/dataTransformers'

export default function useDashboardData() {
  const [positions, setPositions] = useState(null)
  const [lots, setLots] = useState(null)
  const [portfolioReturns, setPortfolioReturns] = useState(null)
  const [benchmarkReturns, setBenchmarkReturns] = useState(null)
  const [tickerReturns, setTickerReturns] = useState(null)
  const [dateLabels, setDateLabels] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [source, setSource] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Parallel fetch: portfolio, lots, benchmark
      const [portfolioRes, lotsRes, benchmarkRes] = await Promise.all([
        fetch('/api/ib/portfolio'),
        fetch('/api/ib/lots'),
        fetch('/api/ib/benchmark?days=252'),
      ])

      if (!portfolioRes.ok) throw new Error('Failed to fetch portfolio')
      if (!lotsRes.ok) throw new Error('Failed to fetch lots')
      if (!benchmarkRes.ok) throw new Error('Failed to fetch benchmark')

      const [portfolioData, lotsData, benchmarkData] = await Promise.all([
        portfolioRes.json(),
        lotsRes.json(),
        benchmarkRes.json(),
      ])

      setPositions(portfolioData.positions)
      setLots(lotsData.lots)
      setSource(portfolioData.source)

      // Compute benchmark returns from prices
      const benchPrices = benchmarkData.prices.map(p => p.close)
      const benchRet = pricesToReturns(benchPrices)
      setBenchmarkReturns(benchRet)

      // Extract date labels from benchmark prices (skip first since returns are n-1)
      const dates = benchmarkData.prices.slice(1).map(p => {
        const d = new Date(p.date)
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      })
      setDateLabels(dates)

      // Fetch historical prices for each ticker in parallel
      const tickers = portfolioData.positions.map(p => p.ticker)
      const historyResponses = await Promise.all(
        tickers.map(t => fetch(`/api/ib/history?ticker=${t}&days=253`))
      )
      const historyData = await Promise.all(
        historyResponses.map(r => r.json())
      )

      // Build ticker returns map
      const tickerRetMap = {}
      const minLen = Math.min(benchRet.length, ...historyData.map(h => h.prices.length - 1))

      for (let i = 0; i < tickers.length; i++) {
        const prices = historyData[i].prices.map(p => p.close)
        const returns = pricesToReturns(prices)
        // Align to same length as benchmark
        tickerRetMap[tickers[i]] = returns.slice(returns.length - minLen)
      }
      setTickerReturns(tickerRetMap)

      // Compute portfolio returns as weighted sum
      const weights = computeWeights(portfolioData.positions)
      const portRet = computePortfolioReturns(tickerRetMap, weights)
      setPortfolioReturns(portRet)

      // Trim benchmark and dates to match
      setBenchmarkReturns(benchRet.slice(benchRet.length - minLen))
      setDateLabels(dates.slice(dates.length - minLen))
    } catch (err) {
      console.error('Dashboard data fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    positions,
    lots,
    portfolioReturns,
    benchmarkReturns,
    tickerReturns,
    dateLabels,
    loading,
    error,
    source,
    refresh: fetchData,
  }
}
