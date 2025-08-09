'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { ToastContainer } from '@/components/ui/toast-container'
import { Camera, X, MapPin, DollarSign, Weight, Sparkles, ArrowLeft, Save, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  type: 'seller' | 'buyer'
  avatar: string
  verified: boolean
  joinedDate: string
}

interface CreateListingProps {
  user: User
}

interface FormData {
  title: string
  description: string
  material: string
  weight: string
  condition: string
  price: string
  location: string
  pickupAvailable: boolean
  images: File[]
}

export function CreateListing({ user }: CreateListingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiEstimating, setAiEstimating] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    material: '',
    weight: '',
    condition: '',
    price: '',
    location: 'Chicago, IL',
    pickupAvailable: true,
    images: []
  })

  const { toast } = useToast()

  const materials = [
    { name: 'Copper', price: '$4.50/lb', color: 'bg-orange-100 text-orange-800' },
    { name: 'Aluminum', price: '$0.85/lb', color: 'bg-gray-100 text-gray-800' },
    { name: 'Steel', price: '$0.25/lb', color: 'bg-blue-100 text-blue-800' },
    { name: 'Brass', price: '$3.20/lb', color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Stainless Steel', price: '$1.80/lb', color: 'bg-green-100 text-green-800' },
    { name: 'Lead', price: '$1.10/lb', color: 'bg-purple-100 text-purple-800' }
  ]

  const conditions = ['Excellent', 'Good', 'Fair', 'Poor']

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (formData.images.length + files.length > 5) {
      toast.error('Too many images', 'You can upload a maximum of 5 images')
      return
    }
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleAiEstimate = async () => {
    if (!formData.material || !formData.weight) {
      toast.error('Missing information', 'Please select material and enter weight for AI estimation')
      return
    }

    setAiEstimating(true)
    try {
      // Simulate AI estimation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const basePrice = materials.find(m => m.name === formData.material)?.price || '$1.00/lb'
      const pricePerLb = parseFloat(basePrice.replace(/[$\/lb]/g, ''))
      const weight = parseFloat(formData.weight)
      const conditionMultiplier = {
        'Excellent': 1.1,
        'Good': 1.0,
        'Fair': 0.85,
        'Poor': 0.7
      }[formData.condition] || 1.0

      const estimatedPrice = (pricePerLb * weight * conditionMultiplier).toFixed(2)
      
      setFormData(prev => ({ ...prev, price: estimatedPrice }))
      toast.success('AI Estimation Complete!', `Estimated price: $${estimatedPrice}`)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Estimation failed', 'Please try again or enter price manually')
    } finally {
      setAiEstimating(false)
    }
  }

  const handleSubmit = async (isDraft: boolean = false) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success(
        isDraft ? 'Draft saved!' : 'Listing created!',
        isDraft ? 'Your listing has been saved as draft' : 'Your listing is now live'
      )
      
      // Reset form or redirect
      if (!isDraft) {
        setFormData({
          title: '',
          description: '',
          material: '',
          weight: '',
          condition: '',
          price: '',
          location: 'Chicago, IL',
          pickupAvailable: true,
          images: []
        })
        setCurrentStep(1)
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to save', 'Please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6 relative">
        {/* Header */}
        <div className="flex items-center justify-center gap-4">
          <Link href="/dashboard/listings" className='absolute -left-32 top-4'>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back 
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 text-center font-poppins">
              Create New Listing
            </h1>
            <p className="text-gray-600 font-poppins text-center">
              List your scrap metal and get the best prices, {user.name}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                step <= currentStep 
                  ? 'bg-[#006636] text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              <span className={`ml-2 font-poppins ${
                step <= currentStep ? 'text-[#006636]' : 'text-gray-500'
              }`}>
                {step === 1 && 'Details'}
                {step === 2 && 'Photos'}
                {step === 3 && 'Pricing'}
              </span>
              {step < 3 && (
                <div className={`w-16 h-1 mx-4 ${
                  step < currentStep ? 'bg-[#006636]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Details */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Basic Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title" className="font-poppins">Listing Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Premium Copper Wire Bundle - 50lbs"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="font-poppins px-4 py-3 mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description" className="font-poppins">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your scrap metal, its condition, source, and any other relevant details..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="font-poppins px-4 py-3 mt-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="font-poppins">Material Type *</Label>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {materials.map((material) => (
                      <button
                        key={material.name}
                        type="button"
                        onClick={() => handleInputChange('material', material.name)}
                        className={`p-4 border rounded-lg text-left transition-colors ${
                          formData.material === material.name
                            ? 'border-[#006636] bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-gray-900 font-poppins">{material.name}</div>
                        <div className="text-sm text-gray-600 font-poppins mt-1">{material.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="weight" className="font-poppins">Weight (lbs) *</Label>
                  <div className="relative mt-2">
                    <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="weight"
                      type="number"
                      placeholder="50"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      className="pl-10 pr-4 py-3 font-poppins"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="font-poppins">Condition *</Label>
                  <div className="flex gap-3 mt-3">
                    {conditions.map((condition) => (
                      <button
                        key={condition}
                        type="button"
                        onClick={() => handleInputChange('condition', condition)}
                        className={`px-5 py-3 border rounded-lg font-poppins transition-colors ${
                          formData.condition === condition
                            ? 'border-[#006636] bg-green-50 text-[#006636]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {condition}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="font-poppins">Location</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="pl-10 pr-4 py-3 font-poppins"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="pickup"
                  checked={formData.pickupAvailable}
                  onChange={(e) => handleInputChange('pickupAvailable', e.target.checked)}
                  className="w-5 h-5 text-[#006636] border-gray-300 rounded focus:ring-[#006636]"
                />
                <Label htmlFor="pickup" className="font-poppins">Pickup available at location</Label>
              </div>

              <div className="flex justify-end">
                <Button onClick={nextStep} className="bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                  Next: Add Photos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Photos */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Add Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="font-poppins">Upload Images (Max 5)</Label>
                <div className="mt-3">
                  <label className="block">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-gray-400 transition-colors cursor-pointer">
                      <Camera className="h-14 w-14 text-gray-400 mx-auto mb-4" />
                      <div className="text-lg font-medium text-gray-900 font-poppins mb-2">
                        Upload photos of your scrap metal
                      </div>
                      <div className="text-sm text-gray-600 font-poppins">
                        Clear photos help buyers make better decisions and get you better prices
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {formData.images.length > 0 && (
                <div>
                  <Label className="font-poppins">Uploaded Images ({formData.images.length}/5)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          width={150}
                          height={150}
                          className="w-full h-36 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} className="font-poppins">
                  Previous
                </Button>
                <Button onClick={nextStep} className="bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                  Next: Set Price
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Pricing */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Set Your Price</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 font-poppins">AI Price Estimation</h3>
                  {user.verified && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Verified Seller
                    </Badge>
                  )}
                </div>
                <p className="text-blue-800 text-sm font-poppins mb-5">
                  Get an instant price estimate based on current market rates, material type, weight, and condition.
                  {user.verified && " Verified sellers get premium pricing estimates."}
                </p>
                <Button
                  onClick={handleAiEstimate}
                  disabled={aiEstimating || !formData.material || !formData.weight}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-poppins px-6 py-3"
                >
                  {aiEstimating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Get AI Estimate
                    </>
                  )}
                </Button>
              </div>

              <div>
                <Label htmlFor="price" className="font-poppins">Your Price ($) *</Label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="pl-12 pr-4 py-4 text-xl font-bold font-poppins"
                  />
                </div>
                {formData.price && formData.weight && (
                  <p className="text-sm text-gray-600 mt-2 font-poppins">
                    ${(parseFloat(formData.price) / parseFloat(formData.weight)).toFixed(2)} per lb
                  </p>
                )}
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 font-poppins mb-4">Listing Preview</h3>
                <div className="bg-white p-5 rounded-lg border-2 border-gray-200">
                  <h4 className="font-semibold text-gray-900 font-poppins text-lg">{formData.title || 'Your listing title'}</h4>
                  <p className="text-sm text-gray-600 font-poppins mt-2 leading-relaxed">
                    {formData.description || 'Your description will appear here...'}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-3xl font-bold text-[#006636] font-poppins">
                        ${formData.price || '0.00'}
                      </span>
                      {formData.weight && (
                        <span className="text-sm text-gray-500 font-poppins ml-3">
                          ({formData.weight}lbs)
                        </span>
                      )}
                    </div>
                    {formData.material && (
                      <Badge variant="outline" className="font-poppins px-3 py-1">
                        {formData.material}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} className="font-poppins">
                  Previous
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSubmit(true)}
                    disabled={isSubmitting}
                    className="font-poppins"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    onClick={() => handleSubmit(false)}
                    disabled={isSubmitting}
                    className="bg-[#006636] hover:bg-[#005528] text-white font-poppins"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Publish Listing
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <ToastContainer />
    </>
  )
}
