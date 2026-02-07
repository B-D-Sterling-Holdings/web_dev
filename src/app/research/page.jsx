'use client'
import { motion } from 'framer-motion'
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
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-emerald-200/30 via-transparent to-transparent rounded-full blur-3xl opacity-35" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-200/20 via-transparent to-transparent rounded-full blur-3xl opacity-25" />
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

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {companies.map((company, index) => (
                <Link key={company.name} href={company.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer aspect-square flex items-center justify-center overflow-hidden"
                  >
                    {/* Default: Logo + Name */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-300 group-hover:opacity-0">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="max-h-32 max-w-[85%] object-contain flex-1"
                      />
                      <h3 className="text-lg font-semibold text-gray-900 text-center mt-3">
                        {company.name}
                      </h3>
                    </div>

                    {/* Hover: Summary Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white">
                      <p className="text-gray-700 text-sm leading-relaxed text-center">
                        {company.summary}
                      </p>
                      <p className="mt-4 text-emerald-600 font-semibold text-sm">
                        Click the panel for more info
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>




      </div>
    </main>
  )
}
