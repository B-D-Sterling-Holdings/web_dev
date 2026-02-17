import { NextResponse } from 'next/server'
import { fetchYahooHistory } from '../_lib/yahooFinance'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const ticker = searchParams.get('ticker') || 'AAPL'
  const days = parseInt(searchParams.get('days') || '252', 10)

  // Map days to Yahoo Finance range param
  let range = '1y'
  if (days <= 30) range = '1mo'
  else if (days <= 90) range = '3mo'
  else if (days <= 180) range = '6mo'
  else if (days <= 365) range = '1y'
  else range = '2y'

  try {
    const { dates, prices } = await fetchYahooHistory(ticker, range, '1d')
    const priceData = dates.map((date, i) => ({ date, close: prices[i] }))

    return NextResponse.json({ ticker, prices: priceData, source: 'yahoo' })
  } catch (err) {
    console.error(`Yahoo Finance error for ${ticker}:`, err.message)

    // Fallback: generate mock data
    const priceData = []
    let price = 100 + Math.random() * 200
    const today = new Date()
    const current = new Date(today)
    current.setDate(current.getDate() - Math.ceil(days * 1.45))

    while (priceData.length < days) {
      const day = current.getDay()
      if (day !== 0 && day !== 6) {
        price *= (1 + (Math.random() - 0.48) * 0.03)
        priceData.push({ date: current.toISOString().split('T')[0], close: parseFloat(price.toFixed(2)) })
      }
      current.setDate(current.getDate() + 1)
    }

    return NextResponse.json({ ticker, prices: priceData, source: 'mock' })
  }
}
