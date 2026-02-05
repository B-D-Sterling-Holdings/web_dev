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
  MessageSquare,
  BarChart3,
  PieChart,
  Workflow,
  Bot,
  FileText,
  Download,
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
        <motion.div
          className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-emerald-100/40 via-cyan-100/20 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-purple-100/30 via-transparent to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
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
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200/60 rounded-full mb-8"
              >
                <Brain className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">AI Innovation Lab</span>
              </motion.div>

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
            <motion.div
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
                  Our proprietary AI research assistant designed specifically for investment analysis.
                  Prism synthesizes vast amounts of financial data, news, and research to surface
                  actionable insights in real-time.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    'Real-time earnings call analysis and sentiment extraction',
                    'Automated SEC filing parsing and key change detection',
                    'Cross-company competitive intelligence synthesis',
                    'Natural language querying of financial databases',
                    'Thesis validation and counter-argument generation',
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
                  {/* Mock UI */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-4 text-gray-500 text-sm">Prism AI Terminal</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="bg-gray-700/50 rounded-2xl rounded-tl-none p-4 flex-1">
                        <p className="text-gray-300 text-sm">Analyze GOOGL's latest earnings call and compare cloud revenue growth to MSFT and AMZN</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="bg-emerald-900/30 rounded-2xl rounded-tl-none p-4 flex-1 border border-emerald-500/20">
                        <p className="text-gray-300 text-sm mb-3">Based on Q4 2024 earnings analysis:</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-gray-400">
                            <span>Google Cloud YoY Growth</span>
                            <span className="text-emerald-400 font-semibold">+26%</span>
                          </div>
                          <div className="flex justify-between text-gray-400">
                            <span>Azure YoY Growth</span>
                            <span className="text-cyan-400 font-semibold">+29%</span>
                          </div>
                          <div className="flex justify-between text-gray-400">
                            <span>AWS YoY Growth</span>
                            <span className="text-purple-400 font-semibold">+13%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex items-center gap-2 text-gray-500 text-sm"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      Prism is analyzing 847 data points...
                    </motion.div>
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
                  Powered by GPT-4 & Custom Models
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
                        { icon: MessageSquare, label: 'Earnings Calls' },
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
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center"
                      >
                        <ArrowRight className="w-4 h-4 text-emerald-600 rotate-90" />
                      </motion.div>
                    </div>

                    {/* Vector Store */}
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl p-4 mb-6 text-white text-center">
                      <Layers className="w-6 h-6 mx-auto mb-2" />
                      <p className="font-semibold">Vector Embeddings Store</p>
                      <p className="text-sm text-emerald-100">500K+ documents indexed</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center"
                      >
                        <ArrowRight className="w-4 h-4 text-cyan-600 rotate-90" />
                      </motion.div>
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
                    { icon: Database, title: '500K+ Documents', desc: 'SEC filings, transcripts, research' },
                    { icon: GitBranch, title: 'Real-time Updates', desc: 'Continuous data ingestion' },
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
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-gray-400 text-sm">Model Output Preview</span>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Live</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'GOOGL', allocation: 18, change: '+2.3%' },
                      { name: 'ASML', allocation: 15, change: '+1.1%' },
                      { name: 'UNH', allocation: 12, change: '-0.5%' },
                      { name: 'Cash', allocation: 8, change: '0%' },
                    ].map((holding, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-white font-medium">{holding.name}</span>
                        <div className="flex items-center gap-4">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${holding.allocation * 5}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              viewport={{ once: true }}
                              className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full"
                            />
                          </div>
                          <span className="text-gray-400 text-sm w-12">{holding.allocation}%</span>
                          <span className={`text-sm ${holding.change.startsWith('+') ? 'text-emerald-400' : holding.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                            {holding.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Portfolio Sharpe</span>
                      <span className="text-emerald-400 font-semibold">1.87</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* Our Philosophy Section */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Human Intelligence,
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                  Machine Amplified
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                We believe AI should augment human judgment, not replace it. Our systems handle
                data processing at scale while our team focuses on what humans do best—creative
                thinking, relationship building, and making decisions under uncertainty.
              </p>

              <div className="grid sm:grid-cols-3 gap-8">
                {[
                  { value: '10x', label: 'Faster Research' },
                  { value: '500K+', label: 'Documents Indexed' },
                  { value: '24/7', label: 'Market Monitoring' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </p>
                    <p className="text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>


        {/* Published Research & Papers Section */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Published Work</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Research Papers
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our published research at the intersection of artificial intelligence and investment analysis.
              </p>
            </motion.div>

            {/* PDF Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'AI-Driven Investment Analysis Framework',
                  description: 'A comprehensive framework for integrating large language models into fundamental equity research workflows.',
                  category: 'AI & Finance',
                  date: 'Coming Soon',
                  file: null
                },
                {
                  title: 'NLP for Financial Document Processing',
                  description: 'Techniques for extracting structured insights from SEC filings, earnings transcripts, and analyst reports using natural language processing.',
                  category: 'Natural Language Processing',
                  date: 'Coming Soon',
                  file: null
                },
                {
                  title: 'Quantitative Portfolio Optimization with ML',
                  description: 'Machine learning approaches to dynamic position sizing, risk management, and portfolio construction in concentrated strategies.',
                  category: 'Quantitative Methods',
                  date: 'Coming Soon',
                  file: null
                },
                {
                  title: 'RAG Systems for Financial Intelligence',
                  description: 'Building retrieval-augmented generation systems that ground AI responses in proprietary financial databases for accurate, auditable insights.',
                  category: 'Knowledge Systems',
                  date: 'Coming Soon',
                  file: null
                },
                {
                  title: 'Market Dislocation Detection via Sentiment Analysis',
                  description: 'Using sentiment analysis and alternative data to identify temporary market dislocations in high-quality businesses.',
                  category: 'Sentiment Analysis',
                  date: 'Coming Soon',
                  file: null
                },
                {
                  title: 'Prism AI: Architecture & Design',
                  description: 'Technical deep-dive into the architecture of our proprietary AI research assistant, including model selection, prompt engineering, and evaluation.',
                  category: 'AI Platform',
                  date: 'Coming Soon',
                  file: null
                }
              ].map((paper, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-500 flex flex-col"
                >
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full mb-4 w-fit">
                    <span className="text-xs font-medium text-emerald-700">{paper.category}</span>
                  </div>

                  {/* Paper Icon */}
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors duration-300">
                    <FileText className="w-6 h-6 text-gray-500 group-hover:text-emerald-600 transition-colors duration-300" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3">{paper.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{paper.description}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{paper.date}</span>
                    {paper.file ? (
                      <a
                        href={paper.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-400">
                        <FileText className="w-4 h-4" />
                        Coming Soon
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
