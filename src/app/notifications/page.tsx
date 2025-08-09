"use client"

import { useState } from "react"
import { NotificationSettings } from "@/components/notifications/NotificationSettings"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const mockUser = {
  id: '1',
  name: 'John Smith',
  email: 'john@example.com',
  type: 'seller' as 'seller' | 'buyer',
  avatar: '/avatar-placeholder.svg',
  verified: true,
  joinedDate: '2024-01-15',
  location: 'New York, USA',
  userType: 'seller' as 'seller' | 'buyer', // or 'buyer', depending on your needs
  joinDate: '2024-01-15', // match the format expected by User interface
  isVerified: true
}


export default function NotificationsPage() {
  const [userType, setUserType] = useState<"seller" | "buyer">("seller")

  const toggleUserType = () => {
    setUserType((prev) => (prev === "seller" ? "buyer" : "seller"))
  }

  const currentUser = {
    ...mockUser,
    type: userType,
  }

  return (
    <DashboardLayout user={currentUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="font-poppins bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-poppins">Notification Settings</h1>
              <p className="text-gray-600 font-poppins">Manage how you receive notifications</p>
            </div>
          </div>
          <Button onClick={toggleUserType} variant="outline" className="font-poppins bg-transparent">
            Switch to {userType === "seller" ? "Buyer" : "Seller"} View
          </Button>
        </div>

        {/* Settings Component */}
        <NotificationSettings user={currentUser} />
      </div>
    </DashboardLayout>
  )
}
