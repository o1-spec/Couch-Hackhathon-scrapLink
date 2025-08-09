'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormValidation } from '@/hooks/use-form-validation'
import { useToast } from '@/hooks/use-toast'
import { Coins, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FormInput } from '../ui/form-input'
import { ToastContainer } from '../ui/toast-container'

export function SellerLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const { fields, getFieldProps, validateAll, isValid } = useFormValidation(
    {
      email: '',
      password: ''
    },
    {
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      password: {
        required: true,
        minLength: 1
      }
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateAll()) {
      toast.error('Please check your credentials', 'Make sure all fields are filled correctly')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate different scenarios
      const scenarios = ['success', 'invalid-credentials', 'unverified-email', 'account-locked']
      const scenario = scenarios[Math.floor(Math.random() * scenarios.length)]
      
      switch (scenario) {
        case 'success':
          toast.success('Welcome back!', 'Redirecting to your dashboard...')
          // Redirect to dashboard with seller type
          setTimeout(() => router.push('/dashboard?type=seller'), 1500)
          break
        case 'invalid-credentials':
          toast.error('Invalid credentials', 'Please check your email and password')
          break
        case 'unverified-email':
          toast.warning('Email not verified', 'Please check your email and verify your account')
          break
        case 'account-locked':
          toast.error('Account locked', 'Too many failed attempts. Please try again later')
          break
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Something went wrong', 'Please try again later')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8 font-poppins">
              <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Coins className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Seller Sign In</h3>
              <p className="text-gray-600">Access your seller dashboard and listings</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
              <FormInput
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                required
                icon={<Mail className="h-4 w-4" />}
                {...getFieldProps('email')}
              />
              
              <div>
                <Label htmlFor="password" className="font-poppins">
                  Password <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-10 py-2 border rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-[#006636] focus:border-transparent ${
                      fields.password?.error && fields.password?.touched 
                        ? 'border-red-500' 
                        : 'border-gray-300'
                    }`}
                    {...getFieldProps('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {fields.password?.error && fields.password?.touched && (
                  <p className="text-red-600 text-sm mt-1 font-poppins">{fields.password.error}</p>
                )}
              </div>
              
              <div className="flex items-center justify-between font-poppins">
                <div className="flex items-center space-x-2 font-poppins">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm font-poppins">Remember me</Label>
                </div>
                <Link href="/auth/forgot-password/seller" className="text-[#006636] hover:text-[#005528] text-sm font-medium font-poppins">
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting || !isValid}
                className="w-full h-12 bg-[#006636] hover:bg-[#005528] text-white font-medium font-poppins disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            
            <Separator className="my-6" />
            
            <div className="text-center font-poppins">
              <span className="text-gray-600">Don&apos;t have an account? </span>
              <Link 
                href="/auth/signup/seller"
                className="text-[#006636] hover:text-[#005528] font-medium font-poppins"
              >
                Create seller account
              </Link>
            </div>
            
            <div className="text-center mt-4 font-poppins">
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
      <ToastContainer />
    </>
  )
}
