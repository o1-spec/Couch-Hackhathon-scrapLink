'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Recycle, ArrowRight, Play, CheckCircle, Clock, Star } from 'lucide-react'
import Link from 'next/link'

export function OnboardingWelcome() {

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Estimation',
      description: 'Take a photo and get instant, accurate pricing for your scrap metal',
      benefit: 'Save time and get fair prices'
    },
    {
      icon: '🔒',
      title: 'Secure Transactions',
      description: 'Protected payments with escrow system and verified buyers',
      benefit: 'Peace of mind with every sale'
    },
    {
      icon: '🚚',
      title: 'Free Pickup Service',
      description: 'Schedule convenient pickup times that work with your schedule',
      benefit: 'No transportation hassles'
    },
    {
      icon: '💰',
      title: 'Best Market Prices',
      description: 'Connect with multiple buyers to get competitive offers',
      benefit: 'Maximize your earnings'
    }
  ]

  const testimonials = [
    {
      name: 'Mike Rodriguez',
      role: 'Construction Contractor',
      quote: 'ScrapLink helped me turn construction waste into $2,400 extra income last month!',
      rating: 5
    },
    {
      name: 'Sarah Chen',
      role: 'Recycling Business Owner',
      quote: 'The AI estimation is incredibly accurate. It saves me hours of manual sorting.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#006636] rounded-xl flex items-center justify-center">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 font-poppins">ScrapLink</h1>
          </div>
          <Badge variant="outline" className="font-poppins">
            Welcome Setup
          </Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Welcome Hero */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Recycle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
            Welcome to ScrapLink! 🎉
          </h2>
          <p className="text-xl text-gray-600 mb-6 font-poppins max-w-2xl mx-auto">
            You&apos;re just a few steps away from turning your scrap metal into cash. 
            Let&apos;s get your account set up so you can start earning today.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-[#006636] mb-2 font-poppins">$2.4M+</div>
              <div className="text-gray-600 font-poppins">Paid to sellers</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-[#006636] mb-2 font-poppins">15,000+</div>
              <div className="text-gray-600 font-poppins">Active users</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="text-3xl font-bold text-[#006636] mb-2 font-poppins">4.9★</div>
              <div className="text-gray-600 font-poppins">User rating</div>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center font-poppins">
            What makes ScrapLink special?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 font-poppins">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 mb-3 font-poppins">
                        {feature.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-700 font-medium font-poppins">
                          {feature.benefit}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center font-poppins">
            What our users say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 font-poppins italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900 font-poppins">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 font-poppins">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Setup Progress Preview */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 font-poppins">
              Your setup journey (takes about 5 minutes)
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#006636] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 font-poppins">Complete your profile</div>
                  <div className="text-sm text-gray-600 font-poppins">Basic information and contact details</div>
                </div>
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500 font-poppins">2 min</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-bold">2</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 font-poppins">Set your preferences</div>
                  <div className="text-sm text-gray-600 font-poppins">Material types and notification settings</div>
                </div>
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500 font-poppins">2 min</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-bold">3</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 font-poppins">Verify your account</div>
                  <div className="text-sm text-gray-600 font-poppins">Quick identity verification for security</div>
                </div>
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500 font-poppins">1 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="text-center space-y-4">
          <Link href="/onboarding/profile">
            <Button className="w-full md:w-auto px-8 h-14 bg-[#006636] hover:bg-[#005528] text-white text-lg font-medium font-poppins">
              Start Setup Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600 font-poppins">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              <span>Watch 2-minute demo</span>
            </div>
            <span>•</span>
            <Link href="/dashboard" className="text-[#006636] hover:text-[#005528] font-medium">
              Skip setup for now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
