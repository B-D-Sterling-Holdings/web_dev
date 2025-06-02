'use client'

export default function Strategy() {
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

      {/* Investment Strategy Content */}
      <div className="max-w-5xl mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Investment Strategy</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          At B.D. Sterling, we believe in investing with discipline, patience, and a long-term mindset. 
          Our strategy focuses on identifying companies with durable competitive advantages, strong fundamentals, and long growth runways. 
          We leverage a value-oriented approach to acquire high-quality businesses during temporary dislocations when prices do not reflect intrinsic value.
          <br /><br />
          We perform deep fundamental research, rigorous valuation modeling, and deep catalyst analysis to assess each opportunity. Our disciplined entry points allow us to minimize downside risk while maximizing upside potential as the market corrects inefficiencies over time.
          <br /><br />
          By avoiding speculative short-term trends and focusing on the underlying business quality, we aim to deliver sustainable returns through all market cycles.
        </p>
      </div>

    </main>
  )
}
