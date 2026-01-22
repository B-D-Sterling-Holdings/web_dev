'use client'

import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

// Define letters by year, organized by quarter
const lettersByYear = {
  2025: {
    q3: [
      { label: 'July', file: '/public_letters/BD Sterling July 2025 Letter.pdf' },
      { label: 'August', file: '/public_letters/BD Sterling August Letter.pdf' },
      { label: 'Q3', file: '/public_letters/BD Sterling Q3 2025 Letter.pdf' },
    ],
    q4: [
      { label: 'October', file: '/public_letters/BD Sterling October 2025 Letter.pdf' },
      { label: 'November', file: '/public_letters/BD Sterling November 2025 Letter.pdf' },
      { label: 'Annual', file: '/public_letters/Annual 2025 BD Sterling Letter.pdf' },
    ],
    h1: [
      { label: 'H1', file: '/public_letters/B.D. Sterling H1 2025 Letter.pdf' },
    ],
  },
}

function LetterButton({ letter }) {
  return (
    <a
      href={letter.file}
      download
      className="border-2 border-gray-800 px-6 py-3 hover:bg-gray-100 transition text-center min-w-[100px]"
    >
      <span className="text-base font-normal text-gray-800">
        {letter.label}
      </span>
    </a>
  )
}

function QuarterSection({ label, letters }) {
  return (
    <div className="flex items-center">
      <div className="w-24 flex-shrink-0">
        <span className="text-3xl font-light text-gray-800">{label}</span>
      </div>
      <div className="flex gap-5">
        {letters.map((letter) => (
          <LetterButton key={letter.label} letter={letter} />
        ))}
      </div>
    </div>
  )
}

export default function ProgressLetters() {
  const years = Object.keys(lettersByYear).sort((a, b) => b - a)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-28 px-6 pb-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl font-normal tracking-wide text-gray-800 mb-6">
            PROGRESS LETTERS
          </h1>
          <div className="w-full h-px bg-gray-400"></div>
        </motion.div>

        {/* Year Sections */}
        {years.map((year, yearIndex) => (
          <motion.div
            key={year}
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + yearIndex * 0.1 }}
          >
            <h2 className="text-4xl font-light text-center text-gray-800 mb-10">
              {year}
            </h2>
            <div className="w-full h-px bg-gray-400 mb-10"></div>

            <div className="flex flex-col gap-8">
              {/* Q4 Section */}
              {lettersByYear[year].q4 && (
                <QuarterSection label="Q4" letters={lettersByYear[year].q4} />
              )}

              {/* Q3 Section */}
              {lettersByYear[year].q3 && (
                <QuarterSection label="Q3" letters={lettersByYear[year].q3} />
              )}

              {/* H1 Section (Q1 + Q2 combined) */}
              {lettersByYear[year].h1 && (
                <QuarterSection label="H1" letters={lettersByYear[year].h1} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
