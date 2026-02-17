'use client'
import dynamic from 'next/dynamic'
import { SECTOR_COLORS } from '@/lib/constants'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

export default function SectorPieChart({ sectorData }) {
  if (!sectorData) return null

  const sectors = Object.keys(sectorData)
  const values = sectors.map(s => sectorData[s].value)
  const colors = sectors.map(s => SECTOR_COLORS[s] || '#94a3b8')

  const data = [
    {
      labels: sectors,
      values,
      type: 'pie',
      hole: 0.55,
      marker: { colors },
      textinfo: 'label+percent',
      textposition: 'outside',
      textfont: { size: 11, family: 'Plus Jakarta Sans' },
      hovertemplate: '%{label}<br>$%{value:,.0f}<br>%{percent}<extra></extra>',
      pull: sectors.map(() => 0.02),
    },
  ]

  const layout = {
    margin: { t: 20, b: 20, l: 20, r: 20 },
    showlegend: false,
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    annotations: [
      {
        text: 'Sectors',
        showarrow: false,
        font: { size: 14, family: 'Plus Jakarta Sans', color: '#374151' },
      },
    ],
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Sector Allocation</h3>
      <Plot
        data={data}
        layout={layout}
        config={{ displayModeBar: false, responsive: true }}
        style={{ width: '100%', height: '360px' }}
        useResizeHandler
      />
    </div>
  )
}
