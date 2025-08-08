'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Package, TrendingUp, Eye, Plus, ArrowUpRight, ArrowDownRight, CheckCircle, AlertCircle, Camera, MapPin, Calendar } from 'lucide-react'
import Image from 'next/image'

interface User {
  id: string
  name: string
  email: string
  type: 'seller' | 'buyer'
  avatar: string
  verified: boolean
  joinedDate: string
}

interface SellerDashboardProps {
  user: User
}

export function SellerDashboard({ user }: SellerDashboardProps) {
  const [timeRange, setTimeRange] = useState('7d')

  // Mock data - in real app this would come from API based on timeRange
  const getComparisonText = (range: string) => {
    switch (range) {
      case '24h': return 'vs yesterday'
      case '7d': return 'vs last week'
      case '30d': return 'vs last month'
      case '90d': return 'vs last quarter'
      default: return 'vs last period'
    }
  }

  const getStatsForTimeRange = (range: string) => {
    const baseStats = {
      '24h': {
        totalEarnings: 145.50,
        earningsChange: 8.2,
        activeListings: 8,
        listingsChange: 0,
        totalViews: 89,
        viewsChange: 15.3,
        completedSales: 2,
        salesChange: 25.0
      },
      '7d': {
        totalEarnings: 2847.50,
        earningsChange: 12.5,
        activeListings: 8,
        listingsChange: -2,
        totalViews: 1247,
        viewsChange: 23.1,
        completedSales: 15,
        salesChange: 8.3
      },
      '30d': {
        totalEarnings: 8940.75,
        earningsChange: 18.7,
        activeListings: 8,
        listingsChange: 3,
        totalViews: 4521,
        viewsChange: 31.2,
        completedSales: 42,
        salesChange: 15.8
      },
      '90d': {
        totalEarnings: 24680.25,
        earningsChange: 22.4,
        activeListings: 8,
        listingsChange: 1,
        totalViews: 12845,
        viewsChange: 28.9,
        completedSales: 118,
        salesChange: 19.2
      }
    }
    return baseStats[range as keyof typeof baseStats] || baseStats['7d']
  }

  const stats = getStatsForTimeRange(timeRange)

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case '24h': return 'Last 24 Hours'
      case '7d': return 'Last 7 Days'
      case '30d': return 'Last 30 Days'
      case '90d': return 'Last 90 Days'
      default: return 'Last 7 Days'
    }
  }

  const recentListings = [
    {
      id: '1',
      title: 'Copper Wire Bundle - 50lbs',
      price: 245.00,
      status: 'active',
      views: 23,
      inquiries: 3,
      image: '/placeholder.svg?height=60&width=60',
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Aluminum Cans - 100lbs',
      price: 85.00,
      status: 'sold',
      views: 45,
      inquiries: 8,
      image: '/placeholder.svg?height=60&width=60',
      createdAt: '2024-01-18'
    },
    {
      id: '3',
      title: 'Steel Beams - Various Sizes',
      price: 450.00,
      status: 'pending',
      views: 12,
      inquiries: 2,
      image: '/placeholder.svg?height=60&width=60',
      createdAt: '2024-01-19'
    }
  ]

  const recentActivity = [
    {
      id: '1',
      type: 'sale',
      message: 'Copper pipes sold to Metro Recycling',
      amount: 180.00,
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'inquiry',
      message: 'New inquiry on Aluminum sheets listing',
      time: '4 hours ago'
    },
    {
      id: '3',
      type: 'listing',
      message: 'New listing created: Brass fittings',
      time: '1 day ago'
    },
    {
      id: '4',
      type: 'payment',
      message: 'Payment received for Steel rods',
      amount: 320.00,
      time: '2 days ago'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'sold': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sale': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'inquiry': return <Eye className="h-4 w-4 text-blue-600" />
      case 'listing': return <Package className="h-4 w-4 text-purple-600" />
      case 'payment': return <DollarSign className="h-4 w-4 text-green-600" />
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#006636] to-[#008844] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 font-poppins">
              Welcome back, {user.name.split(' ')[0]}! 👋
            </h2>
            <p className="text-green-100 font-poppins">
              You have {stats.activeListings} active listings and {recentActivity.filter(a => a.type === 'inquiry').length} new inquiries
            </p>
          </div>
          <Button className="bg-white text-[#006636] hover:bg-gray-100 font-poppins">
            <Plus className="h-4 w-4 mr-2" />
            New Listing
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 font-poppins">Performance Overview</h3>
        <div className="flex gap-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={`font-poppins ${
                timeRange === range 
                  ? 'bg-[#006636] hover:bg-[#005528] text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {getTimeRangeLabel(range)}
            </Button>
          ))}
        </div>
      </div>
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
            <div className="flex items-center mt-4">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium font-poppins">
                +{stats.earningsChange}%
              </span>
              <span className="text-sm text-gray-500 ml-2 font-poppins">{getComparisonText(timeRange)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900 font-poppins">{stats.activeListings}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowDownRight className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-600 font-medium font-poppins">
                {stats.listingsChange}
              </span>
              <span className="text-sm text-gray-500 ml-2 font-poppins">{getComparisonText(timeRange)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Total Views</p>
                <p className="text-2xl font-bold text-gray-900 font-poppins">
                  {stats.totalViews.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium font-poppins">
                +{stats.viewsChange}%
              </span>
              <span className="text-sm text-gray-500 ml-2 font-poppins">{getComparisonText(timeRange)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Completed Sales</p>
                <p className="text-2xl font-bold text-gray-900 font-poppins">{stats.completedSales}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium font-poppins">
                +{stats.salesChange}%
              </span>
              <span className="text-sm text-gray-500 ml-2 font-poppins">{getComparisonText(timeRange)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Listings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-poppins">Recent Listings</CardTitle>
              <Button variant="outline" size="sm" className="font-poppins">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentListings.map((listing) => (
                <div key={listing.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Image
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-12 h-12 rounded-lg object-cover"
                    width={60}
                    height={60}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate font-poppins">
                      {listing.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-[#006636] font-poppins">
                        ${listing.price}
                      </span>
                      <Badge className={`text-xs ${getStatusColor(listing.status)}`}>
                        {listing.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-500 font-poppins">
                      <Eye className="h-3 w-3" />
                      {listing.views}
                    </div>
                    <div className="text-xs text-gray-400 font-poppins">
                      {listing.inquiries} inquiries
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="font-poppins">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-poppins">{activity.message}</p>
                    {activity.amount && (
                      <p className="text-sm font-medium text-[#006636] font-poppins">
                        +${activity.amount}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 font-poppins">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-poppins">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col gap-2 bg-[#006636] hover:bg-[#005528] text-white font-poppins">
              <Camera className="h-6 w-6" />
              Create New Listing
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 font-poppins">
              <MapPin className="h-6 w-6" />
              Schedule Pickup
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 font-poppins">
              <Calendar className="h-6 w-6" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
