'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Brain, LineChart, FileText, Wrench, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hide, setHide] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      setHide(y > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/strategy', label: 'Strategy' },
    {
      label: 'Our Work',
      dropdown: [
        { href: '/ai-initiatives', label: 'AI Initiatives', icon: Brain, desc: 'AI research & innovation' },
        { href: '/research', label: 'Equity Research', icon: LineChart, desc: 'Investment theses & analysis' },
        { href: '/progress-letters', label: 'Progress Letters', icon: FileText, desc: 'Periodic investor updates' },
        { href: '/tools', label: 'Tools', icon: Wrench, desc: 'Financial analysis tools' },
      ]
    },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      animate={{ y: hide ? -90 : 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={[
        'fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 lg:px-8 py-3',
        'transition-colors duration-300 backdrop-blur-md',
        scrolled
          ? 'bg-white/80 shadow-md text-emerald-900'
          : 'bg-transparent text-emerald-900'
      ].join(' ')}
      ref={dropdownRef}
    >
      {/* ---- Logo ---- */}
      <a href="/" className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
      </a>

      {/* ---- Desktop Links ---- */}
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-base font-medium">
        {navItems.map((item, idx) =>
          item.dropdown ? (
            <div key={idx} className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                onMouseEnter={() => setOpenDropdown(idx)}
                className="relative group flex items-center gap-1 hover:text-emerald-600 transition-colors duration-300 py-2"
              >
                {item.label}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === idx ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full" />
              </button>

              <AnimatePresence>
                {openDropdown === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="absolute top-full right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-900/10 border border-gray-100 overflow-hidden py-2"
                  >
                    {item.dropdown.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setOpenDropdown(null)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-emerald-50/80 transition-colors duration-200 group/item"
                      >
                        <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover/item:bg-emerald-500 transition-colors duration-200">
                          <sub.icon className="w-4.5 h-4.5 text-emerald-600 group-hover/item:text-white transition-colors duration-200" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{sub.label}</p>
                          <p className="text-xs text-gray-500">{sub.desc}</p>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ y: -2 }}
              className="relative group hover:text-emerald-600 transition-colors duration-300"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          )
        )}
      </div>

      {/* ---- Mobile Menu Button ---- */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* ---- Mobile Menu ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl border-t border-gray-100 md:hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item, idx) =>
                item.dropdown ? (
                  <div key={idx}>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                      className="w-full flex items-center justify-between py-3 text-gray-900 font-medium hover:text-emerald-600 transition-colors"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === idx ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-2 space-y-1">
                            {item.dropdown.map((sub) => (
                              <a
                                key={sub.href}
                                href={sub.href}
                                onClick={() => { setMobileOpen(false); setOpenDropdown(null) }}
                                className="flex items-center gap-3 py-2.5 text-gray-600 hover:text-emerald-600 transition-colors"
                              >
                                <sub.icon className="w-4 h-4 text-emerald-500" />
                                <span className="text-sm font-medium">{sub.label}</span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-gray-900 font-medium hover:text-emerald-600 transition-colors"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
