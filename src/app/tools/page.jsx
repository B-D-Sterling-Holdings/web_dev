'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Scatter } from 'react-chartjs-2'
import Navbar from '@/components/Navbar'
import Login from '@/components/login'
import { motion } from 'framer-motion'

const createRow = (overrides = {}) => ({
  id: crypto.randomUUID(),
  ticker: '',
  currentValue: '',
  targetWeight: '',
  ...overrides,
})

const defaultTickers = [
  'MA',
  'AMZN',
  'GOOGL',
  'UBER',
  'ASML',
  'HLT',
  'BKNG',
  'AAAU',
  'UNH',
  'ADBE',
]

const createDefaultHoldings = () => defaultTickers.map((ticker) => createRow({ ticker }))

const riskFactors = ['Volatility', 'Regulatory', 'Disruption', 'Valuation', 'Earnings Quality']

const defaultRiskFactorWeights = [0.9, 0.3, 0.5, 0.6, 0.8]

const defaultFactorExposures = {
  GOOGL: [0.5, 0.2, 0.4, 0.2, 0.1],
  AMZN: [0.55, 0.1, 0.25, 0.35, 0.15],
  UNH: [0.4, 0.6, 0.4, 0.15, 0.5],
  HLT: [0.25, 0.1, 0.3, 0.45, 0.25],
  ASML: [0.3, 0.15, 0.1, 0.25, 0.2],
  MA: [0.2, 0.5, 0.3, 0.3, 0.1],
  AAAU: [0.2, 0.01, 0.01, 0.5, 0.01],
  UBER: [0.6, 0.2, 0.5, 0.45, 0.3],
  BKNG: [0.25, 0.1, 0.3, 0.35, 0.25],
  ADBE: [0.65, 0.1, 0.65, 0.3, 0.2],
}

const createAllocationRow = (overrides = {}) => ({
  id: crypto.randomUUID(),
  ticker: '',
  expectedReturn: '',
  factorExposures: riskFactors.map(() => ''),
  userWeight: '',
  ...overrides,
})

const createDefaultAllocations = () => [
  ...defaultTickers.map((ticker) =>
    createAllocationRow({
      ticker,
      expectedReturn: '',
      factorExposures: defaultFactorExposures[ticker] || riskFactors.map(() => ''),
      userWeight: '',
    })
  ),
  createAllocationRow({
    ticker: 'CASH',
    expectedReturn: '0',
    factorExposures: riskFactors.map(() => 0),
    userWeight: '',
  }),
]

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const parseNumber = (value) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

const colorScale = [
  [215, 25, 28],
  [253, 174, 97],
  [255, 255, 191],
  [171, 221, 164],
  [43, 131, 186],
]

const lerp = (start, end, t) => start + (end - start) * t

const getColorFromScale = (value) => {
  const clamped = Math.min(1, Math.max(0, value))
  const segment = (colorScale.length - 1) * clamped
  const index = Math.floor(segment)
  const ratio = segment - index
  const [r1, g1, b1] = colorScale[index]
  const [r2, g2, b2] = colorScale[Math.min(index + 1, colorScale.length - 1)]
  return `rgb(${Math.round(lerp(r1, r2, ratio))}, ${Math.round(
    lerp(g1, g2, ratio)
  )}, ${Math.round(lerp(b1, b2, ratio))})`
}

const rebalanceExecutionPlan = ({
  currentValues,
  targetWeights,
  cash,
  transactionCostPct = 0,
  minInstructionThreshold = 1e-6,
}) => {
  const fee = Number(transactionCostPct)
  if (fee < 0 || fee >= 1) {
    throw new Error('transaction_cost_pct must be in [0, 1).')
  }

  const tickers = Array.from(
    new Set([...Object.keys(currentValues), ...Object.keys(targetWeights)])
  ).sort()
  const effectiveCash = Number.isFinite(cash) ? cash : Number(currentValues.CASH || 0)

  const current = {}
  tickers.forEach((ticker) => {
    if (ticker === 'CASH') {
      return
    }
    current[ticker] = Number(currentValues[ticker] || 0)
  })

  const target = {}
  tickers.forEach((ticker) => {
    target[ticker] = Number(targetWeights[ticker] || 0)
  })

  const targetSum = Object.values(target).reduce((sum, value) => sum + value, 0)
  if (Math.abs(targetSum - 1) > 1e-6) {
    throw new Error(`Target weights must sum to 1.0; got ${targetSum.toFixed(6)}`)
  }

  const startingTotal = Object.values(current).reduce((sum, value) => sum + value, 0) + effectiveCash
  const targetDollars = {}
  tickers.forEach((ticker) => {
    targetDollars[ticker] = target[ticker] * startingTotal
  })
  const targetCash = targetDollars.CASH || 0

  const deltas = {}
  tickers.forEach((ticker) => {
    if (ticker === 'CASH') {
      return
    }
    deltas[ticker] = (targetDollars[ticker] || 0) - (current[ticker] || 0)
  })

  const toBuy = {}
  const toSell = {}
  Object.entries(deltas).forEach(([ticker, delta]) => {
    if (delta > minInstructionThreshold) {
      toBuy[ticker] = delta
    }
    if (delta < -minInstructionThreshold) {
      toSell[ticker] = -delta
    }
  })

  const steps = []
  const buyUsed = {}
  const sellUsed = {}
  Object.keys(deltas).forEach((ticker) => {
    buyUsed[ticker] = 0
    sellUsed[ticker] = 0
  })

  const remainingBuyTotal = () => Object.values(toBuy).reduce((sum, value) => sum + value, 0)

  let cashOnHand = effectiveCash

  if (remainingBuyTotal() > minInstructionThreshold && cashOnHand > minInstructionThreshold) {
    Object.keys(toBuy)
      .sort((a, b) => toBuy[b] - toBuy[a])
      .forEach((ticker) => {
        if (toBuy[ticker] <= minInstructionThreshold || cashOnHand <= minInstructionThreshold) {
          return
        }
        const needed = toBuy[ticker] * (1 + fee)
        const useOutlay = Math.min(needed, cashOnHand)
        const netIncrease = useOutlay / (1 + fee)
        if (netIncrease <= minInstructionThreshold) {
          return
        }
        toBuy[ticker] -= netIncrease
        buyUsed[ticker] += netIncrease
        cashOnHand -= useOutlay
        steps.push({ type: 'buy', text: `Buy ${formatCurrency(netIncrease)} of ${ticker}.` })
      })
  }

  const deltaCash = targetCash - cashOnHand
  let proceedsNeededForBuys = 0
  if (remainingBuyTotal() > minInstructionThreshold) {
    const totalBuyNeeded = remainingBuyTotal()
    proceedsNeededForBuys = totalBuyNeeded * (1 + fee)
  }

  let totalCashProceedsNeeded = Math.max(0, proceedsNeededForBuys + Math.max(0, deltaCash))

  if (totalCashProceedsNeeded > minInstructionThreshold) {
    Object.keys(toSell)
      .sort((a, b) => toSell[b] - toSell[a])
      .forEach((ticker) => {
        if (totalCashProceedsNeeded <= minInstructionThreshold) {
          return
        }
        if (toSell[ticker] <= minInstructionThreshold) {
          return
        }
        const maxSellNotional = toSell[ticker]
        const maxCashFromTicker = maxSellNotional * (1 - fee)
        const sellCash = Math.min(maxCashFromTicker, totalCashProceedsNeeded)
        const sellNotional = sellCash / (1 - fee)

        toSell[ticker] -= sellNotional
        sellUsed[ticker] += sellNotional
        cashOnHand += sellCash
        totalCashProceedsNeeded -= sellCash
        steps.push({ type: 'sell', text: `Sell ${formatCurrency(sellNotional)} of ${ticker}.` })

        if (remainingBuyTotal() > minInstructionThreshold && cashOnHand > minInstructionThreshold) {
          Object.keys(toBuy)
            .sort((a, b) => toBuy[b] - toBuy[a])
            .forEach((buyTicker) => {
              if (toBuy[buyTicker] <= minInstructionThreshold || cashOnHand <= minInstructionThreshold) {
                return
              }
              const neededOutlay = toBuy[buyTicker] * (1 + fee)
              const useOutlay = Math.min(neededOutlay, cashOnHand)
              const netIncrease = useOutlay / (1 + fee)
              if (netIncrease <= minInstructionThreshold) {
                return
              }
              toBuy[buyTicker] -= netIncrease
              buyUsed[buyTicker] += netIncrease
              cashOnHand -= useOutlay
              steps.push({ type: 'buy', text: `Buy ${formatCurrency(netIncrease)} of ${buyTicker}.` })
            })
        }
      })
  }

  if (remainingBuyTotal() > minInstructionThreshold) {
    steps.push({ type: 'note', text: 'Warning: Not enough funding from overweights or CASH to complete all buys.' })
  }

  const deltaCashFinal = targetCash - cashOnHand
  if (deltaCashFinal < -minInstructionThreshold && remainingBuyTotal() <= minInstructionThreshold) {
    steps.push({
      type: 'note',
      text: `Note: Ending CASH ${formatCurrency(cashOnHand)} exceeds target by ${formatCurrency(
        -deltaCashFinal
      )}. (Small drift retained.)`,
    })
  }

  const finalValues = {}
  Object.keys(deltas).forEach((ticker) => {
    finalValues[ticker] = (current[ticker] || 0) + (buyUsed[ticker] || 0) - (sellUsed[ticker] || 0)
  })
  finalValues.CASH = cashOnHand

  const finalTotal = Object.values(finalValues).reduce((sum, value) => sum + value, 0)
  const finalWeights = {}
  Object.entries(finalValues).forEach(([ticker, value]) => {
    finalWeights[ticker] = finalTotal > 0 ? value / finalTotal : 0
  })

  const buySummary = {}
  const sellSummary = {}
  Object.entries(buyUsed).forEach(([ticker, value]) => {
    if (value > minInstructionThreshold) {
      buySummary[ticker] = value
    }
  })
  Object.entries(sellUsed).forEach(([ticker, value]) => {
    if (value > minInstructionThreshold) {
      sellSummary[ticker] = value
    }
  })

  const consolidatedSteps = [
    ...Object.entries(sellSummary)
      .sort(([, a], [, b]) => b - a)
      .map(([ticker, value]) => ({
        type: 'sell',
        text: `Sell ${formatCurrency(value)} of ${ticker}.`,
      })),
    ...Object.entries(buySummary)
      .sort(([, a], [, b]) => b - a)
      .map(([ticker, value]) => ({
        type: 'buy',
        text: `Buy ${formatCurrency(value)} of ${ticker}.`,
      })),
    ...steps.filter((step) => step.type === 'note'),
  ]

  return {
    steps: consolidatedSteps,
    buyDollars: buySummary,
    sellDollars: sellSummary,
    currentValues: current,
    startingTotal,
    finalValues,
    finalWeights,
  }
}

export default function ToolsPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentPrice, setCurrentPrice] = useState('')
  const [epsTTM, setEpsTTM] = useState('')
  const [epsGrowthRate, setEpsGrowthRate] = useState('')
  const [appropriateMultiple, setAppropriateMultiple] = useState('')
  const [desiredReturn, setDesiredReturn] = useState('')
  const [holdings, setHoldings] = useState(createDefaultHoldings)
  const [cash, setCash] = useState('')
  const [targetCashPercent, setTargetCashPercent] = useState('0')
  const [transactionCostPct, setTransactionCostPct] = useState('0')
  const [plan, setPlan] = useState(null)
  const [error, setError] = useState('')
  const [allocations, setAllocations] = useState(createDefaultAllocations)
  const [riskFactorWeights, setRiskFactorWeights] = useState(defaultRiskFactorWeights)
  const [riskFreeRate, setRiskFreeRate] = useState('4')
  const [minWeight, setMinWeight] = useState('3')
  const [maxWeight, setMaxWeight] = useState('16')
  const [cashMinWeight, setCashMinWeight] = useState('1')
  const [cashMaxWeight, setCashMaxWeight] = useState('5')
  const [numPortfolios, setNumPortfolios] = useState('5000')
  const [simulationError, setSimulationError] = useState('')
  const [simulationResult, setSimulationResult] = useState(null)
  const [simulationChart, setSimulationChart] = useState(null)
  const [taxInputs, setTaxInputs] = useState({})

  const aumValue = plan?.startingTotal || 0

  const taxBreakdown = useMemo(() => {
    if (!plan) {
      return { rows: [], totalTax: 0, totalGains: 0 }
    }

    const rows = Object.entries(plan.sellDollars).map(([ticker, plannedSold]) => {
      const inputs = taxInputs[ticker] || {}
      const initialValue = parseNumber(inputs.initialValue)
      const finalValue = parseNumber(inputs.finalValue)
      const amountSoldInput =
        inputs.amountSold === '' || inputs.amountSold === undefined ? plannedSold : inputs.amountSold
      const amountSold = parseNumber(amountSoldInput)
      const taxRate = parseNumber(inputs.taxRate)
      const gainFraction = finalValue ? (finalValue - initialValue) / finalValue : 0
      const gainRealized = amountSold * gainFraction
      const taxOwed = gainRealized * (taxRate / 100)

      return {
        ticker,
        initialValue,
        finalValue,
        amountSold,
        taxRate,
        gainRealized,
        taxOwed,
      }
    })

    const totalTax = rows.reduce((sum, row) => sum + row.taxOwed, 0)
    const totalGains = rows.reduce((sum, row) => sum + row.gainRealized, 0)

    return { rows, totalTax, totalGains }
  }, [plan, taxInputs])

  const taxOwedPctOfAum = aumValue ? (taxBreakdown.totalTax / aumValue) * 100 : 0

  const totalTargetPercent = useMemo(() => {
    const holdingsTotal = holdings.reduce((sum, row) => sum + parseNumber(row.targetWeight), 0)
    return holdingsTotal + parseNumber(targetCashPercent)
  }, [holdings, targetCashPercent])

  const projection = useMemo(() => {
    const currentPriceValue = parseNumber(currentPrice)
    const eps0 = parseNumber(epsTTM)
    const growthRate = parseNumber(epsGrowthRate) / 100
    const peTarget = parseNumber(appropriateMultiple)
    const desiredReturnRate = parseNumber(desiredReturn) / 100
    const years = Array.from({ length: 6 }, (_, index) => index)
    const epsValues = years.map((t) => eps0 * (1 + growthRate) ** t)
    const projectedPrices = epsValues.map((value) => value * peTarget)
    const futurePrice = projectedPrices[5] || 0
    const cagr =
      currentPriceValue > 0 && futurePrice > 0
        ? (futurePrice / currentPriceValue) ** (1 / 5) - 1
        : 0
    const entryPrice =
      futurePrice > 0 ? futurePrice / (1 + desiredReturnRate) ** 5 : 0
    const baseYear = new Date().getFullYear()
    const labels = years.map((t) => `${baseYear + t}`)
    const priceValues = [
      currentPriceValue,
      ...projectedPrices.slice(1),
    ]

    return {
      labels,
      priceValues,
      cagr,
      entryPrice,
    }
  }, [appropriateMultiple, currentPrice, desiredReturn, epsGrowthRate, epsTTM])

  const projectionChartData = useMemo(
    () => ({
      labels: projection.labels,
      datasets: [
        {
          label: 'Projected Price',
          data: projection.priceValues,
          borderColor: '#3E9F62',
          backgroundColor: 'rgba(62, 159, 98, 0.2)',
          pointBackgroundColor: '#3E9F62',
          pointBorderColor: '#3E9F62',
          pointRadius: 5,
          tension: 0.3,
        },
      ],
    }),
    [projection.labels, projection.priceValues]
  )

  const projectionChartOptions = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => formatCurrency(value),
          },
        },
      },
    }),
    []
  )

  const isPositiveValue = (value) => parseNumber(value) > 0

  const simulationChartOptions = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => context.raw?.hoverLines || '',
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Composite Risk (0 to 1)',
          },
          min: 0,
          max: 1,
        },
        y: {
          title: {
            display: true,
            text: 'Expected Return',
          },
          ticks: {
            callback: (value) => `${(Number(value) * 100).toFixed(0)}%`,
          },
        },
      },
    }),
    []
  )

  useEffect(() => {
    if (!plan) {
      setTaxInputs({})
      return
    }

    setTaxInputs((prev) => {
      const next = {}
      Object.entries(plan.sellDollars).forEach(([ticker, value]) => {
        const existing = prev[ticker] || {}
        const currentValue = plan.currentValues?.[ticker]
        next[ticker] = {
          initialValue: existing.initialValue ?? '',
          finalValue:
            existing.finalValue ??
            (Number.isFinite(currentValue) ? currentValue.toFixed(2) : ''),
          amountSold: existing.amountSold ?? value.toFixed(2),
          taxRate: existing.taxRate ?? '',
        }
      })
      return next
    })
  }, [plan])

  const updateTaxInput = (ticker, field, value) => {
    setTaxInputs((prev) => {
      const current = prev[ticker] || {}
      const updated = { ...current, [field]: value }
      const finalValue = parseNumber(field === 'finalValue' ? value : updated.finalValue)
      const amountSold = parseNumber(field === 'amountSold' ? value : updated.amountSold)

      if (finalValue > 0 && amountSold > finalValue) {
        updated.amountSold = `${finalValue}`
      }

      return { ...prev, [ticker]: updated }
    })
  }

  const updateHolding = (id, field, value) => {
    setHoldings((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    )
  }

  const removeHolding = (id) => {
    setHoldings((prev) => prev.filter((row) => row.id !== id))
  }

  const addHolding = () => {
    setHoldings((prev) => [...prev, createRow()])
  }

  const updateAllocation = (id, field, value) => {
    setAllocations((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    )
  }

  const updateAllocationExposure = (id, index, value) => {
    setAllocations((prev) =>
      prev.map((row) => {
        if (row.id !== id) {
          return row
        }
        const exposures = [...row.factorExposures]
        exposures[index] = value
        return { ...row, factorExposures: exposures }
      })
    )
  }

  const updateRiskFactorWeight = (index, value) => {
    setRiskFactorWeights((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const addAllocation = () => {
    setAllocations((prev) => [...prev, createAllocationRow()])
  }

  const removeAllocation = (id) => {
    setAllocations((prev) => prev.filter((row) => row.id !== id))
  }

  const runMonteCarloSimulation = () => {
    setSimulationError('')
    setSimulationResult(null)
    setSimulationChart(null)

    const filtered = allocations.filter(
      (row) =>
        row.ticker.trim() ||
        row.expectedReturn ||
        row.userWeight ||
        row.factorExposures.some((value) => value)
    )

    if (filtered.length === 0) {
      setSimulationError('Add at least one asset to run the simulation.')
      return
    }

    const assets = []
    const expectedReturns = []
    const factorMatrix = []
    const userWeights = []
    const problems = []

    filtered.forEach((row, index) => {
      const ticker = row.ticker.trim().toUpperCase()
      const expectedReturn = parseNumber(row.expectedReturn) / 100
      const exposures = row.factorExposures.map((entry) => parseNumber(entry))
      const userWeight = parseNumber(row.userWeight) / 100

      if (!ticker) {
        problems.push(`Row ${index + 1}: add a ticker.`)
      }
      if (expectedReturn < 0) {
        problems.push(`Row ${index + 1}: expected return must be positive.`)
      }
      if (exposures.some((value) => value < 0)) {
        problems.push(`Row ${index + 1}: factor exposures must be positive.`)
      }
      if (userWeight < 0) {
        problems.push(`Row ${index + 1}: user weight must be positive.`)
      }

      if (ticker) {
        assets.push(ticker)
        expectedReturns.push(expectedReturn)
        factorMatrix.push(exposures)
        userWeights.push(userWeight)
      }
    })

    const riskFree = parseNumber(riskFreeRate) / 100
    const minW = parseNumber(minWeight) / 100
    const maxW = parseNumber(maxWeight) / 100
    const cashMinW = parseNumber(cashMinWeight) / 100
    const cashMaxW = parseNumber(cashMaxWeight) / 100
    const portfoliosTarget = Math.max(100, Math.round(parseNumber(numPortfolios)))

    if (!assets.includes('CASH')) {
      problems.push('Include a CASH row to apply cash weight constraints.')
    }

    if (minW < 0 || maxW <= 0 || minW > maxW) {
      problems.push('Stock weight limits are invalid.')
    }
    if (cashMinW < 0 || cashMaxW < 0 || cashMinW > cashMaxW) {
      problems.push('Cash weight limits are invalid.')
    }

    const factorWeights = riskFactorWeights.map((value) => parseNumber(value))
    if (factorWeights.length !== riskFactors.length || factorWeights.some((value) => value < 0)) {
      problems.push('Risk factor weights must be non-negative for each factor.')
    }

    const userWeightTotal = userWeights.reduce((sum, value) => sum + value, 0)
    if (userWeightTotal > 0 && Math.abs(userWeightTotal - 1) > 0.001) {
      problems.push(`User-defined weights must sum to 100%. Current total: ${(userWeightTotal * 100).toFixed(2)}%.`)
    }

    if (problems.length > 0) {
      setSimulationError(problems.join(' '))
      return
    }

    const cashIndex = assets.indexOf('CASH')
    if (cashIndex === -1) {
      setSimulationError('Include a CASH row to apply cash weight constraints.')
      return
    }

    const factorCount = riskFactors.length
    const factorSums = Array.from({ length: factorCount }, (_, idx) =>
      factorMatrix.reduce((sum, row) => sum + (row[idx] || 0), 0)
    )

    const normalizedFactors = factorMatrix.map((row, rowIndex) => {
      if (assets[rowIndex] === 'CASH') {
        return Array.from({ length: factorCount }, () => 0)
      }
      return row.map((value, idx) => (factorSums[idx] > 0 ? value / factorSums[idx] : 0))
    })

    const factorMeans = Array.from({ length: factorCount }, (_, idx) =>
      normalizedFactors.reduce((sum, row) => sum + row[idx], 0) / normalizedFactors.length
    )

    const centeredFactors = normalizedFactors.map((row) =>
      row.map((value, idx) => value - factorMeans[idx])
    )

    const covarianceFactors = Array.from({ length: factorCount }, () =>
      Array.from({ length: factorCount }, () => 0)
    )

    const denominator = Math.max(normalizedFactors.length - 1, 1)
    for (let i = 0; i < factorCount; i += 1) {
      for (let j = 0; j < factorCount; j += 1) {
        covarianceFactors[i][j] =
          centeredFactors.reduce((sum, row) => sum + row[i] * row[j], 0) / denominator
      }
    }

    const weightedFactors = covarianceFactors.map((row, i) =>
      row.map((value, j) => value * factorWeights[i] * factorWeights[j])
    )

    const compositeMatrix = Array.from({ length: assets.length }, () =>
      Array.from({ length: assets.length }, () => 0)
    )

    for (let i = 0; i < assets.length; i += 1) {
      for (let j = 0; j < assets.length; j += 1) {
        let sum = 0
        for (let k = 0; k < factorCount; k += 1) {
          for (let l = 0; l < factorCount; l += 1) {
            sum += normalizedFactors[i][k] * weightedFactors[k][l] * normalizedFactors[j][l]
          }
        }
        compositeMatrix[i][j] = sum
      }
    }

    const simulations = []
    let samplesGenerated = 0
    let attempts = 0
    const maxAttempts = portfoliosTarget * 50

    while (samplesGenerated < portfoliosTarget && attempts < maxAttempts) {
      attempts += 1
      const rawWeights = assets.map(() => Math.random())
      const total = rawWeights.reduce((sum, value) => sum + value, 0)
      const weights = rawWeights.map((value) => value / total)

      const cashWeight = weights[cashIndex]
      const otherWeights = weights.filter((_, idx) => idx !== cashIndex)

      const stockConstraintsMet =
        otherWeights.every((value) => value >= minW && value <= maxW) &&
        cashWeight >= cashMinW &&
        cashWeight <= cashMaxW

      if (!stockConstraintsMet) {
        continue
      }

      const expectedReturn = weights.reduce(
        (sum, weight, idx) => sum + weight * expectedReturns[idx],
        0
      )
      let variance = 0
      for (let i = 0; i < weights.length; i += 1) {
        for (let j = 0; j < weights.length; j += 1) {
          variance += weights[i] * compositeMatrix[i][j] * weights[j]
        }
      }
      const volatility = Math.sqrt(Math.max(variance, 0))
      const sharpe = volatility > 0 ? (expectedReturn - riskFree) / volatility : 0

      simulations.push({ weights, expectedReturn, volatility, sharpe })
      samplesGenerated += 1
    }

    if (simulations.length === 0) {
      setSimulationError('Unable to generate portfolios with the provided constraints.')
      return
    }

    const maxSharpe = simulations.reduce((best, current) =>
      current.sharpe > best.sharpe ? current : best
    )
    const minVol = simulations.reduce((best, current) =>
      current.volatility < best.volatility ? current : best
    )

    const formatWeights = (weights) =>
      weights
        .map((weight, idx) => ({ ticker: assets[idx], weight }))
        .sort((a, b) => b.weight - a.weight)

    const sharpeValues = simulations.map((item) => item.sharpe)
    const volValues = simulations.map((item) => item.volatility)
    const minSharpeValue = Math.min(...sharpeValues)
    const maxSharpeValue = Math.max(...sharpeValues)
    const minVolValue = Math.min(...volValues)
    const maxVolValue = Math.max(...volValues)

    const getCompositeRatio = (sharpe) =>
      maxSharpeValue === minSharpeValue ? 0 : (sharpe - minSharpeValue) / (maxSharpeValue - minSharpeValue)
    const getCompositeRisk = (volatility) =>
      maxVolValue === minVolValue ? 0 : (volatility - minVolValue) / (maxVolValue - minVolValue)

    const buildHoverLines = (weights, expectedReturn, volatility, sharpe) => [
      `Composite Ratio: ${getCompositeRatio(sharpe).toFixed(3)}`,
      `Return: ${(expectedReturn * 100).toFixed(2)}%`,
      `Volatility: ${(volatility * 100).toFixed(2)}%`,
      '',
      ...weights.map((weight, idx) => `${assets[idx]}: ${(weight * 100).toFixed(2)}%`),
    ]

    const simulationPoints = simulations.map((item) => {
      const compositeRatio = getCompositeRatio(item.sharpe)
      return {
        x: getCompositeRisk(item.volatility),
        y: item.expectedReturn,
        hoverLines: buildHoverLines(item.weights, item.expectedReturn, item.volatility, item.sharpe),
        color: getColorFromScale(compositeRatio),
      }
    })

    const buildStarPoint = (item, label) => ({
      x: getCompositeRisk(item.volatility),
      y: item.expectedReturn,
      hoverLines: buildHoverLines(item.weights, item.expectedReturn, item.volatility, item.sharpe),
      label,
      compositeRatio: getCompositeRatio(item.sharpe),
    })

    const computeUserMetrics = () => {
      if (userWeightTotal <= 0) {
        return null
      }
      let userVariance = 0
      for (let i = 0; i < userWeights.length; i += 1) {
        for (let j = 0; j < userWeights.length; j += 1) {
          userVariance += userWeights[i] * compositeMatrix[i][j] * userWeights[j]
        }
      }
      const userReturn = userWeights.reduce(
        (sum, weight, idx) => sum + weight * expectedReturns[idx],
        0
      )
      const userVolatility = Math.sqrt(Math.max(userVariance, 0))
      const userSharpe = userVolatility > 0 ? (userReturn - riskFree) / userVolatility : 0
      return {
        expectedReturn: userReturn,
        volatility: userVolatility,
        sharpe: userSharpe,
        weights: formatWeights(userWeights),
        rawWeights: userWeights,
      }
    }

    const userMetrics = computeUserMetrics()
    if (userMetrics) {
      userMetrics.compositeRatio = getCompositeRatio(userMetrics.sharpe)
    }
    const starRadius = 22
    const starBorderWidth = 4
    const chartData = {
      datasets: [
        {
          label: 'Portfolio Simulations',
          data: simulationPoints.map((point) => ({ x: point.x, y: point.y, hoverLines: point.hoverLines })),
          backgroundColor: simulationPoints.map((point) => point.color),
          pointRadius: 4,
          order: 3,
        },
        {
          label: 'Max Composite Ratio',
          data: [buildStarPoint(maxSharpe, 'Max Composite Ratio')],
          backgroundColor: '#dc2626',
          pointRadius: starRadius,
          pointStyle: 'star',
          pointBorderWidth: starBorderWidth,
          pointBorderColor: '#dc2626',
          pointHoverRadius: starRadius + 4,
          order: 1,
        },
        {
          label: 'Min Volatility',
          data: [buildStarPoint(minVol, 'Min Volatility')],
          backgroundColor: '#2563eb',
          pointRadius: starRadius,
          pointStyle: 'star',
          pointBorderWidth: starBorderWidth,
          pointBorderColor: '#2563eb',
          pointHoverRadius: starRadius + 4,
          order: 1,
        },
      ],
    }

    if (userMetrics) {
      chartData.datasets.push({
        label: 'User-Defined Portfolio',
        data: [
          {
            x: getCompositeRisk(userMetrics.volatility),
            y: userMetrics.expectedReturn,
            hoverLines: buildHoverLines(
              userMetrics.rawWeights,
              userMetrics.expectedReturn,
              userMetrics.volatility,
              userMetrics.sharpe
            ),
            compositeRatio: getCompositeRatio(userMetrics.sharpe),
          },
        ],
        backgroundColor: '#16a34a',
        pointRadius: starRadius,
        pointStyle: 'star',
        pointBorderWidth: starBorderWidth,
        pointBorderColor: '#16a34a',
        pointHoverRadius: starRadius + 4,
        order: 1,
      })
    }

    setSimulationChart(chartData)
    setSimulationResult({
      totalSamples: simulations.length,
      maxSharpe: {
        ...maxSharpe,
        weights: formatWeights(maxSharpe.weights),
        compositeRatio: getCompositeRatio(maxSharpe.sharpe),
      },
      minVol: {
        ...minVol,
        weights: formatWeights(minVol.weights),
        compositeRatio: getCompositeRatio(minVol.sharpe),
      },
      userDefined: userMetrics,
    })
  }

  const handleGeneratePlan = () => {
    setError('')
    setPlan(null)

    const filtered = holdings.filter(
      (row) => row.ticker.trim() || row.currentValue || row.targetWeight
    )

    if (filtered.length === 0) {
      setError('Add at least one holding to generate a plan.')
      return
    }

    const currentValues = {}
    const targetWeights = {}
    const problems = []

    filtered.forEach((row, index) => {
      const ticker = row.ticker.trim().toUpperCase()
      const currentValue = parseNumber(row.currentValue)
      const targetPercent = parseNumber(row.targetWeight)

      if (!ticker) {
        problems.push(`Row ${index + 1}: add a ticker.`)
      }
      if (currentValue < 0) {
        problems.push(`Row ${index + 1}: current value must be positive.`)
      }
      if (targetPercent < 0) {
        problems.push(`Row ${index + 1}: target percent must be positive.`)
      }

      if (ticker) {
        currentValues[ticker] = (currentValues[ticker] || 0) + currentValue
        targetWeights[ticker] = (targetWeights[ticker] || 0) + targetPercent / 100
      }
    })

    const cashValue = parseNumber(cash)
    const cashTarget = parseNumber(targetCashPercent) / 100

    if (cashValue < 0) {
      problems.push('Cash balance must be positive.')
    }
    if (cashTarget < 0) {
      problems.push('Target cash percent must be positive.')
    }

    if (cashTarget > 0) {
      targetWeights.CASH = cashTarget
    }

    if (problems.length > 0) {
      setError(problems.join(' '))
      return
    }

    const totalPercent = totalTargetPercent
    if (Math.abs(totalPercent - 100) > 0.01) {
      setError(`Target percentages must sum to 100%. Current total: ${totalPercent.toFixed(2)}%.`)
      return
    }

    try {
      const result = rebalanceExecutionPlan({
        currentValues,
        targetWeights,
        cash: cashValue,
        transactionCostPct: parseNumber(transactionCostPct) / 100,
      })
      setPlan(result)
    } catch (err) {
      setError(err.message)
    }
  }

  const isGrowthValid = isPositiveValue(epsGrowthRate)
  const isMultipleValid = isPositiveValue(appropriateMultiple)
  const desiredReturnValue = parseNumber(desiredReturn)

  return (
    <main className="min-h-screen bg-white text-black pt-28">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="p-8"
      >
        {loggedIn ? (
          <>


            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="max-w-6xl mx-auto w-full px-6 pb-16">
                <div className="mb-10">
                  <h1 className="text-4xl font-bold text-[#082C16] mb-3">Tools</h1>
                </div>

                <section className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm mb-12">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                      <h2 className="text-xl font-semibold text-[#082C16] mb-5">Assumptions</h2>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Price
                          </label>
                          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
                            <span className="text-gray-500">$</span>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={currentPrice}
                              onChange={(event) => setCurrentPrice(event.target.value)}
                              className="w-full bg-transparent outline-none text-gray-900"
                              placeholder="0.00"
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            The current market price per share.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            EPS (TTM)
                          </label>
                          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
                            <span className="text-gray-500">$</span>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={epsTTM}
                              onChange={(event) => setEpsTTM(event.target.value)}
                              className="w-full bg-transparent outline-none text-gray-900"
                              placeholder="0.00"
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            The Earnings Per Share over the last 12 months.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            EPS Growth Rate
                          </label>
                          <div
                            className={`flex items-center gap-2 border rounded-lg px-3 py-2 bg-white ${
                              isGrowthValid ? 'border-emerald-500' : 'border-gray-300'
                            }`}
                          >
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={epsGrowthRate}
                              onChange={(event) => setEpsGrowthRate(event.target.value)}
                              className="w-full bg-transparent outline-none text-gray-900"
                              placeholder="0"
                            />
                            <span
                              className={`text-emerald-500 text-lg font-semibold ${
                                isGrowthValid ? 'opacity-100' : 'opacity-0'
                              }`}
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                            <span className="text-gray-500">%</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Your assumption of the company&apos;s expected yearly EPS growth rate.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Appropriate EPS Multiple
                          </label>
                          <div
                            className={`flex items-center gap-2 border rounded-lg px-3 py-2 bg-white ${
                              isMultipleValid ? 'border-emerald-500' : 'border-gray-300'
                            }`}
                          >
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={appropriateMultiple}
                              onChange={(event) => setAppropriateMultiple(event.target.value)}
                              className="w-full bg-transparent outline-none text-gray-900"
                              placeholder="0"
                            />
                            <span
                              className={`text-emerald-500 text-lg font-semibold ${
                                isMultipleValid ? 'opacity-100' : 'opacity-0'
                              }`}
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            The PE ratio you consider appropriate for the stock to trade at.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Desired Return
                          </label>
                          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={desiredReturn}
                              onChange={(event) => setDesiredReturn(event.target.value)}
                              className="w-full bg-transparent outline-none text-gray-900"
                              placeholder="0"
                            />
                            <span className="text-gray-500">%</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            The annualized return you aim to achieve from the stock.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                      <h2 className="text-xl font-semibold text-[#082C16] mb-5">5-Year Projection</h2>
                      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-4">
                          Calculation Results
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2 text-sm text-gray-700">
                          <div>
                            <p className="text-gray-500">Return from today&apos;s price</p>
                            <p className="text-lg font-semibold text-[#082C16]">
                              {(projection.cagr * 100).toFixed(2)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">
                              Entry price for {desiredReturnValue.toFixed(0)}% return
                            </p>
                            <p className="text-lg font-semibold text-[#082C16]">
                              {formatCurrency(projection.entryPrice)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl p-5">
                        <Line data={projectionChartData} options={projectionChartOptions} />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-[#082C16]">Portfolio Rebalancer</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Enter current values and target percentages for each holding.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cash Balance ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={cash}
                          onChange={(event) => setCash(event.target.value)}
                          className="w-48 border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Target Cash (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={targetCashPercent}
                          onChange={(event) => setTargetCashPercent(event.target.value)}
                          className="w-40 border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Transaction Cost (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={transactionCostPct}
                          onChange={(event) => setTransactionCostPct(event.target.value)}
                          className="w-40 border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-gray-100 text-gray-600">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Ticker</th>
                          <th className="px-4 py-3 font-semibold">Current Value ($)</th>
                          <th className="px-4 py-3 font-semibold">Target %</th>
                          <th className="px-4 py-3 font-semibold"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {holdings.map((row) => (
                          <tr key={row.id} className="border-t border-gray-200">
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={row.ticker}
                                onChange={(event) => updateHolding(row.id, 'ticker', event.target.value)}
                                className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="AAPL"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={row.currentValue}
                                onChange={(event) => updateHolding(row.id, 'currentValue', event.target.value)}
                                className="w-48 border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="0.00"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={row.targetWeight}
                                onChange={(event) => updateHolding(row.id, 'targetWeight', event.target.value)}
                                className="w-32 border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="0"
                              />
                            </td>
                            <td className="px-4 py-3">
                              {holdings.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeHolding(row.id)}
                                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                                >
                                  Remove
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={addHolding}
              className="inline-flex items-center justify-center px-4 py-2 border border-emerald-600 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-50"
            >
              Add Holding
            </button>
            <div className="text-sm text-gray-500">
              Target total: <span className="font-semibold">{totalTargetPercent.toFixed(2)}%</span>
            </div>
            <button
              type="button"
              onClick={handleGeneratePlan}
              className="inline-flex items-center justify-center px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
            >
              Generate Rebalance Plan
            </button>
          </div>

          {error && <p className="mt-4 text-sm text-red-600 font-semibold">{error}</p>}

          {plan && (
            <div className="mt-10 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-[#082C16] mb-3">Step-by-Step Plan</h3>
                <ol className="space-y-2 text-gray-700">
                  {plan.steps.length > 0 ? (
                    plan.steps.map((step, index) => {
                      const toneStyles = {
                        buy: 'bg-emerald-50 border-emerald-200 text-emerald-900',
                        sell: 'bg-rose-50 border-rose-200 text-rose-900',
                        note: 'bg-gray-50 border-gray-200 text-gray-600',
                      }
                      const toneClass = toneStyles[step.type] || toneStyles.note
                      return (
                        <li key={`${step.text}-${index}`} className={`border rounded-xl p-3 ${toneClass}`}>
                          {step.text}
                        </li>
                      )
                    })
                  ) : (
                    <li className="text-gray-500">No trades required. Portfolio is already balanced.</li>
                  )}
                </ol>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <h4 className="font-semibold text-[#082C16] mb-3">Buy Summary</h4>
                  {Object.keys(plan.buyDollars).length === 0 ? (
                    <p className="text-sm text-gray-500">No buys required.</p>
                  ) : (
                    <ul className="space-y-2 text-sm text-gray-700">
                      {Object.entries(plan.buyDollars).map(([ticker, value]) => (
                        <li key={ticker} className="flex items-center justify-between">
                          <span>{ticker}</span>
                          <span className="font-semibold">{formatCurrency(value)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <h4 className="font-semibold text-[#082C16] mb-3">Sell Summary</h4>
                  {Object.keys(plan.sellDollars).length === 0 ? (
                    <p className="text-sm text-gray-500">No sells required.</p>
                  ) : (
                    <ul className="space-y-2 text-sm text-gray-700">
                      {Object.entries(plan.sellDollars).map(([ticker, value]) => (
                        <li key={ticker} className="flex items-center justify-between">
                          <span>{ticker}</span>
                          <span className="font-semibold">{formatCurrency(value)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h4 className="font-semibold text-[#082C16] mb-3">Projected Allocation</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  {Object.entries(plan.finalValues)
                    .sort(([tickerA], [tickerB]) => plan.finalWeights[tickerB] - plan.finalWeights[tickerA])
                    .map(([ticker, value]) => (
                      <div key={ticker} className="flex items-center justify-between text-sm text-gray-700">
                        <span>{ticker}</span>
                        <span className="font-semibold">
                          {formatCurrency(value)} ({(plan.finalWeights[ticker] * 100).toFixed(2)}%)
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <h4 className="font-semibold text-[#082C16] mb-3">Capital Gains Tax Impact</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Enter the cost basis and current value for each sold position to estimate tax owed.
                </p>
                {taxBreakdown.rows.length === 0 ? (
                  <p className="text-sm text-gray-500">No sells required, so no tax impact.</p>
                ) : (
                  <div className="grid gap-4">
                    {taxBreakdown.rows.map((row) => (
                      <div
                        key={row.ticker}
                        className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                          <h5 className="font-semibold text-[#082C16]">{row.ticker}</h5>
                          <span className="text-xs text-gray-500">
                            Planned sell: {formatCurrency(plan.sellDollars[row.ticker])}
                          </span>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Initial Value ($)
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={taxInputs[row.ticker]?.initialValue ?? ''}
                              onChange={(event) =>
                                updateTaxInput(row.ticker, 'initialValue', event.target.value)
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2"
                              placeholder="0.00"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Final/Current Value ($)
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={taxInputs[row.ticker]?.finalValue ?? ''}
                              onChange={(event) =>
                                updateTaxInput(row.ticker, 'finalValue', event.target.value)
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2"
                              placeholder="0.00"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Amount Sold ($)
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={taxInputs[row.ticker]?.amountSold ?? ''}
                              onChange={(event) =>
                                updateTaxInput(row.ticker, 'amountSold', event.target.value)
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2"
                              placeholder="0.00"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Capital Gains Tax Rate (%)
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={taxInputs[row.ticker]?.taxRate ?? ''}
                              onChange={(event) =>
                                updateTaxInput(row.ticker, 'taxRate', event.target.value)
                              }
                              className="w-full border border-gray-300 rounded-lg px-3 py-2"
                              placeholder="0"
                            />
                          </div>
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-2 text-sm text-gray-700">
                          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
                            <span>Gain Realized</span>
                            <span className="font-semibold">{formatCurrency(row.gainRealized)}</span>
                          </div>
                          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
                            <span>Tax Owed</span>
                            <span className="font-semibold">{formatCurrency(row.taxOwed)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 grid gap-3 md:grid-cols-2 text-sm text-gray-700">
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
                    <span>Total Capital Gains</span>
                    <span className="font-semibold">{formatCurrency(taxBreakdown.totalGains)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
                    <span>Total Estimated Tax Owed</span>
                    <span className="font-semibold">{formatCurrency(taxBreakdown.totalTax)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
                    <span>AUM (cash + positions)</span>
                    <span className="font-semibold">{formatCurrency(aumValue)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
                    <span>Tax as % of AUM</span>
                    <span className="font-semibold">{taxOwedPctOfAum.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm mt-12">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#082C16]">Project Optimum</h2>
            <p className="text-sm text-gray-500 mt-1">
              Input expected returns and risk parameters to simulate the optimal risk to reward portfolios.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-[#082C16] mb-4">Portfolio Constraints</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Risk-Free Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={riskFreeRate}
                    onChange={(event) => setRiskFreeRate(event.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfolios</label>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    value={numPortfolios}
                    onChange={(event) => setNumPortfolios(event.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Min Weight (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={minWeight}
                    onChange={(event) => setMinWeight(event.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Max Weight (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={maxWeight}
                    onChange={(event) => setMaxWeight(event.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cash Min Weight (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={cashMinWeight}
                    onChange={(event) => setCashMinWeight(event.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cash Max Weight (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={cashMaxWeight}
                    onChange={(event) => setCashMaxWeight(event.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-[#082C16] mb-4">Risk Factor Weights</h3>
              <div className="grid grid-cols-2 gap-4">
                {riskFactors.map((factor, index) => (
                  <div key={factor}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {factor}
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={riskFactorWeights[index]}
                      onChange={(event) => updateRiskFactorWeight(index, event.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-[#082C16] mb-4">Asset Parameters</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-gray-600 border-b border-gray-300">
                  <tr>
                    <th className="px-3 py-2 font-semibold whitespace-nowrap">Ticker</th>
                    <th className="px-3 py-2 font-semibold whitespace-nowrap">Expected Return (%)</th>
                    {riskFactors.map((factor) => (
                      <th key={factor} className="px-3 py-2 font-semibold text-center whitespace-nowrap">                        {factor}
                      </th>
                    ))}
                    <th className="px-3 py-2 font-semibold whitespace-nowrap">User Weight (%)</th>
                    <th className="px-3 py-2 font-semibold whitespace-nowrap"></th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((row, idx) => (
                    <tr key={row.id} className={idx > 0 ? 'border-t border-gray-200' : ''}>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={row.ticker}
                          onChange={(event) => updateAllocation(row.id, 'ticker', event.target.value)}
                          className="w-20 border border-gray-300 rounded-lg px-2 py-1.5 text-sm"
                          placeholder="AAPL"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={row.expectedReturn}
                          onChange={(event) => updateAllocation(row.id, 'expectedReturn', event.target.value)}
                          className="w-24 border border-gray-300 rounded-lg px-2 py-1.5 text-sm"
                          placeholder="0.00"
                        />
                      </td>
                      {row.factorExposures.map((value, index) => (
                        <td key={`${row.id}-${riskFactors[index]}`} className="px-3 py-2">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={value}
                            onChange={(event) => updateAllocationExposure(row.id, index, event.target.value)}
                            className="w-20 border border-gray-300 rounded-lg px-2 py-1.5 text-sm"
                            placeholder="0.00"
                          />
                        </td>
                      ))}
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={row.userWeight}
                          onChange={(event) => updateAllocation(row.id, 'userWeight', event.target.value)}
                          className="w-24 border border-gray-300 rounded-lg px-2 py-1.5 text-sm"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-3 py-2">
                        {allocations.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAllocation(row.id)}
                            className="text-xs font-semibold text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={addAllocation}
              className="inline-flex items-center justify-center px-4 py-2 border border-emerald-600 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-50"
            >
              Add Asset
            </button>
            <button
              type="button"
              onClick={runMonteCarloSimulation}
              className="inline-flex items-center justify-center px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
            >
              Run Simulation
            </button>
          </div>

          {simulationError && <p className="mt-4 text-sm text-red-600 font-semibold">{simulationError}</p>}

          {simulationChart && (
            <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-[#082C16] mb-4">
                Efficient Frontier (Weighted Composite Risk)
              </h3>
              <Scatter data={simulationChart} options={simulationChartOptions} />
            </div>
          )}

          {simulationResult && (
            <div className="mt-8 space-y-6">
              <div className="text-sm text-gray-500">
                Generated portfolios: <span className="font-semibold">{simulationResult.totalSamples}</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <h4 className="font-semibold text-[#082C16] mb-2">Max Composite Ratio</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Return {(simulationResult.maxSharpe.expectedReturn * 100).toFixed(2)}% • Volatility{' '}
                    {(simulationResult.maxSharpe.volatility * 100).toFixed(2)}% • Composite Ratio{' '}
                    {simulationResult.maxSharpe.compositeRatio.toFixed(2)}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {simulationResult.maxSharpe.weights.map((item) => (
                      <li key={`max-${item.ticker}`} className="flex justify-between">
                        <span>{item.ticker}</span>
                        <span className="font-semibold">{(item.weight * 100).toFixed(2)}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                  <h4 className="font-semibold text-[#082C16] mb-2">Min Risk</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Return {(simulationResult.minVol.expectedReturn * 100).toFixed(2)}% • Volatility{' '}
                    {(simulationResult.minVol.volatility * 100).toFixed(2)}% • Composite Ratio{' '}
                    {simulationResult.minVol.compositeRatio.toFixed(2)}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {simulationResult.minVol.weights.map((item) => (
                      <li key={`min-${item.ticker}`} className="flex justify-between">
                        <span>{item.ticker}</span>
                        <span className="font-semibold">{(item.weight * 100).toFixed(2)}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {simulationResult.userDefined && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <h4 className="font-semibold text-[#082C16] mb-2">User-Defined Portfolio</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Return {(simulationResult.userDefined.expectedReturn * 100).toFixed(2)}% • Volatility{' '}
                    {(simulationResult.userDefined.volatility * 100).toFixed(2)}% • Composite Ratio{' '}
                    {simulationResult.userDefined.compositeRatio.toFixed(2)}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {simulationResult.userDefined.weights.map((item) => (
                      <li key={`user-${item.ticker}`} className="flex justify-between">
                        <span>{item.ticker}</span>
                        <span className="font-semibold">{(item.weight * 100).toFixed(2)}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
            </motion.div>
          </>
        ) : (
          <>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="w-full max-w-xl px-6 pb-16">
                <h1 className="text-3xl font-bold text-[#082C16] mb-6 text-center">Tools</h1>
                <Login onSuccess={() => setLoggedIn(true)} />
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </main>
  )
}
