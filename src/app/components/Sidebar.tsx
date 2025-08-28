'use client'

import Link from 'next/link'
import { Home, BarChart3, User, Settings, History } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className="bg-blue-800 text-white w-[250px] h-[450px] mt-10 p-6 rounded-r-3xl shadow-lg flex flex-col gap-8">
      <div className="text-2xl font-bold text-center mb-6">Dashboard</div>
      
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
          <Home size={20} /> Traffic
        </Link>
        <Link href="/analytics" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
          <BarChart3 size={20} /> Analytics
        </Link>
        <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
          <User size={20} /> Profile
        </Link>
        <Link href="/history" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
          <History />History
        </Link>
        <Link href="/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
          <Settings size={20} /> Settings
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar
