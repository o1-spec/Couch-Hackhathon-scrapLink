'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Coins, Mail, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function SellerForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  const handleTryAgain = () => {
    setIsSubmitted(false)
    setEmail('')
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Check Your Email</h3>
            <p className="text-gray-600 mb-6 font-poppins">
              We&apos;ve sent password reset instructions to <strong>{email}</strong>
            </p>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-500 font-poppins">
                Didn&apos;t receive the email? Check your spam folder or try again.
              </p>
              
              <Button 
                onClick={handleTryAgain}
                variant="outline" 
                className="w-full font-poppins"
              >
                Try Different Email
              </Button>
              
              <Link href="/auth/login/seller">
                <Button className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Coins className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Reset Your Password</h3>
            <p className="text-gray-600 font-poppins">
              Enter your email address and we&apos;ll send you instructions to reset your password.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="font-poppins">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="pl-10 font-poppins"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit"
              disabled={isLoading || !email}
              className="w-full h-12 bg-[#006636] hover:bg-[#005528] text-white font-medium font-poppins"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending Instructions...
                </>
              ) : (
                <>
                  Send Reset Instructions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <span className="text-gray-600 font-poppins">Remember your password? </span>
            <Link 
              href="/auth/login/seller"
              className="text-[#006636] hover:text-[#005528] font-medium font-poppins"
            >
              Sign in
            </Link>
          </div>
          
          <div className="text-center mt-4">
            <Link 
              href="/auth/usertype"
              className="text-gray-500 hover:text-gray-700 font-medium text-sm font-poppins"
            >
              ← Back to account type
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
