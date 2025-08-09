'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TrendingUp, TrendingDown, DollarSign, Eye, ShoppingCart, Target, Calendar, Download, Filter, BarChart3, Package, Star, MapPin, Clock } from 'lucide-react'
import { SalesChart } from './SalesChart'
import { RevenueChart } from './RevenueChart'
import { ListingPerformanceChart } from './ListingPerformanceChart'
import { GeographicChart } from './GeographicChart'

interface User {
  id: string
  name: string
  email: string
  type: 'seller' | 'buyer'
  avatar: string
  verified: boolean
  joinedDate: string
}

interface AnalyticsDashboardProps {
  user: User
}

interface AnalyticsData {
  totalRevenue: number
  revenueChange: number
  totalSales: number
  salesChange: number
  totalViews: number
  viewsChange: number
  conversionRate: number
  conversionChange: number
  averageOrderValue: number
  aovChange: number
  activeListings: number
  listingsChange: number
}

interface TopListing {
  id: string
  title: string
  image: string
  views: number
  sales: number
  revenue: number
  conversionRate: number
  category: string
}

interface CustomerInsight {
  id: string
  name: string
  avatar: string
  totalPurchases: number
  totalSpent: number
  lastPurchase: string
  location: string
  rating: number
}

export function AnalyticsDashboard({ user }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState('30d')
  const [activeTab, setActiveTab] = useState('overview')

  // Mock analytics data - in real app this would be fetched based on user.id
  const analyticsData: AnalyticsData = {
    totalRevenue: 12847.50,
    revenueChange: 15.3,
    totalSales: 89,
    salesChange: 8.7,
    totalViews: 2456,
    viewsChange: -2.1,
    conversionRate: 3.6,
    conversionChange: 0.8,
    averageOrderValue: 144.35,
    aovChange: 12.4,
    activeListings: 23,
    listingsChange: 4.5
  }

  const topListings: TopListing[] = [
    {
      id: '1',
      title: 'Premium Copper Wire Bundle - 50lbs',
      image: '/copper-placeholder.svg',
      views: 456,
      sales: 12,
      revenue: 2940.00,
      conversionRate: 2.6,
      category: 'Metals'
    },
    {
      id: '2',
      title: 'Steel Beams - Various Sizes',
      image: '/steel-placeholder.svg',
      views: 324,
      sales: 8,
      revenue: 3600.00,
      conversionRate: 2.5,
      category: 'Construction'
    },
    {
      id: '3',
      title: 'Aluminum Cans Collection',
      image: '/aluminum-placeholder.svg',
      views: 289,
      sales: 15,
      revenue: 1275.00,
      conversionRate: 5.2,
      category: 'Recyclables'
    },
    {
      id: '4',
      title: 'Electronic Components Lot',
      image: '/image-placeholder.svg',
      views: 198,
      sales: 6,
      revenue: 1890.00,
      conversionRate: 3.0,
      category: 'Electronics'
    }
  ]

  const topCustomers: CustomerInsight[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: '/avatar-placeholder.svg',
      totalPurchases: 8,
      totalSpent: 2340.00,
      lastPurchase: '2024-01-20',
      location: 'Chicago, IL',
      rating: 4.9
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      avatar: '/avatar-placeholder.svg',
      totalPurchases: 5,
      totalSpent: 1890.00,
      lastPurchase: '2024-01-18',
      location: 'Detroit, MI',
      rating: 4.8
    },
    {
      id: '3',
      name: 'Emily Chen',
      avatar: '/avatar-placeholder.svg',
      totalPurchases: 12,
      totalSpent: 3450.00,
      lastPurchase: '2024-01-22',
      location: 'Milwaukee, WI',
      rating: 5.0
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600'
  }

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  // Calculate days since joining for personalized insights
  const daysSinceJoining = Math.floor((new Date().getTime() - new Date(user.joinedDate).getTime()) / (1000 * 3600 * 24))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">Analytics Dashboard</h1>
          <p className="text-gray-600 font-poppins">
            Welcome back, {user.name}! Track your performance and grow your business
            {user.verified && (
              <span className="inline-flex items-center ml-2 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Verified Seller
              </span>
            )}
          </p>
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
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="font-poppins">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* User Stats Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={user.avatar || "/avatar-placeholder.svg"}
                alt={user.name}
                width={64}
                height={64}
                className="rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 font-poppins">{user.name}</h3>
                <p className="text-sm text-gray-600 font-poppins">{user.email}</p>
                <p className="text-sm text-gray-500 font-poppins">
                  Member since {new Date(user.joinedDate).toLocaleDateString()} • {daysSinceJoining} days
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 font-poppins">Account Type</p>
              <Badge variant={user.type === 'seller' ? 'default' : 'secondary'} className="capitalize">
                {user.type}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="font-poppins">Overview</TabsTrigger>
          <TabsTrigger value="sales" className="font-poppins">Sales</TabsTrigger>
          <TabsTrigger value="listings" className="font-poppins">Listings</TabsTrigger>
          <TabsTrigger value="customers" className="font-poppins">Customers</TabsTrigger>
          <TabsTrigger value="insights" className="font-poppins">Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">
                      {formatCurrency(analyticsData.totalRevenue)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {getChangeIcon(analyticsData.revenueChange)}
                  <span className={`text-sm font-poppins ${getChangeColor(analyticsData.revenueChange)}`}>
                    {formatPercentage(analyticsData.revenueChange)} from last period
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Total Sales</p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">{analyticsData.totalSales}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {getChangeIcon(analyticsData.salesChange)}
                  <span className={`text-sm font-poppins ${getChangeColor(analyticsData.salesChange)}`}>
                    {formatPercentage(analyticsData.salesChange)} from last period
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Total Views</p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">{analyticsData.totalViews.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {getChangeIcon(analyticsData.viewsChange)}
                  <span className={`text-sm font-poppins ${getChangeColor(analyticsData.viewsChange)}`}>
                    {formatPercentage(analyticsData.viewsChange)} from last period
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">{analyticsData.conversionRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {getChangeIcon(analyticsData.conversionChange)}
                  <span className={`text-sm font-poppins ${getChangeColor(analyticsData.conversionChange)}`}>
                    {formatPercentage(analyticsData.conversionChange)} from last period
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Avg Order Value</p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">
                      {formatCurrency(analyticsData.averageOrderValue)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {getChangeIcon(analyticsData.aovChange)}
                  <span className={`text-sm font-poppins ${getChangeColor(analyticsData.aovChange)}`}>
                    {formatPercentage(analyticsData.aovChange)} from last period
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 font-poppins">Active Listings</p>
                    <p className="text-2xl font-bold text-gray-900 font-poppins">{analyticsData.activeListings}</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {getChangeIcon(analyticsData.listingsChange)}
                  <span className={`text-sm font-poppins ${getChangeColor(analyticsData.listingsChange)}`}>
                    {formatPercentage(analyticsData.listingsChange)} from last period
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueChart timeRange={timeRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ListingPerformanceChart />
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Listings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-poppins">Top Performing Listings</CardTitle>
                <Button variant="outline" size="sm" className="font-poppins">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Image
                        src={listing.image || "/placeholder.svg?height=60&width=60"}
                        alt={listing.title}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 font-poppins">{listing.title}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {listing.category}
                          </Badge>
                          <span className="text-sm text-gray-600 font-poppins">
                            {listing.views} views
                          </span>
                          <span className="text-sm text-gray-600 font-poppins">
                            {listing.sales} sales
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 font-poppins">
                        {formatCurrency(listing.revenue)}
                      </p>
                      <p className="text-sm text-gray-600 font-poppins">
                        {listing.conversionRate}% conversion
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-poppins">Sales Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <SalesChart timeRange={timeRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Sales by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <GeographicChart />
              </CardContent>
            </Card>
          </div>

          {/* Sales Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 font-poppins mb-2">This Month</h3>
                  <p className="text-3xl font-bold text-green-600 font-poppins">
                    {formatCurrency(4250.00)}
                  </p>
                  <p className="text-sm text-gray-600 font-poppins mt-1">
                    +18.5% from last month
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 font-poppins mb-2">This Week</h3>
                  <p className="text-3xl font-bold text-blue-600 font-poppins">
                    {formatCurrency(1180.00)}
                  </p>
                  <p className="text-sm text-gray-600 font-poppins mt-1">
                    +12.3% from last week
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 font-poppins mb-2">Today</h3>
                  <p className="text-3xl font-bold text-purple-600 font-poppins">
                    {formatCurrency(245.00)}
                  </p>
                  <p className="text-sm text-gray-600 font-poppins mt-1">
                    2 transactions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Listings Tab */}
        <TabsContent value="listings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Listing Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Image
                        src={listing.image || "/placeholder.svg?height=64&width=64"}
                        alt={listing.title}
                        width={64}
                        height={64}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 font-poppins">{listing.title}</h4>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {listing.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-8 text-center">
                      <div>
                        <p className="text-sm text-gray-600 font-poppins">Views</p>
                        <p className="font-semibold text-gray-900 font-poppins">{listing.views}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-poppins">Sales</p>
                        <p className="font-semibold text-gray-900 font-poppins">{listing.sales}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-poppins">Revenue</p>
                        <p className="font-semibold text-gray-900 font-poppins">
                          {formatCurrency(listing.revenue)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-poppins">Conversion</p>
                        <p className="font-semibold text-gray-900 font-poppins">{listing.conversionRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Top Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Image
                        src={customer.avatar || "/placeholder.svg?height=48&width=48"}
                        alt={customer.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 font-poppins">{customer.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-600 font-poppins">{customer.location}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 font-poppins">{customer.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-8 text-center">
                      <div>
                        <p className="text-sm text-gray-600 font-poppins">Purchases</p>
                        <p className="font-semibold text-gray-900 font-poppins">{customer.totalPurchases}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-poppins">Total Spent</p>
                        <p className="font-semibold text-gray-900 font-poppins">
                          {formatCurrency(customer.totalSpent)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-poppins">Last Purchase</p>
                        <p className="font-semibold text-gray-900 font-poppins">
                          {new Date(customer.lastPurchase).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-900 font-poppins">Strong Performance</span>
                  </div>
                  <p className="text-sm text-green-800 font-poppins">
                    {user.name}, your conversion rate is 45% higher than the platform average
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900 font-poppins">Visibility Opportunity</span>
                  </div>
                  <p className="text-sm text-blue-800 font-poppins">
                    Adding more photos could increase views by up to 30%
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-900 font-poppins">Response Time</span>
                  </div>
                  <p className="text-sm text-yellow-800 font-poppins">
                    Faster message responses could improve customer satisfaction
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Personalized Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 font-poppins mb-2">Optimize Pricing</h4>
                  <p className="text-sm text-gray-600 font-poppins mb-3">
                    Based on your {daysSinceJoining} days of selling, consider adjusting prices for better competitiveness
                  </p>
                  <Button size="sm" variant="outline" className="font-poppins">
                    View Suggestions
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 font-poppins mb-2">Expand Categories</h4>
                  <p className="text-sm text-gray-600 font-poppins mb-3">
                    Electronics category shows high demand in your area
                  </p>
                  <Button size="sm" variant="outline" className="font-poppins">
                    Explore Category
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 font-poppins mb-2">Seasonal Trends</h4>
                  <p className="text-sm text-gray-600 font-poppins mb-3">
                    Construction materials peak in spring - prepare inventory
                  </p>
                  <Button size="sm" variant="outline" className="font-poppins">
                    View Trends
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
