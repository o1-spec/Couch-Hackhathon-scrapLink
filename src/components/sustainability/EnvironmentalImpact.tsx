"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Recycle, TreePine, Zap, Award, TrendingUp, Globe, Target } from "lucide-react"

interface EnvironmentalMetrics {
  totalMetalRecycled: number // in pounds
  co2Saved: number // in kg
  energySaved: number // in kWh
  landfillDiverted: number // in pounds
  treesEquivalent: number
  waterSaved: number // in gallons
}

interface SustainabilityGoal {
  id: string
  title: string
  description: string
  target: number
  current: number
  unit: string
  icon: React.ReactNode
  color: string
}

interface EnvironmentalImpactProps {
  user: {
    id: string
    name: string
    userType: "seller" | "buyer"
    joinDate: string
  }
}

export function EnvironmentalImpact({ user }: EnvironmentalImpactProps) {
  const [metrics, setMetrics] = useState<EnvironmentalMetrics>({
    totalMetalRecycled: 0,
    co2Saved: 0,
    energySaved: 0,
    landfillDiverted: 0,
    treesEquivalent: 0,
    waterSaved: 0,
  })

  const [goals, setGoals] = useState<SustainabilityGoal[]>([])

  // Calculate environmental impact based on user activity
  useEffect(() => {
    // Mock calculation based on user type and activity
    const baseImpact = user.userType === "seller" ? 1500 : 800 // pounds of metal
    const daysSinceJoining = Math.floor(
      (new Date().getTime() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24),
    )
    const activityMultiplier = Math.min(daysSinceJoining / 30, 12) // Max 12 months impact

    const totalRecycled = baseImpact * activityMultiplier

    setMetrics({
      totalMetalRecycled: totalRecycled,
      co2Saved: totalRecycled * 2.3, // 2.3 kg CO2 saved per pound of metal recycled
      energySaved: totalRecycled * 4.2, // 4.2 kWh saved per pound
      landfillDiverted: totalRecycled,
      treesEquivalent: Math.floor(totalRecycled * 0.02), // Rough equivalent
      waterSaved: totalRecycled * 15, // 15 gallons per pound
    })

    // Set sustainability goals
    setGoals([
      {
        id: "1",
        title: "Annual Recycling Goal",
        description: "Recycle 5,000 lbs of metal this year",
        target: 5000,
        current: totalRecycled,
        unit: "lbs",
        icon: <Recycle className="h-5 w-5" />,
        color: "text-green-600",
      },
      {
        id: "2",
        title: "CO2 Reduction Target",
        description: "Save 10,000 kg of CO2 emissions",
        target: 10000,
        current: totalRecycled * 2.3,
        unit: "kg CO2",
        icon: <Leaf className="h-5 w-5" />,
        color: "text-blue-600",
      },
      {
        id: "3",
        title: "Energy Conservation",
        description: "Save 20,000 kWh of energy",
        target: 20000,
        current: totalRecycled * 4.2,
        unit: "kWh",
        icon: <Zap className="h-5 w-5" />,
        color: "text-yellow-600",
      },
    ])
  }, [user])

  const getImpactLevel = (recycled: number) => {
    if (recycled < 500) return { level: "Getting Started", color: "bg-gray-100 text-gray-800", icon: "🌱" }
    if (recycled < 1500) return { level: "Eco Contributor", color: "bg-green-100 text-green-800", icon: "🌿" }
    if (recycled < 3000) return { level: "Green Champion", color: "bg-green-200 text-green-900", icon: "🌳" }
    return { level: "Sustainability Hero", color: "bg-green-300 text-green-900", icon: "🏆" }
  }

  const impactLevel = getImpactLevel(metrics.totalMetalRecycled)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toFixed(0)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Globe className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-2">Environmental Impact</h1>
        <p className="text-gray-600 font-poppins">
          Track your contribution to a more sustainable future through metal recycling
        </p>
      </div>

      {/* Impact Level Badge */}
      <div className="text-center mb-8">
        <Badge className={`text-lg px-6 py-2 ${impactLevel.color}`}>
          {impactLevel.icon} {impactLevel.level}
        </Badge>
        <p className="text-sm text-gray-600 mt-2 font-poppins">
          {user.name}, you&apos;ve made a significant environmental impact!
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="font-poppins">
            Overview
          </TabsTrigger>
          <TabsTrigger value="goals" className="font-poppins">
            Goals
          </TabsTrigger>
          <TabsTrigger value="insights" className="font-poppins">
            Insights
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Metal Recycled</p>
                    <p className="text-3xl font-bold text-green-600 font-poppins">
                      {formatNumber(metrics.totalMetalRecycled)}
                    </p>
                    <p className="text-sm text-gray-500 font-poppins">pounds</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Recycle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">CO2 Saved</p>
                    <p className="text-3xl font-bold text-blue-600 font-poppins">{formatNumber(metrics.co2Saved)}</p>
                    <p className="text-sm text-gray-500 font-poppins">kg CO2</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Energy Saved</p>
                    <p className="text-3xl font-bold text-yellow-600 font-poppins">
                      {formatNumber(metrics.energySaved)}
                    </p>
                    <p className="text-sm text-gray-500 font-poppins">kWh</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Landfill Diverted</p>
                    <p className="text-3xl font-bold text-purple-600 font-poppins">
                      {formatNumber(metrics.landfillDiverted)}
                    </p>
                    <p className="text-sm text-gray-500 font-poppins">pounds</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Trees Equivalent</p>
                    <p className="text-3xl font-bold text-green-700 font-poppins">{metrics.treesEquivalent}</p>
                    <p className="text-sm text-gray-500 font-poppins">trees saved</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TreePine className="h-6 w-6 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Water Saved</p>
                    <p className="text-3xl font-bold text-cyan-600 font-poppins">{formatNumber(metrics.waterSaved)}</p>
                    <p className="text-sm text-gray-500 font-poppins">gallons</p>
                  </div>
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-cyan-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Your Impact in Perspective</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 font-poppins">Environmental Equivalents</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-poppins">🚗 Cars off road for a year</span>
                      <span className="font-bold text-green-700 font-poppins">
                        {Math.floor(metrics.co2Saved / 4600)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-poppins">🏠 Homes powered for a month</span>
                      <span className="font-bold text-blue-700 font-poppins">
                        {Math.floor(metrics.energySaved / 877)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-poppins">🌳 Trees planted equivalent</span>
                      <span className="font-bold text-purple-700 font-poppins">{metrics.treesEquivalent}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 font-poppins">Resource Conservation</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                      <span className="text-sm font-poppins">💧 Swimming pools of water saved</span>
                      <span className="font-bold text-cyan-700 font-poppins">
                        {Math.floor(metrics.waterSaved / 20000)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-poppins">⚡ LED bulbs powered for a year</span>
                      <span className="font-bold text-yellow-700 font-poppins">
                        {Math.floor(metrics.energySaved / 87.6)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-poppins">🗑️ Garbage trucks diverted</span>
                      <span className="font-bold text-gray-700 font-poppins">
                        {Math.floor(metrics.landfillDiverted / 40000)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => {
              const progress = Math.min((goal.current / goal.target) * 100, 100)
              return (
                <Card key={goal.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center ${goal.color}`}
                      >
                        {goal.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 font-poppins">{goal.title}</h3>
                        <p className="text-sm text-gray-600 font-poppins">{goal.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-poppins">
                        <span>
                          {formatNumber(goal.current)} {goal.unit}
                        </span>
                        <span>
                          {formatNumber(goal.target)} {goal.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#006636] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-medium text-gray-700 font-poppins">
                          {progress.toFixed(1)}% Complete
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Sustainability Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-900 font-poppins">Excellent Progress</span>
                  </div>
                  <p className="text-sm text-green-800 font-poppins">
                    Your recycling efforts have increased by 45% compared to last month. Keep up the great work!
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900 font-poppins">Achievement Unlocked</span>
                  </div>
                  <p className="text-sm text-blue-800 font-poppins">
                    You&apos;ve reached the &quot;Green Champion&quot; level! Your efforts are making a real difference.
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-900 font-poppins">Next Milestone</span>
                  </div>
                  <p className="text-sm text-yellow-800 font-poppins">
                    You&apos;re only {formatNumber(5000 - metrics.totalMetalRecycled)} lbs away from your annual recycling
                    goal!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Global Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                  <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 font-poppins mb-2">ScrapLink Community Impact</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-2xl font-bold text-green-600 font-poppins">2.4M</div>
                      <div className="text-gray-600 font-poppins">lbs recycled</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600 font-poppins">5.5M</div>
                      <div className="text-gray-600 font-poppins">kg CO2 saved</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 font-poppins">Your Contribution</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-poppins">Platform Contribution</span>
                    <span className="font-medium font-poppins">
                      {((metrics.totalMetalRecycled / 2400000) * 100).toFixed(3)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#006636] h-2 rounded-full"
                      style={{ width: `${Math.min((metrics.totalMetalRecycled / 2400000) * 100 * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
