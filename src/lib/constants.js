// Risk dashboard constants

export const RISK_FREE_RATE = 0.043; // 4.3% annual (current T-bill rate)
export const TRADING_DAYS = 252;
export const DAILY_RISK_FREE = RISK_FREE_RATE / TRADING_DAYS;

// Confidence levels for VaR
export const VAR_CONFIDENCE = {
  95: 1.645,
  99: 2.326,
};

// Sector classification for holdings
export const SECTOR_MAP = {
  AAPL: 'Technology',
  MSFT: 'Technology',
  GOOGL: 'Technology',
  AMZN: 'Consumer Discretionary',
  META: 'Technology',
  NVDA: 'Technology',
  TSLA: 'Consumer Discretionary',
  BRK: 'Financials',
  'BRK.B': 'Financials',
  JPM: 'Financials',
  JNJ: 'Healthcare',
  UNH: 'Healthcare',
  V: 'Financials',
  MA: 'Financials',
  PG: 'Consumer Staples',
  HD: 'Consumer Discretionary',
  CVX: 'Energy',
  XOM: 'Energy',
  MRK: 'Healthcare',
  ABBV: 'Healthcare',
  PFE: 'Healthcare',
  KO: 'Consumer Staples',
  PEP: 'Consumer Staples',
  COST: 'Consumer Staples',
  WMT: 'Consumer Staples',
  DIS: 'Communication Services',
  NFLX: 'Communication Services',
  CMCSA: 'Communication Services',
  VZ: 'Communication Services',
  T: 'Communication Services',
  INTC: 'Technology',
  AMD: 'Technology',
  CRM: 'Technology',
  ADBE: 'Technology',
  ORCL: 'Technology',
  ACN: 'Technology',
  CSCO: 'Technology',
  TXN: 'Technology',
  AVGO: 'Technology',
  QCOM: 'Technology',
  BA: 'Industrials',
  CAT: 'Industrials',
  GE: 'Industrials',
  HON: 'Industrials',
  UPS: 'Industrials',
  LMT: 'Industrials',
  RTX: 'Industrials',
  DE: 'Industrials',
  NEE: 'Utilities',
  DUK: 'Utilities',
  SO: 'Utilities',
  D: 'Utilities',
  AMT: 'Real Estate',
  PLD: 'Real Estate',
  SPG: 'Real Estate',
  PSA: 'Real Estate',
  LIN: 'Materials',
  APD: 'Materials',
  SHW: 'Materials',
  FCX: 'Materials',
  NEM: 'Materials',
  SPY: 'Index',
  QQQ: 'Index',
  IWM: 'Index',
};

// Default mock positions for development
export const MOCK_POSITIONS = [
  { ticker: 'AAPL', shares: 150, avgCost: 178.50, currentPrice: 232.50, marketValue: 34875, sector: 'Technology' },
  { ticker: 'MSFT', shares: 100, avgCost: 340.20, currentPrice: 415.80, marketValue: 41580, sector: 'Technology' },
  { ticker: 'GOOGL', shares: 80, avgCost: 135.40, currentPrice: 175.20, marketValue: 14016, sector: 'Technology' },
  { ticker: 'AMZN', shares: 60, avgCost: 145.80, currentPrice: 198.50, marketValue: 11910, sector: 'Consumer Discretionary' },
  { ticker: 'NVDA', shares: 200, avgCost: 48.50, currentPrice: 135.40, marketValue: 27080, sector: 'Technology' },
  { ticker: 'JPM', shares: 120, avgCost: 152.30, currentPrice: 198.70, marketValue: 23844, sector: 'Financials' },
  { ticker: 'JNJ', shares: 90, avgCost: 162.40, currentPrice: 155.20, marketValue: 13968, sector: 'Healthcare' },
  { ticker: 'UNH', shares: 40, avgCost: 480.50, currentPrice: 562.30, marketValue: 22492, sector: 'Healthcare' },
  { ticker: 'XOM', shares: 150, avgCost: 98.20, currentPrice: 112.40, marketValue: 16860, sector: 'Energy' },
  { ticker: 'PG', shares: 100, avgCost: 148.60, currentPrice: 168.90, marketValue: 16890, sector: 'Consumer Staples' },
  { ticker: 'V', shares: 75, avgCost: 245.30, currentPrice: 285.60, marketValue: 21420, sector: 'Financials' },
  { ticker: 'HD', shares: 55, avgCost: 320.10, currentPrice: 378.40, marketValue: 20812, sector: 'Consumer Discretionary' },
];

// Mock tax lots
export const MOCK_LOTS = [
  { ticker: 'AAPL', shares: 100, costBasis: 165.20, datePurchased: '2023-06-15', currentPrice: 232.50, term: 'Long' },
  { ticker: 'AAPL', shares: 50, costBasis: 205.10, datePurchased: '2024-03-20', currentPrice: 232.50, term: 'Long' },
  { ticker: 'MSFT', shares: 60, costBasis: 310.40, datePurchased: '2023-01-10', currentPrice: 415.80, term: 'Long' },
  { ticker: 'MSFT', shares: 40, costBasis: 384.90, datePurchased: '2024-07-05', currentPrice: 415.80, term: 'Long' },
  { ticker: 'GOOGL', shares: 80, costBasis: 135.40, datePurchased: '2024-02-14', currentPrice: 175.20, term: 'Long' },
  { ticker: 'AMZN', shares: 60, costBasis: 145.80, datePurchased: '2024-05-22', currentPrice: 198.50, term: 'Long' },
  { ticker: 'NVDA', shares: 120, costBasis: 32.10, datePurchased: '2023-03-01', currentPrice: 135.40, term: 'Long' },
  { ticker: 'NVDA', shares: 80, costBasis: 73.10, datePurchased: '2024-06-18', currentPrice: 135.40, term: 'Long' },
  { ticker: 'JPM', shares: 120, costBasis: 152.30, datePurchased: '2023-11-08', currentPrice: 198.70, term: 'Long' },
  { ticker: 'JNJ', shares: 90, costBasis: 162.40, datePurchased: '2024-01-15', currentPrice: 155.20, term: 'Long' },
  { ticker: 'UNH', shares: 40, costBasis: 480.50, datePurchased: '2024-04-10', currentPrice: 562.30, term: 'Long' },
  { ticker: 'XOM', shares: 150, costBasis: 98.20, datePurchased: '2023-08-20', currentPrice: 112.40, term: 'Long' },
  { ticker: 'PG', shares: 100, costBasis: 148.60, datePurchased: '2023-09-12', currentPrice: 168.90, term: 'Long' },
  { ticker: 'V', shares: 75, costBasis: 245.30, datePurchased: '2024-02-28', currentPrice: 285.60, term: 'Long' },
  { ticker: 'HD', shares: 55, costBasis: 320.10, datePurchased: '2024-08-15', currentPrice: 378.40, term: 'Short' },
];

// Mock historical daily returns (252 trading days) - generated with realistic params
// These will be replaced by actual data from IB/Yahoo Finance
export function generateMockReturns(days = 252, annualReturn = 0.12, annualVol = 0.18) {
  const dailyReturn = annualReturn / TRADING_DAYS;
  const dailyVol = annualVol / Math.sqrt(TRADING_DAYS);
  const returns = [];
  for (let i = 0; i < days; i++) {
    // Box-Muller transform for normal distribution
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    returns.push(dailyReturn + dailyVol * z);
  }
  return returns;
}

// Generate mock price series from returns
export function generateMockPrices(startPrice, returns) {
  const prices = [startPrice];
  for (let i = 0; i < returns.length; i++) {
    prices.push(prices[i] * (1 + returns[i]));
  }
  return prices;
}

// Generate mock dates (trading days only, no weekends)
export function generateMockDates(days = 252) {
  const dates = [];
  const end = new Date();
  let current = new Date(end);
  current.setDate(current.getDate() - Math.ceil(days * 1.45)); // rough estimate for weekdays
  while (dates.length < days) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(new Date(current).toISOString().split('T')[0]);
    }
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

// Factor names
export const FACTORS = ['Market', 'Size', 'Value', 'Momentum', 'Quality'];

// Sector colors for charts
export const SECTOR_COLORS = {
  'Technology': '#6366f1',
  'Financials': '#10b981',
  'Healthcare': '#f59e0b',
  'Consumer Discretionary': '#ef4444',
  'Consumer Staples': '#8b5cf6',
  'Energy': '#f97316',
  'Industrials': '#06b6d4',
  'Communication Services': '#ec4899',
  'Utilities': '#14b8a6',
  'Real Estate': '#a855f7',
  'Materials': '#84cc16',
  'Index': '#64748b',
};
