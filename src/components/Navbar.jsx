'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)   // bg swap
  const [hide,     setHide]     = useState(false)   // slide-away

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)        // 1️⃣ background / shadow trigger
      setHide(   y > 50)         // 2️⃣ keep your slide logic – tweak if needed
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      animate={{ y: hide ? -90 : 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={[
        'fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-3',
        'transition-colors duration-300 backdrop-blur-md',
        scrolled
          ? 'bg-white/80 shadow-md text-emerald-900'
          : 'bg-transparent text-emerald-900'
      ].join(' ')}
    >
      {/* ---- Logo ---- */}
      <a href="/" className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
      </a>

      {/* ---- Links ---- */}
      <div className="hidden md:flex space-x-8 text-base font-medium">
        {[
          ['/', 'Home'],
          ['/about', 'About Us'],
          ['/strategy', 'Investment Strategy'],
          ['/research', 'Equity Research'],
          ['/portfolio-analytics', 'Portfolio'],
          ['/contact', 'Contact Us'],
        ].map(([href, label]) => (
          <motion.a
            key={href}
            href={href}
            whileHover={{ y: -2 }}
            className="relative group hover:text-emerald-600 transition-colors duration-300"
          >
            {label}
            {/* animated underline */}
            <span
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"
            />
          </motion.a>
        ))}
      </div>
    </motion.nav>
  )
}
