'use client'

export default function GoogleResearch() {
  return (
    <main className="min-h-screen bg-white text-black font-sans">

      {/* Global Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-md">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold">B.D. Sterling</span>
        </div>
        <div className="flex space-x-8 text-lg font-medium">
          <a href="/" className="hover:text-blue-600">Home</a>
          <a href="/about" className="hover:text-blue-600">About Us</a>
          <a href="/strategy" className="hover:text-blue-600">Investment Strategy</a>
          <a href="/research" className="hover:text-blue-600">Equity Research</a>
          <a href="/investor-relations" className="hover:text-blue-600">Investor Relations</a>
          <a href="/contact" className="hover:text-blue-600">Contact Us</a>
        </div>
      </nav>

      {/* Google Research Content */}
      <div className="max-w-5xl mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Google (Alphabet Inc) Equity Research Report</h2>
        
        {/* PowerPoint Embed */}
        <div className="flex justify-center mt-8">
          <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vQdOpAsT5tgAOufY22keF0by1LFKutduj_lRINUmQwiKdcoovrL8fcS89DzAULlOzt4u7N3QS3kU7E4/pubembed?start=true&loop=true&delayms=5000"
            width="960"
            height="569"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        </div>

      </div>
    </main>
  )
}
