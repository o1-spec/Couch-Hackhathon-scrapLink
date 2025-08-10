"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Recycle,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  TrendingUp,
  Users,
  DollarSign,
  Leaf,
  Star,
  Play,
  CheckCircle,
  Lock,
  Award,
  TreePine,
  Factory,
  Truck,
} from "lucide-react"
import Link from "next/link"

export function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStat, setCurrentStat] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<"seller" | "buyer" | null>(null)
  const [impactCounter, setImpactCounter] = useState(0)

  console.log(userType)

  useEffect(() => {
    setIsVisible(true)

    // Check authentication status
    const checkAuth = () => {
      const authToken = localStorage.getItem("authToken")
      const savedUserType = localStorage.getItem("userType") as "seller" | "buyer" | null

      if (authToken) {
        setIsAuthenticated(true)
        setUserType(savedUserType)
      }
    }

    checkAuth()

    // Animate stats
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4)
    }, 3000)

    // Animate environmental impact counter
    const impactInterval = setInterval(() => {
      setImpactCounter((prev) => (prev + 1) % 1000)
    }, 50)

    return () => {
      clearInterval(interval)
      clearInterval(impactInterval)
    }
  }, [])

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Transactions", value: "$2.5M+", icon: DollarSign },
    { label: "Materials Recycled", value: "1M+ lbs", icon: Recycle },
    { label: "CO₂ Saved", value: "500T+", icon: Leaf },
  ]

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Estimation",
      description: "Get instant, accurate weight and value estimates using our advanced machine learning algorithms.",
      color: "bg-blue-500",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Protected payments with our points-based system and comprehensive dispute resolution.",
      color: "bg-green-500",
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with verified buyers and sellers across multiple regions and markets.",
      color: "bg-purple-500",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Pricing",
      description: "Access live market rates and optimize your transactions with dynamic pricing.",
      color: "bg-orange-500",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content:
        "ScrapLink helped me turn my workshop scraps into $500+ monthly income. The AI estimation is incredibly accurate!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Recycling Facility Manager",
      content: "We've streamlined our procurement process and found reliable suppliers through ScrapLink's platform.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Environmental Consultant",
      content: "The environmental impact tracking feature helps our clients meet sustainability goals effectively.",
      rating: 5,
    },
  ]

  const trustFeatures = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit SSL encryption and secure payment processing protect every transaction.",
    },
    {
      icon: CheckCircle,
      title: "Verified Users",
      description: "All users undergo identity verification and background checks before trading.",
    },
    {
      icon: Award,
      title: "Insured Transactions",
      description: "Every transaction is backed by comprehensive insurance coverage up to $50,000.",
    },
    {
      icon: Lock,
      title: "Escrow Protection",
      description: "Funds are held securely until both parties confirm transaction completion.",
    },
  ]

  const environmentalStats = [
    {
      icon: TreePine,
      value: "2.5M",
      label: "Trees Saved",
      description: "Equivalent trees saved through metal recycling",
    },
    {
      icon: Factory,
      value: "85%",
      label: "Energy Reduction",
      description: "Less energy used vs. new metal production",
    },
    {
      icon: Recycle,
      value: "500T",
      label: "CO₂ Prevented",
      description: "Carbon emissions prevented annually",
    },
    {
      icon: Truck,
      value: "1M+",
      label: "Miles Saved",
      description: "Transportation miles optimized",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#006636] rounded-lg flex items-center justify-center">
                <Recycle className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ScrapLink</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-[#006636] transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-[#006636] transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-[#006636] transition-colors">
                Reviews
              </a>
              <Link href="/contact" className="text-gray-600 hover:text-[#006636] transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button className="bg-[#006636] hover:bg-[#005528] text-white">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth">
                    <Button variant="ghost" className="text-[#006636] hover:text-[#005528]">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button className="bg-[#006636] hover:bg-[#005528] text-white">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  🚀 Revolutionizing Scrap Metal Trading
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Turn Your
                  <span className="text-[#006636] block">Scrap Into Cash</span>
                  Instantly
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect directly with verified buyers, get AI-powered estimates, and trade scrap metal with
                  confidence. Join thousands revolutionizing the circular economy.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {!isAuthenticated ? (
                  <>
                    <Link href="/auth">
                      <Button size="lg" className="bg-[#006636] hover:bg-[#005528] text-white text-lg px-8 py-4 h-auto">
                        Start Trading Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/demo">
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-8 py-4 h-auto border-[#006636] text-[#006636] hover:bg-[#006636] hover:text-white bg-transparent"
                      >
                        <Play className="mr-2 h-5 w-5" />
                        Watch Demo
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard">
                      <Button size="lg" className="bg-[#006636] hover:bg-[#005528] text-white text-lg px-8 py-4 h-auto">
                        Continue to Dashboard
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/demo">
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-8 py-4 h-auto border-[#006636] text-[#006636] hover:bg-[#006636] hover:text-white bg-transparent"
                      >
                        <Play className="mr-2 h-5 w-5" />
                        Watch Demo
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Animated Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className={`text-center p-4 rounded-lg transition-all duration-500 ${currentStat === index ? "bg-[#006636] text-white scale-105" : "bg-white text-gray-900"
                        }`}
                    >
                      <Icon
                        className={`h-6 w-6 mx-auto mb-2 ${currentStat === index ? "text-white" : "text-[#006636]"}`}
                      />
                      <div className="font-bold text-lg">{stat.value}</div>
                      <div className={`text-sm ${currentStat === index ? "text-green-100" : "text-gray-600"}`}>
                        {stat.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Hero Image/Animation */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#006636] to-green-400 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
                <Card className="relative bg-white shadow-2xl rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">AI Estimation</h3>
                        <Badge className="bg-green-100 text-green-800">Live</Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-gray-100 rounded-lg p-4 h-32 flex items-center justify-center">
                          <div className="text-center">
                            <Recycle className="h-12 w-12 text-[#006636] mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Upload scrap image</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Material: Copper</span>
                            <span className="text-sm font-medium">98% confidence</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Est. Weight:</span>
                            <span className="text-sm font-medium">2.3 lbs</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Est. Value:</span>
                            <span className="text-lg font-bold text-[#006636]">$18.40</span>
                          </div>
                        </div>

                        <Button className="w-full bg-[#006636] hover:bg-[#005528]">Create Listing</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ScrapLink?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology meets sustainable trading. Experience the future of scrap metal commerce.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 shadow-lg`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, secure, and efficient trading in three easy steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload & Estimate",
                description: "Take photos of your scrap metal and get instant AI-powered weight and value estimates.",
                icon: Zap,
              },
              {
                step: "02",
                title: "Connect & Trade",
                description: "Browse listings or get matched with verified buyers and sellers in your area.",
                icon: Users,
              },
              {
                step: "03",
                title: "Secure Payment",
                description: "Complete transactions safely with our points-based system and dispute protection.",
                icon: Shield,
              },
            ].map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.step} className="text-center relative">
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#006636] to-transparent transform translate-x-4"></div>
                  )}
                  <div className="relative">
                    <div className="w-24 h-24 bg-[#006636] rounded-full flex items-center justify-center mx-auto mb-6 relative">
                      <Icon className="h-10 w-10 text-white" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#006636] font-bold text-sm">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trade with Complete Confidence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your security is our priority. Every transaction is protected by multiple layers of security and
              verification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#006636] mb-2">99.9%</div>
                <div className="text-gray-600">Transaction Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#006636] mb-2">$50K</div>
                <div className="text-gray-600">Insurance Coverage</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#006636] mb-2">24/7</div>
                <div className="text-gray-600">Security Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Making a Real Environmental Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every transaction on ScrapLink contributes to a more sustainable future. See the collective impact of our
              community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {environmentalStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-[#006636] mb-2">{stat.value}</div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.description}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Impact Counter</h3>
                <p className="text-gray-600 mb-6">
                  Watch as our community makes a difference in real-time. Every piece of scrap metal recycled through
                  ScrapLink helps reduce environmental waste and carbon emissions.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">CO₂ Saved Today:</span>
                    <span className="text-2xl font-bold text-green-600">{impactCounter + 1247} lbs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Metal Recycled Today:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {Math.floor(impactCounter * 2.3) + 5420} lbs
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Energy Saved Today:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {Math.floor(impactCounter * 0.8) + 2100} kWh
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Leaf className="h-20 w-20 text-green-600 mx-auto mb-4 animate-pulse" />
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {Math.floor(impactCounter / 10) + 156}%
                    </div>
                    <div className="text-gray-600">Sustainability Goal Progress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600">See what our community says about ScrapLink</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">&quot;{testimonial.content}&quot;</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#006636] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#006636] to-green-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Trading?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join the revolution in scrap metal trading. Get started in minutes.
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="bg-white text-[#006636] hover:bg-gray-100 text-lg px-8 py-4 h-auto">
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/learn-more">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#006636] text-lg px-8 py-4 h-auto bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-[#006636] hover:bg-gray-100 text-lg px-8 py-4 h-auto">
                Continue to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#006636] rounded-lg flex items-center justify-center">
                  <Recycle className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">ScrapLink</span>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionizing scrap metal trading through digital integration and AI estimation.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#006636] transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#006636] transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#006636] transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    How it Works
                  </a>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ScrapLink. All rights reserved. Revolutionizing the circular economy.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
