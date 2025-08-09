"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  ArrowLeft,
  Shield,
  Globe,
  Users,
  DollarSign,
  Leaf,
  Recycle,
  Factory,
  Truck,
  CheckCircle,
  Lock,
  Clock,
  Phone,
  Mail,
  MapPin,
  Camera,
  MessageSquare,
  CreditCard,
  BarChart3,
  Smartphone,
  Brain,
  TreePine,
  Target,
  TrendingUp,
  Search,
} from "lucide-react"
import Link from "next/link"

export default function LearnMorePage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const platformFeatures = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Estimation",
      description:
        "Advanced machine learning algorithms analyze your scrap metal photos to provide instant, accurate weight and value estimates based on real-time market data.",
      benefits: ["95%+ accuracy rate", "Instant results", "Market-based pricing", "Photo analysis"],
      color: "bg-purple-500",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Verified User Network",
      description:
        "Every user undergoes comprehensive verification including identity checks, business licenses, and background screening for maximum trust and security.",
      benefits: ["Identity verification", "Business license checks", "Background screening", "Trust ratings"],
      color: "bg-blue-500",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Nationwide Marketplace",
      description:
        "Connect with thousands of verified buyers and sellers across all 50 states through our comprehensive marketplace platform.",
      benefits: ["50-state coverage", "Local & national reach", "Diverse material types", "Active community"],
      color: "bg-green-500",
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Secure Transactions",
      description:
        "Bank-level security with escrow protection, insurance coverage up to $50K, and comprehensive dispute resolution services.",
      benefits: ["Escrow protection", "$50K insurance", "Dispute resolution", "Secure payments"],
      color: "bg-red-500",
    },
  ]

  const howItWorksSteps = [
    {
      step: 1,
      title: "Sign Up & Get Verified",
      description: "Create your account and complete our quick verification process",
      details: [
        "Provide basic business information",
        "Upload required documentation",
        "Complete identity verification",
        "Get your verified badge",
      ],
      icon: <Users className="h-12 w-12" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      step: 2,
      title: "List Your Materials",
      description: "Upload photos and get AI-powered estimates for your scrap metal",
      details: [
        "Take clear photos of your materials",
        "Get instant AI price estimates",
        "Add detailed descriptions",
        "Set your asking price",
      ],
      icon: <Camera className="h-12 w-12" />,
      color: "bg-green-100 text-green-600",
    },
    {
      step: 3,
      title: "Connect with Buyers",
      description: "Receive offers and negotiate directly with verified buyers",
      details: [
        "Get notifications for new offers",
        "Message buyers directly",
        "Negotiate terms and pricing",
        "Schedule pickup or delivery",
      ],
      icon: <MessageSquare className="h-12 w-12" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      step: 4,
      title: "Complete Transaction",
      description: "Finalize the deal with secure payment and logistics support",
      details: [
        "Confirm transaction details",
        "Arrange secure pickup/delivery",
        "Complete payment through escrow",
        "Rate and review the experience",
      ],
      icon: <CreditCard className="h-12 w-12" />,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  const sellerBenefits = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Maximize Your Revenue",
      description: "Get competitive offers from multiple verified buyers and AI-powered market pricing.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Save Time & Effort",
      description: "No more cold calling or driving around. Buyers come to you through our platform.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Transactions",
      description: "Every transaction is protected with escrow, insurance, and dispute resolution.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Business Analytics",
      description: "Track your sales, revenue trends, and optimize your scrap metal business.",
    },
  ]

  const buyerBenefits = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Find Quality Materials",
      description: "Access verified suppliers with detailed material descriptions and photos.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Competitive Pricing",
      description: "AI-powered market analysis ensures fair pricing for all materials.",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Logistics Support",
      description: "Coordinate pickup, delivery, and transportation with integrated logistics.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Market Insights",
      description: "Access real-time market data and trends to make informed purchasing decisions.",
    },
  ]

  const technologyFeatures = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Machine Learning AI",
      description:
        "Our AI models are trained on thousands of verified scrap metal samples and real market transactions.",
      specs: ["95%+ accuracy", "Real-time analysis", "Continuous learning", "Market integration"],
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile-First Design",
      description: "Fully responsive platform optimized for mobile devices with native app capabilities.",
      specs: ["iOS & Android apps", "Offline capabilities", "Push notifications", "Camera integration"],
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-level security infrastructure with end-to-end encryption and compliance.",
      specs: ["256-bit SSL encryption", "SOC 2 compliance", "PCI DSS certified", "Regular audits"],
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Cloud Infrastructure",
      description: "Scalable cloud architecture ensuring 99.9% uptime and global accessibility.",
      specs: ["99.9% uptime SLA", "Global CDN", "Auto-scaling", "Disaster recovery"],
    },
  ]

  const environmentalImpact = [
    {
      icon: <TreePine className="h-8 w-8" />,
      title: "Forest Conservation",
      description:
        "Every ton of recycled metal saves approximately 2,500 pounds of iron ore, 1,400 pounds of coal, and 120 pounds of limestone.",
      impact: "2.5M trees saved equivalent",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Factory className="h-8 w-8" />,
      title: "Energy Reduction",
      description: "Recycling metals uses 95% less energy than producing new metals from virgin ore materials.",
      impact: "85% energy reduction",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Carbon Footprint",
      description:
        "Metal recycling significantly reduces greenhouse gas emissions compared to primary metal production.",
      impact: "500+ tons CO₂ prevented",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: <Recycle className="h-8 w-8" />,
      title: "Circular Economy",
      description:
        "Metals can be recycled indefinitely without losing their properties, creating a true circular economy.",
      impact: "100% recyclability",
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const faqItems = [
    {
      question: "How accurate is the AI pricing estimation?",
      answer:
        "Our AI has a 95%+ accuracy rate, trained on thousands of verified transactions and real-time market data. The estimates are updated continuously based on current market conditions.",
    },
    {
      question: "What types of scrap metal can I trade?",
      answer:
        "We support all major scrap metals including copper, aluminum, steel, stainless steel, brass, lead, zinc, and specialty alloys. Our AI can identify and price most common scrap materials.",
    },
    {
      question: "How does the verification process work?",
      answer:
        "All users undergo identity verification, business license checks (for businesses), and background screening. This typically takes 24-48 hours and ensures a trusted trading environment.",
    },
    {
      question: "What are the fees for using ScrapLink?",
      answer:
        "ScrapLink charges a 20% commission on successful transactions. There are no listing fees, monthly charges, or hidden costs. You only pay when you successfully complete a sale.",
    },
    {
      question: "How is payment handled?",
      answer:
        "All payments go through our secure escrow system. Funds are held safely until both parties confirm the transaction is complete. We support bank transfers, checks, and digital payments.",
    },
    {
      question: "What if there's a dispute?",
      answer:
        "We have a comprehensive dispute resolution process with documentation requirements, mediation services, and escalation procedures. All transactions are also insured up to $50,000.",
    },
    {
      question: "Can I use ScrapLink on mobile devices?",
      answer:
        "Yes! ScrapLink is fully mobile-responsive with native iOS and Android apps. You can take photos, get estimates, and manage transactions from anywhere.",
    },
    {
      question: "How do I arrange pickup or delivery?",
      answer:
        "Our platform includes logistics coordination tools. You can arrange pickup, delivery, or meet at verified locations. We also partner with transportation companies for larger loads.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className=" border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5 text-[#006636]" />
              <span className="text-[#006636] hover:text-[#005528] font-poppins">Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900 font-poppins">Learn More</h1>
            <Link href="/auth/usertype">
              <Button className="bg-[#006636] hover:bg-[#005528] text-white font-poppins">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#006636] via-[#008844] to-[#00a855] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <Badge className="bg-white/20 text-white px-4 py-2 text-sm font-poppins">
              🚀 The Complete ScrapLink Guide
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold font-poppins leading-tight">
              Everything You Need to Know
              <span className="text-green-200 block">About ScrapLink</span>
            </h1>
            <p className="text-xl text-green-100 font-poppins max-w-3xl mx-auto">
              Discover how our AI-powered platform is revolutionizing scrap metal trading with secure transactions,
              verified users, and sustainable practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/usertype">
                <Button size="lg" className="bg-white text-[#006636] hover:bg-gray-100 font-poppins px-8 py-4 text-lg">
                  Start Trading Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo/hackathon">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#006636] font-poppins px-8 py-4 text-lg bg-transparent"
                >
                  View Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 font-poppins mb-4">Platform Overview</h2>
            <p className="text-xl text-gray-600 font-poppins max-w-3xl mx-auto">
              ScrapLink is the most advanced scrap metal trading platform, combining AI technology, verified users, and
              sustainable practices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 font-poppins">What Makes ScrapLink Different?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 font-poppins">AI-Powered Accuracy</h4>
                    <p className="text-gray-600 font-poppins">
                      Our machine learning algorithms provide 95%+ accurate pricing based on real market data.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 font-poppins">Verified Community</h4>
                    <p className="text-gray-600 font-poppins">
                      Every user is verified with background checks and business license validation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 font-poppins">Complete Security</h4>
                    <p className="text-gray-600 font-poppins">
                      Bank-level security with escrow protection and insurance coverage up to $50K.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 font-poppins">Environmental Impact</h4>
                    <p className="text-gray-600 font-poppins">
                      Track your contribution to sustainability and the circular economy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h4 className="text-2xl font-bold text-gray-900 font-poppins mb-6 text-center">Platform Statistics</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#006636] font-poppins mb-2">15K+</div>
                  <div className="text-sm text-gray-600 font-poppins">Verified Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#006636] font-poppins mb-2">$2.5M+</div>
                  <div className="text-sm text-gray-600 font-poppins">Monthly Volume</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#006636] font-poppins mb-2">99.9%</div>
                  <div className="text-sm text-gray-600 font-poppins">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#006636] font-poppins mb-2">50</div>
                  <div className="text-sm text-gray-600 font-poppins">States Covered</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-900 font-poppins">Environmental Impact</span>
                </div>
                <p className="text-sm text-green-800 font-poppins">
                  Over 500 tons of CO₂ emissions prevented through our recycling network
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 font-poppins mb-4">Core Features</h2>
            <p className="text-xl text-gray-600 font-poppins">
              Discover the powerful features that make ScrapLink the leading scrap metal trading platform
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {platformFeatures.map((feature, index) => (
              <Card
                key={index}
                className={`p-6 border-2 transition-all cursor-pointer ${
                  activeFeature === index ? "border-[#006636] shadow-lg" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-white`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 font-poppins mb-2">{feature.title}</h3>
                      <p className="text-gray-600 font-poppins mb-4">{feature.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-700 font-poppins">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 font-poppins mb-4">How ScrapLink Works</h2>
            <p className="text-xl text-gray-600 font-poppins">
              A simple, secure, and efficient process from listing to payment
            </p>
          </div>

          <div className="space-y-12">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Card className="p-8 shadow-lg">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center`}>
                          {step.icon}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-500 font-poppins">STEP {step.step}</div>
                          <h3 className="text-2xl font-bold text-gray-900 font-poppins">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 font-poppins mb-6">{step.description}</p>
                      <div className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 font-poppins">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""} text-center`}>
                  <div className="w-32 h-32 bg-gradient-to-br from-[#006636] to-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl font-bold text-white font-poppins">{step.step}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 font-poppins mb-2">{step.title}</h4>
                  <p className="text-gray-600 font-poppins">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Users */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 font-poppins mb-4">Benefits for Every User</h2>
            <p className="text-xl text-gray-600 font-poppins">
              Whether you&apos;re selling or buying, ScrapLink provides value at every step
            </p>
          </div>

          <Tabs defaultValue="sellers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-12">
              <TabsTrigger value="sellers" className="font-poppins text-lg py-3">
                For Sellers
              </TabsTrigger>
              <TabsTrigger value="buyers" className="font-poppins text-lg py-3">
                For Buyers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sellers">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sellerBenefits.map((benefit, index) => (
                  <Card key={index} className="p-6 border-2 border-gray-100 hover:border-green-200 transition-colors">
                    <CardContent className="p-0">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 text-green-600">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 font-poppins mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 font-poppins">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="buyers">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {buyerBenefits.map((benefit, index) => (
                  <Card key={index} className="p-6 border-2 border-gray-100 hover:border-blue-200 transition-colors">
                    <CardContent className="p-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 font-poppins mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 font-poppins">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 font-poppins mb-4">Technology & Innovation</h2>
            <p className="text-xl text-gray-600 font-poppins">
              Cutting-edge technology powering the future of scrap metal trading
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologyFeatures.map((tech, index) => (
              <Card key={index} className="p-8 border-2 border-gray-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#006636] to-green-400 rounded-2xl flex items-center justify-center mb-6 text-white">
                    {tech.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 font-poppins mb-4">{tech.title}</h3>
                  <p className="text-gray-600 font-poppins mb-6">{tech.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {tech.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700 font-poppins">{spec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 font-poppins mb-4">Environmental Impact</h2>
            <p className="text-xl text-gray-600 font-poppins">
              Every transaction contributes to a more sustainable future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {environmentalImpact.map((impact, index) => (
              <Card key={index} className="p-8 border-2 border-gray-100 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 ${impact.color} rounded-2xl flex items-center justify-center mb-6`}>
                    {impact.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 font-poppins mb-4">{impact.title}</h3>
                  <p className="text-gray-600 font-poppins mb-4">{impact.description}</p>
                  <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">{impact.impact}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-white shadow-xl">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 font-poppins mb-4">Our Collective Impact</h3>
                <p className="text-lg text-gray-600 font-poppins">
                  See the real-time environmental benefits of our community
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 font-poppins mb-2">2.5M</div>
                  <div className="text-gray-600 font-poppins">Pounds Recycled</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 font-poppins mb-2">500+</div>
                  <div className="text-gray-600 font-poppins">Tons CO₂ Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 font-poppins mb-2">85%</div>
                  <div className="text-gray-600 font-poppins">Energy Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 font-poppins mb-2">100%</div>
                  <div className="text-gray-600 font-poppins">Recyclability</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 font-poppins mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 font-poppins">
              Get answers to the most common questions about ScrapLink
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="border-2 border-gray-100">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 font-poppins">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 font-poppins">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20 bg-[#006636]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white font-poppins mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 font-poppins mb-8 max-w-2xl mx-auto">
            Join thousands of successful traders on ScrapLink. Sign up today and experience the future of scrap metal
            trading.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/auth/usertype">
              <Button size="lg" className="bg-white text-[#006636] hover:bg-gray-100 font-poppins text-lg px-8 py-4">
                Start Trading Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo/hackathon">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#006636] font-poppins text-lg px-8 py-4 bg-transparent"
              >
                View Demo
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-green-100">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-poppins">Free to join</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-poppins">Quick verification</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-poppins">Start trading immediately</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#006636] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SL</span>
                </div>
                <span className="text-2xl font-bold font-poppins">ScrapLink</span>
              </div>
              <p className="text-gray-400 font-poppins mb-4">
                Revolutionizing scrap metal trading with AI-powered pricing and sustainable practices.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold font-poppins mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400 font-poppins">
                <li>
                  <Link href="/demo/hackathon" className="hover:text-white">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/auth" className="hover:text-white">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold font-poppins mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 font-poppins">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold font-poppins mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400 font-poppins">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>1-800-SCRAP-LINK</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@scraplink.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Chicago, IL</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 font-poppins">© 2024 ScrapLink. Built for sustainable trading.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
