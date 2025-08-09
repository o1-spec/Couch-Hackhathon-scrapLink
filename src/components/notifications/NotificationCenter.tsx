"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  X,
  Check,
  Trash2,
  Settings,
  DollarSign,
  Package,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react"

interface Notification {
  id: string
  type: "message" | "payment" | "order" | "system" | "promotion"
  title: string
  message: string
  timestamp: string
  read: boolean
  avatar?: string
  senderName?: string
  amount?: number
  actionUrl?: string
}

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    name: string
    type: "seller" | "buyer"
  }
}

export function NotificationCenter({ isOpen, onClose, user }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeTab, setActiveTab] = useState("all")

  // Mock notifications data
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "message",
        title: "New Message",
        message: "Sarah Johnson sent you a message about Copper Wire Bundle",
        timestamp: "2 minutes ago",
        read: false,
        avatar: "/placeholder.svg?height=40&width=40",
        senderName: "Sarah Johnson",
        actionUrl: "/dashboard/messages",
      },
      {
        id: "2",
        type: "payment",
        title: "Payment Received",
        message: "You received a payment for Steel Rods order",
        timestamp: "1 hour ago",
        read: false,
        amount: 245.0,
        actionUrl: "/dashboard/earnings",
      },
      {
        id: "3",
        type: "order",
        title: user.type === "seller" ? "New Order" : "Order Update",
        message:
          user.type === "seller"
            ? "Mike Chen placed an order for Aluminum Sheets"
            : "Your order for Aluminum Sheets has been confirmed",
        timestamp: "3 hours ago",
        read: true,
        avatar: "/placeholder.svg?height=40&width=40",
        senderName: "Mike Chen",
        actionUrl: "/dashboard/orders",
      },
      {
        id: "4",
        type: "system",
        title: "Account Verification",
        message: "Your business verification has been approved",
        timestamp: "1 day ago",
        read: true,
        actionUrl: "/dashboard/settings",
      },
      {
        id: "5",
        type: "promotion",
        title: "Price Alert",
        message: "Copper prices increased by 5% in your area",
        timestamp: "2 days ago",
        read: true,
        actionUrl: "/dashboard/analytics",
      },
    ]
    setNotifications(mockNotifications)
  }, [user.type])

  if (!isOpen) return null

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    return notification.type === activeTab
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case "payment":
        return <DollarSign className="h-4 w-4 text-green-600" />
      case "order":
        return <Package className="h-4 w-4 text-purple-600" />
      case "system":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "promotion":
        return <TrendingUp className="h-4 w-4 text-indigo-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl font-bold text-gray-900 font-poppins">Notifications</CardTitle>
              {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount} new</Badge>}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b px-6 pt-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all" className="font-poppins">
                  All
                </TabsTrigger>
                <TabsTrigger value="message" className="font-poppins">
                  Messages
                </TabsTrigger>
                <TabsTrigger value="payment" className="font-poppins">
                  Payments
                </TabsTrigger>
                <TabsTrigger value="order" className="font-poppins">
                  Orders
                </TabsTrigger>
                <TabsTrigger value="system" className="font-poppins">
                  System
                </TabsTrigger>
                <TabsTrigger value="promotion" className="font-poppins">
                  Alerts
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 font-poppins">{filteredNotifications.length} notifications</p>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-[#006636] hover:text-[#005528] font-poppins"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="text-red-600 hover:text-red-700 font-poppins"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear all
                  </Button>
                </div>
              </div>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-poppins">No notifications yet</p>
                    <p className="text-sm text-gray-400 font-poppins">
                      We&apos;ll notify you when something important happens
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          !notification.read ? "bg-blue-50 border-l-4 border-l-[#006636]" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notification.avatar ? (
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={notification.avatar || "/placeholder.svg"}
                                alt={notification.senderName}
                              />
                              <AvatarFallback className="font-poppins">
                                {notification.senderName
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              {getNotificationIcon(notification.type)}
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900 font-poppins">{notification.title}</h4>
                                <p className="text-sm text-gray-600 font-poppins mt-1">{notification.message}</p>
                                {notification.amount && (
                                  <p className="text-sm font-semibold text-[#006636] font-poppins mt-1">
                                    +${notification.amount.toFixed(2)}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-1 ml-4">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="w-8 h-8 p-0"
                                  >
                                    <Check className="h-4 w-4 text-[#006636]" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="w-8 h-8 p-0 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1 text-xs text-gray-500 font-poppins">
                                <Clock className="h-3 w-3" />
                                {notification.timestamp}
                              </div>
                              {notification.actionUrl && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs font-poppins bg-transparent"
                                  onClick={() => {
                                    // In real app, would navigate to the URL
                                    console.log("Navigate to:", notification.actionUrl)
                                    onClose()
                                  }}
                                >
                                  View
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
