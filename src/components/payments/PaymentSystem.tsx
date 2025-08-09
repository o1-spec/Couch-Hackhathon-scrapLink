'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreditCard, DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle, Download, Eye, Plus, Wallet, BanknoteIcon as Bank, Shield } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  type: 'seller' | 'buyer'
  avatar: string
  verified: boolean
  joinedDate: string
}

interface PaymentSystemProps {
  user: User
}

interface Transaction {
  id: string
  type: 'payment' | 'payout' | 'refund'
  amount: number
  status: 'completed' | 'pending' | 'failed' | 'processing'
  description: string
  date: string
  listingId?: string
  listingTitle?: string
  buyerName?: string
  sellerName?: string
  paymentMethod?: string
  stripeTransactionId?: string
}

interface PaymentMethod {
  id: string
  type: 'card' | 'bank_account'
  last4: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  bankName?: string
  accountType?: string
  isDefault: boolean
}

export function PaymentSystem({ user }: PaymentSystemProps) {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - in real app this would come from API
  const stats = {
    totalEarnings: 2847.50,
    pendingPayouts: 450.00,
    completedTransactions: 23,
    averageTransactionValue: 123.80
  }

  const transactions: Transaction[] = [
    {
      id: 'txn_1',
      type: 'payment',
      amount: 245.00,
      status: 'completed',
      description: 'Payment for Copper Wire Bundle',
      date: '2024-01-21T10:30:00Z',
      listingId: '1',
      listingTitle: 'Premium Copper Wire Bundle - 50lbs',
      buyerName: 'Sarah Johnson',
      paymentMethod: 'Visa •••• 4242',
      stripeTransactionId: 'pi_1234567890'
    },
    {
      id: 'txn_2',
      type: 'payout',
      amount: 180.00,
      status: 'processing',
      description: 'Payout to bank account',
      date: '2024-01-20T15:45:00Z',
      paymentMethod: 'Bank •••• 1234'
    },
    {
      id: 'txn_3',
      type: 'payment',
      amount: 450.00,
      status: 'completed',
      description: 'Payment for Steel Beams',
      date: '2024-01-19T09:15:00Z',
      listingId: '2',
      listingTitle: 'Steel Beams - Various Sizes',
      buyerName: 'Mike Rodriguez',
      paymentMethod: 'Mastercard •••• 8888',
      stripeTransactionId: 'pi_0987654321'
    },
    {
      id: 'txn_4',
      type: 'refund',
      amount: 85.00,
      status: 'completed',
      description: 'Refund for Aluminum Cans',
      date: '2024-01-18T14:20:00Z',
      listingId: '3',
      listingTitle: 'Aluminum Cans Collection',
      buyerName: 'Emily Chen',
      stripeTransactionId: 're_1122334455'
    }
  ]

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'pm_1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 'pm_2',
      type: 'bank_account',
      last4: '1234',
      bankName: 'Chase Bank',
      accountType: 'Checking',
      isDefault: false
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

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'payout': return <Download className="h-4 w-4 text-blue-600" />
      case 'refund': return <AlertCircle className="h-4 w-4 text-orange-600" />
      default: return <DollarSign className="h-4 w-4 text-gray-600" />
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">Payments</h1>
          <p className="text-gray-600 font-poppins">Manage your payments, payouts, and financial settings</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-poppins">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-[#006636] hover:bg-[#005528] text-white font-poppins">
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="font-poppins">Overview</TabsTrigger>
          <TabsTrigger value="transactions" className="font-poppins">Transactions</TabsTrigger>
          <TabsTrigger value="methods" className="font-poppins">Payment Methods</TabsTrigger>
          <TabsTrigger value="settings" className="font-poppins">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">
                      ${stats.totalEarnings.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <p className="text-sm text-green-600 font-poppins mt-2">+12.5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Pending Payouts</p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">
                      ${stats.pendingPayouts.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-poppins mt-2">Processing in 1-2 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Transactions</p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">{stats.completedTransactions}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm text-blue-600 font-poppins mt-2">+8 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Avg Transaction</p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">
                      ${stats.averageTransactionValue.toFixed(2)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-sm text-purple-600 font-poppins mt-2">+5.2% increase</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-poppins">Recent Transactions</CardTitle>
                <Button variant="outline" size="sm" className="font-poppins">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 font-poppins">{transaction.description}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-600 font-poppins">{formatDate(transaction.date)}</p>
                          {transaction.paymentMethod && (
                            <>
                              <span className="text-gray-400">•</span>
                              <p className="text-sm text-gray-600 font-poppins">{transaction.paymentMethod}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 font-poppins">
                          {transaction.type === 'refund' ? '-' : '+'}${transaction.amount.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(transaction.status)}
                          <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 font-poppins">{transaction.description}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-600 font-poppins">{formatDate(transaction.date)}</p>
                          {transaction.stripeTransactionId && (
                            <>
                              <span className="text-gray-400">•</span>
                              <p className="text-sm text-gray-500 font-poppins font-mono">{transaction.stripeTransactionId}</p>
                            </>
                          )}
                        </div>
                        {transaction.listingTitle && (
                          <p className="text-sm text-blue-600 font-poppins mt-1">{transaction.listingTitle}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 font-poppins">
                          {transaction.type === 'refund' ? '-' : '+'}${transaction.amount.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(transaction.status)}
                          <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={`${method.isDefault ? 'ring-2 ring-[#006636]' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {method.type === 'card' ? (
                          <CreditCard className="h-6 w-6 text-gray-600" />
                        ) : (
                          <Bank className="h-6 w-6 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 font-poppins">
                          {method.type === 'card' ? `${method.brand} Card` : 'Bank Account'}
                        </h3>
                        <p className="text-sm text-gray-600 font-poppins">
                          {method.type === 'card' 
                            ? `•••• •••• •••• ${method.last4}`
                            : `${method.bankName} •••• ${method.last4}`
                          }
                        </p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <Badge className="bg-[#006636] text-white text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  
                  {method.type === 'card' && (
                    <p className="text-sm text-gray-500 font-poppins mb-4">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                  )}
                  
                  {method.type === 'bank_account' && (
                    <p className="text-sm text-gray-500 font-poppins mb-4">
                      {method.accountType} Account
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="font-poppins">
                      Edit
                    </Button>
                    {!method.isDefault && (
                      <Button variant="outline" size="sm" className="font-poppins">
                        Set Default
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 font-poppins">
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add New Payment Method Card */}
            <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900 font-poppins mb-2">Add Payment Method</h3>
                <p className="text-sm text-gray-600 font-poppins mb-4">
                  Add a new card or bank account for payments
                </p>
                <Button className="bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                  Add Method
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payout Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Payout Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins">Automatic Payouts</h4>
                    <p className="text-sm text-gray-600 font-poppins">Receive payouts automatically when available</p>
                  </div>
                  <Button variant="outline" size="sm" className="font-poppins">
                    Enabled
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins">Payout Schedule</h4>
                    <p className="text-sm text-gray-600 font-poppins">Weekly on Fridays</p>
                  </div>
                  <Button variant="outline" size="sm" className="font-poppins">
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins">Minimum Payout</h4>
                    <p className="text-sm text-gray-600 font-poppins">$25.00</p>
                  </div>
                  <Button variant="outline" size="sm" className="font-poppins">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Security & Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-900 font-poppins">PCI Compliant</h4>
                    <p className="text-sm text-green-700 font-poppins">Your payments are secure and encrypted</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600 font-poppins">Extra security for payment actions</p>
                  </div>
                  <Button variant="outline" size="sm" className="font-poppins">
                    {user.verified ? 'Enabled' : 'Enable'}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins">Payment Notifications</h4>
                    <p className="text-sm text-gray-600 font-poppins">Email alerts for transactions</p>
                  </div>
                  <Button variant="outline" size="sm" className="font-poppins">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tax Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Tax Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins mb-2">Tax ID (EIN/SSN)</h4>
                    <p className="text-sm text-gray-600 font-poppins">•••-••-1234</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins mb-2">Business Type</h4>
                    <p className="text-sm text-gray-600 font-poppins">Individual</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins mb-2">1099 Forms</h4>
                    <Button variant="outline" size="sm" className="font-poppins">
                      <Download className="h-4 w-4 mr-2" />
                      Download 2023
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins mb-2">Tax Settings</h4>
                    <Button variant="outline" size="sm" className="font-poppins">
                      Update Information
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
