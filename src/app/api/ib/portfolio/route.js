import { NextResponse } from 'next/server'
import { fetchFlexReport } from '../_lib/flexQuery'
import { SECTOR_MAP } from '@/lib/constants'

export async function GET() {
  const flexToken = process.env.IB_FLEX_TOKEN
  const flexQueryId = process.env.IB_FLEX_QUERY_ID

  if (flexToken && flexQueryId) {
    try {
      const report = await fetchFlexReport(flexToken, flexQueryId)
      const openPositions = report?.FlexStatements?.FlexStatement?.OpenPositions?.OpenPosition

      if (openPositions) {
        const posArray = Array.isArray(openPositions) ? openPositions : [openPositions]
        const positions = posArray
          .filter(p => parseFloat(p?.['@_position'] || 0) !== 0)
          .map(p => {
            const ticker = (p['@_symbol'] || '').replace(/\s+/g, '')
            const shares = Math.abs(parseFloat(p['@_position'] || 0))
            const costBasis = parseFloat(p['@_costBasisPrice'] || 0)
            const currentPrice = parseFloat(p['@_markPrice'] || p['@_closePrice'] || 0)
            const marketValue = parseFloat(p['@_positionValue'] || shares * currentPrice)
            return {
              ticker,
              shares,
              avgCost: costBasis,
              currentPrice,
              marketValue: Math.abs(marketValue),
              sector: SECTOR_MAP[ticker] || 'Other',
              currency: p['@_currency'] || 'USD',
              assetClass: p['@_assetCategory'] || 'STK',
            }
          })

        const nav = positions.reduce((sum, p) => sum + p.marketValue, 0)
        return NextResponse.json({ positions, nav, source: 'ib' })
      }
    } catch (err) {
      console.error('IB Flex Query error:', err.message)
    }
  }

  // Fallback to mock
  const { MOCK_POSITIONS } = await import('@/lib/constants')
  const nav = MOCK_POSITIONS.reduce((sum, p) => sum + p.marketValue, 0)
  return NextResponse.json({ positions: MOCK_POSITIONS, nav, source: 'mock' })
}
