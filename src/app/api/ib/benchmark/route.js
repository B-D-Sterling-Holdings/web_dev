import { NextResponse } from 'next/server'
import { fetchYahooHistory } from '../_lib/yahooFinance'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const days = parseInt(searchParams.get('days') || '252', 10)

  let range = '1y'
  if (days <= 30) range = '1mo'
  else if (days <= 90) range = '3mo'
  else if (days <= 180) range = '6mo'
  else if (days <= 365) range = '1y'
  else range = '2y'

  try {
    const { dates, prices } = await fetchYahooHistory('SPY', range, '1d')
    const priceData = dates.map((date, i) => ({ date, close: prices[i] }))

    return NextResponse.json({ ticker: 'SPY', prices: priceData, source: 'yahoo' })
  } catch (err) {
    console.error('Yahoo Finance error for SPY:', err.message)

    // Fallback: generate mock S&P 500 data
    const priceData = []
    let price = 4800
    const today = new Date()
    const current = new Date(today)
    current.setDate(current.getDate() - Math.ceil(days * 1.45))

    while (priceData.length < days) {
      const day = current.getDay()
      if (day !== 0 && day !== 6) {
        price *= (1 + (Math.random() - 0.47) * 0.025)
        priceData.push({ date: current.toISOString().split('T')[0], close: parseFloat(price.toFixed(2)) })
      }
      current.setDate(current.getDate() + 1)
    }

    return NextResponse.json({ ticker: 'SPY', prices: priceData, source: 'mock' })
  }
}
