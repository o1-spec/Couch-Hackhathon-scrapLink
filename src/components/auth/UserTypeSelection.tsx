'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Building2, Coins } from 'lucide-react'
import Link from 'next/link'

export function UserTypeSelection() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="w-full max-w-[600px] border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">I want to...</h3>
            <p className="text-gray-600">Select your account type to continue</p>
          </div>
          
          <div className="space-y-4">
            <Link href="/auth/signup/seller" className="mb-4 block">
              <Card className="border-2 border-gray-200 hover:border-[#006636] transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#006636]/10 group-hover:bg-[#006636] rounded-xl flex items-center justify-center transition-colors">
                      <Coins className="h-6 w-6 text-[#006636] group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Sell Scrap Metal</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Turn your aluminum, copper, iron, and other metals into cash
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#006636]">
                        <span>• Quick AI estimation</span>
                        <span>• Secure payments</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/auth/signup/buyer">
              <Card className="border-2 border-gray-200 hover:border-[#006636] transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#006636]/10 group-hover:bg-[#006636] rounded-xl flex items-center justify-center transition-colors">
                      <Building2 className="h-6 w-6 text-[#006636] group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Buy Scrap Metal</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Source quality materials for your business or recycling operations
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#006636]">
                        <span>• Verified suppliers</span>
                        <span>• Bulk purchasing</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="text-center mt-6">
            <Link 
              href="/auth"
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              ← Back to welcome
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
