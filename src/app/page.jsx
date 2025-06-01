'use client'
import { useState } from 'react'
import SheetTable from '@/components/SheetTable'
import Login from '@/components/login'

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)

  if (!loggedIn) {
    return (
      <main className="p-8">
        <div className="relative mb-6">
          <h1 className="text-center text-2xl font-bold">
            Amit Datta's Portfolio Analytics
          </h1>
          <img
            src="/logo.png"
            alt="Logo"
            className="absolute -top-4 right-0 h-16 w-auto"
          />
        </div>
        <div className="flex justify-center">
          <Login onSuccess={() => setLoggedIn(true)} />
        </div>
      </main>
    )
  }

  return (
    <main className="p-8">
      <div className="relative mb-6">
        <h1 className="text-center text-2xl font-bold">
          Amit Datta's Portfolio Analytics
        </h1>
        <img
          src="/logo.png"
          alt="Logo"
          className="absolute -top-4 right-0 h-16 w-auto"
        />
      </div>
      <div className="flex justify-center">
        <SheetTable />
      </div>
    </main>
  )
}
