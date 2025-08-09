"use client"

import { useState, useEffect, ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Filter, MapPin, Star, Eye, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface ScrapListing {
  id: string
  title: string
  description: string
  price: number
  priceUnit: "per_lb" | "per_ton" | "total"
  category: string
  material: string
  quantity: number
  quantityUnit: string
  location: string
  distance: number
  images: string[]
  seller: {
    id: string
    name: string
    avatar: string
    rating: number
    reviewCount: number
    isVerified: boolean
  }
  postedDate: string
  condition: "excellent" | "good" | "fair" | "poor"
  availability: "available" | "pending" | "sold"
  isFavorited: boolean
}

interface User {
  isVerified: boolean
  location: ReactNode
  id: string
  name: string
  email: string
  type: 'seller' | 'buyer'
  avatar?: string
  verified: boolean
  joinedDate?: string
  userType?: 'seller' | 'buyer'
}

interface BrowseScrapProps {
  user: User
}

export function BrowseScrap({ user }: BrowseScrapProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedMaterial, setSelectedMaterial] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [listings, setListings] = useState<ScrapListing[]>([])

  // Mock data - in real app this would be filtered based on user location and preferences
  useEffect(() => {
    const mockListings: ScrapListing[] = [
      {
        id: "1",
        title: "High-Grade Copper Wire - 500 lbs",
        description: "Clean copper wire from electrical demolition. No insulation, ready for processing.",
        price: 3.25,
        priceUnit: "per_lb",
        category: "Non-Ferrous",
        material: "Copper",
        quantity: 500,
        quantityUnit: "lbs",
        location: user.userType === "buyer" ? "Near your location" : "Chicago, IL",
        distance: 2.3,
        images: ["/placeholder.svg?height=200&width=300&text=Copper+Wire"],
        seller: {
          id: "s1",
          name: "Metro Demolition Co.",
          avatar: "/placeholder.svg?height=40&width=40&text=MD",
          rating: 4.8,
          reviewCount: 127,
          isVerified: true,
        },
        postedDate: "2024-01-20",
        condition: "excellent",
        availability: "available",
        isFavorited: false,
      },
      {
        id: "2",
        title: "Steel Beams - Construction Grade",
        description: "Structural steel beams from office building demolition. Various sizes available.",
        price: 0.15,
        priceUnit: "per_lb",
        category: "Ferrous",
        material: "Steel",
        quantity: 2000,
        quantityUnit: "lbs",
        location: user.userType === "buyer" ? "8.7 miles from you" : "Naperville, IL",
        distance: 8.7,
        images: ["/placeholder.svg?height=200&width=300&text=Steel+Beams"],
        seller: {
          id: "s2",
          name: "Industrial Salvage LLC",
          avatar: "/placeholder.svg?height=40&width=40&text=IS",
          rating: 4.6,
          reviewCount: 89,
          isVerified: true,
        },
        postedDate: "2024-01-19",
        condition: "good",
        availability: "available",
        isFavorited: true,
      },
      {
        id: "3",
        title: "Aluminum Cans - Bulk Lot",
        description: "Clean aluminum cans, crushed and ready for recycling. Perfect for processors.",
        price: 0.85,
        priceUnit: "per_lb",
        category: "Non-Ferrous",
        material: "Aluminum",
        quantity: 300,
        quantityUnit: "lbs",
        location: user.userType === "buyer" ? "12.1 miles from you" : "Aurora, IL",
        distance: 12.1,
        images: ["/placeholder.svg?height=200&width=300&text=Aluminum+Cans"],
        seller: {
          id: "s3",
          name: "Green Recycling Co.",
          avatar: "/placeholder.svg?height=40&width=40&text=GR",
          rating: 4.9,
          reviewCount: 203,
          isVerified: true,
        },
        postedDate: "2024-01-18",
        condition: "excellent",
        availability: "available",
        isFavorited: false,
      },
      {
        id: "4",
        title: "Mixed Brass Fittings",
        description: "Assorted brass fittings and valves from plumbing renovation projects.",
        price: 2.75,
        priceUnit: "per_lb",
        category: "Non-Ferrous",
        material: "Brass",
        quantity: 150,
        quantityUnit: "lbs",
        location: user.userType === "buyer" ? "15.4 miles from you" : "Schaumburg, IL",
        distance: 15.4,
        images: ["/placeholder.svg?height=200&width=300&text=Brass+Fittings"],
        seller: {
          id: "s4",
          name: "Plumbing Solutions Inc.",
          avatar: "/placeholder.svg?height=40&width=40&text=PS",
          rating: 4.7,
          reviewCount: 156,
          isVerified: false,
        },
        postedDate: "2024-01-17",
        condition: "good",
        availability: "pending",
        isFavorited: false,
      },
    ]
    setListings(mockListings)
    setFavorites(mockListings.filter((l) => l.isFavorited).map((l) => l.id))
  }, [user.userType])

  const toggleFavorite = (listingId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(listingId) ? prev.filter((id) => id !== listingId) : [...prev, listingId]

      const isRemoving = prev.includes(listingId)
      if (isRemoving) {
        toast.success("Removed from favorites", "Item removed from your favorites list")
      } else {
        toast.success("Added to favorites", "Item added to your favorites list")
      }

      return newFavorites
    })
  }

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.material.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory
    const matchesMaterial = selectedMaterial === "all" || listing.material === selectedMaterial

    const matchesPrice =
      (!priceRange.min || listing.price >= Number.parseFloat(priceRange.min)) &&
      (!priceRange.max || listing.price <= Number.parseFloat(priceRange.max))

    return matchesSearch && matchesCategory && matchesMaterial && matchesPrice
  })

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "distance":
        return a.distance - b.distance
      case "rating":
        return b.seller.rating - a.seller.rating
      case "newest":
      default:
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    }
  })

  const handleContactSeller = (listing: ScrapListing) => {
    toast.info("Contact Seller", `Opening message thread with ${listing.seller.name}`)
  }

  const handleViewDetails = (listing: ScrapListing) => {
    toast.info("View Details", `Opening detailed view for ${listing.title}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with user personalization */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-poppins">Browse Scrap Materials</h1>
              <p className="text-gray-600 font-poppins">
                Welcome back, {user.name}! Find quality scrap materials{" "}
                {user.userType === "buyer" ? "from verified sellers in your area" : "to purchase for your business"}
              </p>
            </div>
          </div>
          {user.userType === "buyer" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm font-poppins">
                Showing results near {user.location} •{" "}
                {user.isVerified ? "Verified Buyer" : "Complete verification for better deals"}
              </p>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={`Search materials, descriptions, or locations${user.userType === "buyer" ? " near you" : ""}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 font-poppins"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 font-poppins bg-transparent"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium mb-2 font-poppins">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Ferrous">Ferrous Metals</SelectItem>
                      <SelectItem value="Non-Ferrous">Non-Ferrous Metals</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Automotive">Automotive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 font-poppins">Material</label>
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Materials</SelectItem>
                      <SelectItem value="Steel">Steel</SelectItem>
                      <SelectItem value="Copper">Copper</SelectItem>
                      <SelectItem value="Aluminum">Aluminum</SelectItem>
                      <SelectItem value="Brass">Brass</SelectItem>
                      <SelectItem value="Iron">Iron</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 font-poppins">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="rating">Seller Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 font-poppins">Price Range</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                      type="number"
                      step="0.01"
                      className="font-poppins"
                    />
                    <Input
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                      type="number"
                      step="0.01"
                      className="font-poppins"
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600 font-poppins">
            Showing {sortedListings.length} of {listings.length} listings
            {user.userType === "buyer" && sortedListings.length > 0 && (
              <span className="ml-2 text-green-600">• {favorites.length} favorited</span>
            )}
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={listing.images[0] || "/placeholder.svg"}
                  alt={listing.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                {user.userType === "buyer" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute top-2 right-2 p-2 rounded-full ${
                      favorites.includes(listing.id)
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-white/80 text-gray-600 hover:bg-white"
                    }`}
                    onClick={() => toggleFavorite(listing.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(listing.id) ? "fill-current" : ""}`} />
                  </Button>
                )}
                <div className="absolute top-2 left-2">
                  <Badge
                    variant={
                      listing.availability === "available"
                        ? "default"
                        : listing.availability === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {listing.availability}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2 font-poppins">{listing.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 font-poppins">{listing.description}</p>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-green-600 font-poppins">${listing.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 font-poppins">{listing.priceUnit.replace("_", " ")}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 font-poppins">
                    <span>
                      {listing.quantity} {listing.quantityUnit}
                    </span>
                    <span>•</span>
                    <span>{listing.material}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src={listing.seller.avatar || "/placeholder.svg"}
                      alt={listing.seller.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium font-poppins">{listing.seller.name}</span>
                    {listing.seller.isVerified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-poppins">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{listing.seller.rating}</span>
                      <span>({listing.seller.reviewCount})</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{user.userType === "buyer" ? `${listing.distance} miles` : listing.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent font-poppins"
                    onClick={() => handleViewDetails(listing)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-[#006636] hover:bg-[#005528] text-white font-poppins"
                    onClick={() => handleContactSeller(listing)}
                    disabled={listing.availability === "sold"}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {user.userType === "buyer" ? "Contact" : "Inquire"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedListings.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2 font-poppins">No listings found</h3>
            <p className="text-gray-600 font-poppins">
              Try adjusting your search criteria or filters to find more results.
              {user.userType === "buyer" && " We'll notify you when new listings match your preferences."}
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
