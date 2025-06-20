'use client'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function Research() {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },  // start off-screen & transparent
    rest:   { opacity: 1, y: 0 },   // normal state after load
    hover:  { scale: 1.03 },        // subtle zoom (or y: -5 if you prefer)
  }
  
  const companies = [
    {
      name: 'Google (Alphabet Inc)',
      href: '/research/google',
      logo: 'google.jpg',
      summary: 'We invested in Alphabet due to its dominant ad business and cloud growth.',
    },
    {
      name: 'Amazon',
      href: '/research/amazon',
      logo: 'amazon-logo.jpg',
      summary: 'Amazon’s logistics moat and AWS leadership made it a long-term play.',
    },
    {
      name: 'United Healthcare',
      href: '/research/unitedhealthcare',
      logo: 'UNH-logo.jpg',
      summary: 'We see UH as a resilient healthcare compounder with scalable margins.',
    },
  ]

  return (
    <main className="min-h-screen bg-white text-black pt-28">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="max-w-5xl mx-auto py-14 px-4">
          {/* Title */}
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Equity Research
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-lg text-center text-gray-700 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Below are research reports for select companies we have covered in the past.
          </motion.p>

          {/* Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company, index) => (
              <Link key={company.name} href={company.href}>
                <motion.div
                  /* 1️⃣  use the variants */
                  variants={cardVariants}
                  initial="hidden"            /* page-load start */
                  animate="rest"              /* page-load finish */
                  whileHover="hover"          /* interactive state */
                  transition={{
                    duration: 0.7,
                    delay: 0.7 + index * 0.2, /* stagger L → R */
                    ease: 'easeOut',
                  }}
                  className="relative w-full min-h-[300px] overflow-hidden rounded-2xl border border-gray-300 shadow-md hover:shadow-xl cursor-pointer"
                >
                  {/* Base (logo + name) */}
                  <motion.div
                    variants={{
                      rest:  { opacity: 1,  y: 0  },
                      hover: { opacity: 0.2, y: -10 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center h-full p-6 text-center"
                  >
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="h-42 object-contain mb-4"
                    />
                    <h3 className="text-xl font-semibold">
                      {company.name}
                    </h3>
                  </motion.div>

                  {/* Hover overlay with summary */}
                  <motion.div
                    variants={{
                      rest:  { opacity: 0, y: 20 },
                      hover: { opacity: 1, y: 0  },
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center bg-white px-4 text-center"
                  >
                    <p className="text-md text-gray-800 font-medium">
                      {company.summary}
                    </p>
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  )
}
