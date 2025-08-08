'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowRight, Star, Gift, Zap, Camera, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function OnboardingComplete() {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const achievements = [
    { icon: '✅', title: 'Profile Complete', description: 'Your seller profile is ready' },
    { icon: '🎯', title: 'Preferences Set', description: 'We know what materials you work with' },
    { icon: '🔒', title: 'Account Verified', description: 'Your account is secure and trusted' }
  ]

  const nextSteps = [
    {
      icon: <Camera className="h-5 w-5" />,
      title: 'Take Your First Photo',
      description: 'Use our AI estimation tool to analyze your first batch of scrap metal',
      action: 'Start Photo Analysis',
      href: '/dashboard/estimate'
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Browse Active Buyers',
      description: 'See who\'s looking for materials in your area',
      action: 'View Marketplace',
      href: '/dashboard/marketplace'
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: 'Check Market Prices',
      description: 'Stay updated on current scrap metal pricing trends',
      action: 'View Prices',
      href: '/dashboard/prices'
    }
  ]

  const tips = [
    'Take clear, well-lit photos for better AI accuracy',
    'List materials during peak hours (9AM-5PM) for faster responses',
    'Complete transactions promptly to build your seller rating',
    'Join our community forum to connect with other sellers'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-8 py-12 relative z-10">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
            🎉 Welcome to ScrapLink!
          </h1>
          <p className="text-xl text-gray-600 mb-6 font-poppins">
            Your account is all set up and ready to start earning money from your scrap metal.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge className="bg-green-100 text-green-800 font-poppins">
              <Gift className="h-4 w-4 mr-1" />
              Setup Complete
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 font-poppins">
              <Star className="h-4 w-4 mr-1" />
              Verified Seller
            </Badge>
          </div>
        </div>

        {/* Achievements */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center font-poppins">
              What You&apos;ve Accomplished
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 font-poppins">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-poppins">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">
              Ready to Start Earning?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nextSteps.map((step, index) => (
                <Card key={index} className="border border-gray-200 hover:border-[#006636] transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#006636] rounded-lg flex items-center justify-center text-white">
                        {step.icon}
                      </div>
                      <div className="text-lg font-semibold text-gray-900 font-poppins">
                        {step.title}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 font-poppins">
                      {step.description}
                    </p>
                    <Link href={step.href}>
                      <Button className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                        {step.action}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pro Tips */}
        <Card className="border-0 shadow-lg mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 font-poppins">
                Pro Tips for Success
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 font-poppins">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
            Ready to Turn Your Scrap Into Cash?
          </h2>
          <p className="text-gray-600 mb-8 font-poppins">
            Join thousands of sellers who are already earning with ScrapLink
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button className="px-8 h-14 bg-[#006636] hover:bg-[#005528] text-white text-lg font-medium font-poppins">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/dashboard/estimate">
              <Button variant="outline" className="px-8 h-14 text-lg font-medium font-poppins">
                <Camera className="mr-2 h-5 w-5" />
                Start First Estimate
              </Button>
            </Link>
          </div>
          
          <div className="mt-6 text-sm text-gray-500 font-poppins">
            Need help? Check out our <Link href="/help" className="text-[#006636] hover:underline">getting started guide</Link> or <Link href="/support" className="text-[#006636] hover:underline">contact support</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
