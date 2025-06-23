'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { TrendingUp, Shield, Target, BarChart3, Users, Award } from 'lucide-react'
import Navbar from '@/components/Navbar'
import StatBoxSection from '@/components/StatBoxSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black pt-20 overflow-hidden">
      <Navbar />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-emerald-100 rounded-full opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-48 h-48 bg-emerald-100 rounded-full opacity-15"
          animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-emerald-100 rounded-full opacity-10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Content container with delayed entrance */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10"
      >

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between max-w-[85rem] mx-auto p-10 min-h-[80vh]">
          
          {/* Left Text */}
          <div className="md:w-2/3 w-full p-6 md:p-10 -mt-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-5xl font-bold mb-6
               bg-gradient-to-r from-green-900 via-green-700 to-green-900
               bg-clip-text text-transparent
               animate-gradient leading-tight">
                Disciplined Investing in Mispriced Quality
              </h1>
              
              <p className="text-[18.4px] leading-relaxed text-gray-600 mb-8">
                B.D. Sterling is a long only investment project grounded in four core principles: disciplined capital allocation, structured risk taking, intellectual humility, and an owner’s mindset. We’ve committed nearly our entire net worth to a single account to reflect true skin in the game, focusing on a small number of deeply researched companies where long term compounding clearly outweighs risk. When opportunities are limited, we hold cash, act only on evidence and communicate with radical transparency.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Learn Our Strategy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all duration-300"
                >
                  View Research
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Image with enhanced styling */}
          <div className="md:w-8/12 w-full flex relative p-6 md:p-10 -mt-14">
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-3xl blur-1xl opacity-20 scale-105"></div>
              <img 
                src="/fun_pic.jpg"
                alt="Investment Illustration"
                className="relative w-full h-auto opacity-90 rounded-2xl shadow-2xl"
              />
              
              {/* Floating stats cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Portfolio Focus</p>
                    <p className="text-sm font-bold text-gray-800">Quality Businesses</p>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>


        {/* Stats Section */}
        <div className="pb-10">


        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <StatBoxSection />
        </motion.div>
        </div>


        {/* Enhanced Core Values Section */}
        <div className="bg-gray-50 py-20 relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                Our Core Principles
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              

              
            {/* === 1 DISCIPLINED CAPITAL ALLOCATION ================================= */} 
            <motion.div
              className="group p-8 bg-white shadow-lg rounded-3xl 
                        border border-gray-100 hover:border-emerald-300
                        transition-all duration-500 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 left-0 w-full h-2 animate-gradient bg-[linear-gradient(90deg,#10B981,#059669,#10B981)]" />
              
              <h3 className="text-xl font-bold mt-6 mb-3 text-[#082C16] uppercase tracking-wide text-center">
                Disciplined Capital Allocation
              </h3>
              <p className="text-[#4B5563] text-sm leading-relaxed text-center">
                We allocate capital only when expected long-term compounding outweighs
                risk. Idle cash is preserved unless it can generate better risk-adjusted
                returns.
              </p>
            </motion.div>

            {/* === 2 STRUCTURED RISK TAKING ========================================= */} 
            <motion.div
              className="group p-8 bg-white shadow-lg rounded-3xl 
                        border border-gray-100 hover:border-emerald-300
                        transition-all duration-500 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 left-0 w-full h-2 animate-gradient bg-[linear-gradient(90deg,#10B981,#059669,#10B981)]" />
              
              <h3 className="text-xl font-bold mt-6 mb-3 text-[#082C16] uppercase tracking-wide text-center">
                Structured Risk Taking
              </h3>
              <p className="text-[#4B5563] text-sm leading-relaxed text-center">
                We embrace concentration but require each position to follow a clear thesis,
                scenario plan, and exit triggers. We act only on new material evidence, not
                market noise.
              </p>
            </motion.div>

            {/* === 3 INTELLECTUAL HUMILITY ========================================== */} 
            <motion.div
              className="group p-8 bg-white shadow-lg rounded-3xl 
                        border border-gray-100 hover:border-emerald-300
                        transition-all duration-500 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 left-0 w-full h-2 animate-gradient bg-[linear-gradient(90deg,#10B981,#059669,#10B981)]" />

              <h3 className="text-xl font-bold mt-6 mb-3 text-[#082C16] uppercase tracking-wide text-center">
                Intellectual Humility
              </h3>
              <p className="text-[#4B5563] text-sm leading-relaxed text-center">
                Markets are tough teachers. We acknowledge uncertainty, seek dissenting
                views, and adapt when facts change. Youth matters when grounded in humility
                and learning.
              </p>
            </motion.div>

            {/* === 4 TRANSPARENT PARTNERSHIP ======================================== */} 
            <motion.div
              className="group p-8 bg-white shadow-lg rounded-3xl 
                        border border-gray-100 hover:border-emerald-300
                        transition-all duration-500 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 left-0 w-full h-2 animate-gradient bg-[linear-gradient(90deg,#10B981,#059669,#10B981)]" />

              <h3 className="text-xl font-bold mt-6 mb-3 text-[#082C16] uppercase tracking-wide text-center">
                Transparent Partnership
              </h3>
              <p className="text-[#4B5563] text-sm leading-relaxed text-center">
                Investors deserve clarity. We give timely updates, admit mistakes, and speak
                plainly. Trust is built in years, not quarters — we earn it through honesty.
              </p>
            </motion.div>

            </div>
          </div>
        </div>

        {/* Enhanced Research Section */}
        <div className="py-20 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-blue-50"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-10 relative">

            {/* Left Image - Enhanced */}
            <div className="md:w-1/2 w-full flex relative p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl blur-2xl opacity-20 scale-105"></div>
                <div className="relative bg-white p-4 rounded-2xl shadow-2xl">
                  <img 
                    src="/investment_chart.jpg" 
                    alt="Research Driven Investing" 
                    className="rounded-lg w-full h-auto"
                  />
                </div>
                
                {/* Enhanced floating elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  className="absolute -top-4 -right-4 bg-emerald-500 text-white p-3 rounded-full shadow-lg"
                >
                  <BarChart3 className="w-6 h-6" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.7 }}
                  className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
                >
                  <Users className="w-6 h-6" />
                </motion.div>
              </motion.div>
            </div>

            {/* Right Text - Enhanced */}
            <div className="md:w-1/2 w-full p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 mb-6"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-emerald-600 font-semibold text-lg">Research Excellence</span>
                </motion.div>

                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                  Research-Driven Capital Allocation
                </h2>
                
                <p className="text-xl leading-relaxed text-gray-600 mb-6">
                  Our investment philosophy centers around comprehensive fundamental research, supported by rigorous financial modeling and industry analysis. 
                  Every capital allocation decision is driven by deep due diligence, focusing on business quality, management competence, and pricing dislocations.
                </p>

                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-2xl border border-emerald-100 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-emerald-700">Our Philosophy:</strong> True alpha lies in developing conviction through understanding — not speculation. 
                    Our team evaluates each opportunity through a long-term lens, filtering out noise and focusing on sustainable growth, 
                    competitive advantages, and margin of safety.
                  </p>
                </div>

                {/* Key metrics or features */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-4 rounded-xl shadow-lg border border-gray-100"
                  >
                    <h4 className="font-bold text-emerald-700 mb-1">Deep Analysis</h4>
                    <p className="text-sm text-gray-600">Comprehensive due diligence on every investment</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-4 rounded-xl shadow-lg border border-gray-100"
                  >
                    <h4 className="font-bold text-blue-700 mb-1">Long-Term Focus</h4>
                    <p className="text-sm text-gray-600">Multi-year investment horizons for compounding</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

      </motion.div>
    </main>
  )
}