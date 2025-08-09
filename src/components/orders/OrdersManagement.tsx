"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Download,
  Eye,
  MessageSquare,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  ArrowRight,
  RefreshCw,
} from "lucide-react"
import Image from "next/image"

interface Order {
  id: string
  orderNumber: string
  listingId: string
  listingTitle: string
  listingImage: string
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  sellerName: string
  sellerEmail: string
  sellerPhone: string
  amount: number
  quantity: string
  status: "pending" | "confirmed" | "in-transit" | "delivered" | "completed" | "cancelled" | "disputed"
  orderDate: string
  estimatedDelivery?: string
  actualDelivery?: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  pickupAddress?: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  paymentStatus: "pending" | "paid" | "refunded"
  shippingMethod: "pickup" | "delivery" | "shipping"
  trackingNumber?: string
  notes?: string
  rating?: number
  review?: string
}

interface OrdersManagementProps {
  user: {
    id: string
    name: string
    email: string
    type: "seller" | "buyer"
    avatar: string
    verified: boolean
    joinedDate: string
  }
}

export function OrdersManagement({ user }: OrdersManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock orders data - different for buyers vs sellers
  const mockOrders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      listingId: "lst_1",
      listingTitle: "Premium Copper Wire Bundle - 50lbs",
      listingImage: "/copper-placeholder.svg",
      buyerName: "Sarah Johnson",
      buyerEmail: "sarah@example.com",
      buyerPhone: "+1 (555) 123-4567",
      sellerName: "John Smith",
      sellerEmail: "john@example.com",
      sellerPhone: "+1 (555) 987-6543",
      amount: 245.0,
      quantity: "50 lbs",
      status: "in-transit",
      orderDate: "2024-01-20T10:30:00Z",
      estimatedDelivery: "2024-01-25T15:00:00Z",
      shippingAddress: {
        street: "123 Industrial Ave",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
      },
      paymentStatus: "paid",
      shippingMethod: "delivery",
      trackingNumber: "TRK123456789",
      notes: "Please call before delivery",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      listingId: "lst_2",
      listingTitle: "Aluminum Sheets Collection - 75lbs",
      listingImage: "/aluminum-placeholder.svg",
      buyerName: "Mike Rodriguez",
      buyerEmail: "mike@example.com",
      buyerPhone: "+1 (555) 234-5678",
      sellerName: "John Smith",
      sellerEmail: "john@example.com",
      sellerPhone: "+1 (555) 987-6543",
      amount: 180.0,
      quantity: "75 lbs",
      status: "completed",
      orderDate: "2024-01-18T14:15:00Z",
      actualDelivery: "2024-01-22T11:30:00Z",
      shippingAddress: {
        street: "456 Factory Rd",
        city: "Detroit",
        state: "MI",
        zipCode: "48201",
      },
      paymentStatus: "paid",
      shippingMethod: "pickup",
      rating: 5,
      review: "Excellent quality aluminum, exactly as described!",
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      listingId: "lst_3",
      listingTitle: "Steel Rods - Various Sizes",
      listingImage: "/steel-placeholder.svg",
      buyerName: "Emily Chen",
      buyerEmail: "emily@example.com",
      buyerPhone: "+1 (555) 345-6789",
      sellerName: "John Smith",
      sellerEmail: "john@example.com",
      sellerPhone: "+1 (555) 987-6543",
      amount: 320.0,
      quantity: "100 lbs",
      status: "pending",
      orderDate: "2024-01-22T09:45:00Z",
      estimatedDelivery: "2024-01-28T14:00:00Z",
      shippingAddress: {
        street: "789 Manufacturing St",
        city: "Milwaukee",
        state: "WI",
        zipCode: "53201",
      },
      paymentStatus: "paid",
      shippingMethod: "shipping",
    },
    {
      id: "4",
      orderNumber: "ORD-2024-004",
      listingId: "lst_4",
      listingTitle: "Brass Fittings Collection",
      listingImage: "/brass-placeholder.svg",
      buyerName: "David Wilson",
      buyerEmail: "david@example.com",
      buyerPhone: "+1 (555) 456-7890",
      sellerName: "John Smith",
      sellerEmail: "john@example.com",
      sellerPhone: "+1 (555) 987-6543",
      amount: 150.0,
      quantity: "25 lbs",
      status: "disputed",
      orderDate: "2024-01-19T16:20:00Z",
      shippingAddress: {
        street: "321 Workshop Ave",
        city: "Cleveland",
        state: "OH",
        zipCode: "44101",
      },
      paymentStatus: "paid",
      shippingMethod: "delivery",
      notes: "Quality concerns raised by buyer",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-transit":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
        return "bg-purple-100 text-purple-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      case "disputed":
        return "bg-red-100 text-red-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-transit":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "confirmed":
        return <Package className="h-4 w-4 text-purple-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4 text-gray-600" />
      case "disputed":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getOrderStats = () => {
    const total = mockOrders.length
    const pending = mockOrders.filter((o) => o.status === "pending").length
    const inTransit = mockOrders.filter((o) => o.status === "in-transit").length
    const completed = mockOrders.filter((o) => o.status === "completed").length
    const disputed = mockOrders.filter((o) => o.status === "disputed").length

    return { total, pending, inTransit, completed, disputed }
  }

  const stats = getOrderStats()

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.listingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.type === "seller" ? order.buyerName : order.sellerName).toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">
            {user.type === "seller" ? "Sales Orders" : "Purchase Orders"}
          </h1>
          <p className="text-gray-600 font-poppins">
            {user.type === "seller"
              ? "Manage your sales and track order fulfillment"
              : "Track your purchases and order status"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-poppins bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="font-poppins bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 font-poppins">{stats.total}</p>
              </div>
              <Package className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 font-poppins">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">In Transit</p>
                <p className="text-2xl font-bold text-blue-600 font-poppins">{stats.inTransit}</p>
              </div>
              <Truck className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Completed</p>
                <p className="text-2xl font-bold text-green-600 font-poppins">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-poppins">Disputed</p>
                <p className="text-2xl font-bold text-red-600 font-poppins">{stats.disputed}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search orders, items, or customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 font-poppins"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 font-poppins">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="disputed">Disputed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle className="font-poppins">
            {user.type === "seller" ? "Sales Orders" : "Purchase Orders"} ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <Image
                      src={order.listingImage || "/placeholder.svg"}
                      alt={order.listingTitle}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 font-poppins">{order.listingTitle}</h3>
                        <Badge className={`text-xs ${getStatusColor(order.status)}`}>{order.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 font-poppins mb-1">Order #{order.orderNumber}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 font-poppins">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(order.orderDate)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          {order.quantity}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />${order.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-medium text-gray-900 font-poppins">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Customer/Seller Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 font-poppins mb-2">
                      {user.type === "seller" ? "Buyer Information" : "Seller Information"}
                    </h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-poppins">
                        <Phone className="h-3 w-3" />
                        {user.type === "seller" ? order.buyerName : order.sellerName}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-poppins">
                        <Mail className="h-3 w-3" />
                        {user.type === "seller" ? order.buyerEmail : order.sellerEmail}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-poppins">
                        <Phone className="h-3 w-3" />
                        {user.type === "seller" ? order.buyerPhone : order.sellerPhone}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 font-poppins mb-2">
                      {order.shippingMethod === "pickup" ? "Pickup Address" : "Shipping Address"}
                    </h4>
                    <div className="flex items-start gap-2 text-sm text-gray-600 font-poppins">
                      <MapPin className="h-3 w-3 mt-0.5" />
                      <div>
                        <p>{order.shippingAddress.street}</p>
                        <p>
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking Info */}
                {order.trackingNumber && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="h-4 w-4 text-blue-600" />
                      <h4 className="font-medium text-blue-900 font-poppins">Tracking Information</h4>
                    </div>
                    <p className="text-sm text-blue-800 font-poppins">
                      Tracking Number: <span className="font-mono">{order.trackingNumber}</span>
                    </p>
                    {order.estimatedDelivery && (
                      <p className="text-sm text-blue-800 font-poppins">
                        Estimated Delivery: {formatDate(order.estimatedDelivery)}
                      </p>
                    )}
                  </div>
                )}

                {/* Rating & Review */}
                {order.rating && order.review && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < order.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-green-900 font-poppins">Customer Review</span>
                    </div>
                    <p className="text-sm text-green-800 font-poppins">{order.review}</p>
                  </div>
                )}

                {/* Notes */}
                {order.notes && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-yellow-900 font-poppins mb-1">Order Notes</h4>
                    <p className="text-sm text-yellow-800 font-poppins">{order.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-poppins">
                      {order.shippingMethod}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-poppins">
                      Payment: {order.paymentStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="font-poppins bg-transparent">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" className="font-poppins bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {user.type === "seller" && order.status === "pending" && (
                      <Button className="bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                        Confirm Order
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
