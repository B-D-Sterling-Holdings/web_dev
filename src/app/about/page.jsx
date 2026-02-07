'use client'
import { motion } from 'framer-motion'
import {
  Users,
  Award,
  Briefcase,
  TrendingUp,
  Target,
  ArrowRight,
  Linkedin
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function About() {
  const team = [
    {
      name: 'Bhuvan Siddaveerappa',
      role: 'Co-CIO, CEO',
      image: '/bhuvan.jpeg',
      bio: 'Bhuvan currently serves as Co-CIO of Sinn Fund, Texas A&M\'s Student Managed Fund, a multi-strategy hedge fund with approximately $6M AUM across 8 books (Quant, Corporate Activism, FI/FX/EM, Macro, Energy, Metals, Biotech, Factor). He co-launched B.D. Sterling as an independent venture, applying the disciplined, fundamentals-driven approach he has developed through years of active portfolio management. He also gained hands-on experience interning on equity trading desks at Kershner Trading Group.',
      highlights: [
        'Co-CIO of Sinn Fund (~$6M AUM)',
        'Equity Trading Intern, Kershner Trading Group',
        'Founding President, Scholars of Finance, Texas A&M Chapter',
        'B.S. in Business & M.S. in Financial Management, Texas A&M University'
      ]
    },
    {
      name: 'Dhruv Datta',
      role: 'Co-CIO, CFO, CCO',
      image: '/dhruv.png',
      bio: 'Dhruv is an engineer by academics and a businessman at heart, combining technical skills with an entrepreneurial mindset. He takes pride in the rigor of his equity research-driven approach and is leading the development of the AI models that is the backbone of the fund.',
      highlights: [
        'Engineering Experience with NASA and GE Vernova',
        'Co-CIO of Maroon Fund ($70K Long-Only Fund)',
        'Co-Founder of Scholars of Finance, Texas A&M Chapter',
        "Architect of firm's operational infrastructure"
      ]
    }
  ]

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
                <span className="text-gray-900">Meet the</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  Founders
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                A team of disciplined investors combining fundamental research expertise with
                technical innovation to identify exceptional investment opportunities.
              </p>
            </motion.div>
          </div>
        </section>


        {/* Team Members Section */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-24">

              {/* Bhuvan - Image Left, Content Right */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              >
                {/* Image */}
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/10">
                      <img
                        src={team[0].image}
                        alt={team[0].name}
                        className="w-full h-auto aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Role</p>
                          <p className="font-semibold text-gray-900">{team[0].role}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{team[0].name}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {team[0].bio}
                  </p>

                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-600" />
                      Key Experience
                    </h4>
                    <ul className="space-y-3">
                      {team[0].highlights.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>


              {/* Dhruv - Content Left, Image Right */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
              >
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="order-2 lg:order-1"
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{team[1].name}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {team[1].bio}
                  </p>

                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-600" />
                      Key Experience
                    </h4>
                    <ul className="space-y-3">
                      {team[1].highlights.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Image */}
                <div className="relative order-1 lg:order-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/10">
                      <img
                        src={team[1].image}
                        alt={team[1].name}
                        className="w-full h-auto aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Role</p>
                          <p className="font-semibold text-gray-900">{team[1].role}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* Values Section - Dark */}
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
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                What Drives Us
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Our shared values and commitment to excellence guide every decision we make.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Target,
                  title: 'Disciplined Approach',
                  description: 'We maintain strict investment criteria and process discipline, never compromising on quality for short-term gains.'
                },
                {
                  icon: TrendingUp,
                  title: 'Continuous Learning',
                  description: 'Markets evolve, and so do we. We embrace new insights while staying grounded in fundamental principles.'
                },
                {
                  icon: Users,
                  title: 'Aligned Interests',
                  description: 'With 99% of our net worth invested alongside our strategy, our incentives are fully aligned with long-term performance.'
                }
              ].map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-gradient-to-b from-gray-800/80 to-gray-800/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                      <value.icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
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
