'use client'

import { Component, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Recycle, RefreshCw, Home, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
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
                Something Went Wrong
              </h2>
              <p className="text-lg text-gray-600 mb-6 font-poppins max-w-lg mx-auto">
                We encountered an unexpected error. Our team has been notified and is working on a fix.
              </p>
            </div>

            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Card className="border-0 shadow-lg mb-8 bg-red-50">
                <CardContent className="p-6 text-left">
                  <h3 className="text-lg font-semibold text-red-900 mb-2 font-poppins">
                    Error Details (Development)
                  </h3>
                  <pre className="text-sm text-red-800 overflow-auto bg-red-100 p-3 rounded">
                    {this.state.error.message}
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => window.location.reload()}
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
                Need help? {' '}
                <Link href="/contact" className="text-[#006636] hover:text-[#005528] font-medium">
                  Contact support
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
