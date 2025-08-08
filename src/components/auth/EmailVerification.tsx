'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, XCircle, Mail, ArrowRight, RefreshCw } from 'lucide-react'
import Link from 'next/link'

type VerificationState = 'loading' | 'success' | 'error' | 'expired' | 'already-verified'

export function EmailVerification() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')
  
  const [state, setState] = useState<VerificationState>('loading')
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    // Simulate email verification
    const verifyEmail = async () => {
      if (!token) {
        setState('error')
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate different scenarios
      const scenarios = ['success', 'expired', 'already-verified', 'error']
      const randomScenario = scenarios[0] // Always success for demo
      setState(randomScenario as VerificationState)
    }

    verifyEmail()
  }, [token])

  useEffect(() => {
    // Countdown for resend cooldown
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleResendEmail = async () => {
    setIsResending(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsResending(false)
    setResendCooldown(60) // 60 second cooldown
  }

  // Loading state
  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006636] mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-poppins">Verifying Your Email</h3>
            <p className="text-gray-600 font-poppins">Please wait while we verify your email address...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Success state
  if (state === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Email Verified!</h3>
            <p className="text-gray-600 mb-6 font-poppins">
              Your email address has been successfully verified. You can now access all features of your ScrapLink account.
            </p>
            
            <Link href="/auth/login/seller">
              <Button className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                Continue to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Already verified state
  if (state === 'already-verified') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Already Verified</h3>
            <p className="text-gray-600 mb-6 font-poppins">
              This email address has already been verified. You can sign in to your account.
            </p>
            
            <Link href="/auth/login/seller">
              <Button className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                Sign In to Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Error or expired states
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">
            {state === 'expired' ? 'Verification Link Expired' : 'Verification Failed'}
          </h3>
          <p className="text-gray-600 mb-6 font-poppins">
            {state === 'expired' 
              ? 'This verification link has expired. Please request a new verification email.'
              : 'We couldn\'t verify your email address. The link may be invalid or expired.'
            }
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={handleResendEmail}
              disabled={isResending || resendCooldown > 0}
              className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins"
            >
              {isResending ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : resendCooldown > 0 ? (
                `Resend in ${resendCooldown}s`
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Resend Verification Email
                </>
              )}
            </Button>
            
            <Link href="/auth/usertype">
              <Button variant="outline" className="w-full font-poppins">
                Back to Sign In
              </Button>
            </Link>
          </div>
          
          {email && (
            <p className="text-sm text-gray-500 mt-4 font-poppins">
              Verification email will be sent to: <strong>{email}</strong>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
