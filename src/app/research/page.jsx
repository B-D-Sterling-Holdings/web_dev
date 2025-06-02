'use client'

export default function Research() {
  return (
    <main className="min-h-screen bg-white text-black font-sans">

      {/* Global Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold">B.D. Sterling</span>
        </div>

        {/* Nav Links */}
        <div className="flex space-x-8 text-lg font-medium">
          <a href="/" className="hover:text-blue-600">Home</a>
          <a href="/about" className="hover:text-blue-600">About Us</a>
          <a href="/strategy" className="hover:text-blue-600">Investment Strategy</a>
          <a href="/research" className="hover:text-blue-600">Equity Research</a>
          <a href="/investor-relations" className="hover:text-blue-600">Investor Relations</a>
          <a href="/contact" className="hover:text-blue-600">Contact Us</a>
        </div>
      </nav>

      {/* Equity Research Content */}
      <div className="max-w-5xl mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Equity Research</h2>
        <p className="text-lg text-center text-gray-700 mb-8">
          Below are research reports for select companies we have covered in the past.
        </p>

        <div className="flex flex-col items-center space-y-6">
          <a href="/research/google" className="text-xl font-semibold text-blue-600 hover:underline">Google (Alphabet Inc)</a>
          <a href="/research/amazon" className="text-xl font-semibold text-blue-600 hover:underline">Amazon</a>
          <a href="/research/unitedhealthcare" className="text-xl font-semibold text-blue-600 hover:underline">United Healthcare</a>
        </div>
      </div>

    </main>
  )
}
