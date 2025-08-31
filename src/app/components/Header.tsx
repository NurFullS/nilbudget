'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from './UserContext'

const Header = () => {
  const { user, setUser } = useUser()
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/auth/me`, { withCredentials: true })
        setUser(res.data)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [BASE_URL, setUser])

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true })
      setUser(null)
      router.push('/auth/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 h-[80px]">
        <Link href="/" className="flex items-center gap-2 select-none">
          <span className="text-xl font-bold">NilBudget</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-lg">
          <Link href="/">Main</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/settings">Settings</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <>
              <span><strong>{user.username}</strong></span>
              <button onClick={handleLogout} className="text-red-600 underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-blue-700 py-4 gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)}>Main</Link>
          {user && <Link href="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>}
          {user ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false) }}>Logout</button>
          ) : (
            <>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link href="/auth/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
