'use client'

import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function SleekFAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqData = [
  {
    q: "What is B.D. Sterling?",
    a: "B.D. Sterling is a research driven investment project and model portfolio operated by its portfolio managers. The strategy is executed through a jointly managed account to establish a real world track record under live market conditions."
  },
  {
    q: "What is the overall strategy?",
    a: "B.D. Sterling buys high quality qualities that are simply mispriced. The mispricing can be due to sentiment, change in business model, macro events, corporate actions, legal actions. This incorporates our appreciation for high quality companies that compound at high rate over a long period of time, as well as special situations where a company has the ability to unlock value in a clear horizon. Providing a blend of uncorrelated alpha and taking advantage of the simple science of compounding."
  },
  {
    q: "Can I invest in this fund?",
    a: "We are NOT publicly solicitating at this moment. We do not accept ANY external investors."
  },
  {
    q: "Why do you guys have such a concentrated amount of holdings?",
    a: "Learning from the investment titans before us, we have adopted a concentrated portfolio strategy. Most of the model portfolio returns can be accredited to a select few names, and this is where we believe our concentration and energy should be focused on. “I like putting all my eggs into one basket, and then watching that basket very carefully.” - Stanley Druckenmiller"
  },
  {
    q: "Does B.D. Sterling focus on value investing or growth investing?",
    a: "Growth and value are not mutually exclusive. Value is in identifying opportunities where the market fails to reflect the company’s underlying fundamentals and growth potential in the stock price. A higher than market P/E ratio does not disqualify a stock if its growth trajectory significantly surpasses market averages. Growth doesn’t cancel out value, it can be the very reason value exists. In fact, many of the best value opportunities arise when the market underestimates the quality and sustainability of a company’s growth."
  }
];


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-emerald-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.q}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400" />
                  )}
                </motion.div>
              </button>

              {/* Answer */}
              <motion.div
                initial={false}
                animate={{ 
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6 pt-0">
                  <div className="w-full h-px bg-gray-200 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Have more questions? We'd love to hear from you.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all duration-300"
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}