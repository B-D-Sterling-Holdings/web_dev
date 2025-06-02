'use client'
import Navbar from '@/components/Navbar'

export default function Research() {
  return (
    <main className="min-h-screen bg-white text-black">

      <Navbar />

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
