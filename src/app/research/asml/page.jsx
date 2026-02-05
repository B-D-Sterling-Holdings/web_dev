'use client'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Target,
  ExternalLink,
  FileText
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function ASMLResearch() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-black overflow-hidden">
      <Navbar />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/80 via-white to-emerald-50/60" />
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-cyan-200/30 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10">

        {/* Header Section */}
        <section className="pt-28 pb-8 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/research" className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Research</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center p-3">
                  <img src="/ASML-Logo.png" alt="ASML logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">ASML</h1>
                    <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-sm font-semibold rounded-full border border-cyan-200">
                      ASML
                    </span>
                  </div>
                  <p className="text-gray-600">ASML Holding N.V. - Equity Research Report</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {['EUV Monopoly', 'Recurring Revenue', 'Semiconductor Enabler'].map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-white rounded-xl text-sm font-medium text-gray-700 border border-gray-200 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>


        {/* Key Metrics Section */}
        <section className="py-8 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {[
                { icon: TrendingUp, label: 'Investment Thesis', value: 'Monopolistic Moat' },
                { icon: BarChart3, label: 'Key Driver', value: 'EUV Technology' },
                { icon: Target, label: 'Catalyst', value: 'AI Chip Demand' },
              ].map((metric, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
                      <metric.icon className="w-5 h-5 text-cyan-600" />
                    </div>
                    <span className="text-sm text-gray-500">{metric.label}</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>


        {/* Research Report Embed */}
        <section className="py-8 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-cyan-600" />
                    <h2 className="text-xl font-bold text-gray-900">Research Report (PDF)</h2>
                  </div>
                  <a
                    href="/public_reports/ASML_Equity_Research_Report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                  >
                    Open in new tab
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="h-[700px] w-full">
                <iframe
                  src="/public_reports/ASML_Equity_Research_Report.pdf"
                  width="100%"
                  height="100%"
                  className="border-0"
                />
              </div>
            </motion.div>
          </div>
        </section>


        {/* Navigation to Other Research */}
        <section className="py-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">More Research</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link href="/research/google">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center p-2">
                          <img src="/google.jpg" alt="Google" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">Google</h4>
                          <p className="text-sm text-gray-500">Search, Cloud & AI</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                </Link>
                <Link href="/research/unitedhealthcare">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center p-2">
                          <img src="/UNH-logo.jpg" alt="UNH" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">UnitedHealth</h4>
                          <p className="text-sm text-gray-500">Healthcare & Insurance</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  )
}
