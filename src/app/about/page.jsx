'use client'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <main className="min-h-screen bg-white text-black pt-24">
      <Navbar />

      {/* Content container with delayed entrance */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Meet The Team Section */}
        <div className="max-w-6xl mx-auto py-20">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Meet The Team
          </motion.h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-16">
            {/* Bhuvan */}
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img 
                src="/bhuvan.jpeg" 
                alt="Bhuvan" 
                className="w-64 h-64 object-cover rounded-full shadow-lg mb-6 opacity-90"
              />
              <h3 className="text-2xl font-semibold">Bhuvan</h3>
              <p className="text-lg text-gray-600">Co-CIO, CEO</p>
            </motion.div>

            {/* Dhruv */}
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <img 
                src="/dhruv.png" 
                alt="Dhruv" 
                className="w-64 h-64 object-cover rounded-full shadow-lg mb-6 opacity-90"
              />
              <h3 className="text-2xl font-semibold">Dhruv</h3>
              <p className="text-lg text-gray-600">Co-CIO, Director of Quantitative Division</p>
            </motion.div>
          </div>
        </div>

        {/* Who We Are Section */}
        <div className="bg-gray-100 py-20">
          <div className="max-w-5xl mx-auto px-6 text-center">

            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Who We Are
            </motion.h2>

            <motion.p 
              className="text-lg md:text-xl text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Insert a brief introductory paragraph here that highlights your founding team's core identity. 
              Include key aspects such as: your professional backgrounds (engineering, finance, research, etc.),
              your shared mission or passion, and your motivation for starting the firm or project.
            </motion.p>

            <motion.p 
              className="text-lg md:text-xl text-gray-700 leading-relaxed mt-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              You may also reference any unique expertise, networks, or partnerships that differentiate your approach.
              This section should establish credibility and communicate the unique blend of skills and experiences
              that guide your firm's philosophy
            </motion.p>

          </div>
        </div>
      </motion.div>
    </main>
  )
}
