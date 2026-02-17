'use client'
import { motion } from 'framer-motion'
import { LayoutDashboard, Layers, ShieldAlert, BarChart3, Lightbulb } from 'lucide-react'

const tabs = [
  { id: 'summary', label: 'Summary', icon: LayoutDashboard },
  { id: 'lots', label: 'Lots', icon: Layers },
  { id: 'risk', label: 'Risk', icon: ShieldAlert },
  { id: 'factors', label: 'Factors', icon: BarChart3 },
  { id: 'suggestions', label: 'Suggestions', icon: Lightbulb },
]

export default function DashboardTabs({ activeTab, onTabChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-100 p-1.5 rounded-2xl inline-flex gap-1 overflow-x-auto max-w-full"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              isActive
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-xl shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {tab.label}
            </span>
          </button>
        )
      })}
    </motion.div>
  )
}
