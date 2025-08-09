"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Filter, MapPin, Star, Eye, MessageCircle, Trash2, Share2, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface FavoriteListing {
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
  favoritedDate: string
  condition: "excellent" | "good" | "fair" | "poor"
  availability: "available" | "pending" | "sold"
  priceHistory: Array<{
    price: number
    date: string
  }>
  notes: string
}

interface FavoritesSectionProps {
  user: {
    id: string
    name: string
    email: string
    userType: "seller" | "buyer"
    avatar: string
    location: string
    joinDate: string
    isVerified: boolean
  }
}

export function FavoritesSection({ user }: FavoritesSectionProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<FavoriteListing[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [noteText, setNoteText] = useState("")

  // Mock data - personalized based on user
  useEffect(() => {
    const mockFavorites: FavoriteListing[] = [
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
        location: user.userType === "buyer" ? "2.3 miles from you" : "Chicago, IL",
        distance: 2.3,
        images: ["/image-placeholder.svg"],
        seller: {
          id: "s1",
          name: "Metro Demolition Co.",
          avatar: "/avatar-placeholder.svg",
          rating: 4.8,
          reviewCount: 127,
          isVerified: true,
        },
        postedDate: "2024-01-20",
        favoritedDate: "2024-01-21",
        condition: "excellent",
        availability: "available",
        priceHistory: [
          { price: 3.5, date: "2024-01-20" },
          { price: 3.25, date: "2024-01-21" },
        ],
        notes:
          user.userType === "buyer"
            ? "Great price for copper wire. Contact seller about bulk discount."
            : "Potential customer interested in bulk orders.",
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
        images: ["/image-placeholder.svg"],
        seller: {
          id: "s2",
          name: "Industrial Salvage LLC",
          avatar: "/avatar-placeholder.svg",
          rating: 4.6,
          reviewCount: 89,
          isVerified: true,
        },
        postedDate: "2024-01-19",
        favoritedDate: "2024-01-20",
        condition: "good",
        availability: "pending",
        priceHistory: [
          { price: 0.18, date: "2024-01-19" },
          { price: 0.15, date: "2024-01-20" },
        ],
        notes: "",
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
        images: ["/image-placeholder.svg"],
        seller: {
          id: "s3",
          name: "Green Recycling Co.",
          avatar: "/avatar-placeholder.svg",
          rating: 4.9,
          reviewCount: 203,
          isVerified: true,
        },
        postedDate: "2024-01-18",
        favoritedDate: "2024-01-19",
        condition: "excellent",
        availability: "sold",
        priceHistory: [
          { price: 0.9, date: "2024-01-18" },
          { price: 0.85, date: "2024-01-19" },
        ],
        notes:
          user.userType === "buyer"
            ? "Seller has consistent quality. Check for new listings."
            : "Regular supplier - maintain relationship.",
      },
    ]
    setFavorites(mockFavorites)
  }, [user.userType])

  const removeFavorite = (listingId: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== listingId))
    setSelectedItems((prev) => prev.filter((id) => id !== listingId))
    toast.success("Removed from favorites", "Item removed from your favorites list")
  }

  const removeSelectedFavorites = () => {
    setFavorites((prev) => prev.filter((item) => !selectedItems.includes(item.id)))
    toast.success(`Removed ${selectedItems.length} items`, "Selected items removed from your favorites list")
    setSelectedItems([])
  }

  const toggleSelectItem = (listingId: string) => {
    setSelectedItems((prev) =>
      prev.includes(listingId) ? prev.filter((id) => id !== listingId) : [...prev, listingId],
    )
  }

  const selectAllItems = () => {
    setSelectedItems(filteredFavorites.map((item) => item.id))
  }

  const clearSelection = () => {
    setSelectedItems([])
  }

  const saveNote = (listingId: string) => {
    setFavorites((prev) => prev.map((item) => (item.id === listingId ? { ...item, notes: noteText } : item)))
    setEditingNotes(null)
    setNoteText("")
    toast.success("Note saved", "Your note has been saved successfully")
  }

  const startEditingNote = (listing: FavoriteListing) => {
    setEditingNotes(listing.id)
    setNoteText(listing.notes)
  }

  const shareItem = (listing: FavoriteListing) => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(`Check out this scrap listing: ${listing.title}`)
    toast.success("Link copied", "Listing link copied to clipboard")
  }

  const filteredFavorites = favorites.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "distance":
        return a.distance - b.distance
      case "oldest":
        return new Date(a.favoritedDate).getTime() - new Date(b.favoritedDate).getTime()
      case "newest":
      default:
        return new Date(b.favoritedDate).getTime() - new Date(a.favoritedDate).getTime()
    }
  })

  const handleContactSeller = (listing: FavoriteListing) => {
    toast.info("Contact Seller", `Opening message thread with ${listing.seller.name}`)
  }

  const handleViewDetails = (listing: FavoriteListing) => {
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">My Favorites</h1>
              <p className="text-gray-600 font-poppins">
                {user.name}, keep track of interesting listings and get notified of price changes
              </p>
            </div>
          </div>
          {user.userType === "buyer" && user.isVerified && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm font-poppins">
                <span className="h-4 w-4 mr-2 bg-green-600 text-white rounded-full flex items-center justify-center">
                  U
                </span>
                Verified Buyer • You&apos;ll receive priority notifications for price drops and new similar listings
              </p>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600 font-poppins">{favorites.length}</div>
              <div className="text-sm text-gray-600 font-poppins">Total Favorites</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600 font-poppins">
                {favorites.filter((f) => f.availability === "available").length}
              </div>
              <div className="text-sm text-gray-600 font-poppins">Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600 font-poppins">
                {favorites.filter((f) => f.availability === "pending").length}
              </div>
              <div className="text-sm text-gray-600 font-poppins">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600 font-poppins">
                {favorites.filter((f) => f.availability === "sold").length}
              </div>
              <div className="text-sm text-gray-600 font-poppins">Sold</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search your favorites..."
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
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
                  <label className="block text-sm font-medium mb-2 font-poppins">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Recently Added</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end gap-2">
                  {selectedItems.length > 0 ? (
                    <>
                      <Button variant="outline" onClick={clearSelection} className="flex-1 bg-transparent font-poppins">
                        Clear ({selectedItems.length})
                      </Button>
                      <Button variant="destructive" onClick={removeSelectedFavorites} className="flex-1 font-poppins">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={selectAllItems}
                      className="w-full bg-transparent font-poppins"
                      disabled={sortedFavorites.length === 0}
                    >
                      Select All
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600 font-poppins">
            Showing {sortedFavorites.length} of {favorites.length} favorites
          </p>
          {selectedItems.length > 0 && (
            <p className="text-sm text-blue-600 font-poppins">
              {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""} selected
            </p>
          )}
        </div>

        {/* Favorites Grid */}
        {sortedFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFavorites.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={listing.images[0] || "/placeholder.svg"}
                    alt={listing.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
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
                    {listing.priceHistory.length > 1 && listing.priceHistory[0].price > listing.price && (
                      <Badge variant="destructive" className="bg-green-600">
                        Price Drop!
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white"
                      onClick={() => shareItem(listing)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white"
                      onClick={() => removeFavorite(listing.id)}
                    >
                      <Heart className="h-4 w-4 fill-red-600 text-red-600" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(listing.id)}
                      onChange={() => toggleSelectItem(listing.id)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2 font-poppins">{listing.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 font-poppins">{listing.description}</p>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-green-600 font-poppins">
                        ${listing.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 font-poppins">{listing.priceUnit.replace("_", " ")}</span>
                    </div>
                    {listing.priceHistory.length > 1 && (
                      <div className="text-xs text-gray-500 font-poppins">
                        Was ${listing.priceHistory[0].price.toFixed(2)} on{" "}
                        {new Date(listing.priceHistory[0].date).toLocaleDateString()}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1 font-poppins">
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
                        <span>{user.userType === "buyer" ? listing.location : `${listing.distance} miles`}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 text-xs text-gray-500 flex items-center gap-1 font-poppins">
                    <Calendar className="h-3 w-3" />
                    Added {new Date(listing.favoritedDate).toLocaleDateString()}
                  </div>

                  {/* Notes Section */}
                  <div className="mb-3">
                    {editingNotes === listing.id ? (
                      <div className="space-y-2">
                        <Input
                          placeholder={
                            user.userType === "buyer"
                              ? "Add a note about this listing..."
                              : "Add notes about this potential customer..."
                          }
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          className="text-sm font-poppins"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => saveNote(listing.id)}
                            className="text-xs font-poppins bg-[#006636] hover:bg-[#005528] text-white"
                          >
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingNotes(null)}
                            className="text-xs font-poppins bg-transparent"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {listing.notes ? (
                          <div
                            className="text-sm text-gray-600 bg-gray-50 p-2 rounded cursor-pointer hover:bg-gray-100 font-poppins"
                            onClick={() => startEditingNote(listing)}
                          >
                            {listing.notes}
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditingNote(listing)}
                            className="text-xs text-gray-500 h-auto p-1 font-poppins"
                          >
                            + Add note
                          </Button>
                        )}
                      </div>
                    )}
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
        ) : (
          <Card className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Heart className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2 font-poppins">
              {favorites.length === 0 ? "No favorites yet" : "No matching favorites"}
            </h3>
            <p className="text-gray-600 font-poppins">
              {favorites.length === 0
                ? `${user.name}, start browsing listings and add items to your favorites to keep track of them.`
                : "Try adjusting your search criteria to find more results."}
            </p>
            {favorites.length === 0 && (
              <Button
                className="mt-4 bg-[#006636] hover:bg-[#005528] text-white font-poppins"
                onClick={() => (window.location.href = "/dashboard/browse")}
              >
                Browse Listings
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
