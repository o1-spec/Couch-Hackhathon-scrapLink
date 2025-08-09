"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/ui/toast-container"
import { Scale, Camera, CheckCircle, AlertTriangle } from "lucide-react"
import Image from "next/image"

interface VerificationData {
  orderId: string
  listingTitle: string
  estimatedWeight: number
  estimatedValue: number
  actualWeight?: number
  actualValue?: number
  discrepancy?: number
  verificationPhotos: File[]
  notes: string
  status: "pending" | "verified" | "disputed"
}

interface PhysicalVerificationProps {
  user: {
    id: string
    name: string
    userType: "seller" | "buyer"
    isVerified: boolean
  }
  orderData: {
    id: string
    title: string
    estimatedWeight: number
    estimatedValue: number
    aiPhotos: string[]
    material: string
  }
}

export function PhysicalVerification({ user, orderData }: PhysicalVerificationProps) {
  const { toast } = useToast()
  const [verificationData, setVerificationData] = useState<VerificationData>({
    orderId: orderData.id,
    listingTitle: orderData.title,
    estimatedWeight: orderData.estimatedWeight,
    estimatedValue: orderData.estimatedValue,
    verificationPhotos: [],
    notes: "",
    status: "pending",
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleWeightInput = (weight: string) => {
    const actualWeight = Number.parseFloat(weight)
    if (!isNaN(actualWeight)) {
      const pricePerLb = verificationData.estimatedValue / verificationData.estimatedWeight
      const actualValue = actualWeight * pricePerLb
      const discrepancy = ((actualWeight - verificationData.estimatedWeight) / verificationData.estimatedWeight) * 100

      setVerificationData((prev) => ({
        ...prev,
        actualWeight,
        actualValue,
        discrepancy,
      }))
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (verificationData.verificationPhotos.length + files.length > 5) {
      toast.error("Too many photos", "Maximum 5 verification photos allowed")
      return
    }
    setVerificationData((prev) => ({
      ...prev,
      verificationPhotos: [...prev.verificationPhotos, ...files],
    }))
  }

  const removePhoto = (index: number) => {
    setVerificationData((prev) => ({
      ...prev,
      verificationPhotos: prev.verificationPhotos.filter((_, i) => i !== index),
    }))
  }

  const submitVerification = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call for verification submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const status = Math.abs(verificationData.discrepancy || 0) > 15 ? "disputed" : "verified"
      setVerificationData((prev) => ({ ...prev, status }))

      toast.success(
        status === "verified" ? "Verification Complete!" : "Discrepancy Detected",
        status === "verified"
          ? "Weight verification successful. Points will be adjusted automatically."
          : "Significant weight difference detected. Dispute process initiated.",
      )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Verification failed", "Please try again")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDiscrepancyColor = (discrepancy: number) => {
    const abs = Math.abs(discrepancy)
    if (abs <= 5) return "text-green-600"
    if (abs <= 15) return "text-yellow-600"
    return "text-red-600"
  }

  const getDiscrepancyStatus = (discrepancy: number) => {
    const abs = Math.abs(discrepancy)
    if (abs <= 5) return { label: "Excellent Match", color: "bg-green-100 text-green-800" }
    if (abs <= 15) return { label: "Acceptable Range", color: "bg-yellow-100 text-yellow-800" }
    return { label: "Significant Difference", color: "bg-red-100 text-red-800" }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-2">Physical Verification</h1>
          <p className="text-gray-600 font-poppins">
            {user.userType === "buyer"
              ? `Welcome ${user.name}, verify the materials you received`
              : `${user.name}, track your material verification`}
          </p>
          {user.isVerified && (
            <Badge className="bg-green-100 text-green-800 mt-2">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified {user.userType === "buyer" ? "Buyer" : "Seller"}
            </Badge>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step <= currentStep ? "bg-[#006636] text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              <span className={`ml-2 font-poppins ${step <= currentStep ? "text-[#006636]" : "text-gray-500"}`}>
                {step === 1 && "Weight Check"}
                {step === 2 && "Photo Verification"}
                {step === 3 && "Final Review"}
              </span>
              {step < 3 && <div className={`w-16 h-1 mx-4 ${step < currentStep ? "bg-[#006636]" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* AI Estimate Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="font-poppins">AI Estimate vs Actual Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Estimate */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 font-poppins">AI Estimate</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-poppins">Estimated Weight</Label>
                    <div className="text-2xl font-bold text-blue-600 font-poppins">
                      {verificationData.estimatedWeight} lbs
                    </div>
                  </div>
                  <div>
                    <Label className="font-poppins">Estimated Value</Label>
                    <div className="text-2xl font-bold text-blue-600 font-poppins">
                      ${verificationData.estimatedValue.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {orderData.aiPhotos.slice(0, 2).map((photo, index) => (
                    <Image
                      key={index}
                      src={photo || "/placeholder.svg"}
                      alt={`AI Photo ${index + 1}`}
                      width={150}
                      height={100}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              </div>

              {/* Actual Verification */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 font-poppins">Actual Verification</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="actualWeight" className="font-poppins">
                      Actual Weight (lbs) *
                    </Label>
                    <div className="relative">
                      <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="actualWeight"
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        onChange={(e) => handleWeightInput(e.target.value)}
                        className="pl-10 font-poppins"
                        disabled={user.userType !== "buyer"}
                      />
                    </div>
                    {user.userType !== "buyer" && (
                      <p className="text-xs text-gray-500 mt-1 font-poppins">
                        Only buyers can input actual weight measurements
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="font-poppins">Calculated Value</Label>
                    <div className="text-2xl font-bold text-green-600 font-poppins">
                      ${verificationData.actualValue?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                </div>

                {/* Discrepancy Display */}
                {verificationData.discrepancy !== undefined && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium font-poppins">Weight Difference:</span>
                      <span className={`font-bold font-poppins ${getDiscrepancyColor(verificationData.discrepancy)}`}>
                        {verificationData.discrepancy > 0 ? "+" : ""}
                        {verificationData.discrepancy.toFixed(1)}%
                      </span>
                    </div>
                    <Badge className={`text-xs ${getDiscrepancyStatus(verificationData.discrepancy).color}`}>
                      {getDiscrepancyStatus(verificationData.discrepancy).label}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Verification */}
        {currentStep >= 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Verification Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-poppins">Upload Verification Photos</Label>
                <div className="mt-2">
                  <label className="block">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 font-poppins">
                        <div className="font-medium">
                          {user.userType === "buyer"
                            ? "Upload photos of materials on your scale"
                            : "View buyer verification photos"}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {user.userType === "buyer"
                            ? "Show the actual materials on your scale (Max 5 photos)"
                            : "Verification photos will appear here once buyer uploads them"}
                        </div>
                      </div>
                    </div>
                    <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {verificationData.verificationPhotos.length > 0 && (
                <div>
                  <Label className="font-poppins">
                    Uploaded Photos ({verificationData.verificationPhotos.length}/5)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
                    {verificationData.verificationPhotos.map((file, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`Verification ${index + 1}`}
                          width={150}
                          height={150}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Notes */}
        {currentStep >= 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Verification Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add any notes about the condition, quality, or discrepancies observed..."
                value={verificationData.notes}
                onChange={(e) => setVerificationData((prev) => ({ ...prev, notes: e.target.value }))}
                className="font-poppins"
                rows={4}
              />
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="font-poppins bg-transparent"
          >
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={(currentStep === 1 && !verificationData.actualWeight) || user.userType !== "buyer"}
              className="bg-[#006636] hover:bg-[#005528] text-white font-poppins"
            >
              {user.userType === "buyer" ? "Next Step" : "View Only Mode"}
            </Button>
          ) : (
            <Button
              onClick={submitVerification}
              disabled={isSubmitting || !verificationData.actualWeight || user.userType !== "buyer"}
              className="bg-[#006636] hover:bg-[#005528] text-white font-poppins"
            >
              {user.userType === "buyer" ? (
                isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Verification
                  </>
                )
              ) : (
                "Awaiting Buyer Verification"
              )}
            </Button>
          )}
        </div>

        {/* Verification Result */}
        {verificationData.status !== "pending" && (
          <Card
            className={`border-2 ${
              verificationData.status === "verified" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {verificationData.status === "verified" ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                )}
                <h3
                  className={`text-lg font-semibold font-poppins ${
                    verificationData.status === "verified" ? "text-green-900" : "text-red-900"
                  }`}
                >
                  {verificationData.status === "verified" ? "Verification Successful" : "Dispute Initiated"}
                </h3>
              </div>
              <p
                className={`text-sm font-poppins ${
                  verificationData.status === "verified" ? "text-green-800" : "text-red-800"
                }`}
              >
                {verificationData.status === "verified"
                  ? "The weight verification is within acceptable range. Points have been automatically adjusted and the transaction is complete."
                  : "Significant weight discrepancy detected. A dispute has been automatically initiated. Both parties will be contacted for resolution."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      <ToastContainer />
    </>
  )
}
