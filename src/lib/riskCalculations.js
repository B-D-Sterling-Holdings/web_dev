import { RISK_FREE_RATE, TRADING_DAYS, DAILY_RISK_FREE, VAR_CONFIDENCE } from './constants';

// ─── Basic Statistics ────────────────────────────────────────────────

export function mean(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((sum, v) => sum + v, 0) / arr.length;
}

export function variance(arr) {
  if (!arr || arr.length < 2) return 0;
  const m = mean(arr);
  return arr.reduce((sum, v) => sum + (v - m) ** 2, 0) / (arr.length - 1);
}

export function stddev(arr) {
  return Math.sqrt(variance(arr));
}

export function covariance(arr1, arr2) {
  if (!arr1 || !arr2 || arr1.length !== arr2.length || arr1.length < 2) return 0;
  const m1 = mean(arr1);
  const m2 = mean(arr2);
  return arr1.reduce((sum, v, i) => sum + (v - m1) * (arr2[i] - m2), 0) / (arr1.length - 1);
}

export function correlation(arr1, arr2) {
  const s1 = stddev(arr1);
  const s2 = stddev(arr2);
  if (s1 === 0 || s2 === 0) return 0;
  return covariance(arr1, arr2) / (s1 * s2);
}

// ─── Downside Deviation ──────────────────────────────────────────────

export function downsideDeviation(returns, threshold = DAILY_RISK_FREE) {
  const downside = returns.filter(r => r < threshold).map(r => (r - threshold) ** 2);
  if (downside.length === 0) return 0;
  return Math.sqrt(downside.reduce((sum, v) => sum + v, 0) / returns.length);
}

// ─── Risk Metrics ────────────────────────────────────────────────────

/**
 * Sharpe Ratio = (mean excess return / std of excess returns) × √252
 */
export function sharpeRatio(portfolioReturns) {
  const excessReturns = portfolioReturns.map(r => r - DAILY_RISK_FREE);
  const s = stddev(excessReturns);
  if (s === 0) return 0;
  return (mean(excessReturns) / s) * Math.sqrt(TRADING_DAYS);
}

/**
 * Sortino Ratio = (mean excess return / downside deviation) × √252
 */
export function sortinoRatio(portfolioReturns) {
  const excessMean = mean(portfolioReturns) - DAILY_RISK_FREE;
  const dd = downsideDeviation(portfolioReturns);
  if (dd === 0) return 0;
  return (excessMean / dd) * Math.sqrt(TRADING_DAYS);
}

/**
 * Beta = Cov(Rp, Rm) / Var(Rm)
 */
export function beta(portfolioReturns, benchmarkReturns) {
  const v = variance(benchmarkReturns);
  if (v === 0) return 0;
  return covariance(portfolioReturns, benchmarkReturns) / v;
}

/**
 * Alpha (CAPM) = Rp - [Rf + β(Rm - Rf)] annualized
 */
export function alpha(portfolioReturns, benchmarkReturns) {
  const b = beta(portfolioReturns, benchmarkReturns);
  const rp = mean(portfolioReturns) * TRADING_DAYS;
  const rm = mean(benchmarkReturns) * TRADING_DAYS;
  return rp - (RISK_FREE_RATE + b * (rm - RISK_FREE_RATE));
}

/**
 * Jensen's Alpha = same as CAPM Alpha
 */
export const jensensAlpha = alpha;

/**
 * Value at Risk - Historical method
 * Returns the loss at the given confidence level (as a positive number)
 */
export function varHistorical(returns, confidence = 95) {
  const sorted = [...returns].sort((a, b) => a - b);
  const idx = Math.floor(sorted.length * (1 - confidence / 100));
  return -sorted[idx];
}

/**
 * Value at Risk - Parametric method (assumes normal distribution)
 */
export function varParametric(returns, confidence = 95) {
  const m = mean(returns);
  const s = stddev(returns);
  const z = VAR_CONFIDENCE[confidence] || 1.645;
  return -(m - z * s);
}

/**
 * Max Drawdown = largest peak-to-trough decline
 */
export function maxDrawdown(cumulativeReturns) {
  if (!cumulativeReturns || cumulativeReturns.length === 0) return 0;
  let peak = cumulativeReturns[0];
  let maxDD = 0;
  for (const val of cumulativeReturns) {
    if (val > peak) peak = val;
    const dd = (peak - val) / peak;
    if (dd > maxDD) maxDD = dd;
  }
  return maxDD;
}

/**
 * Treynor Ratio = (Rp - Rf) / β
 */
export function treynorRatio(portfolioReturns, benchmarkReturns) {
  const b = beta(portfolioReturns, benchmarkReturns);
  if (b === 0) return 0;
  const excessReturn = mean(portfolioReturns) * TRADING_DAYS - RISK_FREE_RATE;
  return excessReturn / b;
}

/**
 * Information Ratio = mean(active return) / tracking error × √252
 */
export function informationRatio(portfolioReturns, benchmarkReturns) {
  if (portfolioReturns.length !== benchmarkReturns.length) return 0;
  const activeReturns = portfolioReturns.map((r, i) => r - benchmarkReturns[i]);
  const te = stddev(activeReturns);
  if (te === 0) return 0;
  return (mean(activeReturns) / te) * Math.sqrt(TRADING_DAYS);
}

/**
 * Correlation Matrix for multiple ticker return series
 * @param {Object} tickerReturns - { AAPL: [...], MSFT: [...], ... }
 * @returns {{ tickers: string[], matrix: number[][] }}
 */
export function correlationMatrix(tickerReturns) {
  const tickers = Object.keys(tickerReturns);
  const n = tickers.length;
  const matrix = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        matrix[i][j] = 1;
      } else if (j > i) {
        const corr = correlation(tickerReturns[tickers[i]], tickerReturns[tickers[j]]);
        matrix[i][j] = corr;
        matrix[j][i] = corr;
      }
    }
  }
  return { tickers, matrix };
}

// ─── Sector Attribution ──────────────────────────────────────────────

/**
 * Compute sector attribution (allocation + selection effect)
 * @param {Array} positions - [{ ticker, sector, weight, return }]
 * @param {Object} benchmarkSectorWeights - { Technology: 0.3, ... }
 * @param {Object} benchmarkSectorReturns - { Technology: 0.05, ... }
 * @param {number} benchmarkTotalReturn
 */
export function sectorAttribution(positions, benchmarkSectorWeights, benchmarkSectorReturns, benchmarkTotalReturn) {
  // Aggregate portfolio by sector
  const sectorData = {};
  for (const pos of positions) {
    if (!sectorData[pos.sector]) {
      sectorData[pos.sector] = { weight: 0, weightedReturn: 0 };
    }
    sectorData[pos.sector].weight += pos.weight;
    sectorData[pos.sector].weightedReturn += pos.weight * pos.return;
  }

  const results = [];
  const sectors = [...new Set([...Object.keys(sectorData), ...Object.keys(benchmarkSectorWeights)])];

  for (const sector of sectors) {
    const pw = sectorData[sector]?.weight || 0;
    const pr = pw > 0 ? sectorData[sector].weightedReturn / pw : 0;
    const bw = benchmarkSectorWeights[sector] || 0;
    const br = benchmarkSectorReturns[sector] || 0;

    const allocationEffect = (pw - bw) * (br - benchmarkTotalReturn);
    const selectionEffect = pw * (pr - br);
    const totalEffect = allocationEffect + selectionEffect;

    results.push({
      sector,
      portfolioWeight: pw,
      benchmarkWeight: bw,
      portfolioReturn: pr,
      benchmarkReturn: br,
      allocationEffect,
      selectionEffect,
      totalEffect,
    });
  }

  return results;
}

// ─── Factor Exposures ────────────────────────────────────────────────

/**
 * Estimate factor exposures via simple regression proxies
 * In production, use Fama-French factor data; here we generate reasonable mock values
 * based on portfolio characteristics
 */
export function estimateFactorExposures(positions) {
  const totalValue = positions.reduce((sum, p) => sum + p.marketValue, 0);

  // Sector-based heuristics for factor loadings
  const techWeight = positions
    .filter(p => p.sector === 'Technology')
    .reduce((sum, p) => sum + p.marketValue, 0) / totalValue;

  const valueWeight = positions
    .filter(p => ['Financials', 'Energy', 'Utilities', 'Consumer Staples'].includes(p.sector))
    .reduce((sum, p) => sum + p.marketValue, 0) / totalValue;

  return {
    Market: 0.95 + (Math.random() * 0.1 - 0.05),  // ~0.90-1.00
    Size: -0.15 + techWeight * 0.3,                   // large cap bias
    Value: -0.20 + valueWeight * 0.8,                  // value tilt depends on holdings
    Momentum: 0.10 + techWeight * 0.25,                // tech = momentum proxy
    Quality: 0.20 + (1 - techWeight) * 0.15,           // diversified = higher quality
  };
}

// ─── Portfolio-level Aggregations ────────────────────────────────────

/**
 * Compute all risk metrics for the portfolio
 */
export function computeAllMetrics(portfolioReturns, benchmarkReturns, cumulativeReturns) {
  return {
    sharpe: sharpeRatio(portfolioReturns),
    sortino: sortinoRatio(portfolioReturns),
    beta: beta(portfolioReturns, benchmarkReturns),
    alpha: alpha(portfolioReturns, benchmarkReturns),
    jensensAlpha: jensensAlpha(portfolioReturns, benchmarkReturns),
    var95: varHistorical(portfolioReturns, 95),
    var99: varHistorical(portfolioReturns, 99),
    varParametric95: varParametric(portfolioReturns, 95),
    maxDrawdown: maxDrawdown(cumulativeReturns),
    treynor: treynorRatio(portfolioReturns, benchmarkReturns),
    informationRatio: informationRatio(portfolioReturns, benchmarkReturns),
    annualReturn: mean(portfolioReturns) * TRADING_DAYS,
    annualVol: stddev(portfolioReturns) * Math.sqrt(TRADING_DAYS),
    dailyMean: mean(portfolioReturns),
    dailyVol: stddev(portfolioReturns),
  };
}
