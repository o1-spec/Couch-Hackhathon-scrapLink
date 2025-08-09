"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/ui/toast-container"
import { Search, Filter, MapPin, Star, Heart, ShoppingCart, Scale, Clock, StickyNote, Trash2, Eye } from "lucide-react"
import Image from "next/image"

interface ScrapListing {
  id: string
  title: string
  material: string
  weight: number
  pricePerLb: number
  totalValue: number
  location: string
  distance: number
  seller: {
    name: string
    rating: number
    verified: boolean
    avatar: string
  }
  images: string[]
  description: string
  condition: "excellent" | "good" | "fair" | "poor"
  listedDate: string
  estimatedPickup: string
  isFavorited: boolean
  notes?: string
}

interface BrowseScrapProps {
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

export function BrowseScrap({ user }: BrowseScrapProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMaterial, setSelectedMaterial] = useState("all")
  const [sortBy, setSortBy] = useState("distance")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [selectedListings, setSelectedListings] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [noteInput, setNoteInput] = useState<{ [key: string]: string }>({})
  const [showNoteInput, setShowNoteInput] = useState<{ [key: string]: boolean }>({})

  // Mock data - would come from API based on user location
  const [listings, setListings] = useState<ScrapListing[]>([
    {
      id: "1",
      title: "Mixed Copper Wire - 25 lbs",
      material: "Copper",
      weight: 25.5,
      pricePerLb: 3.85,
      totalValue: 98.18,
      location: "Chicago, IL",
      distance: 2.3,
      seller: {
        name: "Mike's Electrical",
        rating: 4.8,
        verified: true,
        avatar: "/placeholder.svg?height=40&width=40&text=ME",
      },
      images: [
        "/placeholder.svg?height=200&width=300&text=Copper+Wire",
        "/placeholder.svg?height=200&width=300&text=Close+Up",
      ],
      description: "Clean copper wire from electrical work. No insulation, ready for pickup.",
      condition: "excellent",
      listedDate: "2024-01-15",
      estimatedPickup: "Same day",
      isFavorited: false,
    },
    {
      id: "2",
      title: "Aluminum Cans - 15 lbs",
      material: "Aluminum",
      weight: 15.2,
      pricePerLb: 0.85,
      totalValue: 12.92,
      location: "Naperville, IL",
      distance: 8.7,
      seller: {
        name: "Sarah Johnson",
        rating: 4.6,
        verified: true,
        avatar: "/placeholder.svg?height=40&width=40&text=SJ",
      },
      images: ["/placeholder.svg?height=200&width=300&text=Aluminum+Cans"],
      description: "Clean aluminum cans, crushed and bagged. Perfect condition.",
      condition: "good",
      listedDate: "2024-01-14",
      estimatedPickup: "Within 2 days",
      isFavorited: true,
      notes: "Great seller, fast pickup",
    },
    {
      id: "3",
      title: "Steel Beams - 150 lbs",
      material: "Steel",
      weight: 150.0,
      pricePerLb: 0.25,
      totalValue: 37.5,
      location: "Aurora, IL",
      distance: 12.1,
      seller: {
        name: "Construction Plus",
        rating: 4.9,
        verified: true,
        avatar: "/placeholder.svg?height=40&width=40&text=CP",
      },
      images: [
        "/placeholder.svg?height=200&width=300&text=Steel+Beams",
        "/placeholder.svg?height=200&width=300&text=Measurements",
      ],
      description: "Structural steel beams from demolition project. Various lengths available.",
      condition: "fair",
      listedDate: "2024-01-13",
      estimatedPickup: "Flexible",
      isFavorited: false,
    },
  ])

  const materials = ["all", "Copper", "Aluminum", "Steel", "Brass", "Iron", "Lead"]
  const conditions = ["all", "excellent", "good", "fair", "poor"]
  const sortOptions = [
    { value: "distance", label: "Distance (nearest first)" },
    { value: "price-high", label: "Price (highest first)" },
    { value: "price-low", label: "Price (lowest first)" },
    { value: "weight-high", label: "Weight (heaviest first)" },
    { value: "weight-low", label: "Weight (lightest first)" },
    { value: "newest", label: "Newest listings" },
    { value: "rating", label: "Seller rating" },
  ]

  const toggleFavorite = (listingId: string) => {
    setListings((prev) =>
      prev.map((listing) => (listing.id === listingId ? { ...listing, isFavorited: !listing.isFavorited } : listing)),
    )
    const listing = listings.find((l) => l.id === listingId)
    if (listing) {
      toast.success(
        listing.isFavorited ? "Removed from favorites" : "Added to favorites",
        listing.isFavorited ? "Item removed from your favorites list" : "Item saved to your favorites list",
      )
    }
  }

  const addNote = (listingId: string, note: string) => {
    setListings((prev) => prev.map((listing) => (listing.id === listingId ? { ...listing, notes: note } : listing)))
    toast.success("Note added", "Your note has been saved to this listing")
  }

  const removeNote = (listingId: string) => {
    setListings((prev) =>
      prev.map((listing) => (listing.id === listingId ? { ...listing, notes: undefined } : listing)),
    )
    toast.success("Note removed", "Your note has been deleted")
  }

  const toggleSelection = (listingId: string) => {
    setSelectedListings((prev) =>
      prev.includes(listingId) ? prev.filter((id) => id !== listingId) : [...prev, listingId],
    )
  }

  const bulkAddToFavorites = () => {
    setListings((prev) =>
      prev.map((listing) => (selectedListings.includes(listing.id) ? { ...listing, isFavorited: true } : listing)),
    )
    toast.success("Bulk action completed", `Added ${selectedListings.length} items to favorites`)
    setSelectedListings([])
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "fair":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.seller.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesMaterial = selectedMaterial === "all" || listing.material === selectedMaterial
    const matchesCondition = selectedCondition === "all" || listing.condition === selectedCondition

    const matchesPrice =
      (!priceRange.min || listing.pricePerLb >= Number.parseFloat(priceRange.min)) &&
      (!priceRange.max || listing.pricePerLb <= Number.parseFloat(priceRange.max))

    return matchesSearch && matchesMaterial && matchesCondition && matchesPrice
  })

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return a.distance - b.distance
      case "price-high":
        return b.pricePerLb - a.pricePerLb
      case "price-low":
        return a.pricePerLb - b.pricePerLb
      case "weight-high":
        return b.weight - a.weight
      case "weight-low":
        return a.weight - b.weight
      case "newest":
        return new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime()
      case "rating":
        return b.seller.rating - a.seller.rating
      default:
        return 0
    }
  })

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-poppins">Browse Scrap Materials</h1>
            <p className="text-gray-600 font-poppins">
              Welcome {user.name}! Find quality scrap materials near {user.location}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="font-poppins"
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="font-poppins"
            >
              List
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search materials, sellers, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 font-poppins"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                  <SelectTrigger className="w-40 font-poppins">
                    <SelectValue placeholder="Material" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material} value={material}>
                        {material === "all" ? "All Materials" : material}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 font-poppins">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="font-poppins">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="font-poppins">Price Range (per lb)</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                      className="font-poppins"
                    />
                    <Input
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                      className="font-poppins"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-poppins">Condition</Label>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger className="mt-1 font-poppins">
                      <SelectValue placeholder="All Conditions" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition === "all"
                            ? "All Conditions"
                            : condition.charAt(0).toUpperCase() + condition.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600 font-poppins">
            Showing {sortedListings.length} results {searchQuery && `for "${searchQuery}"`}
          </p>
          {selectedListings.length > 0 && (
            <div className="flex gap-2">
              <Badge variant="secondary" className="font-poppins">
                {selectedListings.length} selected
              </Badge>
              <Button size="sm" onClick={bulkAddToFavorites} className="font-poppins">
                Add to Favorites
              </Button>
            </div>
          )}
        </div>

        {/* Listings Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {sortedListings.map((listing) => (
            <Card
              key={listing.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedListings.includes(listing.id) ? "ring-2 ring-[#006636]" : ""
              }`}
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative">
                  <Image
                    src={listing.images[0] || "/placeholder.svg"}
                    alt={listing.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSelection(listing.id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedListings.includes(listing.id)}
                        onChange={() => {}}
                        className="h-4 w-4"
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(listing.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${listing.isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      />
                    </Button>
                  </div>
                  <Badge className={`absolute top-2 left-2 ${getConditionColor(listing.condition)}`}>
                    {listing.condition}
                  </Badge>
                </div>

                <div className="p-4 space-y-3">
                  {/* Title and Material */}
                  <div>
                    <h3 className="font-semibold text-gray-900 font-poppins">{listing.title}</h3>
                    <Badge variant="outline" className="mt-1">
                      {listing.material}
                    </Badge>
                  </div>

                  {/* Weight and Price */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Scale className="h-4 w-4" />
                      <span className="font-poppins">{listing.weight} lbs</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#006636] font-poppins">
                        ${listing.totalValue.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600 font-poppins">${listing.pricePerLb.toFixed(2)}/lb</div>
                    </div>
                  </div>

                  {/* Location and Distance */}
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="font-poppins">{listing.location}</span>
                    <span className="text-[#006636] font-poppins">• {listing.distance} miles away</span>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={listing.seller.avatar || "/placeholder.svg"}
                        alt={listing.seller.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-poppins">{listing.seller.name}</span>
                      {listing.seller.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-poppins">{listing.seller.rating}</span>
                    </div>
                  </div>

                  {/* Notes Section */}
                  {listing.notes ? (
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <div className="flex items-start gap-2">
                        <StickyNote className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-blue-800 font-poppins">{listing.notes}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeNote(listing.id)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : showNoteInput[listing.id] ? (
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a note about this listing..."
                          value={noteInput[listing.id] || ""}
                          onChange={(e) => setNoteInput((prev) => ({ ...prev, [listing.id]: e.target.value }))}
                          className="flex-1 text-sm font-poppins"
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && noteInput[listing.id]?.trim()) {
                              addNote(listing.id, noteInput[listing.id].trim())
                              setNoteInput((prev) => ({ ...prev, [listing.id]: "" }))
                              setShowNoteInput((prev) => ({ ...prev, [listing.id]: false }))
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (noteInput[listing.id]?.trim()) {
                              addNote(listing.id, noteInput[listing.id].trim())
                              setNoteInput((prev) => ({ ...prev, [listing.id]: "" }))
                              setShowNoteInput((prev) => ({ ...prev, [listing.id]: false }))
                            }
                          }}
                          className="bg-[#006636] hover:bg-[#005528] text-white font-poppins"
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowNoteInput((prev) => ({ ...prev, [listing.id]: false }))
                            setNoteInput((prev) => ({ ...prev, [listing.id]: "" }))
                          }}
                          className="font-poppins bg-transparent"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full font-poppins bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowNoteInput((prev) => ({ ...prev, [listing.id]: true }))
                      }}
                    >
                      <StickyNote className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                    <Button size="sm" variant="outline" className="font-poppins bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>

                  {/* Pickup Info */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 pt-1">
                    <Clock className="h-3 w-3" />
                    <span className="font-poppins">Pickup: {listing.estimatedPickup}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedListings.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 font-poppins mb-2">No results found</h3>
              <p className="text-gray-600 font-poppins">
                Try adjusting your search criteria or filters to find more listings.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      <ToastContainer />
    </>
  )
}
