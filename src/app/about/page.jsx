'use client'
import Navbar from '@/components/Navbar'

export default function About() {
  return (
    <main className="min-h-screen bg-white text-black">
      
      <Navbar />

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
              src="/dhruv.png" 
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
