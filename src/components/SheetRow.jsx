'use client'
import { useState, useEffect } from 'react'

export default function SheetRow() {
  const [row, setRow] = useState(null)

  useEffect(() => {
    fetch('/api/sheet')
      .then(res => res.json())
      .then(data => {
        // data is [[…]]; grab the first (and only) row
        setRow(data[0] || [])
      })
  }, [])

  if (!row) return <p>Loading…</p>

  return (
    <div className="flex gap-4">
      {row.map((cell, i) => (
        <div key={i} className="border p-2">
          {cell}
        </div>
      ))}
    </div>
  )
}
