'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { TrendingUp, Shield, Target, BarChart3, Users, Award, Brain, Cpu, Sparkles, LineChart, Zap, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import StatBoxSection from '@/components/StatBoxSection'
import Faq from '@/components/Faq'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-black overflow-hidden">
      <Navbar />

      {/* Modern Gradient Mesh Background */}
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
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >

        {/* Hero Section - More Modern & Minimal */}
        <section className="min-h-screen flex items-center pt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200/60 rounded-full mb-8"
                >
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-emerald-700">Research-Driven Investment Project</span>
                </motion.div>

                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
                  <span className="text-gray-900">Disciplined</span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                    Investing
                  </span>
                  <br />
                  <span className="text-gray-900">in Mispriced</span>
                  <br />
                  <span className="text-gray-900">Quality</span>
                </h1>

                <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                  We identify high-quality businesses at moments of temporary dislocation,
                  applying fundamental research to evaluate intrinsic value and long-term
                  compounding potential.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <Link href="/strategy">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-7 py-3.5 bg-gray-900 text-white font-semibold rounded-2xl shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 transition-all duration-300"
                    >
                      Learn Our Strategy
                    </motion.button>
                  </Link>

                  <Link href="/research">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-7 py-3.5 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-300"
                    >
                      View Research
                    </motion.button>
                  </Link>

                  <Link href="/ai-initiatives">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-cyan-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 flex items-center gap-2"
                    >
                      <Brain className="w-5 h-5" />
                      AI Initiatives
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              {/* Right - Hero Visual */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative"
              >
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/10">
                    <img
                      src="/fun_pic.jpg"
                      alt="B.D. Sterling Investment Team"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
                  </div>

                  {/* Floating Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Investment Focus</p>
                        <p className="text-base font-bold text-gray-900">Quality at Dislocation</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Second Floating Card */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-xl px-5 py-3 rounded-xl shadow-lg border border-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm font-semibold text-gray-700">Fundamental Research</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Performance Stats Section - Prominent Display */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/50 to-transparent" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Track Record
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Building a verified track record through disciplined execution
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <StatBoxSection />

              {/* Disclosure */}
              <p className="mt-8 text-center text-xs text-gray-500 max-w-4xl mx-auto px-6 leading-relaxed">
                *The performance shown reflects results from a joint account used to build an auditable track record from 09/18/24 to 12/01/25.
                It is not the performance of a fund or registered investment adviser, and does not reflect the
                performance of outside client accounts. Past performance is not necessarily indicative of future results.
              </p>
            </motion.div>
          </div>
        </section>


        {/* AI Initiatives Section - NEW */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
            {/* Animated grid */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
              animate={{
                backgroundPosition: ['0px 0px', '40px 40px']
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
            {/* Section Header */}
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
                <Brain className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Innovation Lab</span>
              </motion.div>

              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                AI-Powered Investment
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Research & Analysis
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                We're building next-generation tools that combine artificial intelligence with
                fundamental analysis to enhance our research capabilities and decision-making process.
              </p>
            </motion.div>

            {/* AI Initiative Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

              {/* Card 1 - Research Automation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative bg-gradient-to-b from-gray-800/80 to-gray-800/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                    <Cpu className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    Automated Research Pipeline
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    AI-driven systems that continuously monitor earnings calls, SEC filings,
                    and market data to surface investment-relevant insights in real-time.
                  </p>
                </div>
              </motion.div>

              {/* Card 2 - Quantitative Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative bg-gradient-to-b from-gray-800/80 to-gray-800/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20">
                    <LineChart className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    Predictive Analytics
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Machine learning models that analyze historical patterns, sentiment data,
                    and fundamental metrics to identify potential market dislocations.
                  </p>
                </div>
              </motion.div>

              {/* Card 3 - Risk Assessment */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative bg-gradient-to-b from-gray-800/80 to-gray-800/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500 md:col-span-2 lg:col-span-1"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                    <Shield className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    Intelligent Risk Management
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Advanced scenario analysis and stress testing powered by AI to model
                    portfolio risks and optimize position sizing dynamically.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Bottom Feature Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 p-8 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 rounded-3xl border border-emerald-500/20"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Human + Machine Intelligence</h4>
                    <p className="text-gray-400">AI augments our judgment—it doesn't replace the rigor of fundamental analysis.</p>
                  </div>
                </div>
                <Link href="/ai-initiatives">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                  >
                    Explore AI Initiatives
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>


        {/* Core Principles Section - Modernized */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Our Core Principles
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The foundational beliefs that guide every investment decision
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Principle 1 */}
              <motion.div
                className="group p-8 bg-gradient-to-b from-gray-50 to-white rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                  <Target className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Disciplined Capital Allocation
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We allocate capital only when expected long-term compounding outweighs
                  risk. Idle cash is preserved unless it can generate better risk-adjusted returns.
                </p>
              </motion.div>

              {/* Principle 2 */}
              <motion.div
                className="group p-8 bg-gradient-to-b from-gray-50 to-white rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                  <BarChart3 className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Structured Risk Taking
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We embrace concentration but require each position to follow a clear thesis,
                  scenario plan, and exit triggers. We act only on new material evidence.
                </p>
              </motion.div>

              {/* Principle 3 */}
              <motion.div
                className="group p-8 bg-gradient-to-b from-gray-50 to-white rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                  <Sparkles className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Adaptive Learning
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Markets are unforgiving teachers. We acknowledge what we don't know,
                  invite dissenting analyses, and pivot when new facts emerge.
                </p>
              </motion.div>

              {/* Principle 4 */}
              <motion.div
                className="group p-8 bg-gradient-to-b from-gray-50 to-white rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                  <Users className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Aligned Stewardship
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  With 99% of our net worth in one account, we operate as disciplined
                  stewards, fully accountable for every decision and outcome.
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        <Faq />

        {/* Disclaimer Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Important Disclosures</h3>
              <div className="space-y-4 text-xs text-gray-500 leading-relaxed">
                <p>
                  The performance figures presented herein reflect results generated by B.D. Sterling Capital Management through proprietary portfolios and accounts managed by the portfolio manager using a consistent investment philosophy and substantially similar strategy throughout the duration of the track record.
                </p>
                <p>
                  Performance shown may include results achieved prior to the launch of any specific fund or series structure and is presented for informational purposes only. Results reflect the reinvestment of profits and do not reflect the impact of fees, expenses, or taxes that would be incurred in an actual investment vehicle. Individual investor results may differ materially due to differences in timing of capital contributions, withdrawals, cash balances, transaction costs, tax considerations, and portfolio implementation.
                </p>
                <p>
                  Benchmark data, including references to the S&amp;P 500, is sourced from Interactive Brokers LLC. Index performance is provided for comparative purposes only and does not represent the performance of any investable product.
                </p>
                <p>
                  Past performance is not necessarily indicative of future results. All investments involve risk, including the potential loss of principal. This material is provided for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to purchase any security. Our fiscal year begins on January 1 and ends on December 31 of each calendar year.
                </p>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p>
                    B.D. Sterling Capital Management is currently evaluating a potential strategic relationship with the Plainview platform. As of the date of this presentation, no definitive agreements have been executed, and the strategy is not currently operated on or affiliated with Plainview.
                  </p>
                  <p className="mt-3">
                    If finalized, it is anticipated that the strategy would be launched as a dedicated series within Plainview Securities Fund, L.P., a Delaware series limited partnership. Each series is offered under Regulation D, Rule 506(c), relies on the Section 3(c)(1) exemption under the Investment Company Act of 1940, and maintains segregated economics, expenses, and disclosures through a standalone series supplement.
                  </p>
                  <p className="mt-3">
                    Under the contemplated structure, Plainview would bear platform level regulatory and infrastructure costs, while strategy specific expenses, including administration, audit, compliance, custody, brokerage, and series specific legal costs, would be allocated to the applicable series. Management and performance fees would be charged at the series level and shared between Plainview and the strategy provider pursuant to documented agreements. Fund expenses such as administration and audit are borne by the Fund and allocated pro rata among investors based on their respective capital commitments and periods of participation.
                  </p>
                  <p className="mt-3">
                    Any future offering would be made solely pursuant to definitive offering documents. Terms, structure, and economics remain subject to change.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </motion.div>
    </main>
  )
}
