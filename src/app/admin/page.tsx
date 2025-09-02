'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';

type Users = {
  id: number;
  username: string;
  email: string;
  balance: string;
  valute: string;
}

const ProtectedPage = () => {
  const router = useRouter()
  const [users, setUsers] = useState<Users[]>([])
  const [modalValidate, setModalValidate] = useState(true)
  const [inputValidate, setInputValidate] = useState('')
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    if (inputValidate === 'Nur') {
      setUserEmail(inputValidate)
      setModalValidate(false)
    }
  }, [inputValidate])

  useEffect(() => {
    const getUsersFetch = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/account/all-users`)
        setUsers(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getUsersFetch()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
      {modalValidate && (
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-gray-700">Write to code...</h2>
          <input
            type="text"
            value={inputValidate}
            onChange={(e) => setInputValidate(e.target.value)}
            placeholder="Write to code..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {!modalValidate && (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          {(users.map((user) => {
            return (<div key={user.id} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{user.username}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">Balance: {user.balance} {user.valute}</p>
            </div>
            )
          }))}
        </div>
      )}
    </div>
  )
}

export default ProtectedPage
