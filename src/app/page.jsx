'use client'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      
      <Navbar/>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto p-10">
        
        {/* Left Text */}
        <div className="md:w-1/2 w-full mb-12 md:mb-0 mt-14">
          <h1 className="text-5xl font-bold mb-6 -translate-x-10" style={{ color: '#082C16' }}>
            Disciplined Investing in Mispriced Quality
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 text-justify -translate-x-10">
            B.D. Sterling is a project to develop a disciplined approach to capturing value dislocations and market inefficiencies. 
            We focus on long-term compounding while minimizing downside risk by investing in high-quality businesses at favorable entry points.<br /><br />
            Currently, B.D. Sterling is being developed by student founders at Texas A&M University, leveraging academic resources, professional mentorship, and real world investment analysis to build a foundation in disciplined capital allocation. 
            We truly hope that through our equity research, contrarian views on market pricing, and evolving philosophy, you find value in our insights.<br /><br />
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 w-full flex relative">
          <img 
            src="/tamu_pic.jpg"
            alt="Investment Illustration"
            className="w-[175%] h-auto opacity-90 translate-x-12"
          />
        </div>

      </div>

    </main>
  )
}
