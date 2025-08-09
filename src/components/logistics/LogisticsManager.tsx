"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, MapPin, Clock, Star, Phone, Calculator, Route } from "lucide-react"
import Image from "next/image"

interface LogisticsProvider {
  id: string
  name: string
  logo: string
  rating: number
  reviewCount: number
  baseRate: number
  perMileRate: number
  estimatedTime: string
  specialties: string[]
  isVerified: boolean
  availability: "available" | "busy" | "unavailable"
}

interface ShippingQuote {
  providerId: string
  totalCost: number
  estimatedTime: string
  breakdown: {
    baseRate: number
    distanceRate: number
    materialHandling: number
    insurance: number
  }
}

interface LogisticsManagerProps {
  user: {
    id: string
    name: string
    userType: "seller" | "buyer"
  }
  orderData: {
    id: string
    material: string
    weight: number
    pickupAddress: string
    deliveryAddress: string
    distance: number
    value: number
  }
}

export function LogisticsManager({ user, orderData }: LogisticsManagerProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [quotes, setQuotes] = useState<ShippingQuote[]>([])
  const [isCalculating, setIsCalculating] = useState(false)
  const [providers, setProviders] = useState<LogisticsProvider[]>([])

  // Mock logistics providers
  useEffect(() => {
    const mockProviders: LogisticsProvider[] = [
      {
        id: "1",
        name: "MetalHaul Express",
        logo: "/placeholder.svg?height=40&width=40&text=MH",
        rating: 4.8,
        reviewCount: 234,
        baseRate: 25.0,
        perMileRate: 2.5,
        estimatedTime: "2-4 hours",
        specialties: ["Heavy Metals", "Secure Transport"],
        isVerified: true,
        availability: "available",
      },
      {
        id: "2",
        name: "ScrapShip Logistics",
        logo: "/placeholder.svg?height=40&width=40&text=SS",
        rating: 4.6,
        reviewCount: 189,
        baseRate: 20.0,
        perMileRate: 2.25,
        estimatedTime: "3-6 hours",
        specialties: ["Bulk Materials", "Same Day"],
        isVerified: true,
        availability: "available",
      },
      {
        id: "3",
        name: "GreenMove Transport",
        logo: "/placeholder.svg?height=40&width=40&text=GM",
        rating: 4.9,
        reviewCount: 156,
        baseRate: 30.0,
        perMileRate: 2.75,
        estimatedTime: "1-3 hours",
        specialties: ["Eco-Friendly", "Premium Service"],
        isVerified: true,
        availability: "busy",
      },
      {
        id: "4",
        name: "QuickPickup Pro",
        logo: "/placeholder.svg?height=40&width=40&text=QP",
        rating: 4.4,
        reviewCount: 98,
        baseRate: 18.0,
        perMileRate: 2.0,
        estimatedTime: "4-8 hours",
        specialties: ["Budget Friendly", "Flexible Schedule"],
        isVerified: false,
        availability: "available",
      },
    ]
    setProviders(mockProviders)
  }, [])

  const calculateQuotes = async () => {
    setIsCalculating(true)

    // Simulate API call to calculate shipping quotes
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const calculatedQuotes: ShippingQuote[] = providers.map((provider) => {
      const baseRate = provider.baseRate
      const distanceRate = provider.perMileRate * orderData.distance
      const materialHandling = orderData.weight > 100 ? 15.0 : 10.0
      const insurance = orderData.value * 0.02 // 2% of material value

      return {
        providerId: provider.id,
        totalCost: baseRate + distanceRate + materialHandling + insurance,
        estimatedTime: provider.estimatedTime,
        breakdown: {
          baseRate,
          distanceRate,
          materialHandling,
          insurance,
        },
      }
    })

    setQuotes(calculatedQuotes)
    setIsCalculating(false)
  }

  const getProviderById = (id: string) => providers.find((p) => p.id === id)

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "unavailable":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId)
  }

  const confirmBooking = async () => {
    if (!selectedProvider) return

    // Simulate booking confirmation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In real app, this would create the booking and redirect
    alert(`Booking confirmed with ${getProviderById(selectedProvider)?.name}!`)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Truck className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-2">Logistics Management</h1>
        <p className="text-gray-600 font-poppins">Select a verified transport provider for your scrap metal shipment</p>
      </div>

      {/* Shipment Details */}
      <Card>
        <CardHeader>
          <CardTitle className="font-poppins">Shipment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-600 font-poppins">Material</div>
              <div className="font-semibold font-poppins">{orderData.material}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 font-poppins">Weight</div>
              <div className="font-semibold font-poppins">{orderData.weight} lbs</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 font-poppins">Distance</div>
              <div className="font-semibold font-poppins">{orderData.distance} miles</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 font-poppins">Material Value</div>
              <div className="font-semibold font-poppins">${orderData.value.toFixed(2)}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 font-poppins mb-1">Pickup Address</div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <div className="text-sm font-poppins">{orderData.pickupAddress}</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 font-poppins mb-1">Delivery Address</div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <div className="text-sm font-poppins">{orderData.deliveryAddress}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculate Quotes */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <Button
              onClick={calculateQuotes}
              disabled={isCalculating}
              className="bg-[#006636] hover:bg-[#005528] text-white font-poppins"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Calculating Routes...
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  Get Shipping Quotes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Provider Quotes */}
      {quotes.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {providers.map((provider) => {
            const quote = quotes.find((q) => q.providerId === provider.id)
            if (!quote) return null

            return (
              <Card
                key={provider.id}
                className={`cursor-pointer transition-all ${
                  selectedProvider === provider.id ? "ring-2 ring-[#006636] bg-green-50" : "hover:shadow-lg"
                }`}
                onClick={() => handleProviderSelect(provider.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={provider.logo || "/placeholder.svg"}
                        alt={provider.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 font-poppins">{provider.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-poppins">{provider.rating}</span>
                            <span className="text-sm text-gray-500 font-poppins">({provider.reviewCount})</span>
                          </div>
                          {provider.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getAvailabilityColor(provider.availability)}`}>
                      {provider.availability}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#006636] font-poppins">
                        ${quote.totalCost.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-poppins">{quote.estimatedTime}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 space-y-1 font-poppins">
                      <div className="flex justify-between">
                        <span>Base Rate:</span>
                        <span>${quote.breakdown.baseRate.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Distance ({orderData.distance} mi):</span>
                        <span>${quote.breakdown.distanceRate.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material Handling:</span>
                        <span>${quote.breakdown.materialHandling.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance (2%):</span>
                        <span>${quote.breakdown.insurance.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {provider.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {selectedProvider === provider.id && (
                      <div className="mt-4 p-3 bg-white rounded-lg border">
                        <div className="flex items-center gap-2 text-green-700">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm font-medium font-poppins">Selected Provider - Ready to Book</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Booking Confirmation */}
      {selectedProvider && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-poppins">
                Confirm Booking with {getProviderById(selectedProvider)?.name}
              </h3>
              <p className="text-gray-600 font-poppins">
                The transport cost will be split between buyer and seller according to platform policy.
                {user.userType === "seller" && " You will pay 40% of the transport cost."}
                {user.userType === "buyer" && " You will pay 60% of the transport cost."}
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => setSelectedProvider("")}
                  className="font-poppins bg-transparent"
                >
                  Change Provider
                </Button>
                <Button onClick={confirmBooking} className="bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                  <Route className="h-4 w-4 mr-2" />
                  Confirm Booking
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
