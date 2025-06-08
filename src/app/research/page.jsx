'use client'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

export default function Research() {
  return (
    <main className="min-h-screen bg-white text-black pt-28">
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
            Equity Research
          </motion.h2>

          {/* Animated Subtext */}
          <motion.p
            className="text-lg text-center text-gray-700 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Below are research reports for select companies we have covered in the past.
          </motion.p>

          {/* Animated List */}
          <div className="flex flex-col items-center space-y-6">
            <motion.a
              href="/research/google"
              className="text-xl font-semibold text-blue-600 hover:underline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Google (Alphabet Inc)
            </motion.a>

            <motion.a
              href="/research/amazon"
              className="text-xl font-semibold text-blue-600 hover:underline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Amazon
            </motion.a>

            <motion.a
              href="/research/unitedhealthcare"
              className="text-xl font-semibold text-blue-600 hover:underline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              United Healthcare
            </motion.a>
          </div>

        </div>

      </motion.div>
    </main>
  )
}
