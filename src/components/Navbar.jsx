'use client'

export default function Navbar() {
  return (
    <nav 
      className="flex justify-between items-center px-8 py-4 shadow-md text-white"
      style={{ backgroundColor: '#082C16' }}
    >
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/new_logo.png" alt="Logo" className="h-20 w-auto" />
        <span className="text-2xl font-bold"></span>
      </div>

      {/* Nav Links */}
      <div className="flex space-x-8 text-base font-medium">
        <a href="/" className="hover:text-gray-300">Home</a>
        <a href="/about" className="hover:text-gray-300">About</a>
        <a href="/strategy" className="hover:text-gray-300">Investment Strategy</a>
        <a href="/research" className="hover:text-gray-300">Equity Research</a>
        <a href="/portfolio-analytics" className="hover:text-gray-300">Porfolio Analytics</a>
        <a href="/contact" className="hover:text-gray-300">Contact Us</a>
      </div>
    </nav>
  )
}
