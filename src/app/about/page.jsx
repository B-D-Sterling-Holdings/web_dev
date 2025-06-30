'use client'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <main className="min-h-screen bg-white text-black pt-20">
      <Navbar />

      {/* Content container with delayed entrance */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Meet The Team Section */}
        <div className="max-w-6xl mx-auto py-14 px-6">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Meet The Team
          </motion.h2>

          {/* Bhuvan - Image Left, Text Right */}
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/bhuvan.jpeg" 
                alt="Bhuvan" 
                className="w-64 h-64 object-cover rounded-full shadow-lg opacity-90"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-3xl font-semibold mb-2">Bhuvan</h3>
              <p className="text-xl text-gray-600 mb-4">Co-CIO, CEO</p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Bhuvan Siddaveerappa co-launched BD Sterling as a project to institutionalize the disciplined, fundamentals driven approach he refined while managing the Sinn Fund (multi strategy hedge fund) and Maroon Fund (long only fund) at Texas A&M and interning on equity-trading desks at Kershner Trading Group. His leadership stems from past roles as Scholars of Finance chapter president and organizer of TAMU’s student finance conference, where he refined his talent for mentoring analysts and promoting values-driven decision making.
              </p>
            </div>
          </motion.div>

          {/* Dhruv - Text Left, Image Right */}
          <motion.div 
            className="flex flex-col md:flex-row-reverse items-center gap-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/dhruv.png" 
                alt="Dhruv" 
                className="w-64 h-64 object-cover rounded-full shadow-lg opacity-90"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-right">
              <h3 className="text-3xl font-semibold mb-2">Dhruv</h3>
              <p className="text-xl text-gray-600 mb-4">Co-CIO, Director of Quantitative Division</p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Dhruv Datta is an engineer by academics and a businessman at heart, combining technical skills with an entrepreneurial mindset. He is a founder of 2 business ventures already and is helping build BD Sterling into a focused investment project centered on finding dislocated high quality companies. As Executive Vice President of Scholars of Finance, he helps develop leadership in the next generation of finance professionals. Dhruv takes pride in the rigor of his equity research driven approach to the markets and is leading the development of quantitative models to find an edge.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}