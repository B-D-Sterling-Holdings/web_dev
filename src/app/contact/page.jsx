'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Mail,
  MessageSquare,
  Send,
  User,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'United States',
    phone: '',
    message: ''
  })

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.firstName || !formData.email || !formData.message) {
      setError(true)
      return
    }

    setSubmitting(true)
    setError(false)

    try {
      const response = await fetch("/api/sheet/contact", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          country: 'United States',
          phone: '',
          message: ''
        })
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }

    setSubmitting(false)
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-black overflow-hidden">
      <Navbar />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-cyan-50/60" />
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-emerald-200/30 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-200/20 via-transparent to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10">

        {/* Hero Section */}
        <section className="pt-32 pb-12 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200/60 rounded-full mb-8"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Get in Touch</span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
                <span className="text-gray-900">Let's Start a</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  Conversation
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                If you're interested in learning more about B.D. Sterling or exploring potential partnerships,
                we'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>


        {/* Contact Form Section */}
        <section className="py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

              {/* Left - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                  <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you shortly.</p>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name Row */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name <span className="text-emerald-600">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300"
                            placeholder="John"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Country & Phone Row */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300 appearance-none"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300 min-h-[150px] resize-none"
                          placeholder="Tell us about your interests or questions..."
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>

                    {/* Success/Error Messages */}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <p className="text-emerald-700 font-medium">Thank you! Your message has been sent successfully.</p>
                      </motion.div>
                    )}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                      >
                        <p className="text-red-700 font-medium">Please fill out all required fields and try again.</p>
                      </motion.div>
                    )}
                  </form>
                </div>
              </motion.div>

              {/* Right - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-6"
              >
                {/* Contact Info Card */}
                <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                      }}
                    />
                  </div>

                  <div className="relative">
                    <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Team Members</p>
                          <p className="font-medium">Bhuvan Siddaveerappa</p>
                          <p className="font-medium">Dhruv Datta</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Email</p>
                          <a href="mailto:bdsterlingfund@gmail.com" className="font-medium hover:text-emerald-400 transition-colors">
                            bdsterlingfund@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links Card */}
                <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-3xl p-8 border border-emerald-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More</h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    Learn more about our investment approach and research methodology.
                  </p>
                  <div className="space-y-3">
                    <Link href="/strategy">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-100 hover:border-emerald-300 transition-colors cursor-pointer"
                      >
                        <span className="font-medium text-gray-900">Our Strategy</span>
                        <ArrowRight className="w-4 h-4 text-emerald-600" />
                      </motion.div>
                    </Link>
                    <Link href="/research">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-100 hover:border-emerald-300 transition-colors cursor-pointer"
                      >
                        <span className="font-medium text-gray-900">View Research</span>
                        <ArrowRight className="w-4 h-4 text-emerald-600" />
                      </motion.div>
                    </Link>
                    <Link href="/about">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-100 hover:border-emerald-300 transition-colors cursor-pointer"
                      >
                        <span className="font-medium text-gray-900">Meet the Team</span>
                        <ArrowRight className="w-4 h-4 text-emerald-600" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
