import { NextResponse } from 'next/server'
import { fetchFlexReport } from '../_lib/flexQuery'

export async function GET() {
  const flexToken = process.env.IB_FLEX_TOKEN
  const flexQueryId = process.env.IB_FLEX_QUERY_ID

  if (flexToken && flexQueryId) {
    try {
      const report = await fetchFlexReport(flexToken, flexQueryId)
      const trades = report?.FlexStatements?.FlexStatement?.Trades?.Trade
      const openPos = report?.FlexStatements?.FlexStatement?.OpenPositions?.OpenPosition

      // Build lots from open positions (which have cost basis info)
      if (openPos) {
        const posArray = Array.isArray(openPos) ? openPos : [openPos]
        const lots = posArray
          .filter(p => parseFloat(p?.['@_position'] || 0) !== 0)
          .map(p => {
            const ticker = (p['@_symbol'] || '').replace(/\s+/g, '')
            const shares = Math.abs(parseFloat(p['@_position'] || 0))
            const costBasis = parseFloat(p['@_costBasisPrice'] || 0)
            const currentPrice = parseFloat(p['@_markPrice'] || p['@_closePrice'] || 0)
            const openDate = p['@_openDateTime'] || p['@_reportDate'] || ''
            const datePurchased = openDate.split(';')[0] || openDate.split(',')[0] || openDate

            // Determine term based on purchase date
            let term = 'Short'
            if (datePurchased) {
              const purchased = new Date(datePurchased)
              const now = new Date()
              const diffMs = now - purchased
              const diffDays = diffMs / (1000 * 60 * 60 * 24)
              if (diffDays > 365) term = 'Long'
            }

            return { ticker, shares, costBasis, currentPrice, datePurchased, term }
          })

        return NextResponse.json({ lots, source: 'ib' })
      }
    } catch (err) {
      console.error('IB Flex lots error:', err.message)
    }
  }

  // Fallback to mock
  const { MOCK_LOTS } = await import('@/lib/constants')
  return NextResponse.json({ lots: MOCK_LOTS, source: 'mock' })
}
