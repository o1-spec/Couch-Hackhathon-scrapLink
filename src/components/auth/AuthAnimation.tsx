'use client'

import { useEffect, useState } from 'react'
import { Recycle, Brain, Shield, Truck, Zap } from 'lucide-react'

const heroSlides = [
  {
    icon: Brain,
    title: "AI-Powered Estimation",
    description: "Advanced machine learning algorithms analyze your scrap metal photos to provide instant, accurate weight and value estimates.",
    background: "/placeholder.svg?height=1080&width=1920&text=AI+Technology+Scrap+Metal+Analysis",
    features: [
      "Instant photo analysis",
      "95% accuracy guarantee", 
      "Real-time market pricing",
      "Material classification"
    ]
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Your earnings are protected with our escrow system and verified buyer network, ensuring safe and reliable transactions.",
    background: "/placeholder.svg?height=1080&width=1920&text=Secure+Digital+Transactions+Banking",
    features: [
      "Escrow protection",
      "Verified buyers only",
      "Dispute resolution",
      "Secure payments"
    ]
  },
  {
    icon: Truck,
    title: "Integrated Logistics",
    description: "Seamless pickup and delivery coordination with our network of trusted logistics partners across the region.",
    background: "/placeholder.svg?height=1080&width=1920&text=Logistics+Trucks+Transportation+Network",
    features: [
      "Free pickup service",
      "Real-time tracking",
      "Flexible scheduling",
      "Insured transport"
    ]
  },
  {
    icon: Zap,
    title: "Instant Marketplace",
    description: "Connect with thousands of verified buyers and sellers in the largest scrap metal trading network.",
    background: "/placeholder.svg?height=1080&width=1920&text=Digital+Marketplace+Trading+Network",
    features: [
      "24/7 marketplace access",
      "Bulk purchasing options",
      "Price comparison tools",
      "Market insights"
    ]
  }
]

export default function AuthAnimation() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleSlideClick = (index: number) => {
    setCurrentSlide(index)
  }

  const currentContent = heroSlides[currentSlide]
  const IconComponent = currentContent.icon

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url('${currentContent.background}')`,
          transform: `scale(${1 + currentSlide * 0.02})`,
        }}
      ></div>
      
      {/* Green Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#006636]/85 via-[#008844]/80 to-[#00aa55]/85"></div>
      
      {/* Floating particles animation */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 4) * 18}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${2.5 + i * 0.3}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="relative z-10 text-white max-w-lg flex items-center justify-center h-full p-8">
        {/* Static branding */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Recycle className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold font-poppins">ScrapLink</h1>
          </div>
          
          {/* Animated content */}
          <div className="transition-all duration-700 ease-in-out">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-500">
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-4xl font-bold leading-tight font-poppins">
                {currentContent.title}
              </h2>
            </div>
            
            <p className="text-xl mb-8 text-white/90 leading-relaxed font-poppins">
              {currentContent.description}
            </p>
            
            <div className="space-y-3">
              {currentContent.features.map((feature, index) => (
                <div 
                  key={feature}
                  className="flex items-center gap-3 transition-all duration-500"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    opacity: currentSlide >= 0 ? 1 : 0,
                    transform: currentSlide >= 0 ? 'translateX(0)' : 'translateX(-20px)'
                  }}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-white/90 font-poppins">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Progress indicators */}
            <div className="flex gap-2 mt-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideClick(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer hover:bg-white/80 ${
                    index === currentSlide 
                      ? 'w-8 bg-white' 
                      : 'w-2 bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
