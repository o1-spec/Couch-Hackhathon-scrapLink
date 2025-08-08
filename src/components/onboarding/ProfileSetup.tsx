'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { ToastContainer } from '@/components/ui/toast-container'
import { User, MapPin, Phone, Camera, ArrowRight, ArrowLeft, Upload, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function ProfileSetup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bio: ''
  })
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      toast.success('Photo uploaded!', 'Your profile picture has been updated')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Profile saved!', 'Your information has been updated')
      // In real app, navigate to next step
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Save failed', 'Please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  const completionPercentage = () => {
    const fields = Object.values(formData).filter(value => value.trim() !== '')
    return Math.round((fields.length / Object.keys(formData).length) * 100)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Progress Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Link href="/onboarding">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <h1 className="text-xl font-bold text-gray-900 font-poppins">Profile Setup</h1>
              </div>
              <Badge variant="outline" className="font-poppins">
                Step 1 of 3
              </Badge>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#006636] h-2 rounded-full transition-all duration-300"
                style={{ width: '33%' }}
              ></div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">
              Complete Your Profile
            </h2>
            <p className="text-gray-600 font-poppins">
              Help buyers and our system get to know you better
            </p>
            
            {/* Completion Status */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="text-sm text-gray-600 font-poppins">
                Profile completion: {completionPercentage()}%
              </div>
              {completionPercentage() === 100 && (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
            </div>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Photo */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {profileImage ? (
                        <Image
                          src={profileImage || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          width={96}
                          height={96}
                        />
                      ) : (
                        <Camera className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#006636] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#005528] transition-colors">
                      <Upload className="h-4 w-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 font-poppins">
                    Add a profile photo to build trust with buyers
                  </p>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="font-poppins">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      className="mt-1 font-poppins"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="font-poppins">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                      className="mt-1 font-poppins"
                      required
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <Label htmlFor="phone" className="font-poppins">Phone Number *</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="pl-10 font-poppins"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-poppins">
                    We&apos;ll send pickup notifications to this number
                  </p>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <Label className="font-poppins">Address Information *</Label>
                  </div>
                  
                  <div>
                    <Input
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Street address"
                      className="font-poppins"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Input
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="City"
                        className="font-poppins"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="State"
                        className="font-poppins"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="ZIP Code"
                        className="font-poppins"
                        required
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 font-poppins">
                    This helps us connect you with nearby buyers and arrange pickups
                  </p>
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio" className="font-poppins">About You (Optional)</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell buyers about yourself, your business, or the types of materials you typically have..."
                    className="mt-1 font-poppins"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1 font-poppins">
                    A good description helps build trust and attract better offers
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <Link href="/onboarding" className="flex-1">
                    <Button variant="outline" className="w-full font-poppins">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                  </Link>
                  
                  <div className="flex-1">
                    <Link href="/onboarding/preferences">
                      <Button 
                        type="submit"
                        disabled={isSubmitting || completionPercentage() < 80}
                        className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="mt-6 border-0 shadow-sm bg-blue-50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-2 font-poppins">💡 Pro Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1 font-poppins">
                <li>• A profile photo increases your response rate by 40%</li>
                <li>• Complete address helps us find the best local buyers</li>
                <li>• A good bio can lead to premium offers from repeat buyers</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
