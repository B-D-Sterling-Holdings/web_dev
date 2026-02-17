/**
 * Fetch historical daily prices from Yahoo Finance
 * @param {string} ticker - Stock ticker (e.g. 'AAPL')
 * @param {string} range - Time range: '1mo', '3mo', '6mo', '1y', '2y', '5y'
 * @param {string} interval - Data interval: '1d', '1wk', '1mo'
 * @returns {{ dates: string[], prices: number[] }}
 */
export async function fetchYahooHistory(ticker, range = '1y', interval = '1d') {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=${range}&interval=${interval}`

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  })

  if (!res.ok) {
    throw new Error(`Yahoo Finance error for ${ticker}: ${res.status}`)
  }

  const data = await res.json()
  const result = data?.chart?.result?.[0]

  if (!result) {
    throw new Error(`No data returned for ${ticker}`)
  }

  const timestamps = result.timestamp || []
  const closes = result.indicators?.quote?.[0]?.close || []

  // Filter out nulls (market holidays) and pair with dates
  const dates = []
  const prices = []
  for (let i = 0; i < timestamps.length; i++) {
    if (closes[i] != null) {
      const d = new Date(timestamps[i] * 1000)
      dates.push(d.toISOString().split('T')[0])
      prices.push(parseFloat(closes[i].toFixed(2)))
    }
  }

  return { ticker, dates, prices }
}

/**
 * Fetch current quote (last price) from Yahoo Finance
 * @param {string} ticker
 * @returns {{ price: number, change: number, changePercent: number }}
 */
export async function fetchYahooQuote(ticker) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=1d&interval=1d`

  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })

  if (!res.ok) throw new Error(`Yahoo quote error for ${ticker}: ${res.status}`)

  const data = await res.json()
  const meta = data?.chart?.result?.[0]?.meta

  if (!meta) throw new Error(`No quote data for ${ticker}`)

  return {
    price: meta.regularMarketPrice,
    previousClose: meta.chartPreviousClose || meta.previousClose,
    change: meta.regularMarketPrice - (meta.chartPreviousClose || meta.previousClose || 0),
    changePercent: ((meta.regularMarketPrice - (meta.chartPreviousClose || meta.previousClose || 0)) / (meta.chartPreviousClose || meta.previousClose || 1)),
  }
}
