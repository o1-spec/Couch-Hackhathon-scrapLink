"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, DollarSign, Weight } from "lucide-react"

export function AIEstimationDemo() {
  const [material, setMaterial] = useState("")
  const [weight, setWeight] = useState("")
  const [condition, setCondition] = useState("")
  const [isEstimating, setIsEstimating] = useState(false)
  const [estimation, setEstimation] = useState<{
    price: number
    pricePerLb: number
    confidence: number
    marketTrend: "up" | "down" | "stable"
  } | null>(null)

  const materials = [
    { name: "Copper", basePrice: 4.5 },
    { name: "Aluminum", basePrice: 0.85 },
    { name: "Steel", basePrice: 0.25 },
    { name: "Brass", basePrice: 3.2 },
    { name: "Stainless Steel", basePrice: 1.8 },
  ]

  const conditions = [
    { name: "Excellent", multiplier: 1.1 },
    { name: "Good", multiplier: 1.0 },
    { name: "Fair", multiplier: 0.85 },
    { name: "Poor", multiplier: 0.7 },
  ]

  const handleEstimate = async () => {
    if (!material || !weight || !condition) return

    setIsEstimating(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const materialData = materials.find((m) => m.name === material)
    const conditionData = conditions.find((c) => c.name === condition)

    if (materialData && conditionData) {
      const basePrice = materialData.basePrice
      const weightNum = Number.parseFloat(weight)
      const pricePerLb = basePrice * conditionData.multiplier
      const totalPrice = pricePerLb * weightNum

      // Add some randomness for market conditions
      const marketVariation = (Math.random() - 0.5) * 0.2 // ±10%
      const finalPrice = totalPrice * (1 + marketVariation)

      setEstimation({
        price: finalPrice,
        pricePerLb: pricePerLb * (1 + marketVariation),
        confidence: Math.floor(85 + Math.random() * 10), // 85-95%
        marketTrend: marketVariation > 0.05 ? "up" : marketVariation < -0.05 ? "down" : "stable",
      })
    }

    setIsEstimating(false)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-poppins">
          <Sparkles className="h-5 w-5 text-purple-600" />
          AI Price Estimation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="font-poppins">Material</Label>
            <Select value={material} onValueChange={setMaterial}>
              <SelectTrigger>
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                {materials.map((mat) => (
                  <SelectItem key={mat.name} value={mat.name}>
                    {mat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="font-poppins">Weight (lbs)</Label>
            <div className="relative">
              <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                placeholder="50"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label className="font-poppins">Condition</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((cond) => (
                  <SelectItem key={cond.name} value={cond.name}>
                    {cond.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleEstimate}
          disabled={!material || !weight || !condition || isEstimating}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-poppins"
        >
          {isEstimating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              AI Analyzing Market Data...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Get AI Estimation
            </>
          )}
        </Button>

        {estimation && (
          <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 font-poppins">AI Estimation Results</h3>
              <Badge className="bg-purple-100 text-purple-800">{estimation.confidence}% Confidence</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600 font-poppins">Total Value</span>
                </div>
                <div className="text-2xl font-bold text-green-600 font-poppins">${estimation.price.toFixed(2)}</div>
              </div>

              <div className="text-center p-4 bg-white rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Weight className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600 font-poppins">Per Pound</span>
                </div>
                <div className="text-2xl font-bold text-blue-600 font-poppins">${estimation.pricePerLb.toFixed(2)}</div>
              </div>

              <div className="text-center p-4 bg-white rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {getTrendIcon(estimation.marketTrend)}
                  <span className="text-sm text-gray-600 font-poppins">Market Trend</span>
                </div>
                <div
                  className={`text-lg font-semibold font-poppins capitalize ${getTrendColor(estimation.marketTrend)}`}
                >
                  {estimation.marketTrend}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-poppins">
                💡 <strong>AI Insight:</strong> Based on current market conditions and recent transactions, this is a
                competitive price for {material.toLowerCase()} in {condition.toLowerCase()} condition.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
