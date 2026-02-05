'use client'
import { motion } from 'framer-motion'
import {
  Search,
  TrendingUp,
  BarChart3,
  ArrowRight,
  FileText,
  Target,
  Sparkles
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function Research() {
  const companies = [
    {
      name: 'Google',
      ticker: 'GOOGL',
      href: '/research/google',
      logo: 'google.jpg',
      summary: 'A leading tech company with a strong presence in search, high-margin YouTube advertising, a growing cloud business, and exposure to AI and autonomous driving through Waymo.',
      highlights: ['Search Dominance', 'Cloud Growth', 'AI Leadership'],
      color: 'emerald'
    },
    {
      name: 'ASML',
      ticker: 'ASML',
      href: '/research/asml',
      logo: 'ASML-Logo.png',
      summary: 'ASML\'s EUV technology gives it a monopolistic edge in advanced chip manufacturing, driving high-margin system sales and recurring service revenues.',
      highlights: ['EUV Monopoly', 'Recurring Revenue', 'Semiconductor Enabler'],
      color: 'cyan'
    },
    {
      name: 'UnitedHealth',
      ticker: 'UNH',
      href: '/research/unitedhealthcare',
      logo: 'UNH-logo.jpg',
      summary: 'The nation\'s largest private healthcare platform, spanning insurance, health services, and data analytics with significant insider buying signals.',
      highlights: ['Healthcare Leader', 'Vertically Integrated', 'Insider Buying'],
      color: 'purple'
    },
  ]

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
                <Search className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Research Hub</span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
                <span className="text-gray-900">Equity</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  Research
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Deep-dive analyses on our current portfolio holdings. Each report represents
                our thesis on why these businesses offer compelling risk-adjusted returns.
              </p>
            </motion.div>
          </div>
        </section>


        {/* Research Methodology Section */}
        <section className="py-12 px-6 lg:px-12">
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
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Our Research Approach</h4>
                    <p className="text-gray-600">Fundamental analysis focused on quality businesses at dislocated prices</p>
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


        {/* Research Cards Section */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Current Holdings Research
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Click on any company to view our detailed equity research report.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {companies.map((company, index) => (
                <Link key={company.name} href={company.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 cursor-pointer h-full"
                  >
                    {/* Card Header with Logo */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="max-h-24 max-w-[80%] object-contain relative z-10"
                      />

                      {/* Ticker Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
                        <span className="text-sm font-semibold text-gray-700">{company.ticker}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {company.name}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {company.summary}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {company.highlights.map((highlight, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 text-xs font-medium rounded-full bg-${company.color}-50 text-${company.color}-700 border border-${company.color}-100`}
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* View Report Link */}
                      <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm group-hover:gap-3 transition-all">
                        <FileText className="w-4 h-4" />
                        <span>View Research Report</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Hover Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>


        {/* Research Process Section - Dark */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Our Process</span>
              </motion.div>

              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                How We Research
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Every research report follows a rigorous process to ensure we understand
                the business deeply before making investment decisions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Search,
                  title: 'Business Analysis',
                  description: 'Understand the competitive moat, revenue model, and unit economics'
                },
                {
                  icon: BarChart3,
                  title: 'Financial Modeling',
                  description: 'Build detailed models with scenario analysis and sensitivity testing'
                },
                {
                  icon: TrendingUp,
                  title: 'Valuation',
                  description: 'Multiple valuation approaches to establish intrinsic value range'
                },
                {
                  icon: Target,
                  title: 'Catalyst Mapping',
                  description: 'Identify specific events that could unlock value recognition'
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-gradient-to-b from-gray-800/80 to-gray-800/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
                Want to Discuss Our Research?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We welcome thoughtful discussions about our investment theses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 justify-center"
                  >
                    Get in Touch
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link href="/progress-letters">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-emerald-300 transition-all duration-300"
                  >
                    Read Our Letters
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  )
}
