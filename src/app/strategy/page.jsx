'use client'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

export default function Strategy() {
  return (
    <main className="min-h-screen bg-white text-black pt-24">
      <Navbar />

      {/* Page content entrance animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >

        <div className="max-w-5xl mx-auto py-20 px-4">

          {/* Animated Title */}
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our Investment Strategy
          </motion.h2>

          {/* Animated Body */}
          <motion.p
            className="text-lg leading-relaxed text-gray-700 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            At B.D. Sterling, we believe in investing with discipline, patience, and a long-term mindset. 
            Our strategy focuses on identifying companies with durable competitive advantages, strong fundamentals, and long growth runways. 
            We leverage a value-oriented approach to acquire high-quality businesses during temporary dislocations when prices do not reflect intrinsic value.
            <br /><br />
            We perform deep fundamental research, rigorous valuation modeling, and deep catalyst analysis to assess each opportunity. Our disciplined entry points allow us to minimize downside risk while maximizing upside potential as the market corrects inefficiencies over time.
            <br /><br />
            By avoiding speculative short-term trends and focusing on the underlying business quality, we aim to deliver sustainable returns through all market cycles.
          </motion.p>

        </div>
        
      </motion.div>
    </main>
  )
}
