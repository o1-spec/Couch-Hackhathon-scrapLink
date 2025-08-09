'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ToastContainer } from '../ui/toast-container'

export function BuyerLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate success/error
      const success = Math.random() > 0.3 // 70% success rate for demo
      
      if (success) {
        toast.success('Welcome back!', 'Redirecting to your business dashboard...')
        setTimeout(() => router.push('/dashboard?type=buyer'), 1500)
      } else {
        toast.error('Invalid credentials', 'Please check your email and password')
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Something went wrong', 'Please try again later')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Sign In</h3>
            <p className="text-gray-600">Access your business dashboard and orders</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="businessEmailLogin">Business Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="businessEmailLogin" type="email" placeholder="contact@yourcompany.com" className="pl-10" required />
              </div>
            </div>

            <div>
              <Label htmlFor="businessPasswordLogin">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="businessPasswordLogin"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="businessRemember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="businessRemember" className="text-sm">Remember me</Label>
              </div>
              <Link href="/auth/forgot-password/buyer" className="text-[#006636] hover:text-[#005528] text-sm font-medium font-poppins">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#006636] hover:bg-[#005528] text-white font-medium disabled:opacity-50"
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

          <div className="text-center">
            <span className="text-gray-600">Don&apos;t have a business account? </span>
            <Link
              href="/auth/signup/buyer"
              className="text-[#006636] hover:text-[#005528] font-medium"
            >
              Create business account
            </Link>
          </div>

          <div className="text-center mt-4">
            <Link
              href="/auth/usertype"
              className="text-gray-500 hover:text-gray-700 font-medium text-sm"
            >
              ← Back to account type
            </Link>
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  )
}
