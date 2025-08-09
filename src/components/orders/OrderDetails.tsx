"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Package,
  Truck,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Download,
  RefreshCw,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"

interface OrderDetailsProps {
  orderId: string
  onBack: () => void
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

export function OrderDetails({ orderId, onBack, user }: OrderDetailsProps) {
  const [newNote, setNewNote] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  // Mock order data - in real app this would be fetched by orderId and personalized for user
  const order = {
    id: orderId,
    orderNumber: "ORD-2024-001",
    listingId: "lst_1",
    listingTitle: "Premium Copper Wire Bundle - 50lbs",
    listingImage: "/placeholder.svg?height=120&width=120&text=Copper",
    buyerName: user.userType === "seller" ? "Sarah Johnson" : user.name,
    buyerEmail: user.userType === "seller" ? "sarah@example.com" : user.email,
    buyerPhone: user.userType === "seller" ? "+1 (555) 123-4567" : "+1 (555) 123-4567",
    sellerName: user.userType === "buyer" ? "John Smith" : user.name,
    sellerEmail: user.userType === "buyer" ? "john@example.com" : user.email,
    sellerPhone: user.userType === "buyer" ? "+1 (555) 987-6543" : "+1 (555) 987-6543",
    amount: 245.0,
    quantity: "50 lbs",
    status: "in-transit",
    orderDate: "2024-01-20T10:30:00Z",
    estimatedDelivery: "2024-01-25T15:00:00Z",
    shippingAddress: {
      street: user.userType === "buyer" ? "123 Industrial Ave" : "456 Buyer Street",
      city: user.userType === "buyer" ? "Chicago" : "Chicago",
      state: "IL",
      zipCode: user.userType === "buyer" ? "60601" : "60602",
    },
    paymentStatus: "paid",
    shippingMethod: "delivery",
    trackingNumber: "TRK123456789",
    notes: user.userType === "seller" ? "Please call before delivery" : "Delivery instructions: Use back entrance",
    timeline: [
      {
        status: "Order Placed",
        date: "2024-01-20T10:30:00Z",
        description:
          user.userType === "buyer"
            ? "You placed this order and payment was confirmed"
            : "Order placed by customer and payment confirmed",
      },
      {
        status: "Order Confirmed",
        date: "2024-01-20T14:15:00Z",
        description: user.userType === "buyer" ? "Seller confirmed the order" : "You confirmed the order",
      },
      {
        status: "Shipped",
        date: "2024-01-21T09:00:00Z",
        description:
          user.userType === "buyer"
            ? "Package shipped with tracking number TRK123456789"
            : "You shipped the package with tracking number TRK123456789",
      },
      {
        status: "In Transit",
        date: "2024-01-22T08:30:00Z",
        description: "Package is on the way to destination",
      },
    ],
  }

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
      default:
        return "bg-gray-100 text-gray-800"
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

  const handleUpdateStatus = async (newStatus: string) => {
    setIsUpdating(true)
    // Simulate API call
    console.log("Updating order status to:", newStatus)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsUpdating(false)
  }

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    setIsUpdating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setNewNote("")
    setIsUpdating(false)
  }

  const contactPerson =
    user.userType === "seller"
      ? { name: order.buyerName, email: order.buyerEmail, phone: order.buyerPhone, role: "Customer" }
      : { name: order.sellerName, email: order.sellerEmail, phone: order.sellerPhone, role: "Seller" }

  return (
    <div className="space-y-6">
      {/* Header with user context */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="font-poppins bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <div className="flex items-center gap-3">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-poppins">Order #{order.orderNumber}</h1>
              <p className="text-gray-600 font-poppins">
                {user.userType === "buyer" ? "Your order" : "Customer order"} placed on {formatDate(order.orderDate)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-poppins bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Download {user.userType === "buyer" ? "Receipt" : "Invoice"}
          </Button>
          <Button variant="outline" className="font-poppins bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Image
                  src={order.listingImage || "/placeholder.svg"}
                  alt={order.listingTitle}
                  width={120}
                  height={120}
                  className="w-30 h-30 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 font-poppins mb-2">{order.listingTitle}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 font-poppins">Quantity:</span>
                      <span className="ml-2 font-medium font-poppins">{order.quantity}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 font-poppins">
                        {user.userType === "buyer" ? "Total Paid:" : "Amount Received:"}
                      </span>
                      <span className="ml-2 font-medium font-poppins">${order.amount.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 font-poppins">Status:</span>
                      <Badge className={`ml-2 text-xs ${getStatusColor(order.status)}`}>{order.status}</Badge>
                    </div>
                    <div>
                      <span className="text-gray-600 font-poppins">Payment:</span>
                      <Badge className="ml-2 text-xs bg-green-100 text-green-800">{order.paymentStatus}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.timeline.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#006636] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 font-poppins">{event.status}</h4>
                      <p className="text-sm text-gray-600 font-poppins">{event.description}</p>
                      <p className="text-xs text-gray-500 font-poppins mt-1">{formatDate(event.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">
                {user.userType === "buyer" ? "Delivery Information" : "Shipping Information"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 font-poppins mb-3">
                    {user.userType === "buyer" ? "Your Address" : "Delivery Address"}
                  </h4>
                  <div className="flex items-start gap-2 text-sm text-gray-600 font-poppins">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <div>
                      <p>{order.shippingAddress.street}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 font-poppins mb-3">Tracking Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600 font-poppins">Tracking Number:</span>
                      <span className="ml-2 font-mono font-medium">{order.trackingNumber}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 font-poppins">Estimated Delivery:</span>
                      <span className="ml-2 font-medium font-poppins">{formatDate(order.estimatedDelivery)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 font-poppins">Shipping Method:</span>
                      <span className="ml-2 font-medium font-poppins capitalize">{order.shippingMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">{contactPerson.role} Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium font-poppins">{contactPerson.name}</span>
                  {user.userType === "seller" && user.isVerified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="font-poppins">{contactPerson.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="font-poppins">{contactPerson.phone}</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message {contactPerson.role}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions - Only show for sellers */}
          {user.userType === "seller" && (
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full font-poppins bg-transparent"
                  onClick={() => handleUpdateStatus("confirmed")}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Mark as Confirmed
                </Button>
                <Button
                  variant="outline"
                  className="w-full font-poppins bg-transparent"
                  onClick={() => handleUpdateStatus("shipped")}
                  disabled={isUpdating}
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Mark as Shipped
                </Button>
                <Button
                  variant="outline"
                  className="w-full font-poppins bg-transparent"
                  onClick={() => handleUpdateStatus("delivered")}
                  disabled={isUpdating}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Mark as Delivered
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Add Note */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">
                {user.userType === "buyer" ? "Add Note" : "Add Order Note"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={
                  user.userType === "buyer"
                    ? "Add a note about this order..."
                    : "Add a note about this customer order..."
                }
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="mb-3 font-poppins"
              />
              <Button
                onClick={handleAddNote}
                disabled={!newNote.trim() || isUpdating}
                className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins"
              >
                {isUpdating ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : null}
                Add Note
              </Button>
            </CardContent>
          </Card>

          {/* User Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium font-poppins">{user.name}</p>
                  <p className="text-sm text-gray-600 font-poppins capitalize">
                    {user.userType} • {user.location}
                  </p>
                </div>
              </div>
              {user.isVerified && (
                <Badge className="bg-green-100 text-green-800 text-xs">✓ Verified {user.userType}</Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
