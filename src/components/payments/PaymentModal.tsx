'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Shield, CreditCard, Clock } from 'lucide-react'
import Image from 'next/image'
import { StripeCheckout } from './StripeCheckout'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  listing: {
    id: string
    title: string
    price: number
    image: string
    sellerName: string
    sellerVerified: boolean
  }
}

export function PaymentModal({ isOpen, onClose, listing }: PaymentModalProps) {
  const [step, setStep] = useState<'confirm' | 'checkout' | 'success'>('confirm')

  if (!isOpen) return null

  const handleConfirmPurchase = () => {
    setStep('checkout')
  }

  const handlePaymentSuccess = () => {
    setStep('success')
  }

  const handleClose = () => {
    setStep('confirm')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">
            {step === 'confirm' && 'Confirm Purchase'}
            {step === 'checkout' && 'Complete Payment'}
            {step === 'success' && 'Payment Successful'}
          </h2>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'confirm' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Listing Details */}
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Image
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  width={100}
                  height={100}
                  className="w-25 h-25 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 font-poppins">{listing.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-gray-600 font-poppins">Sold by {listing.sellerName}</span>
                    {listing.sellerVerified && (
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4 text-green-600" />
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Verified
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-[#006636] font-poppins mt-3">
                    ${listing.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Purchase Protection */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 font-poppins mb-3">ScrapLink Buyer Protection</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-blue-800 font-poppins">Money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-blue-800 font-poppins">Secure payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-blue-800 font-poppins">Dispute resolution</span>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="text-sm text-gray-600 font-poppins">
                <p>By proceeding with this purchase, you agree to ScrapLink&apos;s Terms of Service and acknowledge that you have read our Privacy Policy. Payment will be held in escrow until you confirm receipt of the item.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 font-poppins"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmPurchase}
                  className="flex-1 bg-[#006636] hover:bg-[#005528] text-white font-poppins"
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {step === 'checkout' && (
            <StripeCheckout
              amount={listing.price}
              listingTitle={listing.title}
              listingImage={listing.image}
              sellerName={listing.sellerName}
              onSuccess={handlePaymentSuccess}
              onCancel={() => setStep('confirm')}
            />
          )}

          {step === 'success' && (
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 font-poppins mb-2">
                  Payment Successful!
                </h3>
                <p className="text-gray-600 font-poppins">
                  Your payment has been processed and the seller has been notified. 
                  You&apos;ll receive an email confirmation shortly.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 font-poppins mb-2">What happens next?</h4>
                <ul className="text-sm text-gray-600 space-y-1 font-poppins">
                  <li>1. The seller will prepare your item for pickup/delivery</li>
                  <li>2. You&apos;ll receive tracking information if applicable</li>
                  <li>3. Confirm receipt to release payment to the seller</li>
                  <li>4. Leave a review to help other buyers</li>
                </ul>
              </div>

              <Button
                onClick={handleClose}
                className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
