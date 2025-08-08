'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, ShoppingCart, Heart, TrendingUp, Clock, MapPin, Star, Filter, ArrowRight, Truck, Shield, DollarSign } from 'lucide-react'
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

interface BuyerDashboardProps {
  user: User
}

export function BuyerDashboard({ user }: BuyerDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const stats = {
    totalPurchases: 12,
    totalSpent: 3240.50,
    savedItems: 8,
    activeOrders: 3
  }

  const recentOrders = [
    {
      id: '1',
      title: 'Copper Wire Bundle - 25lbs',
      seller: 'Metro Scrap Co.',
      price: 125.00,
      status: 'delivered',
      orderDate: '2024-01-18',
      image: '/placeholder.svg?height=60&width=60'
    },
    {
      id: '2',
      title: 'Aluminum Sheets - 50lbs',
      seller: 'Industrial Recycling',
      price: 180.00,
      status: 'in-transit',
      orderDate: '2024-01-20',
      image: '/placeholder.svg?height=60&width=60'
    },
    {
      id: '3',
      title: 'Steel Rods - Various',
      seller: 'City Metals',
      price: 220.00,
      status: 'processing',
      orderDate: '2024-01-21',
      image: '/placeholder.svg?height=60&width=60'
    }
  ]

  const featuredListings = [
    {
      id: '1',
      title: 'Premium Copper Pipes - 100lbs',
      seller: 'ProScrap Solutions',
      price: 450.00,
      originalPrice: 520.00,
      rating: 4.8,
      location: 'Chicago, IL',
      image: '/placeholder.svg?height=120&width=120',
      verified: true,
      pickup: true
    },
    {
      id: '2',
      title: 'Stainless Steel Mix - 75lbs',
      seller: 'Elite Recycling',
      price: 380.00,
      rating: 4.9,
      location: 'Detroit, MI',
      image: '/placeholder.svg?height=120&width=120',
      verified: true,
      pickup: false
    },
    {
      id: '3',
      title: 'Brass Fittings Collection',
      seller: 'Metro Metals',
      price: 290.00,
      rating: 4.7,
      location: 'Milwaukee, WI',
      image: '/placeholder.svg?height=120&width=120',
      verified: false,
      pickup: true
    }
  ]

  const categories = [
    { name: 'Copper', count: 45, icon: '🔶' },
    { name: 'Aluminum', count: 32, icon: '⚪' },
    { name: 'Steel', count: 28, icon: '⚫' },
    { name: 'Brass', count: 19, icon: '🟡' },
    { name: 'Stainless', count: 15, icon: '✨' },
    { name: 'Other', count: 12, icon: '🔧' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'in-transit': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#006636] to-[#008844] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 font-poppins">
              Welcome back, {user.name}! Find Quality Scrap Metal 🔍
            </h2>
            <p className="text-green-100 font-poppins">
              Discover {featuredListings.length} new listings from verified sellers in your area
            </p>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search scrap metal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-white text-gray-900 font-poppins"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Total Purchases</p>
                <p className="text-2xl font-bold text-gray-900 font-poppins">{stats.totalPurchases}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 font-poppins">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900 font-poppins">
                  ${stats.totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 font-poppins">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Saved Items</p>
                <p className="text-2xl font-bold text-gray-900 font-poppins">{stats.savedItems}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 font-poppins">Watchlist</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Growth Rate</p>
                <p className="text-2xl font-bold text-gray-900 font-poppins">+24%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 font-poppins">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="font-poppins">Browse Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium text-gray-900 font-poppins">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs font-poppins">
                      {category.count}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-poppins">Recent Orders</CardTitle>
              <Button variant="outline" size="sm" className="font-poppins">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Image
                    src={order.image || "/placeholder.svg"}
                    alt={order.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate font-poppins">
                      {order.title}
                    </h4>
                    <p className="text-sm text-gray-600 font-poppins">{order.seller}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-[#006636] font-poppins">
                        ${order.price}
                      </span>
                      <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-gray-500 mb-1">
                      <Clock className="h-3 w-3" />
                      <p className="text-sm font-poppins">{order.orderDate}</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 font-poppins">
                      Track Order
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Listings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-poppins">Featured Listings</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="font-poppins">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="font-poppins">
                View All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <div key={listing.id} className="border rounded-xl p-4 hover:shadow-lg transition-shadow">
                <div className="relative mb-4">
                  <Image
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    width={300}
                    height={128}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 font-poppins">{listing.title}</h3>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-poppins">{listing.seller}</span>
                    {listing.verified && (
                      <Shield className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium font-poppins">{listing.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs font-poppins">{listing.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-[#006636] font-poppins">
                        ${listing.price}
                      </span>
                      {listing.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2 font-poppins">
                          ${listing.originalPrice}
                        </span>
                      )}
                    </div>
                    {listing.pickup && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Truck className="h-4 w-4" />
                        <span className="text-xs font-poppins">Free pickup</span>
                      </div>
                    )}
                  </div>
                  
                  <Button className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
