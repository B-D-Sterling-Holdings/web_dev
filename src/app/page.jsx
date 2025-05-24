// src/app/page.jsx
import SheetTable from '@/components/SheetTable'

export default function Home() {
  return (
    <main className="p-8">
      {/* relative wrapper → title centered, logo absolutely top-right */}
      <div className="relative mb-6">
        <h1 className="text-center text-2xl font-bold">
          Amit Datta's Portfolio Analytics
        </h1>
        <img
          src="/logo.png"
          alt="Logo"
          className="absolute top-0 right-0 h-12 w-auto"
        />
      </div>

      <div className="flex justify-center">
        <SheetTable />
      </div>
    </main>
  )
}
