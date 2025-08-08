'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Recycle, RefreshCw, Home, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#006636] rounded-xl flex items-center justify-center">
            <Recycle className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">ScrapLink</h1>
        </div>

        {/* Error Illustration */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <div className="w-32 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">
            Oops! Something Went Wrong
          </h2>
          <p className="text-lg text-gray-600 mb-6 font-poppins max-w-lg mx-auto">
            We encountered an unexpected error while processing your request. 
            Don&apos;t worry, our team has been notified and is working on a fix.
          </p>
        </div>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <Card className="border-0 shadow-lg mb-8 bg-red-50">
            <CardContent className="p-6 text-left">
              <h3 className="text-lg font-semibold text-red-900 mb-2 font-poppins">
                Error Details (Development)
              </h3>
              <div className="text-sm text-red-800 space-y-2">
                <div><strong>Message:</strong> {error.message}</div>
                {error.digest && <div><strong>Digest:</strong> {error.digest}</div>}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">
              What you can do:
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#006636] rounded-full"></div>
                <span className="text-gray-700 font-poppins">Try refreshing the page</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#006636] rounded-full"></div>
                <span className="text-gray-700 font-poppins">Check your internet connection</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#006636] rounded-full"></div>
                <span className="text-gray-700 font-poppins">Go back to the homepage</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#006636] rounded-full"></div>
                <span className="text-gray-700 font-poppins">Contact our support team if the problem persists</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <div className="flex gap-4 justify-center">
            <Button
              onClick={reset}
              className="bg-[#006636] hover:bg-[#005528] text-white font-poppins"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="font-poppins">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </div>
          
          <div className="text-sm text-gray-600 font-poppins">
            Still having issues? {' '}
            <Link href="/contact" className="text-[#006636] hover:text-[#005528] font-medium">
              Contact our support team
            </Link>
          </div>
        </div>

        {/* Support Info */}
        <Card className="mt-8 border-0 shadow-sm bg-blue-50">
          <CardContent className="p-4">
            <div className="text-sm text-blue-800 font-poppins">
              <strong>Need immediate help?</strong> Our support team is available 24/7 at{' '}
              <a href="mailto:support@scraplink.com" className="font-medium underline">
                support@scraplink.com
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
