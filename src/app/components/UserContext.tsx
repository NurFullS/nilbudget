'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type User = { username: string; email?: string } | null
type His = { date: string; amount: string; description: string; id?: number }

type UserContextType = {
  user: User
  setUser: (u: User) => void
  balance: number
  setBalance: (b: number) => void
  history: His[]
  setHistory: (h: His[]) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null)
  const [balance, setBalance] = useState<number>(0)
  const [history, setHistory] = useState<His[]>([])

  return (
    <UserContext.Provider value={{ user, setUser, balance, setBalance, history, setHistory }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context
}

export const useBalance = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useBalance must be used within UserProvider')
  return { balance: context.balance, setBalance: context.setBalance }
}

export const useHistory = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useHistory must be used within UserProvider')
  return { history: context.history, setHistory: context.setHistory }
}
