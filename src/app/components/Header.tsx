'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'

type User = {
  username: string
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let isMounted = true
    const fetchUser = async () => {
      try {
        const res = await axios.get<User>('http://localhost:8080/auth/me', {
          withCredentials: true
        })
        if (isMounted) setUser(res.data)
      } catch {
        if (isMounted) setUser(null)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchUser()
    return () => {
      isMounted = false
    }
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true });
      setUser(null);
      router.push('/auth/login');
    } catch (err) {
      console.error('Error at logout!:', err);
    }
  }

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 h-[80px]">

        <Link href="/" className="flex items-center gap-2 select-none">
          <img
            className="w-[50px]"
            src="https://media.licdn.com/dms/image/v2/D5612AQGplp7JKG6Iiw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1673950361361?e=2147483647&v=beta&t=L4d5P81GijVgU4u1yJtFLVsIqATkfWTrymEPSd_C6_o"
            alt="Logo"
          />
          <span className="text-xl font-bold">NilBudget</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-lg">
          <Link href="/" className="hover:text-gray-200">Main</Link>
          <Link href="/profile" className="hover:text-gray-200">Profile</Link>
          <Link href="/settings" className="hover:text-gray-200">Settings</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <span className="text-gray-300">Loading...</span>
          ) : user ? (
            <>
              <span className="text-[18px]"><strong>{user.username}</strong></span>
              <button
                onClick={handleLogout}
                className="text-red-600 underline cursor-pointer text-[16px] font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-gray-200">Login</Link>
              <Link href="/auth/register" className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-blue-700 text-lg py-4 gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)}>Main</Link>
          {user && <Link href="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-red-400"
            >
              Logout
            </button>
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