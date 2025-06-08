'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHideNavbar(true);
      } else {
        setHideNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md text-white"
      style={{ backgroundColor: '#082C16' }}
      animate={{ y: hideNavbar ? -90 : 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="flex items-center space-x-2">
        <img src="/new_logo.png" alt="Logo" className="h-20 w-auto" />
      </div>

      <div className="flex space-x-8 text-base font-medium">
        <a href="/" className="hover:text-gray-300">Home</a>
        <a href="/about" className="hover:text-gray-300">About</a>
        <a href="/strategy" className="hover:text-gray-300">Investment Strategy</a>
        <a href="/research" className="hover:text-gray-300">Equity Research</a>
        <a href="/portfolio-analytics" className="hover:text-gray-300">Porfolio Analytics</a>
        <a href="/contact" className="hover:text-gray-300">Contact Us</a>
      </div>
    </motion.nav>
  )
}
