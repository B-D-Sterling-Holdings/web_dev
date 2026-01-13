'use client'

import Plot from 'react-plotly.js'

export default function EfficientFrontierPlot({ simulationResult }) {
  if (!simulationResult) return null

  const {
    points,
    maxSharpe,
    minVol,
    userDefined,
    title = 'Efficient Frontier (Weighted Composite Risk)',
  } = simulationResult

  // Main scatter trace (portfolios)
  const scatter = {
    type: 'scattergl',
    mode: 'markers',
    x: points.map((p) => p.compositeRisk),
    y: points.map((p) => p.returns),
    text: points.map((p) => p.hoverText),
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      size: 5,
      color: points.map((p) => p.compositeRatio),
      cmin: 0,
      cmax: 1,
      colorscale: 'RdYlBu',
      colorbar: { title: 'Composite Ratio (0 to 1)' },
    },
    showlegend: false,
    name: 'Portfolio Simulations',
  }

  const stars = []

  if (maxSharpe) {
    stars.push({
      type: 'scatter',
      mode: 'markers+text',
      x: [maxSharpe.compositeRisk],
      y: [maxSharpe.returns],
      text: ['Max Composite Ratio'],
      textposition: 'top center',
      marker: { size: 14, symbol: 'star', color: 'red' },
      textfont: { color: 'red' },
      hovertext: [maxSharpe.hoverText],
      hovertemplate: '%{hovertext}<extra></extra>',
      name: 'Max Composite Portfolio',
    })
  }

  if (minVol) {
    stars.push({
      type: 'scatter',
      mode: 'markers+text',
      x: [minVol.compositeRisk],
      y: [minVol.returns],
      text: ['Min Volatility'],
      textposition: 'top center',
      marker: { size: 14, symbol: 'star', color: 'blue' },
      textfont: { color: 'blue' },
      hovertext: [minVol.hoverText],
      hovertemplate: '%{hovertext}<extra></extra>',
      name: 'Min Volatility Portfolio',
    })
  }

  if (userDefined) {
    stars.push({
      type: 'scatter',
      mode: 'markers+text',
      x: [userDefined.compositeRisk],
      y: [userDefined.returns],
      text: ['Your Portfolio'],
      textposition: 'top center',
      marker: { size: 14, symbol: 'star', color: 'green' },
      textfont: { color: 'green' },
      hovertext: [userDefined.hoverText],
      hovertemplate: '%{hovertext}<extra></extra>',
      name: 'User-Defined Portfolio',
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 shadow-sm">
      <Plot
        data={[scatter, ...stars]}
        layout={{
          title,
          xaxis: { title: 'Composite Risk (0 to 1)' },
          yaxis: { title: 'Expected Return' },
          margin: { l: 60, r: 30, t: 60, b: 60 },
          hovermode: 'closest',
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
        }}
        config={{ displayModeBar: true, responsive: true }}
        style={{ width: '100%', height: '520px' }}
        useResizeHandler
      />
    </div>
  )
}
