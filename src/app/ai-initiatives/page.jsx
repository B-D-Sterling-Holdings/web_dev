'use client'
import { motion } from 'framer-motion'
import {
  Brain,
  Cpu,
  Database,
  LineChart,
  Sparkles,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Shield,
  Layers,
  GitBranch,
  BarChart3,
  PieChart,
  Workflow,
  FileText,
  ExternalLink
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function AIInitiatives() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-black overflow-hidden">
      <Navbar />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50/40" />
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-emerald-100/40 via-cyan-100/20 to-transparent rounded-full blur-3xl opacity-35" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-purple-100/30 via-transparent to-transparent rounded-full blur-3xl opacity-25" />
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
                <span className="text-gray-900">Building the Future of</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
                  Investment Intelligence
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                At B.D. Sterling, we're developing proprietary AI systems that augment human judgment
                with machine intelligence—enhancing research depth, accelerating insights, and
                optimizing portfolio decisions while maintaining rigorous fundamental analysis.
              </p>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {[
                  { icon: Cpu, label: 'Prism AI Platform' },
                  { icon: Database, label: 'RAG Knowledge System' },
                  { icon: PieChart, label: 'Portfolio Optimizer' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100"
                  >
                    <item.icon className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-700 font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>


        {/* Prism AI Section */}
        <section className="py-24 bg-gray-900 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
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
                  <span className="text-sm font-medium text-emerald-400">Flagship Platform</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Prism AI
                </h2>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Our proprietary AI-powered document analysis tool designed specifically for
                  investment research. Prism leverages a curated knowledge base to help our
                  team synthesize financial data and generate deeper research insights.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    'SEC filing parsing and key change detection',
                    'Cross-company competitive intelligence synthesis',
                    'Document-based querying of financial knowledge base',
                    'Thesis validation and counter-argument generation',
                    'Structured output for investment memos',
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
                    <p className="text-white font-semibold">10x Faster Research</p>
                    <p className="text-gray-400 text-sm">Analyze what took days in minutes</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                  {/* Mock UI - Document Analysis View */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-4 text-gray-500 text-sm">Prism AI — Document Analysis</span>
                  </div>

                  <div className="space-y-4">
                    {/* Document Analysis Output */}
                    <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 text-sm font-medium">SEC Filing Analysis — GOOGL 10-K</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-400">
                          <span>Revenue Growth (YoY)</span>
                          <span className="text-emerald-400 font-semibold">+14%</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Operating Margin</span>
                          <span className="text-cyan-400 font-semibold">32.4%</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Free Cash Flow</span>
                          <span className="text-purple-400 font-semibold">$69.5B</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-900/20 rounded-xl p-4 border border-emerald-500/20">
                      <p className="text-emerald-400 text-xs font-medium mb-2">KEY INSIGHT</p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Cloud segment margins expanded 400bps YoY, approaching breakeven for the first time. Capital expenditure guidance suggests continued infrastructure investment.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-gray-500 text-xs">
                      <span className="px-2 py-1 bg-gray-700/50 rounded">Source: SEC EDGAR</span>
                      <span className="px-2 py-1 bg-gray-700/50 rounded">Confidence: High</span>
                    </div>
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
                  Document-Powered Analysis
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* RAG Model Section */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Visual */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="relative">
                  {/* RAG Architecture Diagram */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">RAG Architecture</h4>

                    {/* Data Sources */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { icon: Database, label: 'SEC Filings' },
                        { icon: LineChart, label: 'Market Data' },
                        { icon: FileText, label: 'Research Reports' },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 text-center"
                        >
                          <item.icon className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                          <span className="text-xs text-gray-600">{item.label}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center mb-6">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-emerald-600 rotate-90" />
                      </div>
                    </div>

                    {/* Vector Store */}
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl p-4 mb-6 text-white text-center">
                      <Layers className="w-6 h-6 mx-auto mb-2" />
                      <p className="font-semibold">Vector Embeddings Store</p>
                      <p className="text-sm text-emerald-100">Curated financial document library</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center mb-6">
                      <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-cyan-600 rotate-90" />
                      </div>
                    </div>

                    {/* Output */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <Brain className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Contextual AI Response</p>
                          <p className="text-sm text-gray-500">Grounded in proprietary data</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-full mb-6">
                  <Database className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">Knowledge Infrastructure</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  RAG Knowledge System
                </h2>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Our Retrieval-Augmented Generation system creates a living knowledge base of
                  financial intelligence. Unlike generic AI, our RAG model retrieves context from
                  our proprietary research database to deliver precise, source-backed insights.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {[
                    { icon: Database, title: 'Curated Knowledge Base', desc: 'SEC filings, reports, research' },
                    { icon: GitBranch, title: 'Growing Database', desc: 'Continuously expanding library' },
                    { icon: Target, title: 'Precision Retrieval', desc: 'Semantic search accuracy' },
                    { icon: Shield, title: 'Source Attribution', desc: 'Every insight is traceable' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-50 rounded-2xl p-4 border border-gray-100"
                    >
                      <item.icon className="w-6 h-6 text-purple-600 mb-2" />
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Why RAG Matters</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Traditional AI models can hallucinate or provide outdated information. Our RAG
                    system grounds every response in actual documents from our database, ensuring
                    accuracy and enabling full auditability of AI-generated insights.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Portfolio Allocation Model Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 border border-cyan-200 rounded-full mb-6">
                <PieChart className="w-4 h-4 text-cyan-600" />
                <span className="text-sm font-medium text-cyan-700">Quantitative Systems</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Portfolio Allocation Model
              </h2>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our AI-driven allocation model combines modern portfolio theory with machine learning
                to optimize position sizing, manage risk, and maximize risk-adjusted returns.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: BarChart3,
                  title: 'Dynamic Position Sizing',
                  description: 'ML models that adjust position sizes based on conviction levels, volatility regimes, and correlation dynamics across the portfolio.',
                  color: 'emerald'
                },
                {
                  icon: Shield,
                  title: 'Risk Optimization',
                  description: 'Real-time Value-at-Risk calculations, drawdown protection triggers, and automated hedging recommendations.',
                  color: 'cyan'
                },
                {
                  icon: TrendingUp,
                  title: 'Alpha Generation',
                  description: 'Factor-based analysis identifying opportunities where fundamentals diverge from price, optimized for our investment style.',
                  color: 'purple'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-500"
                >
                  <div className={`w-14 h-14 bg-${item.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-${item.color}-500 transition-colors duration-300`}>
                    <item.icon className={`w-7 h-7 text-${item.color}-600 group-hover:text-white transition-colors duration-300`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Model Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />

              <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6">
                    How It Works
                  </h3>
                  <div className="space-y-6">
                    {[
                      { num: '01', title: 'Data Ingestion', desc: 'Ingest real-time market data, fundamentals, and alternative data sources' },
                      { num: '02', title: 'Factor Analysis', desc: 'Decompose returns into factor exposures and identify alpha opportunities' },
                      { num: '03', title: 'Optimization', desc: 'Run convex optimization to maximize Sharpe ratio within risk constraints' },
                      { num: '04', title: 'Execution', desc: 'Generate actionable allocation recommendations with confidence intervals' },
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex gap-4"
                      >
                        <span className="text-emerald-400 font-mono font-bold">{step.num}</span>
                        <div>
                          <h4 className="text-white font-semibold">{step.title}</h4>
                          <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-semibold">Allocation Model Output</span>
                    <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">Sample</span>
                  </div>
                  <p className="text-gray-500 text-xs mb-5">Suggested portfolio weights based on conviction, risk, and correlation analysis</p>

                  <div className="space-y-3">
                    {[
                      { name: 'GOOGL', allocation: 25, conviction: 'High', risk: 'Med' },
                      { name: 'ASML', allocation: 20, conviction: 'High', risk: 'Med' },
                      { name: 'UNH', allocation: 15, conviction: 'Med', risk: 'Low' },
                      { name: 'Other', allocation: 25, conviction: '—', risk: '—' },
                      { name: 'Cash', allocation: 15, conviction: '—', risk: '—' },
                    ].map((holding, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-white font-medium w-16 text-sm">{holding.name}</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2.5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${holding.allocation}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2.5 rounded-full"
                          />
                        </div>
                        <span className="text-gray-300 text-sm font-medium w-10 text-right">{holding.allocation}%</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-700 grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Est. Sharpe</span>
                      <span className="text-emerald-400 font-semibold">1.87</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Max Drawdown</span>
                      <span className="text-cyan-400 font-semibold">-12.3%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>



      </div>
    </main>
  )
}
