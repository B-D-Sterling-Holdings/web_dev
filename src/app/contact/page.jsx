'use client'
import Navbar from '@/components/Navbar'
import { useState } from 'react'
import { motion } from 'framer-motion'

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
    <main className="min-h-screen bg-white text-black pt-28">
      <Navbar />

      {/* Page fade-in */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-7xl mx-auto p-10 flex flex-col md:flex-row gap-16"
      >

        {/* Left Form Section */}
        <motion.div 
          className="md:w-2/3"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#082C16' }}>
            Contact Us
          </h1>
          <p className="text-lg mb-8">
            If you’re interested in learning more about B.D. Sterling or exploring potential opportunities, we invite you to get in touch with us.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">First Name (required)</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded" required />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email Address (required)</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded" required />
            </div>

            <div className="flex gap-4">
              <div className="w-1/3">
                <label className="block text-sm font-medium mb-1">Country</label>
                <select name="country" value={formData.country} onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="w-2/3">
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message (required)</label>
              <textarea name="message" value={formData.message} onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded h-32" required></textarea>
            </div>

            <button 
              type="submit" 
              className="bg-[#0E472B] hover:bg-[#0C3E26] text-white font-semibold py-2 px-6 rounded-full transition duration-200 transform hover:scale-105"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "SUBMIT"}
            </button>

            {success && <p className="text-green-600 font-semibold mt-4">Thank you! Your message has been sent.</p>}
            {error && <p className="text-red-600 font-semibold mt-4">Please fill out all required fields.</p>}
          </form>
        </motion.div>

        {/* Right Contact Info */}
        <motion.div 
          className="md:w-1/3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#082C16' }}>
            Personal Contacts
          </h2>
          <p className="text-lg leading-relaxed">
            Bhuvan Siddaveerappa<br />
            Dhruv Datta<br /><br />
            bdsterlingfund@gmail.com
          </p>
        </motion.div>

      </motion.div>
    </main>
  )
}
