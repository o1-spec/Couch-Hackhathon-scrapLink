'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { ToastContainer } from '@/components/ui/toast-container'
import { CreditCard, Lock, Shield, AlertCircle } from 'lucide-react'
import Image from 'next/image'

interface StripeCheckoutProps {
  amount: number
  listingTitle: string
  listingImage: string
  sellerName: string
  onSuccess: () => void
  onCancel: () => void
}

export function StripeCheckout({ 
  amount, 
  listingTitle, 
  listingImage, 
  sellerName, 
  onSuccess, 
  onCancel 
}: StripeCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  })
  const [billingAddress, setBillingAddress] = useState({
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  })

  const { toast } = useToast()

  const handlePayment = async () => {
    setIsProcessing(true)
    
    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simulate successful payment
      toast.success('Payment Successful!', 'Your payment has been processed successfully')
      onSuccess()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Payment Failed', 'There was an error processing your payment. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const processingFee = amount * 0.029 + 0.30
  const totalAmount = amount + processingFee

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Image
                  src={listingImage || "/placeholder.svg"}
                  alt={listingTitle}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 font-poppins">{listingTitle}</h3>
                  <p className="text-sm text-gray-600 font-poppins">Sold by {sellerName}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-poppins">Verified Seller</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-poppins">Item Price</span>
                  <span className="font-semibold font-poppins">${amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-poppins">Processing Fee</span>
                  <span className="font-semibold font-poppins">${processingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span className="font-poppins">Total</span>
                  <span className="font-poppins">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900 font-poppins">Buyer Protection</span>
                </div>
                <ul className="text-sm text-blue-800 space-y-1 font-poppins">
                  <li>• Money-back guarantee</li>
                  <li>• Secure escrow service</li>
                  <li>• Dispute resolution support</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <Label className="font-poppins">Payment Method</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border rounded-lg flex items-center gap-2 transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#006636] bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="font-poppins">Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 border rounded-lg flex items-center gap-2 transition-colors ${
                      paymentMethod === 'bank'
                        ? 'border-[#006636] bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-poppins">Bank Transfer</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <>
                  {/* Card Details */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="font-poppins">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails(prev => ({ 
                          ...prev, 
                          number: formatCardNumber(e.target.value) 
                        }))}
                        maxLength={19}
                        className="font-poppins"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="font-poppins">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails(prev => ({ 
                            ...prev, 
                            expiry: formatExpiry(e.target.value) 
                          }))}
                          maxLength={5}
                          className="font-poppins"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc" className="font-poppins">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails(prev => ({ 
                            ...prev, 
                            cvc: e.target.value.replace(/\D/g, '').slice(0, 4) 
                          }))}
                          maxLength={4}
                          className="font-poppins"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName" className="font-poppins">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Smith"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                        className="font-poppins"
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 font-poppins">Billing Address</h3>
                    
                    <div>
                      <Label htmlFor="email" className="font-poppins">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={billingAddress.email}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, email: e.target.value }))}
                        className="font-poppins"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address" className="font-poppins">Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street"
                        value={billingAddress.address}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, address: e.target.value }))}
                        className="font-poppins"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="font-poppins">City</Label>
                        <Input
                          id="city"
                          placeholder="Chicago"
                          value={billingAddress.city}
                          onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                          className="font-poppins"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="font-poppins">State</Label>
                        <Input
                          id="state"
                          placeholder="IL"
                          value={billingAddress.state}
                          onChange={(e) => setBillingAddress(prev => ({ ...prev, state: e.target.value }))}
                          className="font-poppins"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="zip" className="font-poppins">ZIP Code</Label>
                      <Input
                        id="zip"
                        placeholder="60601"
                        value={billingAddress.zip}
                        onChange={(e) => setBillingAddress(prev => ({ ...prev, zip: e.target.value }))}
                        className="font-poppins"
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'bank' && (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 font-poppins mb-2">Bank Transfer</h3>
                  <p className="text-gray-600 font-poppins">
                    Bank transfer payments will be processed within 3-5 business days
                  </p>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-900 font-poppins">Secure Payment</span>
                </div>
                <p className="text-sm text-gray-600 font-poppins">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={onCancel}
                  disabled={isProcessing}
                  className="flex-1 font-poppins"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 bg-[#006636] hover:bg-[#005528] text-white font-poppins"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Pay ${totalAmount.toFixed(2)}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
