'use client'
import { useState } from 'react'
import SheetTable from '@/components/SheetTable'
import Login from '@/components/login'
import Navbar from '@/components/Navbar'

export default function InvestorRelations() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <main className="min-h-screen bg-white text-black">
      
      <Navbar/>

      {/* Main Content */}
      <div className="p-8">
        {loggedIn ? (
          <>
            <div className="relative mb-6">
              <h1 className="text-center text-2xl font-bold">
                Amit Datta's Portfolio Analytics
              </h1>
            </div>
            <div className="flex justify-center">
              <SheetTable />
            </div>
          </>
        ) : (
          <>
            <div className="relative mb-6">
              <h1 className="text-center text-2xl font-bold">
                Portfolio Analytics
              </h1>
            </div>
            <div className="flex justify-center">
              <Login onSuccess={() => setLoggedIn(true)} />
            </div>
          </>
        )}
      </div>
    </main>
  )
}
