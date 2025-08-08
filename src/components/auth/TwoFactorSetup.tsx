'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { ToastContainer } from '@/components/ui/toast-container'
import { Shield, Smartphone, Key, Copy, CheckCircle, ArrowRight, ArrowLeft, QrCode } from 'lucide-react'
import Link from 'next/link'

type SetupStep = 'intro' | 'qr-code' | 'verify' | 'backup-codes' | 'complete'

export function TwoFactorSetup() {
  const [currentStep, setCurrentStep] = useState<SetupStep>('intro')
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [copiedCodes, setCopiedCodes] = useState(false)
  const { toast } = useToast()

  // Simulated QR code data
  const qrCodeSecret = 'JBSWY3DPEHPK3PXP'
//   const qrCodeUrl = `otpauth://totp/ScrapLink:user@example.com?secret=${qrCodeSecret}&issuer=ScrapLink`

  const generateBackupCodes = () => {
    const codes = []
    for (let i = 0; i < 10; i++) {
      codes.push(Math.random().toString(36).substring(2, 10).toUpperCase())
    }
    return codes
  }

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      toast.error('Invalid Code', 'Please enter a 6-digit verification code')
      return
    }

    setIsVerifying(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate verification (accept any 6-digit code for demo)
      const isValid = verificationCode.length === 6
      
      if (isValid) {
        const codes = generateBackupCodes()
        setBackupCodes(codes)
        setCurrentStep('backup-codes')
        toast.success('2FA Verified!', 'Your authenticator app is now connected')
      } else {
        toast.error('Invalid Code', 'Please check your authenticator app and try again')
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Verification Failed', 'Please try again')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleCopyBackupCodes = async () => {
    const codesText = backupCodes.join('\n')
    try {
      await navigator.clipboard.writeText(codesText)
      setCopiedCodes(true)
      toast.success('Copied!', 'Backup codes copied to clipboard')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Copy Failed', 'Please manually copy the codes')
    }
  }

  const handleComplete = () => {
    setCurrentStep('complete')
    toast.success('2FA Enabled!', 'Your account is now more secure')
  }

  // Intro Step
  if (currentStep === 'intro') {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
          <Card className="w-full max-w-md border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Enable Two-Factor Authentication</h3>
                <p className="text-gray-600 font-poppins">Add an extra layer of security to your ScrapLink account</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 font-poppins">Enhanced Security</h4>
                    <p className="text-sm text-gray-600 font-poppins">Protect your account even if your password is compromised</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Smartphone className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 font-poppins">Mobile App Required</h4>
                    <p className="text-sm text-gray-600 font-poppins">Use Google Authenticator, Authy, or similar apps</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Key className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 font-poppins">Backup Codes</h4>
                    <p className="text-sm text-gray-600 font-poppins">Get recovery codes in case you lose your device</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => setCurrentStep('qr-code')}
                  className="w-full h-12 bg-[#006636] hover:bg-[#005528] text-white font-medium font-poppins"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Link href="/auth/login/seller">
                  <Button variant="outline" className="w-full font-poppins">
                    Skip for Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <ToastContainer />
      </>
    )
  }

  // QR Code Step
  if (currentStep === 'qr-code') {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
          <Card className="w-full max-w-md border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Scan QR Code</h3>
                <p className="text-gray-600 font-poppins">Use your authenticator app to scan this QR code</p>
              </div>
              
              <div className="space-y-6">
                {/* QR Code Placeholder */}
                <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300 text-center">
                  <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 font-poppins">QR Code</p>
                      <p className="text-xs text-gray-400 font-poppins">Scan with your app</p>
                    </div>
                  </div>
                </div>
                
                {/* Manual Entry */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2 font-poppins">Can&apos;t scan? Enter this code manually:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white px-3 py-2 rounded border text-sm font-mono">{qrCodeSecret}</code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(qrCodeSecret)
                        toast.success('Copied!', 'Secret key copied to clipboard')
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Instructions */}
                <div className="text-sm text-gray-600 space-y-2 font-poppins">
                  <p><strong>Step 1:</strong> Open your authenticator app</p>
                  <p><strong>Step 2:</strong> Tap &quot;Add Account&quot; or &quot;+&quot;</p>
                  <p><strong>Step 3:</strong> Scan the QR code or enter the code manually</p>
                  <p><strong>Step 4:</strong> Your app will generate a 6-digit code</p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep('intro')}
                  className="flex-1 font-poppins"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep('verify')}
                  className="flex-1 bg-[#006636] hover:bg-[#005528] text-white font-poppins"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <ToastContainer />
      </>
    )
  }

  // Verify Step
  if (currentStep === 'verify') {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
          <Card className="w-full max-w-md border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Key className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Enter Verification Code</h3>
                <p className="text-gray-600 font-poppins">Enter the 6-digit code from your authenticator app</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="code" className="font-poppins">Verification Code</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-2xl tracking-widest font-mono mt-1"
                    maxLength={6}
                  />
                </div>
                
                <Button 
                  onClick={handleVerifyCode}
                  disabled={isVerifying || verificationCode.length !== 6}
                  className="w-full h-12 bg-[#006636] hover:bg-[#005528] text-white font-medium font-poppins disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep('qr-code')}
                  className="flex-1 font-poppins"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <ToastContainer />
      </>
    )
  }

  // Backup Codes Step
  if (currentStep === 'backup-codes') {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
          <Card className="w-full max-w-md border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Key className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Save Backup Codes</h3>
                <p className="text-gray-600 font-poppins">Store these codes safely. You can use them to access your account if you lose your device.</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                    {backupCodes.map((code, index) => (
                      <div key={index} className="bg-white px-3 py-2 rounded border text-center">
                        {code}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div className="text-sm text-yellow-800 font-poppins">
                      <p className="font-semibold mb-1">Important:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Each code can only be used once</li>
                        <li>• Store them in a safe place</li>
                        <li>• Don&apos;t share them with anyone</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCopyBackupCodes}
                  variant="outline"
                  className="w-full font-poppins"
                >
                  {copiedCodes ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                      Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Backup Codes
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={handleComplete}
                  disabled={!copiedCodes}
                  className="w-full h-12 bg-[#006636] hover:bg-[#005528] text-white font-medium font-poppins disabled:opacity-50"
                >
                  I&apos;ve Saved My Codes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <ToastContainer />
      </>
    )
  }

  // Complete Step
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">2FA Enabled Successfully!</h3>
            <p className="text-gray-600 mb-8 font-poppins">
              Your account is now protected with two-factor authentication. You&apos;ll need your authenticator app to sign in.
            </p>
            
            <div className="space-y-3">
              <Link href="/auth/login/seller">
                <Button className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                  Continue to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Link href="/auth/security-settings">
                <Button variant="outline" className="w-full font-poppins">
                  Manage Security Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </>
  )
}
