'use client'
import { motion } from 'framer-motion'
import {
  Target,
  TrendingUp,
  Search,
  Shield,
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Clock,
  Eye,
  Cpu,
  LineChart,
  Brain
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function Strategy() {
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
        <section className="pt-32 pb-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
                <span className="text-gray-900">Dislocated</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  High Quality
                </span>
                <br />
                <span className="text-gray-900">Companies</span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                We focus on fundamentally sound, competitively advantaged businesses that have been
                temporarily mispriced due to misunderstood narratives or short-term market dislocations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/research">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 transition-all duration-300 flex items-center gap-3"
                  >
                    View Our Research
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>


        {/* Core Strategy Section - Dark */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">Our Edge</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Quality at Dislocation
                </h2>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  We seek companies with proven business models, resilient cash flows, and long growth
                  runways that are trading at unjustified discounts to intrinsic value. Our edge lies
                  in recognizing when the market has overreacted or misjudged the core strength of a business.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    'Proven business models with durable competitive advantages',
                    'Resilient cash flows through various market conditions',
                    'Long growth runways with reinvestment opportunities',
                    'Temporary mispricing due to sentiment or narrative shifts',
                    'Identifiable catalysts for value recognition',
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Patience Creates Opportunity</p>
                    <p className="text-gray-400 text-sm">We act decisively when prices disconnect from reality</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Visual - Strategy Diagram */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Investment Process</h4>

                  <div className="space-y-6">
                    {[
                      { num: '01', icon: Search, title: 'Identify Quality', desc: 'Screen for competitive moats, capital efficiency, and management excellence' },
                      { num: '02', icon: Eye, title: 'Spot Dislocation', desc: 'Monitor for price-value gaps caused by sentiment or short-term noise' },
                      { num: '03', icon: BarChart3, title: 'Analyze Deeply', desc: 'Build robust valuation models with scenario-based stress testing' },
                      { num: '04', icon: Clock, title: 'Wait for Catalysts', desc: 'Identify triggers that will close the gap between price and value' },
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex gap-4"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                            <step.icon className="w-6 h-6 text-emerald-400" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-emerald-400 font-mono text-sm">{step.num}</span>
                            <h4 className="text-white font-semibold">{step.title}</h4>
                          </div>
                          <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating accent */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-semibold"
                >
                  Disciplined & Repeatable
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Key Principles Section - Light */}
        <section className="py-24 bg-gradient-to-br from-emerald-50/60 via-white to-green-50/40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Our Investment Principles
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The foundational beliefs that guide every investment decision we make
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Search,
                  title: 'Deep Fundamental Research',
                  description: 'We dive deep, performing thorough fundamental analysis, building robust valuation models, and understanding business dynamics at a granular level.',
                },
                {
                  icon: TrendingUp,
                  title: 'Asymmetric Risk Reward',
                  description: 'Our process is structured to minimize downside while capturing asymmetric upside as quality eventually shines through short-term volatility.',
                },
                {
                  icon: Shield,
                  title: 'Margin of Safety',
                  description: 'We require a significant discount to intrinsic value before investing, providing protection against unforeseen risks and estimation errors.',
                },
                {
                  icon: Target,
                  title: 'Catalyst Identification',
                  description: 'We identify specific events or changes that could re-rate the business over time, giving us conviction in our investment timeline.',
                },
                {
                  icon: BarChart3,
                  title: 'Concentrated Positions',
                  description: 'When conviction is high and the opportunity is compelling, we take meaningful positions rather than over-diversifying.',
                },
                {
                  icon: Clock,
                  title: 'Long Term Orientation',
                  description: 'We think in years, not quarters. Patient capital allows us to benefit from market inefficiencies that short-term investors create.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group p-8 bg-gradient-to-b from-gray-50 to-white rounded-3xl border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-500"
                >
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                    <item.icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* AI-Powered Research Section - Dark */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
            <div
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
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                AI Augmented
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Research & Analysis
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                We leverage proprietary AI tools to enhance every stage of our investment process,
                from initial screening to ongoing portfolio monitoring.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - AI Tools */}
              <div className="space-y-6">
                {[
                  {
                    icon: Brain,
                    title: 'Prism AI',
                    description: 'Our proprietary AI assistant trained on investment frameworks, financial modeling, and market analysis to accelerate research workflows.',
                  },
                  {
                    icon: Cpu,
                    title: 'RAG Knowledge System',
                    description: 'A retrieval augmented generation system that indexes SEC filings, earnings transcripts, and research to surface relevant insights on demand.',
                  },
                  {
                    icon: LineChart,
                    title: 'Predictive Analytics',
                    description: 'Machine learning models that analyze historical patterns, sentiment data, and fundamental metrics to identify potential market dislocations.',
                  },
                ].map((tool, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    viewport={{ once: true }}
                    className="group flex gap-5 p-6 bg-gradient-to-r from-gray-800/80 to-gray-800/40 rounded-2xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-500"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <tool.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{tool.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right - How AI Fits */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">How AI Enhances Our Process</h4>

                  <div className="space-y-6">
                    {[
                      { num: '01', title: 'Screening & Discovery', desc: 'AI scans thousands of filings and data points to surface potential dislocation candidates' },
                      { num: '02', title: 'Deep Research', desc: 'RAG system retrieves relevant historical context and comparable situations instantly' },
                      { num: '03', title: 'Risk Assessment', desc: 'Advanced scenario analysis and stress testing powered by AI to model portfolio risks' },
                      { num: '04', title: 'Ongoing Monitoring', desc: 'Continuous tracking of thesis drivers, sentiment shifts, and catalyst developments' },
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex gap-4"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                          <span className="text-emerald-400 font-mono text-sm font-bold">{step.num}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                          <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom callout */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mt-6 p-5 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 rounded-2xl border border-emerald-500/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Human + Machine Intelligence</p>
                      <p className="text-gray-400 text-sm">AI augments our judgment. It doesn't replace the rigor of fundamental analysis.</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* CTA to AI Initiatives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Link href="/ai-initiatives">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center gap-3 mx-auto"
                >
                  Explore All AI Initiatives
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>


        {/* Philosophy Quote Section - Light */}
        <section className="py-24 bg-gradient-to-b from-emerald-50/50 via-green-50/30 to-emerald-50/40">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-relaxed">
                "Rather than chasing momentum or reacting to headlines, we understand businesses
                and act decisively when{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                  prices disconnect from reality.
                </span>"
              </h2>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The "Dislocated High Quality Companies" framework was inspired by Mark Mahaney's work
                on identifying fundamentally sound businesses trading at unjustified discounts.
              </p>
            </motion.div>
          </div>
        </section>


        {/* CTA Section */}
      </div>
    </main>
  )
}
