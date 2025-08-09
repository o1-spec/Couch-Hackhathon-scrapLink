'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Search, Filter, Eye, Edit, Trash2, MoreHorizontal, TrendingUp, DollarSign, Package, Star, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  type: 'seller' | 'buyer'
  avatar: string
  verified: boolean
  joinedDate: string
}

interface ListingManagementProps {
  user: User
}

interface Listing {
  id: string
  title: string
  description: string
  price: number
  weight: number
  material: string
  condition: string
  status: 'active' | 'sold' | 'pending' | 'draft'
  views: number
  inquiries: number
  createdAt: string
  updatedAt: string
  images: string[]
  location: string
  pickupAvailable: boolean
}

export function ListingManagement({ user }: ListingManagementProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // Mock listings data
  const listings: Listing[] = [
    {
      id: '1',
      title: 'Premium Copper Wire Bundle - 50lbs',
      description: 'High-quality copper wire from electrical renovation project. Clean, stripped, and ready for recycling.',
      price: 245.00,
      weight: 50,
      material: 'Copper',
      condition: 'Excellent',
      status: 'active',
      views: 127,
      inquiries: 8,
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
      images: ['/image-placeholder.svg'],
      location: 'Chicago, IL',
      pickupAvailable: true
    },
    {
      id: '2',
      title: 'Aluminum Cans Collection - 100lbs',
      description: 'Large collection of clean aluminum cans. Perfect for recycling centers.',
      price: 85.00,
      weight: 100,
      material: 'Aluminum',
      condition: 'Good',
      status: 'sold',
      views: 89,
      inquiries: 12,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-19',
      images: ['/image-placeholder.svg'],
      location: 'Chicago, IL',
      pickupAvailable: false
    },
    {
      id: '3',
      title: 'Steel Beams - Various Sizes',
      description: 'Construction steel beams in various sizes. Some surface rust but structurally sound.',
      price: 450.00,
      weight: 200,
      material: 'Steel',
      condition: 'Fair',
      status: 'pending',
      views: 45,
      inquiries: 3,
      createdAt: '2024-01-19',
      updatedAt: '2024-01-21',
      images: ['/image-placeholder.svg'],
      location: 'Chicago, IL',
      pickupAvailable: true
    },
    {
      id: '4',
      title: 'Brass Fittings and Pipes',
      description: 'Mixed brass fittings and pipes from plumbing renovation.',
      price: 180.00,
      weight: 25,
      material: 'Brass',
      condition: 'Good',
      status: 'draft',
      views: 0,
      inquiries: 0,
      createdAt: '2024-01-21',
      updatedAt: '2024-01-21',
      images: ['/image-placeholder.svg'],
      location: 'Chicago, IL',
      pickupAvailable: true
    }
  ]

  const stats = {
    totalListings: listings.length,
    activeListings: listings.filter(l => l.status === 'active').length,
    totalViews: listings.reduce((sum, l) => sum + l.views, 0),
    totalInquiries: listings.reduce((sum, l) => sum + l.inquiries, 0),
    totalValue: listings.reduce((sum, l) => sum + l.price, 0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'sold': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.material.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || listing.status === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">
            {user.name}&apos;s Listings
          </h1>
          <p className="text-gray-600 font-poppins">
            Manage your scrap metal listings and track performance
          </p>
        </div>
        <Link href="/dashboard/listings/create">
          <Button className="bg-[#006636] hover:bg-[#005528] text-white font-poppins">
            <Plus className="h-4 w-4 mr-2" />
            Create Listing
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-poppins">Total Listings</p>
                <p className="text-xl font-bold text-gray-900 font-poppins">{stats.totalListings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-poppins">Active</p>
                <p className="text-xl font-bold text-gray-900 font-poppins">{stats.activeListings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-poppins">Total Views</p>
                <p className="text-xl font-bold text-gray-900 font-poppins">{stats.totalViews}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-poppins">Inquiries</p>
                <p className="text-xl font-bold text-gray-900 font-poppins">{stats.totalInquiries}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-poppins">Total Value</p>
                <p className="text-xl font-bold text-gray-900 font-poppins">${stats.totalValue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 font-poppins"
          />
        </div>
        <Button variant="outline" className="font-poppins">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Listings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" className="font-poppins">All ({listings.length})</TabsTrigger>
          <TabsTrigger value="active" className="font-poppins">
            Active ({listings.filter(l => l.status === 'active').length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="font-poppins">
            Pending ({listings.filter(l => l.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="sold" className="font-poppins">
            Sold ({listings.filter(l => l.status === 'sold').length})
          </TabsTrigger>
          <TabsTrigger value="draft" className="font-poppins">
            Draft ({listings.filter(l => l.status === 'draft').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={listing.images[0] || "/placeholder.svg"}
                    alt={listing.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className={`absolute top-3 left-3 ${getStatusColor(listing.status)}`}>
                    {listing.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 font-poppins line-clamp-2">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-gray-600 font-poppins line-clamp-2 mt-1">
                        {listing.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-[#006636] font-poppins">
                          ${listing.price}
                        </span>
                        <span className="text-sm text-gray-500 font-poppins ml-2">
                          ({listing.weight}lbs)
                        </span>
                      </div>
                      <Badge variant="outline" className="font-poppins">
                        {listing.material}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span className="font-poppins">{listing.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        <span className="font-poppins">{listing.inquiries}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="font-poppins">{listing.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 font-poppins">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 font-poppins">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 font-poppins mb-2">
                No listings found
              </h3>
              <p className="text-gray-600 font-poppins mb-4">
                {searchQuery ? 'Try adjusting your search terms' : 'Create your first listing to get started'}
              </p>
              <Link href="/dashboard/listings/create">
                <Button className="bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Listing
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
