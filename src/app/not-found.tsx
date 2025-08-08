import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Recycle, Home, ArrowLeft, Search, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen my-10 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#006636] rounded-xl flex items-center justify-center">
            <Recycle className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">ScrapLink</h1>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-[#006636] mb-4 font-poppins">404</div>
          <div className="w-32 h-1 bg-[#006636] mx-auto rounded-full mb-6"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-6 font-poppins max-w-lg mx-auto">
            The page you&apos;re looking for seems to have been recycled or moved to a different location. 
            Don&apos;t worry, we&apos;ll help you find what you need!
          </p>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">
              What would you like to do?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/">
                <Button variant="outline" className="w-full h-12 font-poppins">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Button>
              </Link>
              <Link href="/auth">
                <Button variant="outline" className="w-full h-12 font-poppins">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full h-12 font-poppins">
                  <Search className="mr-2 h-4 w-4" />
                  View Dashboard
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="outline" className="w-full h-12 font-poppins">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Get Help
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Popular Links */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              <Link href="/sell" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-sm">💰</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 font-poppins">Sell Scrap Metal</div>
                  <div className="text-sm text-gray-600 font-poppins">Get instant quotes</div>
                </div>
              </Link>
              <Link href="/buy" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🛒</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 font-poppins">Buy Materials</div>
                  <div className="text-sm text-gray-600 font-poppins">Browse inventory</div>
                </div>
              </Link>
              <Link href="/pricing" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-sm">📊</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 font-poppins">Market Prices</div>
                  <div className="text-sm text-gray-600 font-poppins">Current rates</div>
                </div>
              </Link>
              <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-sm">👤</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 font-poppins">My Profile</div>
                  <div className="text-sm text-gray-600 font-poppins">Account settings</div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Main CTA */}
        <div className="space-y-4 mb-4">
          <Link href="/">
            <Button className="w-full md:w-auto px-8 h-12 bg-[#006636] hover:bg-[#005528] text-white font-medium font-poppins">
              <Home className="mr-2 h-5 w-5" />
              Return to Homepage
            </Button>
          </Link>
          
          <div className="text-sm text-gray-600 font-poppins mt-4">
            Still having trouble? {' '}
            <Link href="/contact" className="text-[#006636] hover:text-[#005528] font-medium">
              Contact our support team
            </Link>
          </div>
        </div>

        {/* Fun Fact */}
        <Card className="mt-8 border-0 shadow-sm bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 text-green-800">
              <Recycle className="h-4 w-4" />
              <span className="text-sm font-poppins">
                <strong>Did you know?</strong> Over 80% of materials can be recycled and reused!
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
