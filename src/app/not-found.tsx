'use client'

import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col justify-center items-center text-center mr-40 mb-40">
          <h1 className="text-7xl font-extrabold text-red-500 mb-4">404</h1>
          <p className="text-2xl font-semibold text-gray-800 mb-2">
            Page Not Found
          </p>
          <p className="text-gray-600 mb-8">
            Sorry, but there is no such page!
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Back to Main
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
