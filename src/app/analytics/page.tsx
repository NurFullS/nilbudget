'use client'

import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import axios from 'axios'

interface UserSummary {
  totalIncome: number
  totalExpense: number
  balance: number
}

const AnalyticsPage = () => {
  const [summary, setSummary] = useState<UserSummary | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/summary', {
          withCredentials: true
        })
        setSummary(response.data)
      } catch (error) {
        console.error('Error fetching summary:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 space-y-6">
          <h1 className="text-3xl font-bold mb-6">📊 Analytics</h1>

          {/* Карточки: Income, Consumption, Balance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-green-100 shadow-md rounded-2xl">
              <CardContent className="p-6 flex flex-col items-center">
                <TrendingUp size={40} className="text-green-600" />
                <p className="text-lg font-medium text-green-700 mt-2">Income</p>
                <h2 className="text-2xl font-bold text-green-800">
                  {summary?.totalIncome?.toLocaleString()} $
                </h2>
              </CardContent>
            </Card>

            <Card className="bg-red-100 shadow-md rounded-2xl">
              <CardContent className="p-6 flex flex-col items-center">
                <TrendingDown size={40} className="text-red-600" />
                <p className="text-lg font-medium text-red-700 mt-2">Consumption</p>
                <h2 className="text-2xl font-bold text-red-800">
                  {summary?.totalExpense?.toLocaleString()} $
                </h2>
              </CardContent>
            </Card>

            <Card className="bg-blue-100 shadow-md rounded-2xl">
              <CardContent className="p-6 flex flex-col items-center">
                <DollarSign size={40} className="text-blue-600" />
                <p className="text-lg font-medium text-blue-700 mt-2">Balance</p>
                <h2 className="text-2xl font-bold text-blue-800">
                  {summary?.balance?.toLocaleString()} $
                </h2>
              </CardContent>
            </Card>
          </div>

          {/* Здесь можно добавить график доход/расход */}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
