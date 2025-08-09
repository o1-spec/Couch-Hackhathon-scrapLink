"use client"

import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { BrowseScrap } from "@/components/browse/BrowseScrap"

const mockUser = {
  id: "1",
  name: "John Smith",
  email: "john@example.com",
  userType: "buyer" as const,
  avatar: "/placeholder.svg?height=40&width=40&text=JS",
  location: "Chicago, IL",
  joinDate: "2023-06-15",
  isVerified: true,
}

export default function BrowsePage() {
  return (
    <DashboardLayout user={mockUser}>
      <BrowseScrap user={mockUser} />
    </DashboardLayout>
  )
}
