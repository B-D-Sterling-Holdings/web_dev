'use client'
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

export default function CorrelationHeatmap({ tickers, matrix }) {
  if (!tickers || !matrix || tickers.length === 0) return null

  const data = [
    {
      z: matrix,
      x: tickers,
      y: tickers,
      type: 'heatmap',
      colorscale: [
        [0.0, '#7f1d1d'],
        [0.1, '#dc2626'],
        [0.2, '#f87171'],
        [0.35, '#fca5a5'],
        [0.5, '#fafaf9'],
        [0.65, '#6ee7b7'],
        [0.8, '#34d399'],
        [0.9, '#059669'],
        [1.0, '#064e3b'],
      ],
      zmin: -1,
      zmax: 1,
      text: matrix.map(row => row.map(v => v.toFixed(2))),
      texttemplate: '%{text}',
      textfont: { size: 11, family: 'Plus Jakarta Sans' },
      hovertemplate: '%{x} vs %{y}: %{z:.3f}<extra></extra>',
      showscale: true,
      colorbar: {
        title: { text: 'Corr', font: { size: 11, family: 'Plus Jakarta Sans' } },
        thickness: 12,
        len: 0.8,
        tickfont: { size: 10 },
      },
    },
  ]

  const layout = {
    margin: { t: 30, b: 60, l: 60, r: 20 },
    xaxis: {
      tickfont: { size: 11, family: 'Plus Jakarta Sans' },
      tickangle: -45,
    },
    yaxis: {
      tickfont: { size: 11, family: 'Plus Jakarta Sans' },
      autorange: 'reversed',
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Correlation Matrix</h3>
      <Plot
        data={data}
        layout={layout}
        config={{ displayModeBar: false, responsive: true }}
        style={{ width: '100%', height: '400px' }}
        useResizeHandler
      />
    </div>
  )
}
