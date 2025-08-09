'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DollarSign, TrendingUp, TrendingDown, Download, Eye, CreditCard, Wallet, Target, BarChart3, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, User } from 'lucide-react'
import { EarningsChart } from './EarningsChart'
import { PayoutHistory } from './PayoutHistory'

interface User {
  id: string
  name: string
  email: string
  type: 'seller' | 'buyer'
  avatar: string
  verified: boolean
  joinedDate: string
}

interface EarningsDashboardProps {
  user: User
}

interface EarningsData {
  totalEarnings: number
  thisMonth: number
  lastMonth: number
  pendingPayouts: number
  availableBalance: number
  totalWithdrawn: number
  averageOrderValue: number
  totalOrders: number
}

interface Transaction {
  id: string
  type: 'sale' | 'payout' | 'fee' | 'refund'
  amount: number
  status: 'completed' | 'pending' | 'processing'
  description: string
  date: string
  orderId?: string
  buyerName?: string
  itemName?: string
}

export function EarningsDashboard({ user }: EarningsDashboardProps) {
  const [timeRange, setTimeRange] = useState('30d')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock earnings data - in real app, this would be fetched based on user.id
  const earningsData: EarningsData = {
    totalEarnings: 12847.50,
    thisMonth: 2340.00,
    lastMonth: 1980.00,
    pendingPayouts: 450.00,
    availableBalance: 1890.50,
    totalWithdrawn: 10507.00,
    averageOrderValue: 156.80,
    totalOrders: 82
  }

  // Mock transaction data - in real app, this would be fetched based on user.id
  const transactions: Transaction[] = [
    {
      id: 'txn_001',
      type: 'sale',
      amount: 245.00,
      status: 'completed',
      description: 'Sale of Copper Wire Bundle',
      date: '2024-01-21T10:30:00Z',
      orderId: 'ORD-001',
      buyerName: 'Sarah Johnson',
      itemName: 'Premium Copper Wire Bundle - 50lbs'
    },
    {
      id: 'txn_002',
      type: 'payout',
      amount: -180.00,
      status: 'processing',
      description: 'Weekly payout to bank account',
      date: '2024-01-20T15:45:00Z'
    },
    {
      id: 'txn_003',
      type: 'sale',
      amount: 450.00,
      status: 'completed',
      description: 'Sale of Steel Beams',
      date: '2024-01-19T09:15:00Z',
      orderId: 'ORD-002',
      buyerName: 'Mike Rodriguez',
      itemName: 'Steel Beams - Various Sizes'
    },
    {
      id: 'txn_004',
      type: 'fee',
      amount: -12.25,
      status: 'completed',
      description: 'Platform fee (5%)',
      date: '2024-01-19T09:16:00Z',
      orderId: 'ORD-002'
    },
    {
      id: 'txn_005',
      type: 'refund',
      amount: -85.00,
      status: 'completed',
      description: 'Refund for Aluminum Cans',
      date: '2024-01-18T14:20:00Z',
      orderId: 'ORD-003',
      buyerName: 'Emily Chen',
      itemName: 'Aluminum Cans Collection'
    }
  ]

  const monthlyGrowth = ((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth * 100).toFixed(1)
  const isGrowthPositive = parseFloat(monthlyGrowth) > 0

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'sale': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'payout': return <Download className="h-4 w-4 text-blue-600" />
      case 'fee': return <CreditCard className="h-4 w-4 text-orange-600" />
      case 'refund': return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <DollarSign className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'processing': return <Clock className="h-4 w-4 text-blue-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
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

  const memberSince = new Date(user.joinedDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="space-y-6">
      {/* Header with User Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-900 font-poppins">{user.name}&apos;s Earnings</h1>
              {user.verified && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-gray-600 font-poppins">
              Seller since {memberSince} • Track your sales performance and manage payouts
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="font-poppins">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="font-poppins">Overview</TabsTrigger>
          <TabsTrigger value="transactions" className="font-poppins">Transactions</TabsTrigger>
          <TabsTrigger value="payouts" className="font-poppins">Payouts</TabsTrigger>
          <TabsTrigger value="analytics" className="font-poppins">Analytics</TabsTrigger>
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
                      ${earningsData.totalEarnings.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  {isGrowthPositive ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <p className={`text-sm font-poppins ${isGrowthPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {monthlyGrowth}% from last month
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Available Balance</p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">
                      ${earningsData.availableBalance.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-poppins mt-2">Ready for payout</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Pending Payouts</p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">
                      ${earningsData.pendingPayouts.toLocaleString()}
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
                    <p className="text-sm font-medium text-gray-600 font-poppins">Avg Order Value</p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">
                      ${earningsData.averageOrderValue.toFixed(2)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-sm text-purple-600 font-poppins mt-2">From {earningsData.totalOrders} orders</p>
              </CardContent>
            </Card>
          </div>

          {/* Earnings Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <EarningsChart timeRange={timeRange} user={user} />
            </CardContent>
          </Card>

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
                          {transaction.orderId && (
                            <>
                              <span className="text-gray-400">•</span>
                              <p className="text-sm text-gray-600 font-poppins">{transaction.orderId}</p>
                            </>
                          )}
                        </div>
                        {transaction.itemName && (
                          <p className="text-sm text-blue-600 font-poppins mt-1">{transaction.itemName}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className={`font-semibold font-poppins ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
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
              <CardTitle className="font-poppins">All Transactions for {user.name}</CardTitle>
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
                          {transaction.orderId && (
                            <>
                              <span className="text-gray-400">•</span>
                              <p className="text-sm text-gray-600 font-poppins">{transaction.orderId}</p>
                            </>
                          )}
                        </div>
                        {transaction.buyerName && (
                          <p className="text-sm text-gray-500 font-poppins mt-1">Buyer: {transaction.buyerName}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className={`font-semibold font-poppins ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
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

        {/* Payouts Tab */}
        <TabsContent value="payouts" className="space-y-6">
          <PayoutHistory user={user} />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Performance Insights for {user.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-green-900 font-poppins">Strong Performance</h4>
                  </div>
                  <p className="text-sm text-green-700 font-poppins">
                    Your earnings are up {monthlyGrowth}% compared to last month. Keep up the great work!
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-blue-900 font-poppins">Top Category</h4>
                  </div>
                  <p className="text-sm text-blue-700 font-poppins">
                    Copper materials generate 45% of your total revenue. Consider expanding this category.
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium text-yellow-900 font-poppins">Optimization Tip</h4>
                  </div>
                  <p className="text-sm text-yellow-700 font-poppins">
                    Your average order value is ${earningsData.averageOrderValue.toFixed(2)}. Try bundling items to increase this.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Goals & Targets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 font-poppins">Monthly Target</span>
                    <span className="text-sm text-gray-600 font-poppins">$2,500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#006636] h-2 rounded-full" 
                      style={{ width: `${(earningsData.thisMonth / 2500) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 font-poppins mt-1">
                    ${earningsData.thisMonth.toFixed(2)} of $2,500 ({((earningsData.thisMonth / 2500) * 100).toFixed(1)}%)
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 font-poppins">Orders This Month</span>
                    <span className="text-sm text-gray-600 font-poppins">20</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(15 / 20) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 font-poppins mt-1">
                    15 of 20 orders (75%)
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 font-poppins">Customer Satisfaction</span>
                    <span className="text-sm text-gray-600 font-poppins">4.8/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(4.8 / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 font-poppins mt-1">
                    Excellent rating from 28 reviews
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
