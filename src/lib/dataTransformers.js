import { TRADING_DAYS } from './constants';

/**
 * Convert price series to daily returns
 * @param {number[]} prices - array of prices (oldest first)
 * @returns {number[]} array of daily returns (length = prices.length - 1)
 */
export function pricesToReturns(prices) {
  if (!prices || prices.length < 2) return [];
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
  }
  return returns;
}

/**
 * Convert daily returns to cumulative return series
 * @param {number[]} returns - daily returns
 * @returns {number[]} cumulative return series (starts at 1.0)
 */
export function returnsToCumulative(returns) {
  if (!returns || returns.length === 0) return [1];
  const cumulative = [1];
  for (const r of returns) {
    cumulative.push(cumulative[cumulative.length - 1] * (1 + r));
  }
  return cumulative;
}

/**
 * Compute drawdown series from cumulative returns
 * @param {number[]} cumulativeReturns
 * @returns {number[]} drawdown series (negative values, 0 at peaks)
 */
export function drawdownSeries(cumulativeReturns) {
  if (!cumulativeReturns || cumulativeReturns.length === 0) return [];
  const drawdowns = [];
  let peak = cumulativeReturns[0];
  for (const val of cumulativeReturns) {
    if (val > peak) peak = val;
    drawdowns.push((val - peak) / peak);
  }
  return drawdowns;
}

/**
 * Compute rolling window metric
 * @param {number[]} data - input data
 * @param {number} window - window size
 * @param {Function} fn - function to apply to each window
 * @returns {number[]} rolling values (length = data.length - window + 1)
 */
export function rollingWindow(data, window, fn) {
  if (!data || data.length < window) return [];
  const result = [];
  for (let i = 0; i <= data.length - window; i++) {
    result.push(fn(data.slice(i, i + window)));
  }
  return result;
}

/**
 * Compute rolling annualized volatility
 */
export function rollingVolatility(returns, window = 21) {
  return rollingWindow(returns, window, (w) => {
    const m = w.reduce((s, v) => s + v, 0) / w.length;
    const v = w.reduce((s, v) => s + (v - m) ** 2, 0) / (w.length - 1);
    return Math.sqrt(v) * Math.sqrt(TRADING_DAYS);
  });
}

/**
 * Compute portfolio returns from individual position returns and weights
 * @param {Object} tickerReturns - { AAPL: [r1, r2, ...], MSFT: [...] }
 * @param {Object} weights - { AAPL: 0.15, MSFT: 0.20, ... }
 * @returns {number[]} portfolio daily returns
 */
export function portfolioReturns(tickerReturns, weights) {
  const tickers = Object.keys(weights);
  if (tickers.length === 0) return [];
  const numDays = tickerReturns[tickers[0]]?.length || 0;
  if (numDays === 0) return [];

  const result = [];
  for (let i = 0; i < numDays; i++) {
    let dayReturn = 0;
    for (const ticker of tickers) {
      const returns = tickerReturns[ticker];
      if (returns && returns[i] !== undefined) {
        dayReturn += (weights[ticker] || 0) * returns[i];
      }
    }
    result.push(dayReturn);
  }
  return result;
}

/**
 * Compute position weights from holdings
 * @param {Array} positions - [{ ticker, marketValue }]
 * @returns {Object} { AAPL: 0.15, MSFT: 0.20, ... }
 */
export function computeWeights(positions) {
  const total = positions.reduce((sum, p) => sum + p.marketValue, 0);
  if (total === 0) return {};
  const weights = {};
  for (const p of positions) {
    weights[p.ticker] = p.marketValue / total;
  }
  return weights;
}

/**
 * Aggregate positions by sector
 * @param {Array} positions - [{ ticker, sector, marketValue }]
 * @returns {Object} { Technology: { value: 123456, weight: 0.35, tickers: ['AAPL', 'MSFT'] } }
 */
export function aggregateBySector(positions) {
  const total = positions.reduce((sum, p) => sum + p.marketValue, 0);
  const sectors = {};
  for (const p of positions) {
    const sector = p.sector || 'Other';
    if (!sectors[sector]) {
      sectors[sector] = { value: 0, weight: 0, tickers: [] };
    }
    sectors[sector].value += p.marketValue;
    sectors[sector].tickers.push(p.ticker);
  }
  for (const sector of Object.keys(sectors)) {
    sectors[sector].weight = total > 0 ? sectors[sector].value / total : 0;
  }
  return sectors;
}

/**
 * Format number as percentage
 */
export function formatPercent(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) return '—';
  return (value * 100).toFixed(decimals) + '%';
}

/**
 * Format number as currency
 */
export function formatCurrency(value, decimals = 0) {
  if (value === null || value === undefined || isNaN(value)) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a ratio (e.g. Sharpe) to 2 decimals
 */
export function formatRatio(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) return '—';
  return value.toFixed(decimals);
}

/**
 * Generate date labels for a series of trading days ending today
 */
export function generateDateLabels(count) {
  const dates = [];
  const today = new Date();
  let current = new Date(today);
  current.setDate(current.getDate() - Math.ceil(count * 1.45));
  while (dates.length < count) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(current.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

/**
 * Subsample data for a given date range
 * @param {number[]} data - full data array (252 trading days)
 * @param {'1M'|'3M'|'6M'|'1Y'|'YTD'} range
 */
export function filterByRange(data, range) {
  const mapping = { '1M': 21, '3M': 63, '6M': 126, '1Y': 252, 'YTD': 252 };
  const days = mapping[range] || 252;
  if (data.length <= days) return data;
  return data.slice(data.length - days);
}
