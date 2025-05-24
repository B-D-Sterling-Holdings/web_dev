'use client'
import { useState, useEffect } from 'react'

export default function SheetTable() {
  const [sheet, setSheet] = useState({ header: [], data: [] })
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/sheet')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(obj => setSheet(obj))
      .catch(err => {
        console.error('Fetch /api/sheet failed:', err)
        setError(err.message)
      })
  }, [])

  const { header, data } = sheet

  if (error) return <p className="text-red-600">Error: {error}</p>
  if (!header.length) return <p>Loading…</p>

  return (
    <table className="table-auto border-collapse border border-gray-400">
      <thead>
        <tr>
          {header.map((col, i) => (
            <th
              key={i}
              className="border border-gray-400 px-4 py-2 text-center bg-gray-100"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {data.map((cell, i) => {
            const isGreen = i >= 4 && i <= 6
            return (
              <td
                key={i}
                className={
                  `border border-gray-400 px-4 py-2 text-center ` +
                  (isGreen ? 'bg-green-200' : '')
                }
              >
                {cell}
              </td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}
