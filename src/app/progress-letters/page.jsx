'use client'
import { motion } from 'framer-motion'
import {
  FileText,
  Download,
  Calendar,
  ArrowRight,
  BookOpen
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

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

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-cyan-50/60" />
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-emerald-200/30 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-200/20 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
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
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200/60 rounded-full mb-8"
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Investor Updates</span>
              </motion.div>

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


        {/* About Letters Section */}
        <section className="py-8 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 rounded-3xl p-8 border border-emerald-200/50"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Our Communication Philosophy</h4>
                    <p className="text-gray-600">Transparent, detailed updates on strategy execution and market views</p>
                  </div>
                </div>
                <Link href="/strategy">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                  >
                    Learn Our Strategy
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
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
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
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
