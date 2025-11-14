'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccessCode } from '@/hooks/use-access-code'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AccessCodePage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { verifyCode } = useAccessCode()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate small delay for UX
    await new Promise(resolve => setTimeout(resolve, 300))

    if (verifyCode(code)) {
      router.push('/')
    } else {
      setError('Invalid code. Please try again.')
      setCode('')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Student Directory</h1>
            <p className="text-muted-foreground">Enter access code to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="access-code" className="text-sm font-medium text-foreground">
                Enter Access Code
              </label>
              <Input
                id="access-code"
                type="password"
                placeholder="••••••••••"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isLoading}
                className="text-center text-lg tracking-widest"
                autoFocus
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3">
                <p className="text-sm font-medium text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !code}
              className="w-full"
              size="lg"
            >
              {isLoading ? 'Verifying...' : 'Submit'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              This site is access controlled. Please enter the correct code to proceed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
