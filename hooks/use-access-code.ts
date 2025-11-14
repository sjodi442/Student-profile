'use client'

import { useEffect, useState } from 'react'

const ACCESS_CODE = 'saindo05'
const STORAGE_KEY = 'access_code_verified'

export function useAccessCode() {
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if code is already verified in localStorage
    const verified = localStorage.getItem(STORAGE_KEY) === 'true'
    setIsVerified(verified)
    setIsLoading(false)
  }, [])

  const verifyCode = (code: string) => {
    if (code === ACCESS_CODE) {
      localStorage.setItem(STORAGE_KEY, 'true')
      setIsVerified(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setIsVerified(false)
  }

  return { isVerified, isLoading, verifyCode, logout }
}
