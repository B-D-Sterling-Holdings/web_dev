'use client'
import { useState } from 'react'
import SheetTable from '@/components/SheetTable'
import Login from '@/components/login'

export default function InvestorRelations() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      
      {/* Global Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold">B.D. Sterling</span>
        </div>

        {/* Nav Links */}
        <div className="flex space-x-8 text-lg font-medium">
          <a href="/" className="hover:text-blue-600">Home</a>
          <a href="/about" className="hover:text-blue-600">About Us</a>
          <a href="/strategy" className="hover:text-blue-600">Investment Strategy</a>
          <a href="/research" className="hover:text-blue-600">Equity Research</a>
          <a href="/investor-relations" className="hover:text-blue-600">Investor Relations</a>
          <a href="/contact" className="hover:text-blue-600">Contact Us</a>
        </div>
      </nav>

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
                Investor Portfolio Analytics
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
          </>
        )}
      </div>
    </main>
  )
}
