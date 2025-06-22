'use client'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black pt-28">
      <Navbar />

      {/* Content container with delayed entrance */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto p-10">
          
          {/* Left Text */}
          <div className="md:w-1/2 w-full p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-5xl font-bold mb-6" style={{ color: '#082C16' }}>
                Disciplined Investing in Mispriced Quality
              </h1>
              <p className="text-lg leading-relaxed text-gray-700 text-justify">
                B.D. Sterling is a project to develop a disciplined approach to capturing value dislocations and market inefficiencies. 
                We focus on long-term compounding while minimizing downside risk by investing in high-quality businesses at favorable entry points.<br /><br />
                Currently, B.D. Sterling is being developed by student founders at Texas A&M University.
                We have committed virtually our entire net worth in one account to demonstrate having skin in the game,
                concentrating in a handful of deeply researched businesses where long-term compounding comfortably outweighs risk.
                We hold cash when opportunities are scarce, act only on evidence, not noise, and communicate with transparency. 
              </p>
            </motion.div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 w-full flex relative p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img 
                src="/fun_pic.jpg"
                alt="Investment Illustration"
                className="w-[175%] h-auto opacity-90"
              />
            </motion.div>
          </div>
        </div>

        {/* CORE VALUES SECTION */}
        <div className="bg-gray-100 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">

            <motion.h2 
              className="text-4xl font-bold mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ color: '#082C16' }}
            >
              Our Core Principles
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              {/* Principle 1 */}
              <motion.div 
                className="p-8 bg-white shadow-lg rounded-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4">Principle 1</h3>
                <p className="text-lg text-gray-700 text-center">
                  Insert principle here and expand on how it supports the firm’s overall approach, why it is important to the organization’s long-term objectives, and how it guides decision-making across varying market environments.
                </p>
              </motion.div>

              {/* Principle 2 */}
              <motion.div 
                className="p-8 bg-white shadow-lg rounded-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4">Principle 2</h3>
                <p className="text-lg text-gray-700 text-center">
                  Insert principle here and expand on how it supports the firm’s overall approach, why it is important to the organization’s long-term objectives, and how it guides decision-making across varying market environments.
                </p>
              </motion.div>

              {/* Principle 3 */}
              <motion.div 
                className="p-8 bg-white shadow-lg rounded-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4">Principle 3</h3>
                <p className="text-lg text-gray-700 text-center">
                  Insert principle here and expand on how it supports the firm’s overall approach, why it is important to the organization’s long-term objectives, and how it guides decision-making across varying market environments.
                </p>
              </motion.div>

            </div>

          </div>
        </div>



        {/* NEW SECTION BELOW */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-10">

            {/* Left Image */}
            <div className="md:w-1/2 w-full flex relative p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <img 
                  src="/investment_chart.jpg" 
                  alt="Research Driven Investing" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </motion.div>
            </div>

            {/* Right Text */}
            <div className="md:w-1/2 w-full p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6" style={{ color: '#082C16' }}>
                  Research-Driven Capital Allocation
                </h2>
                <p className="text-lg leading-relaxed text-gray-700 text-justify">
                  Our investment philosophy centers around comprehensive fundamental research, supported by rigorous financial modeling and industry analysis. 
                  Every capital allocation decision is driven by deep due diligence, focusing on business quality, management competence, and pricing dislocations.
                  <br /><br />
                  We believe true alpha lies in developing conviction through understanding — not speculation. Our team evaluates each opportunity through a long-term lens, filtering out noise and focusing on sustainable growth, competitive advantages, and margin of safety.
                </p>
              </motion.div>
            </div>

          </div>
        </div>

        



      </motion.div>
    </main>
  )
}
