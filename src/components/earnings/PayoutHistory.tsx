'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Download, CreditCard, CheckCircle, Clock, AlertCircle, User } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  type: 'seller' | 'buyer'
  avatar: string
  verified: boolean
  joinedDate: string
}

interface PayoutHistoryProps {
  user: User
}

interface Payout {
  id: string
  amount: number
  status: 'completed' | 'processing' | 'pending' | 'failed'
  method: 'bank_transfer' | 'paypal' | 'stripe'
  date: string
  transactionId?: string
  bankAccount?: string
}

export function PayoutHistory({ user }: PayoutHistoryProps) {
  // Mock payout data - in real app, this would be fetched based on user.id
  const payouts: Payout[] = [
    {
      id: 'payout_001',
      amount: 1250.00,
      status: 'completed',
      method: 'bank_transfer',
      date: '2024-01-15T10:00:00Z',
      transactionId: 'TXN_ABC123',
      bankAccount: '****1234'
    },
    {
      id: 'payout_002',
      amount: 890.50,
      status: 'processing',
      method: 'bank_transfer',
      date: '2024-01-20T15:30:00Z',
      bankAccount: '****1234'
    },
    {
      id: 'payout_003',
      amount: 2100.00,
      status: 'completed',
      method: 'paypal',
      date: '2024-01-08T09:15:00Z',
      transactionId: 'PP_XYZ789'
    },
    {
      id: 'payout_004',
      amount: 450.00,
      status: 'pending',
      method: 'bank_transfer',
      date: '2024-01-22T14:20:00Z',
      bankAccount: '****1234'
    },
    {
      id: 'payout_005',
      amount: 320.00,
      status: 'failed',
      method: 'bank_transfer',
      date: '2024-01-10T11:45:00Z',
      bankAccount: '****5678'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'processing': return <Clock className="h-4 w-4 text-blue-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer': return <CreditCard className="h-4 w-4 text-blue-600" />
      case 'paypal': return <div className="h-4 w-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
      case 'stripe': return <div className="h-4 w-4 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">S</div>
      default: return <CreditCard className="h-4 w-4 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatMethod = (method: string) => {
    switch (method) {
      case 'bank_transfer': return 'Bank Transfer'
      case 'paypal': return 'PayPal'
      case 'stripe': return 'Stripe'
      default: return method
    }
  }

  const totalPayouts = payouts.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = payouts.filter(p => p.status === 'processing' || p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      {/* Payout Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Total Paid Out</p>
                <p className="text-2xl font-bold text-gray-900 font-poppins">
                  ${totalPayouts.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 font-poppins">To {user.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Pending Payouts</p>
                <p className="text-2xl font-bold text-gray-900 font-poppins">
                  ${pendingAmount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 font-poppins">Processing soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Payment Methods</p>
                <p className="text-2xl font-bold text-gray-900 font-poppins">2</p>
                <p className="text-xs text-gray-500 font-poppins">Bank & PayPal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payout History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-poppins">Payout History for {user.name}</CardTitle>
            <Button variant="outline" size="sm" className="font-poppins">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getMethodIcon(payout.method)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 font-poppins">
                        {formatMethod(payout.method)}
                      </h4>
                      {payout.bankAccount && (
                        <span className="text-sm text-gray-500 font-poppins">
                          {payout.bankAccount}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-600 font-poppins">{formatDate(payout.date)}</p>
                      {payout.transactionId && (
                        <>
                          <span className="text-gray-400">•</span>
                          <p className="text-sm text-gray-600 font-poppins">{payout.transactionId}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 font-poppins">
                      ${payout.amount.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(payout.status)}
                      <Badge className={`text-xs ${getStatusColor(payout.status)}`}>
                        {payout.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="font-poppins">Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 font-poppins">Bank Account</h4>
                  <p className="text-sm text-gray-600 font-poppins">****1234 • Primary</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="h-5 w-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">P</div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 font-poppins">PayPal</h4>
                  <p className="text-sm text-gray-600 font-poppins">{user.email}</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
