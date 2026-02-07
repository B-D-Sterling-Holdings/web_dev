'use client'

import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'

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
    q: "Why do you guys have such a concentrated amount of holdings?",
    a: "Learning from the investment titans before us, we have adopted a concentrated portfolio strategy. Most of the model portfolio returns can be accredited to a select few names, and this is where we believe our concentration and energy should be focused on. \"I like putting all my eggs into one basket, and then watching that basket very carefully.\" - Stanley Druckenmiller"
  },
  {
    q: "Does B.D. Sterling focus on value investing or growth investing?",
    a: "Growth and value are not mutually exclusive. Value is in identifying opportunities where the market fails to reflect the company's underlying fundamentals and growth potential in the stock price. A higher than market P/E ratio does not disqualify a stock if its growth trajectory significantly surpasses market averages. Growth doesn't cancel out value, it can be the very reason value exists. In fact, many of the best value opportunities arise when the market underestimates the quality and sustainability of a company's growth."
  },
  {
    q: "What AI initiatives is B.D. Sterling working on?",
    a: "We are actively developing proprietary AI systems to enhance our investment research capabilities. Our flagship projects include Prism AI, an AI-powered document analysis tool, a Retrieval-Augmented Generation (RAG) knowledge system, and an AI-driven portfolio allocation model. These tools augment human judgment rather than replace it, helping us process financial documents at scale while maintaining rigorous fundamental analysis."
  },
  {
    q: "What is Prism AI?",
    a: "Prism AI is our proprietary document analysis tool built specifically for investment research. It leverages a curated knowledge base of financial documents, including SEC filings, research reports, and internal analysis, to help our team synthesize competitive intelligence and validate investment theses. Prism is a research tool, not a chatbot; it helps us conduct deeper analysis without sacrificing rigor."
  },
  {
    q: "How does AI improve your investment research process?",
    a: "AI serves as a force multiplier for our research team. Our systems process SEC filings, market data, and financial documents to surface investment-relevant insights. Quantitative models analyze historical patterns, sentiment data, and fundamental metrics to identify potential market dislocations. Importantly, AI augments our judgment. It doesn't replace the rigor of fundamental analysis. Every AI-generated insight is reviewed and validated by our team."
  },
];


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-emerald-400 mx-auto rounded-full"></div>
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
              className="border border-gray-700/50 rounded-2xl overflow-hidden bg-gray-800/60 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {item.q}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-500" />
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
                  <div className="w-full h-px bg-gray-700 mb-6"></div>
                  <p className="text-gray-400 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}