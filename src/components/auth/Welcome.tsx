'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Recycle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function Welcome() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Recycle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to ScrapLink</h3>
            <p className="text-gray-600">Choose how you want to get started</p>
          </div>
          
          <div className="space-y-4">
            <Link href="/auth/usertype">
              <Button className="w-full h-14 bg-[#006636] hover:bg-[#005528] text-white text-lg font-medium">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <div className="text-center">
              <Link 
                href="/auth/usertype"
                className="text-[#006636] hover:text-[#005528] font-medium"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-200 my-6"></div>
          
          <div className="text-center text-sm text-gray-500">
            Join thousands of users revolutionizing scrap metal trading
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
