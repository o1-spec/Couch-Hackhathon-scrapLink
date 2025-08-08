'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

type ResetState = 'loading' | 'valid' | 'invalid' | 'expired' | 'success' | 'error'

export function ResetPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')
  
  const [state, setState] = useState<ResetState>('loading')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  useEffect(() => {
    // Simulate token validation
    const validateToken = async () => {
      if (!token) {
        setState('invalid')
        return
      }

      // Simulate API call to validate token
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate different scenarios
      const scenarios = ['valid', 'expired', 'invalid']
      const randomScenario = scenarios[0] // Always valid for demo
      setState(randomScenario as ResetState)
    }

    validateToken()
  }, [token])

  useEffect(() => {
    // Calculate password strength
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    setPasswordStrength(strength)
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate success/error
    setState('success')
    setIsSubmitting(false)
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-red-500'
    if (passwordStrength < 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Very Weak'
    if (passwordStrength < 50) return 'Weak'
    if (passwordStrength < 75) return 'Good'
    return 'Strong'
  }

  // Loading state
  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006636] mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-poppins">Validating Reset Link</h3>
            <p className="text-gray-600 font-poppins">Please wait while we verify your password reset request...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Invalid/Expired token states
  if (state === 'invalid' || state === 'expired') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {state === 'expired' ? (
                <AlertCircle className="h-8 w-8 text-red-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">
              {state === 'expired' ? 'Link Expired' : 'Invalid Reset Link'}
            </h3>
            <p className="text-gray-600 mb-6 font-poppins">
              {state === 'expired' 
                ? 'This password reset link has expired. Please request a new one.'
                : 'This password reset link is invalid or has already been used.'
              }
            </p>
            
            <div className="space-y-3">
              <Link href="/auth/forgot-password/seller">
                <Button className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                  Request New Reset Link
                </Button>
              </Link>
              <Link href="/auth/usertype">
                <Button variant="outline" className="w-full font-poppins">
                  Back to Sign In
                </Button>
              </Link>
            </div>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Password Reset Successful</h3>
            <p className="text-gray-600 mb-6 font-poppins">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
            
            <Link href="/auth/login/seller">
              <Button className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                Continue to Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Reset form
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Create New Password</h3>
            <p className="text-gray-600 font-poppins">
              {email ? `Reset password for ${email}` : 'Enter your new password below'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password" className="font-poppins">New Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your new password" 
                  className="pl-10 pr-10 font-poppins"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {password && (
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 font-poppins">Password Strength</span>
                    <span className={`font-medium font-poppins ${
                      passwordStrength < 50 ? 'text-red-600' : 
                      passwordStrength < 75 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="font-poppins">Confirm New Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="confirmPassword" 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirm your new password" 
                  className="pl-10 pr-10 font-poppins"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-600 text-sm mt-1 font-poppins">Passwords do not match</p>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2 font-poppins">Password Requirements:</h4>
              <ul className="text-sm text-gray-600 space-y-1 font-poppins">
                <li className={`flex items-center gap-2 ${password.length >= 8 ? 'text-green-600' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${password.length >= 8 ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                  At least 8 characters
                </li>
                <li className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? 'text-green-600' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                  One uppercase letter
                </li>
                <li className={`flex items-center gap-2 ${/[0-9]/.test(password) ? 'text-green-600' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(password) ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                  One number
                </li>
                <li className={`flex items-center gap-2 ${/[^A-Za-z0-9]/.test(password) ? 'text-green-600' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${/[^A-Za-z0-9]/.test(password) ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                  One special character
                </li>
              </ul>
            </div>
            
            <Button 
              type="submit"
              disabled={isSubmitting || !password || !confirmPassword || password !== confirmPassword || passwordStrength < 50}
              className="w-full h-12 bg-[#006636] hover:bg-[#005528] text-white font-medium font-poppins"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating Password...
                </>
              ) : (
                <>
                  Update Password
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <Link 
              href="/auth/usertype"
              className="text-gray-500 hover:text-gray-700 font-medium text-sm font-poppins"
            >
              ← Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
