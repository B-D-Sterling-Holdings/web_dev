'use client'
import { useState, useEffect } from 'react'
import FundVsSP500Chart from '@/components/FundVsSP500Chart'


export default function SheetTable() {
  const [sheet, setSheet] = useState({ header: [], data: [] })
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/sheet')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(obj => setSheet(obj))
      .catch(err => {
        console.error('Fetch /api/sheet failed:', err)
        setError(err.message)
      })
  }, [])

  const { header, data } = sheet

  if (error) return <p className="text-red-600">Error: {error}</p>
  if (!header.length) return <p>Loading…</p>

  return (
    <div className="flex flex-col items-center space-y-4">
      
      {/* Text above */}
      <p className="text-base font-medium text-center">
        We are committed to full transparency with our investors. Below is a live snapshot of individual investor performance, tracking total returns, fund outperformance, and benchmark comparisons.<br />
        This data helps our investors stay informed and confident in their partnership with us.
      </p>

      <div className="overflow-x-auto bg-white rounded-xl shadow-xl p-6 border border-gray-200">
        <table className="table-auto border-collapse w-full text-lg">
          <thead>
            <tr>
              {header.map((col, i) => (
                <th
                  key={i}
                  className="border border-gray-300 px-4 py-3 text-center bg-gray-100 font-semibold"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {data.map((cell, i) => {
                const isGreen = i >= 4 && i <= 6
                const isBoldF3 = i === 4
                const cellClass =
                  `border border-gray-300 px-4 py-3 text-center text-sm ` +
                  (isGreen ? (isBoldF3 ? 'bg-green-400 ' : 'bg-green-200 ') : '') +
                  (isBoldF3 ? 'font-bold ' : '')
                return (
                  <td key={i} className={cellClass}>
                    {cell}
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm font-medium">Performance data is updated at the end of the trading day.</p>
      <div className="w-full">
        <p className="text-lg font-medium text-left">Fund Strategy Snapshot</p>
      </div>
      <p className="text-base font-medium">Our fund invests in long-term quality companies when they're undervalued relative to their projected growth potential. When we see a great company sell off due to short-term market risks, we capitalize immediately and generate alpha by acquiring high-conviction positions at discounted valuations. As the market corrects its pricing over time, our disciplined approach allows us to realize outsized returns while minimizing unnecessary risk. We focus on strong fundamentals, attractive valuation, and durable competitive advantages, allowing the portfolio to compound steadily while opportunistically taking advantage of temporary dislocations.</p>
      {/* Chart Section */}
      <p className="text-lg font-medium">B.D. Sterling Fund Performance</p>
      <FundVsSP500Chart />
      {/* Text below */}
    </div>
  )
}
