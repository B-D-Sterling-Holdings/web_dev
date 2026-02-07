'use client'
import { motion } from 'framer-motion'
import {
  FileText,
  Download,
  Calendar
} from 'lucide-react'
import Navbar from '@/components/Navbar'

// Define letters by year, organized by quarter
const lettersByYear = {
  2025: {
    q4: [
      { label: 'October', file: '/public_letters/BD Sterling October 2025 Letter.pdf' },
      { label: 'November', file: '/public_letters/BD Sterling November 2025 Letter.pdf' },
      { label: 'Annual', file: '/public_letters/Annual 2025 BD Sterling Letter.pdf' },
    ],
    q3: [
      { label: 'July', file: '/public_letters/BD Sterling July 2025 Letter.pdf' },
      { label: 'August', file: '/public_letters/BD Sterling August Letter.pdf' },
      { label: 'Q3', file: '/public_letters/BD Sterling Q3 2025 Letter.pdf' },
    ],
    h1: [
      { label: 'H1', file: '/public_letters/B.D. Sterling H1 2025 Letter.pdf' },
    ],
  },
}

function LetterCard({ letter }) {
  return (
    <motion.a
      href={letter.file}
      download
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all cursor-pointer flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
          <FileText className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
            {letter.label} Letter
          </h4>
          <p className="text-sm text-gray-500">PDF Download</p>
        </div>
      </div>
      <Download className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
    </motion.a>
  )
}

function QuarterSection({ label, letters, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
          <Calendar className="w-5 h-5 text-gray-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{label}</h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {letters.map((letter) => (
          <LetterCard key={letter.label} letter={letter} />
        ))}
      </div>
    </motion.div>
  )
}

export default function ProgressLetters() {
  const years = Object.keys(lettersByYear).sort((a, b) => b - a)

  return (
    <main className="min-h-screen bg-[#fafafa] text-black overflow-hidden">
      <Navbar />

      {/* Clean Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-emerald-50/30" />
      </div>

      <div className="relative z-10">

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
                <span className="text-gray-900">Progress</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  Letters
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Regular updates on our investment activities, portfolio performance,
                and market perspectives shared with our stakeholders.
              </p>
            </motion.div>
          </div>
        </section>


        {/* Letters by Year */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {years.map((year, yearIndex) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: yearIndex * 0.1 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                {/* Year Header */}
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">{year}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                </div>

                {/* Quarters */}
                <div className="space-y-8">
                  {lettersByYear[year].q4 && (
                    <QuarterSection label="Q4" letters={lettersByYear[year].q4} delay={0.1} />
                  )}
                  {lettersByYear[year].q3 && (
                    <QuarterSection label="Q3" letters={lettersByYear[year].q3} delay={0.2} />
                  )}
                  {lettersByYear[year].h1 && (
                    <QuarterSection label="H1" letters={lettersByYear[year].h1} delay={0.3} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-20 bg-emerald-50/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Want to Stay Updated?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Reach out to receive our periodic investment updates directly.
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  )
}
