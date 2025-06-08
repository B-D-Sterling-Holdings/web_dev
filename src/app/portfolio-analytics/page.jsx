'use client'
import { useState } from 'react'
import SheetTable from '@/components/SheetTable'
import Login from '@/components/login'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

export default function InvestorRelations() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <main className="min-h-screen bg-white text-black pt-28">
      
      <Navbar />

      {/* Page Content Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="p-8"
      >
        {loggedIn ? (
          <>
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-center text-2xl font-bold">
                Amit Datta's Portfolio Analytics
              </h1>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <SheetTable />
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-center text-2xl font-bold">
                Portfolio Analytics
              </h1>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Login onSuccess={() => setLoggedIn(true)} />
            </motion.div>
          </>
        )}
      </motion.div>
    </main>
  )
}
