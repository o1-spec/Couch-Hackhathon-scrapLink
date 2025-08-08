'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { ToastContainer } from '@/components/ui/toast-container'
import { Shield, Upload, CheckCircle, ArrowRight, ArrowLeft, Phone, CreditCard, FileText, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface VerificationStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  required: boolean
  completed: boolean
  status: 'pending' | 'uploading' | 'completed' | 'failed'
}

export function VerificationSetup() {
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    {
      id: 'phone',
      title: 'Phone Verification',
      description: 'Verify your phone number with a text message',
      icon: <Phone className="h-5 w-5" />,
      required: true,
      completed: false,
      status: 'pending'
    },
    {
      id: 'identity',
      title: 'Identity Verification',
      description: 'Upload a photo of your driver\'s license or ID',
      icon: <FileText className="h-5 w-5" />,
      required: true,
      completed: false,
      status: 'pending'
    },
    {
      id: 'payment',
      title: 'Payment Method',
      description: 'Add a bank account or debit card for payments',
      icon: <CreditCard className="h-5 w-5" />,
      required: true,
      completed: false,
      status: 'pending'
    }
  ])
  
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const updateStepStatus = (stepId: string, status: VerificationStep['status'], completed: boolean = false) => {
    setVerificationSteps(prev => 
      prev.map(step => 
        step.id === stepId 
          ? { ...step, status, completed }
          : step
      )
    )
  }

  const handlePhoneVerification = async () => {
    if (!phoneNumber) {
        toast.error('Phone required', 'Please enter your phone number')
        return
    }

    if (isSubmitting) return

    setIsSubmitting(true)
    updateStepStatus('phone', 'uploading')
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setShowCodeInput(true)
        toast.success('Code sent!', 'Check your phone for the verification code')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        updateStepStatus('phone', 'failed')
        toast.error('Failed to send code', 'Please try again')
    } finally {
        setIsSubmitting(false)
    }
}

  const handleCodeVerification = async () => {
    if (verificationCode.length !== 6) {
        toast.error('Invalid code', 'Please enter the 6-digit code')
        return
    }

    if (isSubmitting) return

    setIsSubmitting(true)
    updateStepStatus('phone', 'uploading')
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        updateStepStatus('phone', 'completed', true)
        toast.success('Phone verified!', 'Your phone number has been confirmed')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        updateStepStatus('phone', 'failed')
        toast.error('Invalid code', 'Please check the code and try again')
    } finally {
        setIsSubmitting(false)
    }
}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFileUpload = async (stepId: string, file: File) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    updateStepStatus(stepId, 'uploading')
    
    try {
        // Simulate file upload
        await new Promise(resolve => setTimeout(resolve, 2000))
        updateStepStatus(stepId, 'completed', true)
        toast.success('Upload successful!', 'Your document has been received')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        updateStepStatus(stepId, 'failed')
        toast.error('Upload failed', 'Please try again')
    } finally {
        setIsSubmitting(false)
    }
}

  const handlePaymentSetup = async () => {
    if (isSubmitting) return

    setIsSubmitting(true)
    updateStepStatus('payment', 'uploading')
    
    try {
        // Simulate payment setup
        await new Promise(resolve => setTimeout(resolve, 1500))
        updateStepStatus('payment', 'completed', true)
        toast.success('Payment method added!', 'You can now receive payments')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        updateStepStatus('payment', 'failed')
        toast.error('Setup failed', 'Please try again')
    } finally {
        setIsSubmitting(false)
    }
}

  const allRequiredCompleted = verificationSteps
    .filter(step => step.required)
    .every(step => step.completed)

  const completedCount = verificationSteps.filter(step => step.completed).length

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Progress Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Link href="/onboarding/preferences">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <h1 className="text-xl font-bold text-gray-900 font-poppins">Account Verification</h1>
              </div>
              <Badge variant="outline" className="font-poppins">
                Step 3 of 3
              </Badge>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#006636] h-2 rounded-full transition-all duration-300"
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">
              Verify Your Account
            </h2>
            <p className="text-gray-600 font-poppins">
              Complete these steps to start selling and ensure secure transactions
            </p>
            
            {/* Progress */}
            <div className="mt-4">
              <div className="text-sm text-gray-600 font-poppins">
                {completedCount} of {verificationSteps.length} steps completed
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Phone Verification */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    verificationSteps[0].completed 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {verificationSteps[0].completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      verificationSteps[0].icon
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 font-poppins">
                      {verificationSteps[0].title}
                      {verificationSteps[0].required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 font-poppins">
                      {verificationSteps[0].description}
                    </p>
                    
                    {!verificationSteps[0].completed && (
                      <div className="space-y-3">
                        {!showCodeInput ? (
                          <div className="flex gap-3">
                            <Input
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="flex-1 font-poppins"
                            />
                            <Button 
                              onClick={handlePhoneVerification}
                              disabled={verificationSteps[0].status === 'uploading' || isSubmitting}
                              className="bg-[#006636] hover:bg-[#005528] text-white font-poppins"
                            >
                              {verificationSteps[0].status === 'uploading' ? 'Sending...' : 'Send Code'}
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-3">
                            <Input
                              type="text"
                              placeholder="Enter 6-digit code"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                              className="flex-1 text-center font-mono font-poppins"
                              maxLength={6}
                            />
                            <Button 
                              onClick={handleCodeVerification}
                              disabled={verificationSteps[0].status === 'uploading' || isSubmitting}
                              className="bg-[#006636] hover:bg-[#005528] text-white font-poppins"
                            >
                              {verificationSteps[0].status === 'uploading' ? 'Verifying...' : 'Verify'}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {verificationSteps[0].completed && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium font-poppins">Phone verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Identity Verification */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    verificationSteps[1].completed 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {verificationSteps[1].completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      verificationSteps[1].icon
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 font-poppins">
                      {verificationSteps[1].title}
                      {verificationSteps[1].required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 font-poppins">
                      {verificationSteps[1].description}
                    </p>
                    
                    {!verificationSteps[1].completed && (
                      <div>
                        <label className="block">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <div className="text-sm text-gray-600 font-poppins">
                              {verificationSteps[1].status === 'uploading' ? (
                                <div className="flex items-center justify-center gap-2">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#006636]"></div>
                                  Uploading...
                                </div>
                              ) : (
                                <>
                                  <div className="font-medium">Click to upload ID document</div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    Driver&apos;s license, passport, or state ID
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleFileUpload('identity', file)
                            }}
                            className="hidden"
                            disabled={verificationSteps[1].status === 'uploading' || isSubmitting}
                          />
                        </label>
                      </div>
                    )}
                    
                    {verificationSteps[1].completed && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium font-poppins">Identity verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    verificationSteps[2].completed 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {verificationSteps[2].completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      verificationSteps[2].icon
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 font-poppins">
                      {verificationSteps[2].title}
                      {verificationSteps[2].required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 font-poppins">
                      {verificationSteps[2].description}
                    </p>
                    
                    {!verificationSteps[2].completed && (
                      <Button 
                        onClick={handlePaymentSetup}
                        disabled={verificationSteps[2].status === 'uploading' || isSubmitting}
                        className="bg-[#006636] hover:bg-[#005528] text-white font-poppins"
                      >
                        {verificationSteps[2].status === 'uploading' ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Setting up...
                          </>
                        ) : (
                          'Add Payment Method'
                        )}
                      </Button>
                    )}
                    
                    {verificationSteps[2].completed && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium font-poppins">Payment method added</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Notice */}
          <Card className="mt-6 border-0 shadow-sm bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2 font-poppins">Your Security Matters</h3>
                  <ul className="text-sm text-blue-800 space-y-1 font-poppins">
                    <li>• All documents are encrypted and stored securely</li>
                    <li>• We never share your personal information</li>
                    <li>• Verification helps prevent fraud and builds trust</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Link href="/onboarding/preferences" className="flex-1">
              <Button variant="outline" className="w-full font-poppins">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            
            <div className="flex-1">
              <Link href="/onboarding/complete">
                <Button 
                  disabled={!allRequiredCompleted}
                  className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins disabled:opacity-50"
                >
                  Complete Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {!allRequiredCompleted && (
            <div className="flex items-center justify-center gap-2 mt-4 text-amber-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-poppins">
                Complete all required steps to continue
              </span>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
