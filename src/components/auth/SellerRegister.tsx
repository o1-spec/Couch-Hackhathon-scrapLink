'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useFormValidation } from '@/hooks/use-form-validation'
import { useToast } from '@/hooks/use-toast'
import { Coins, Mail, Lock, Eye, EyeOff, ArrowRight, Phone, User } from 'lucide-react'
import Link from 'next/link'
import { FormInput } from '../ui/form-input'
import { ToastContainer } from '../ui/toast-container'

export function SellerRegister() {
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const { fields, getFieldProps, validateAll, isValid } = useFormValidation(
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: ''
    },
    {
      firstName: {
        required: true,
        minLength: 2,
        maxLength: 50
      },
      lastName: {
        required: true,
        minLength: 2,
        maxLength: 50
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      phone: {
        required: true,
        pattern: /^\+?[\d\s\-$$$$]{10,}$/
      },
      password: {
        required: true,
        minLength: 8,
        custom: (value: string) => {
          if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter'
          if (!/[0-9]/.test(value)) return 'Password must contain at least one number'
          if (!/[^A-Za-z0-9]/.test(value)) return 'Password must contain at least one special character'
          return null
        }
      }
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAll()) {
      toast.error('Please fix the errors below', 'Check all required fields and try again')
      return
    }

    if (!acceptTerms) {
      toast.error('Terms Required', 'Please accept the Terms of Service and Privacy Policy')
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const success = true 

      if (success) {
        localStorage.setItem('userType', 'seller')
        localStorage.setItem('authToken', 'demo-token-seller')

        toast.success('Seller Account Created!', 'Redirecting to your dashboard...')

        setTimeout(() => {
          router.push('/dashboard')
        }, 1000) // Add small delay to see the toast
      } else {
        toast.error('Registration Failed', 'This email address is already registered')
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
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Coins className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Create Seller Account</h3>
              <p className="text-gray-600 font-poppins">Start turning your scrap into cash today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  id="firstName"
                  label="First Name"
                  placeholder="John"
                  required
                  icon={<User className="h-4 w-4" />}
                  {...getFieldProps('firstName')}
                />
                <FormInput
                  id="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  required
                  icon={<User className="h-4 w-4" />}
                  {...getFieldProps('lastName')}
                />
              </div>

              <FormInput
                id="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                required
                icon={<Mail className="h-4 w-4" />}
                {...getFieldProps('email')}
              />

              <FormInput
                id="phone"
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                required
                icon={<Phone className="h-4 w-4" />}
                {...getFieldProps('phone')}
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
                    placeholder="Create a strong password"
                    className={`w-full pl-10 pr-10 py-2 border rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-[#006636] focus:border-transparent ${fields.password?.error && fields.password?.touched
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm font-poppins">
                  I agree to the <span className="text-[#006636] hover:underline cursor-pointer">Terms of Service</span> and <span className="text-[#006636] hover:underline cursor-pointer">Privacy Policy</span>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !isValid || !acceptTerms}
                className="w-full h-12 bg-[#006636] hover:bg-[#005528] text-white font-medium font-poppins disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center mt-6">
              <span className="text-gray-600 font-poppins">Already have an account? </span>
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
      <ToastContainer />
    </>
  )
}
