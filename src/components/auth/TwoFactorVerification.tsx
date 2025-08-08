'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { ToastContainer } from '@/components/ui/toast-container'
import { Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function TwoFactorVerification() {
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [useBackupCode, setUseBackupCode] = useState(false)
  const { toast } = useToast()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (verificationCode.length < 6) {
      toast.error('Invalid Code', `Please enter a ${useBackupCode ? '8' : '6'}-digit code`)
      return
    }

    setIsVerifying(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate different scenarios
      const scenarios = ['success', 'invalid-code', 'expired-code']
      const scenario = scenarios[0] // Always success for demo
      
      switch (scenario) {
        case 'success':
          toast.success('Verification Successful!', 'Welcome back to ScrapLink')
          // In real app, redirect to dashboard
          break
        case 'invalid-code':
          toast.error('Invalid Code', 'Please check your authenticator app and try again')
          break
        case 'expired-code':
          toast.error('Code Expired', 'Please generate a new code and try again')
          break
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Verification Failed', 'Please try again')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Two-Factor Authentication</h3>
              <p className="text-gray-600 font-poppins">
                {useBackupCode 
                  ? 'Enter one of your backup codes'
                  : 'Enter the code from your authenticator app'
                }
              </p>
            </div>
            
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <Label htmlFor="code" className="font-poppins">
                  {useBackupCode ? 'Backup Code' : 'Verification Code'}
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder={useBackupCode ? "XXXXXXXX" : "000000"}
                  value={verificationCode}
                  onChange={(e) => {
                    const value = useBackupCode 
                      ? e.target.value.toUpperCase().slice(0, 8)
                      : e.target.value.replace(/\D/g, '').slice(0, 6)
                    setVerificationCode(value)
                  }}
                  className="text-center text-2xl tracking-widest font-mono mt-1"
                  maxLength={useBackupCode ? 8 : 6}
                />
              </div>
              
              <Button 
                type="submit"
                disabled={isVerifying || verificationCode.length < (useBackupCode ? 8 : 6)}
                className="w-full h-12 bg-[#006636] hover:bg-[#005528] text-white font-medium font-poppins disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setUseBackupCode(!useBackupCode)
                  setVerificationCode('')
                }}
                className="text-[#006636] hover:text-[#005528] font-medium text-sm font-poppins"
              >
                {useBackupCode 
                  ? 'Use authenticator app instead'
                  : 'Use backup code instead'
                }
              </button>
            </div>
            
            <div className="text-center mt-4">
              <Link 
                href="/auth/login/seller"
                className="text-gray-500 hover:text-gray-700 font-medium text-sm font-poppins"
              >
                ← Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </>
  )
}
