'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAccessCode } from '@/hooks/use-access-code'

export function AccessCodeProvider({ children }: { children: React.ReactNode }) {
  const { isVerified, isLoading } = useAccessCode()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || isLoading) return

    // Don't redirect if already on access code page
    if (pathname === '/access-code') return

    // Redirect to access code page if not verified
    if (!isVerified) {
      router.push('/access-code')
    }
  }, [isVerified, isLoading, pathname, router, mounted])

  // Show nothing while loading to prevent flash of content
  if (!mounted || isLoading) {
    return null
  }

  // If not verified and not on access code page, don't render
  if (!isVerified && pathname !== '/access-code') {
    return null
  }

  return <>{children}</>
}
