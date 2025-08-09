"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, ArrowLeft, Upload, Eye, DollarSign } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  console.log(isPlaying)

  const demoSteps = [
    {
      title: "Upload Your Scrap",
      description: "Take a photo of your scrap metal using our mobile app or web interface",
      content: (
        <div className="bg-gray-100 rounded-lg p-8 h-64 flex flex-col items-center justify-center">
          <Upload className="h-16 w-16 text-[#006636] mb-4" />
          <p className="text-gray-600 text-center">Click or drag to upload scrap metal image</p>
          <Button className="mt-4 bg-[#006636] hover:bg-[#005528]">
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
        </div>
      ),
    },
    {
      title: "AI Analysis",
      description: "Our advanced AI analyzes your image to identify material type and estimate weight",
      content: (
        <div className="bg-gray-100 rounded-lg p-8 h-64 flex flex-col items-center justify-center">
          <div className="relative">
            <Eye className="h-16 w-16 text-[#006636] mb-4" />
            <div className="absolute -top-2 -right-2">
              <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 text-center mb-2">Analyzing image...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#006636] h-2 rounded-full animate-pulse" style={{ width: "75%" }}></div>
          </div>
        </div>
      ),
    },
    {
      title: "Get Instant Results",
      description: "Receive accurate weight estimates and current market value for your materials",
      content: (
        <div className="bg-white rounded-lg p-6 h-64 border-2 border-[#006636]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Material Detected:</span>
              <Badge className="bg-green-100 text-green-800">Copper Wire</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Confidence:</span>
              <span className="font-medium">98.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Estimated Weight:</span>
              <span className="font-medium">2.3 lbs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Current Market Rate:</span>
              <span className="font-medium">$8.00/lb</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold">Estimated Value:</span>
                <span className="font-bold text-[#006636] text-2xl">$18.40</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Create Listing",
      description: "List your materials on our marketplace and connect with verified buyers",
      content: (
        <div className="bg-gray-100 rounded-lg p-8 h-64 flex flex-col items-center justify-center">
          <DollarSign className="h-16 w-16 text-[#006636] mb-4" />
          <p className="text-gray-600 text-center mb-4">Your listing is ready to go live!</p>
          <Button className="bg-[#006636] hover:bg-[#005528]">Create Listing</Button>
        </div>
      ),
    },
  ]

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % demoSteps.length)
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + demoSteps.length) % demoSteps.length)
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-[#006636]" />
              <span className="text-[#006636] hover:text-[#005528]">Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">ScrapLink Demo</h1>
            <Link href="/demo/hackathon">
              <Button className="bg-[#006636] hover:bg-[#005528] text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Demo Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">See ScrapLink in Action</h1>
            <p className="text-xl text-gray-600">
              Watch how easy it is to turn your scrap metal into cash with our AI-powered platform
            </p>
          </div>

          {/* Demo Player */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-[#006636] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {currentStep + 1}
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900">{demoSteps[currentStep].title}</h3>
                    </div>
                    <p className="text-gray-600 text-lg">{demoSteps[currentStep].description}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>
                        Step {currentStep + 1} of {demoSteps.length}
                      </span>
                      <span>{Math.round(((currentStep + 1) / demoSteps.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#006636] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center space-x-4">
                    <Button onClick={prevStep} variant="outline" disabled={currentStep === 0}>
                      Previous
                    </Button>
                    <Button onClick={nextStep} className="bg-[#006636] hover:bg-[#005528]">
                      {currentStep === demoSteps.length - 1 ? "Start Over" : "Next Step"}
                    </Button>
                    <Button onClick={resetDemo} variant="ghost" size="sm">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>

                {/* Demo Visual */}
                <div className="relative">{demoSteps[currentStep].content}</div>
              </div>
            </CardContent>
          </Card>

          {/* Step Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {demoSteps.map((step, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-200 ${index === currentStep
                    ? "ring-2 ring-[#006636] bg-green-50"
                    : index < currentStep
                      ? "bg-gray-50"
                      : "hover:bg-gray-50"
                  }`}
                onClick={() => setCurrentStep(index)}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold ${index === currentStep
                        ? "bg-[#006636] text-white"
                        : index < currentStep
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{step.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">Join thousands of users already making money with ScrapLink</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="bg-[#006636] hover:bg-[#005528] text-white text-lg px-8 py-4 h-auto">
                  Start Trading Now
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
