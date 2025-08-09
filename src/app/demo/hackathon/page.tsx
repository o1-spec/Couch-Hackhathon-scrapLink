"use client"

import { useState } from "react"
import { LiveActivityFeed } from "@/components/demo/LiveActivityFeed"
import { AIEstimationDemo } from "@/components/demo/AIEstimationDemo"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Sparkles, Activity, TrendingUp, Users, DollarSign, Leaf } from "lucide-react"
import Link from "next/link"

export default function HackathonDemo() {
  const [activeDemo, setActiveDemo] = useState<"overview" | "ai" | "activity">("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4" />
                <span className="font-poppins">Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#006636] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SL</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 font-poppins">ScrapLink Demo</h1>
                  {/* <Badge className="bg-red-100 text-red-800 text-xs">Hackathon 2024</Badge> */}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800 animate-pulse">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping" />
                Live Demo
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveDemo("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm font-poppins transition-colors ${
                activeDemo === "overview"
                  ? "border-[#006636] text-[#006636]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Platform Overview
              </div>
            </button>
            <button
              onClick={() => setActiveDemo("ai")}
              className={`py-4 px-1 border-b-2 font-medium text-sm font-poppins transition-colors ${
                activeDemo === "ai"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Price Estimation
              </div>
            </button>
            <button
              onClick={() => setActiveDemo("activity")}
              className={`py-4 px-1 border-b-2 font-medium text-sm font-poppins transition-colors ${
                activeDemo === "activity"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Live Activity
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeDemo === "overview" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Stats */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 font-poppins">Revolutionizing Scrap Metal Trading</h2>
              <p className="text-xl text-gray-600 font-poppins max-w-3xl mx-auto">
                AI-powered marketplace connecting verified sellers with buyers nationwide, promoting sustainability and
                transparent pricing.
              </p>
            </div>

            {/* Live Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">+12% today</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900 font-poppins">2,847</p>
                  <p className="text-sm text-gray-600 font-poppins">Active Users</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">+8% today</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900 font-poppins">$1.2M</p>
                  <p className="text-sm text-gray-600 font-poppins">Monthly Volume</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">AI Powered</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900 font-poppins">94%</p>
                  <p className="text-sm text-gray-600 font-poppins">Price Accuracy</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-emerald-600" />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800">Sustainable</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900 font-poppins">15.2K</p>
                  <p className="text-sm text-gray-600 font-poppins">Tons Recycled</p>
                </div>
              </div>
            </div>

            {/* Feature Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-poppins">AI Price Estimation</h3>
                    <p className="text-gray-600 font-poppins">Real-time market analysis</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <span className="font-poppins text-gray-700">Copper (Good condition)</span>
                    <span className="font-bold text-purple-600">$4.72/lb</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="font-poppins text-gray-700">Aluminum (Excellent)</span>
                    <span className="font-bold text-blue-600">$0.94/lb</span>
                  </div>
                  <Button
                    onClick={() => setActiveDemo("ai")}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-poppins"
                  >
                    Try AI Estimation
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-poppins">Live Marketplace</h3>
                    <p className="text-gray-600 font-poppins">Real-time trading activity</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-poppins text-gray-700">Sarah J. sold Copper Wire - $245</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-sm font-poppins text-gray-700">Mike R. listed Steel Beams - $450</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    <span className="text-sm font-poppins text-gray-700">Emily C. sent inquiry</span>
                  </div>
                  <Button
                    onClick={() => setActiveDemo("activity")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-poppins"
                  >
                    View Live Activity
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeDemo === "ai" && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">AI-Powered Price Estimation</h2>
              <p className="text-lg text-gray-600 font-poppins">
                Get instant, accurate pricing based on real-time market data and AI analysis
              </p>
            </div>
            <AIEstimationDemo />
          </div>
        )}

        {activeDemo === "activity" && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">Live Marketplace Activity</h2>
              <p className="text-lg text-gray-600 font-poppins">
                Real-time updates showing active trading, listings, and user engagement
              </p>
            </div>
            <LiveActivityFeed />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 font-poppins">
              🚀 Built for Hackathon 2024 • ScrapLink - Sustainable Scrap Metal Trading
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
