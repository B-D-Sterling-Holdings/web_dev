'use client'

export default function About() {
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

      {/* About Us Section */}
      <div className="max-w-6xl mx-auto py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Meet The Team</h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-16">
          
          {/* Bhuvan */}
          <div className="flex flex-col items-center text-center">
            <img 
              src="/bhuvan.jpg" 
              alt="Bhuvan" 
              className="w-64 h-64 object-cover rounded-full shadow-lg mb-6 opacity-90"
            />
            <h3 className="text-2xl font-semibold">Bhuvan</h3>
            <p className="text-lg text-gray-600">Co-Founder</p>
          </div>

          {/* Dhruv */}
          <div className="flex flex-col items-center text-center">
            <img 
              src="/dhruv.jpg" 
              alt="Dhruv" 
              className="w-64 h-64 object-cover rounded-full shadow-lg mb-6 opacity-90"
            />
            <h3 className="text-2xl font-semibold">Dhruv</h3>
            <p className="text-lg text-gray-600">Co-Founder</p>
          </div>

        </div>
      </div>
    </main>
  )
}
