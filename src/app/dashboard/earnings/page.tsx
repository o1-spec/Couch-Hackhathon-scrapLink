 "use client"

import { useState, useEffect } from "react"
import { EarningsDashboard } from "@/components/earnings/EarningsDashboard"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"

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

export default function EarningsPage() {
  const [userType, setUserType] = useState<"seller" | "buyer">("seller")
  const [isLoading, setIsLoading] = useState(true)

  const toggleUserType = () => {
    setUserType((prev) => (prev === "seller" ? "buyer" : "seller"))
  }

  const currentUser = {
    ...mockUser,
    type: userType,
  }

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006636] mx-auto mb-4"></div>
          <p className="text-gray-600 font-poppins">Loading your earnings...</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout user={currentUser}>
      <div className="mb-4">
        <button
          onClick={toggleUserType}
          className="px-4 py-2 bg-[#006636] text-white rounded-lg hover:bg-[#005528] font-poppins"
        >
          Switch to {userType === "seller" ? "Buyer" : "Seller"} View
        </button>
      </div>
      <EarningsDashboard user={currentUser} />
    </DashboardLayout>
  )
}
