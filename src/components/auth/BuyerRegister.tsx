'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useFormValidation } from '@/hooks/use-form-validation'
import { useToast } from '@/hooks/use-toast'
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Phone, User, Hash } from 'lucide-react'
import Link from 'next/link'
import { FormInput } from '../ui/form-input'
import { ToastContainer } from '../ui/toast-container'

export function BuyerRegister() {
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const { fields, getFieldProps, validateAll, isValid } = useFormValidation(
    {
      businessName: '',
      contactName: '',
      businessEmail: '',
      businessPhone: '',
      taxId: '',
      password: ''
    },
    {
      businessName: {
        required: true,
        minLength: 2,
        maxLength: 100
      },
      contactName: {
        required: true,
        minLength: 2,
        maxLength: 50
      },
      businessEmail: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      businessPhone: {
        required: true,
        pattern: /^\+?[\d\s\-$$$$]{10,}$/
      },
      taxId: {
        required: true,
        pattern: /^\d{2}-\d{7}$/,
        custom: (value: string) => {
          if (!/^\d{2}-\d{7}$/.test(value)) {
            return 'Tax ID must be in format: 12-3456789'
          }
          return null
        }
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
      toast.error('Terms Required', 'Please accept the Business Terms and Privacy Policy')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      // Simulate success/error
      const success = Math.random() > 0.2 // 80% success rate for demo
      
      if (success) {
        toast.success('Business Account Created!', 'Please check your email to verify your account')
        // Redirect to dashboard after successful registration
        setTimeout(() => router.push('/dashboard?type=buyer'), 2000)
      } else {
        toast.error('Registration Failed', 'This business email is already registered')
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
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Create Business Account</h3>
              <p className="text-gray-600 font-poppins">Start sourcing quality scrap materials</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                id="businessName"
                label="Business Name"
                placeholder="Your Company LLC"
                required
                icon={<Building2 className="h-4 w-4" />}
                {...getFieldProps('businessName')}
              />
              
              <FormInput
                id="contactName"
                label="Contact Person"
                placeholder="John Smith"
                required
                icon={<User className="h-4 w-4" />}
                {...getFieldProps('contactName')}
              />
              
              <FormInput
                id="businessEmail"
                label="Business Email"
                type="email"
                placeholder="contact@yourcompany.com"
                required
                icon={<Mail className="h-4 w-4" />}
                {...getFieldProps('businessEmail')}
              />
              
              <FormInput
                id="businessPhone"
                label="Business Phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                required
                icon={<Phone className="h-4 w-4" />}
                {...getFieldProps('businessPhone')}
              />
              
              <FormInput
                id="taxId"
                label="Tax ID / EIN"
                placeholder="12-3456789"
                required
                icon={<Hash className="h-4 w-4" />}
                {...getFieldProps('taxId')}
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
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="businessTerms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="businessTerms" className="text-sm font-poppins">
                  I agree to the <span className="text-[#006636] hover:underline cursor-pointer">Business Terms</span> and <span className="text-[#006636] hover:underline cursor-pointer">Privacy Policy</span>
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
                    Create Business Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            
            <div className="text-center mt-6">
              <span className="text-gray-600 font-poppins">Already have an account? </span>
              <Link 
                href="/auth/login/buyer"
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
